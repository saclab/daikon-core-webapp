import React, { useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./TargetDashDataTable.css";
import Loading from "../../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";


const TargetDashTable = () => {


  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { fetchTargetList, displayLoading, targets } = rootStore.targetStore;

  /* Local State Management */

  useEffect(() => {
    console.log("TargetSearch: fetchTargetList()");
    fetchTargetList();
  }, [fetchTargetList]); // eslint-disable-line react-hooks/exhaustive-deps

  /* local variables */

  const dt = useRef(null);

  /* Table Body Templates */

  const AccessionNumberBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Accession Number</span>
        <NavLink to={"/target/" + rowData.id}>
          {rowData.AccessionNumber}
        </NavLink>
      </React.Fragment>
    );
  };

  const GeneNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Gene Name</span>
        {rowData.GeneName}
      </React.Fragment>
    );
  };

  const ScoreBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Score</span>
        {rowData.Score}
      </React.Fragment>
    );
  };

  const HTSFeasibilityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">HTS Feasibility</span>
        {rowData.HTSFeasibility}
      </React.Fragment>
    );
  };

  const SBDFeasibilityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">SBD Feasibility</span>
        {rowData.SBDFeasibility}
      </React.Fragment>
    );
  };

  const ProgressibilityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Progressibility</span>
        {rowData.Progressibility}
      </React.Fragment>
    );
  };

  const SafetyBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Safety</span>
        {rowData.Safety}
      </React.Fragment>
    );
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

  /** Loading Overlay */
  if (displayLoading) {
    return <Loading />;
  }

  return (
    <div className="datatable-targets">
      <br />
      <div className="card">
        <DataTable
          ref={dt}
          value={targets}
          paginator
          rows={10}
          header={header}
          className="p-datatable-targets"
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
export default observer(TargetDashTable);
