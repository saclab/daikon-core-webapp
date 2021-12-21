import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";

import { RootStoreContext } from "../../../../../app/stores/rootStore";
import Loading from "../../../../../app/layout/Loading/Loading";
import ScreenSequenceAddForm from "./ScreenSequenceAddForm/ScreenSequenceAddForm";

const ScreenSequence = ({ screenId }) => {
  const [displayAddDialog, setDisplayAddDialog] = useState(false);

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
    return <h1> Plese wait .. </h1>;
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
      />
    </div>
  );

  if (!loadingFetchScreen && selectedScreen) {
    console.log("====SCREEN SEQUENCE + SELECTED SCREEN");

    return (
      <div>
        <Sidebar
          visible={displayAddDialog}
          position="right"
          // style={{ width: "50%", overflowX: "auto" }}
          blockScroll={true}
          onHide={() => setDisplayAddDialog(false)}
          className="p-md-12"
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
            value={selectedScreen.screenSequences}
            header={tableHeader}
          >
            <Column field="library" header="Library"></Column>
            <Column field="method" header="Method"></Column>
            <Column field="protocol" header="Protocol"></Column>
            <Column field="concentration" header="Concentration"></Column>
            <Column field="noOfCompoundsScreened" header="No of compounds screened"></Column>
            <Column field="scientist" header="Scientist"></Column>
            <Column field="startDate" header="Start Date"></Column>
            <Column field="endDate" header="End Date"></Column>
            <Column field="unverifiedHitCount" header="Hit Count"></Column>
          </DataTable>
        </div>
      </div>
    );
  }

  return <Loading />;
};

export default observer(ScreenSequence);
