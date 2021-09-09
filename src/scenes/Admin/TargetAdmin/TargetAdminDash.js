import React, { useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./TargetAdminDash.css";
import { observer } from "mobx-react-lite";
import Loading from "../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";

const TargetAdminDash = () => {
  const rootStore = useContext(RootStoreContext);
  const { fetchTargetList, displayLoading, targets } = rootStore.targetStore;

  useEffect(() => {
    console.log("TargetSearch: fetchTargetList()");
    fetchTargetList();
  }, [fetchTargetList]); // eslint-disable-line react-hooks/exhaustive-deps

  const dt = useRef(null);

  const AccessionNumberBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <NavLink to={"/admin/target/" + rowData.id}>
          {rowData.accessionNumber}
        </NavLink>
      </React.Fragment>
    );
  };

  const GeneNameBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.geneName}</React.Fragment>;
  };

  const ScoreBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.score}</React.Fragment>;
  };

  const HTSFeasibilityBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.htsFeasibility}</React.Fragment>;
  };

  const SBDFeasibilityBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.sbdFeasibility}</React.Fragment>;
  };

  const ProgressibilityBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.progressibility}</React.Fragment>;
  };

  const SafetyBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.safety}</React.Fragment>;
  };

  /* Table Header  */
  const header = (
    <div className="table-header">
      <span className="heading">H37Rv Targets</span>
      {/* <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search"
        />
      </span> */}
    </div>
  );

  if (displayLoading) {
    return <Loading />;
  }

  return (
    <div className="target-admin-list">
      <br />
      <div>
        <DataTable
          ref={dt}
          value={targets}
          paginator
          rows={10}
          header={header}
          className="p-admin"
          //globalFilter={globalFilter}
          emptyMessage="No genes found."
        >
          <Column
            field="accessionNumber"
            header="Accession Number"
            body={AccessionNumberBodyTemplate}
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by A.Number"
            className="narrow-column"
          />

          <Column
            field="geneName"
            header="Protein Name"
            body={GeneNameBodyTemplate}
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by Protein Name"
            className="narrow-column"
          />

          <Column field="Score" header="Score" body={ScoreBodyTemplate} />

          <Column
            field="htsfeasibility"
            header="HTS Feasibility"
            body={HTSFeasibilityBodyTemplate}
          />

          <Column
            field="sbdfeasibility"
            header="SBD Feasibility"
            body={SBDFeasibilityBodyTemplate}
          />

          <Column
            field="progressibility"
            header="Progressibility"
            body={ProgressibilityBodyTemplate}
          />

          <Column field="safety" header="Safety" body={SafetyBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
};
export default observer(TargetAdminDash);
