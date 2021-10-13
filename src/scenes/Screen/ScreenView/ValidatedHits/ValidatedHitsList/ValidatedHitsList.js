import React, { useState, useRef, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import Loading from "../../../../../app/layout/Loading/Loading";
import Vote from "../../../../../app/common/Vote/Vote";
import SmilesView from "../../../../../app/common/SmilesView/SmilesView";

const ValidatedHitsList = ({screenId}) => {
  const dt = useRef(null);
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { displayLoading, fetchScreen, selectedScreen } = rootStore.screenStore;
  useEffect(() => {
    fetchScreen(screenId);
  }, [fetchScreen]);

  if (displayLoading || selectedScreen === null) {
    return <Loading />;
  }

  if (!displayLoading && selectedScreen) {
    console.log(selectedScreen);
  }


   /* Table Body Templates */


   const LibraryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.library}
      </React.Fragment>
    );
  };

  const CompoundIdBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.compoundId}
      </React.Fragment>
    );
  };

  const StructureBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div style={{ minWidth: "350px", marginRight: "50px" }}>
          <SmilesView smiles={rowData.structure} />
        </div>
      </React.Fragment>
    );
  };

  const EnzymeActivityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.enzymeActivity}
      </React.Fragment>
    );
  };

  const MethodBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.method}
      </React.Fragment>
    );
  };

  const MICBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.mic}
      </React.Fragment>
    );
  };

  const ClusterBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.clusterGroup}
      </React.Fragment>
    );
  };

  const VoteBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Vote id={rowData.id} voteData={rowData.Vote} />
      </React.Fragment>
    );
  };






  return (
    <div className="datatable-screen-table">
      <div className="card">
        <DataTable
          ref={dt}
          value={selectedScreen.validatedHits}
          paginator
          rows={50}
          //header={header}
          className="p-datatable-screen-table"
          //globalFilter={globalFilter}
          emptyMessage="No hits found."
          resizableColumns
          columnResizeMode="fit"
          showGridlines
        >
          
          <Column
            field="Library"
            header="Library"
            body={LibraryBodyTemplate}
            style={{ width: "12%" }}
          />
          <Column
            field="CompoundId"
            header="Compound Id"
            body={CompoundIdBodyTemplate}
            style={{ width: "12%" }}
          />

          <Column
            field="EnzymeActivity"
            header="Enzyme Activity (IC50)"
            body={EnzymeActivityBodyTemplate}
            style={{ width: "7%" }}
          />
          <Column
            field="Method"
            header="Method"
            body={MethodBodyTemplate}
            style={{ width: "12%" }}
          />
          <Column
            field="MIC"
            header="MIC"
            body={MICBodyTemplate}
            style={{ width: "5%" }}
          />
          <Column
            field="Cluster"
            header="Cluster"
            body={ClusterBodyTemplate}
            style={{ width: "100px" }}
          />
          <Column
            field="Structure"
            header="Structure"
            body={StructureBodyTemplate}
            style={{ minWidth: "250px" }}
          />
          <Column
            field="Vote"
            header="Vote"
            body={VoteBodyTemplate}
            style={{ minWidth: "250px" }}
          />
        </DataTable>
      </div>
    </div>
  );
};


export default observer(ValidatedHitsList);
