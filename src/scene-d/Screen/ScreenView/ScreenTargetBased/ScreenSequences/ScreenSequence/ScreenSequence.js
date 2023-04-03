import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { OverlayPanel } from "primereact/overlaypanel";
import { Sidebar } from "primereact/sidebar";
import React, { useContext, useEffect, useRef, useState } from "react";
import FDate from "../../../../../../app/common/FDate/FDate";
import PleaseWait from "../../../../../../app/common/PleaseWait/PleaseWait";
import Loading from "../../../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../../../app/stores/rootStore";
import ScreenSequenceAddForm from "./ScreenSequenceAddForm/ScreenSequenceAddForm";

const ScreenSequence = ({ screenId }) => {
  const [displayAddDialog, setDisplayAddDialog] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState("");
  const op = useRef(null);
  const dt = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    loadingFetchScreen,
    fetchScreen,
    selectedScreen,
    addScreeenSequence,
    loadingScreenSequence,
  } = rootStore.screenStore;
  useEffect(() => {
    if (selectedScreen === null || selectedScreen.id !== screenId)
      fetchScreen(screenId);
  }, [selectedScreen, fetchScreen, screenId]);

  if (loadingFetchScreen || selectedScreen === null) {
    return <PleaseWait />;
  }

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const tableHeader = (
    <div className="flex w-full">
      <div className="flex w-6">
        <div className="flex gap-5">
          <Button
            type="button"
            icon="icon icon-common icon-plus-circle"
            label="New"
            className="p-button-text"
            style={{ height: "30px" }}
            onClick={() => setDisplayAddDialog(true)}
          />
          <Button
            type="button"
            icon="icon icon-fileformats icon-CSV"
            label="Export"
            className="p-button-text"
            style={{ height: "30px" }}
            onClick={() => exportCSV(false)}
          />
        </div>
      </div>

      <div className="flex w-6 justify-content-end gap-5">
        <div className="flex mr-6 gap-5">
          <Chip label={selectedScreen?.org.name} icon="ri-organization-chart" />
          <Chip
            label={selectedScreen?.method}
            icon="icon icon-common icon-circle-notch"
          />
        </div>
      </div>
    </div>
  );

  if (!loadingFetchScreen && selectedScreen) {
    let protocolBodyTemplate = (rowData) => {
      if (rowData?.protocol === null) {
        return <>Not Available</>;
      }
      return (
        <div
          className="p-mb-3 p-text-nowrap p-text-truncate"
          style={{ width: "6rem" }}
        >
          <Button
            className="p-button-text p-button-plain"
            label={
              rowData?.protocol !== null
                ? rowData?.protocol.substring(0, 7) + "..."
                : ""
            }
            onClick={(e) => {
              setSelectedProtocol(rowData.protocol);
              op.current.toggle(e);
            }}
            aria-haspopup
            aria-controls="overlay_panel"
            style={{ padding: "0px", margin: "0px" }}
          />
        </div>
      );
    };

    const StartDateTemplate = (rowData) => {
      return <FDate timestamp={rowData.startDate} hideTime={true} />;
    };
    const EndDateTemplate = (rowData) => {
      let OngoingTemplate = () => {
        return <span>Ongoing</span>;
      };
      return rowData.endDate ? (
        <FDate timestamp={rowData.endDate} hideTime={true} />
      ) : (
        OngoingTemplate()
      );
    };

    return (
      <div>
        <OverlayPanel
          ref={op}
          showCloseIcon
          id="overlay_panel"
          dismissable
          style={{ width: "450px" }}
        >
          <pre
            style={{
              maxWidth: "450px",
              overflow: "auto",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {selectedProtocol}
          </pre>
        </OverlayPanel>
        <Sidebar
          visible={displayAddDialog}
          position="right"
          // style={{ width: "50%", overflowX: "auto" }}

          onHide={() => setDisplayAddDialog(false)}
          className="p-sidebar-md"
        >
          <div className="card">
            <h3>{selectedScreen?.screenName}</h3>
            <i className="icon icon-common icon-plus-circle"></i> &nbsp; Add
            screening information
            <hr />
            <br />
          </div>
          <ScreenSequenceAddForm
            screenId={screenId}
            onAdd={(newSequence) => {
              addScreeenSequence(newSequence);
              setDisplayAddDialog(false);
            }}
            loading={loadingScreenSequence}
          />
        </Sidebar>
        <div className="card">
          <DataTable
            ref={dt}
            value={selectedScreen.screenSequences}
            header={tableHeader}
            exportFilename={`Screen-${selectedScreen.screenName}-${selectedScreen.method}.csv`}
          >
            <Column field="library" header="Library" />

            <Column
              field={"protocol"}
              body={protocolBodyTemplate}
              header="Protocol"
            />
            <Column field="concentration" header="Inhibitor C (&micro;M)" />
            <Column field="noOfCompoundsScreened" header="No. of Compounds" />
            <Column
              field="scientist"
              header="Scientist"
              style={{ wordWrap: "break-word" }}
            />
            <Column
              field="startDate"
              header="Start Date"
              body={StartDateTemplate}
            />
            <Column field="endDate" header="End Date" body={EndDateTemplate} />
            <Column field="unverifiedHitCount" header="Hit Count" />
          </DataTable>
        </div>
      </div>
    );
  }

  return <Loading />;
};

export default observer(ScreenSequence);
