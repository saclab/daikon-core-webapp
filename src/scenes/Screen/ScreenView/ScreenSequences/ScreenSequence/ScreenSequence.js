import React, { useState, useEffect, useRef, useContext } from "react";
import { observer } from "mobx-react-lite";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { OverlayPanel } from "primereact/overlaypanel";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import Loading from "../../../../../app/layout/Loading/Loading";
import ScreenSequenceAddForm from "./ScreenSequenceAddForm/ScreenSequenceAddForm";
import PleaseWait from "../../../../../app/common/PleaseWait/PleaseWait";
import FDate from "../../../../../app/common/FDate/FDate";

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
      console.log("fetching screen : " + screenId);
    fetchScreen(screenId);
  }, [selectedScreen, fetchScreen, screenId]);

  console.log("====SCREEN SEQUENCE");

  if (loadingFetchScreen || selectedScreen === null) {
    return <PleaseWait />;
  }

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  }

  const tableHeader = (
    <div className="p-d-flex p-ai-center">
      <Button
        type="button"
        icon="icon icon-common icon-plus-circle"
        label="New"
        className="p-button-text"
        style={{ height: "30px", marginRight: "5px" }}
        onClick={() => setDisplayAddDialog(true)}
      />
      <Button
        type="button"
        icon="icon icon-fileformats icon-CSV"
        label="Export"
        className="p-button-text"
        style={{ height: "30px", marginRight: "5px" }}
        onClick={() => exportCSV(false)}
      />
    </div>
  );

  if (!loadingFetchScreen && selectedScreen) {
    console.log("====SCREEN SEQUENCE + SELECTED SCREEN");

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
          <pre style={{ maxWidth: "450px", overflow: "auto" }}>
            {selectedProtocol}
          </pre>
        </OverlayPanel>
        <Sidebar
          visible={displayAddDialog}
          position="right"
          // style={{ width: "50%", overflowX: "auto" }}
          blockScroll={true}
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
            <Column
              field="library"
              header="Library" />

            <Column
              field={"protocol"}
              body={protocolBodyTemplate}
              header="Protocol" />
            <Column
              field="concentration"
              header="Inhibitor Concentration" />
            <Column
              field="noOfCompoundsScreened"
              header="No of compounds screened" />
            <Column
              field="scientist"
              header="Scientist"
              style={{ wordWrap: "break-word" }} />
            <Column
              field="startDate"
              header="Start Date"
              body={StartDateTemplate} />
            <Column
              field="endDate"
              header="End Date"
              body={EndDateTemplate} />
            <Column
              field="unverifiedHitCount"
              header="Hit Count" />
          </DataTable>
        </div>
      </div>
    );
  }

  return <Loading />;
};

export default observer(ScreenSequence);
