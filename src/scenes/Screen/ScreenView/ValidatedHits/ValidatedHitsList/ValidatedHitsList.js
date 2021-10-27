import React, { useState, useRef, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Column } from "primereact/column";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import Loading from "../../../../../app/layout/Loading/Loading";
import Vote from "../../../../../app/common/Vote/Vote";
import SmilesView from "../../../../../app/common/SmilesView/SmilesView";
import ValidatedHitsImporter from "./ValidatedHitsImporter/ValidatedHitsImporter";

const ValidatedHitsList = ({ screenId }) => {
  const dt = useRef(null);
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingFetchScreen, fetchScreen, selectedScreen } =
    rootStore.screenStore;

  const [displayHitsImportSidebar, setDisplayHitsImportSidebar] =
    useState(false);

  console.log("==== VALIDATED HIT LIST");
  useEffect(() => {
    fetchScreen(screenId);
  }, [fetchScreen]);

  if (loadingFetchScreen || selectedScreen === null) {
    return <Loading />;
  }

  if (!loadingFetchScreen && selectedScreen) {
    console.log(selectedScreen);
  }

  /* Table Body Templates */

  const LibraryBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.library}</React.Fragment>;
  };

  const CompoundIdBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData?.compound?.saccId}</React.Fragment>;
  };

  const StructureBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div style={{ minWidth: "350px", marginRight: "50px" }}>
          <SmilesView smiles={rowData?.compound?.smile} />
        </div>
      </React.Fragment>
    );
  };

  const EnzymeActivityBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.iC50}</React.Fragment>;
  };

  const MethodBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.method}</React.Fragment>;
  };

  const MICBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.mic}</React.Fragment>;
  };

  const ClusterBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.clusterGroup}</React.Fragment>;
  };

  const VoteBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Vote id={rowData.id} voteData={rowData.Vote} />
      </React.Fragment>
    );
  };

  const tableHeader = (
    <div className="p-d-flex p-ai-center">
      <Button
        type="button"
        icon="icon icon-common icon-plus-circle"
        label="Import"
        className="p-button-text"
        style={{ height: "30px", marginRight: "5px" }}
        onClick={() => setDisplayHitsImportSidebar(true)}
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

  return (
    <div>
      <div className="datatable-screen-table">
        <div className="card">
          <DataTable
            ref={dt}
            value={selectedScreen.validatedHits}
            paginator
            rows={50}
            header={tableHeader}
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
              header="Cluster Group No"
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
      <Sidebar
        visible={displayHitsImportSidebar}
        position="right"
        
        // style={{ width: "50%", overflowX: "auto" }}
        blockScroll={true}
        onHide={() => setDisplayHitsImportSidebar(false)}
        className="p-sidebar-lg"
      >
        <div className="card">
          <h3>
            <i className="icon icon-common icon-plus-circle" />  Import Validated Hits
          </h3>
          
          <hr />
          <br />
          <ValidatedHitsImporter screenId={selectedScreen.id}/>
          
        </div>
      </Sidebar>
    </div>
  );
};

export default observer(ValidatedHitsList);
