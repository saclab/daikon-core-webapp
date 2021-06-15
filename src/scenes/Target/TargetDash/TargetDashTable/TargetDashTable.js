import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import "./TargetDashDataTable.css";
import Loading from "../../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import axios from "axios";


const TargetDashTable = () => {
  const [targetDashTable, setTargetDashTable] = useState(null);

  useEffect(() => {
    axios.get("/data/targets/targets.json").then((resp) => {
      setTargetDashTable(resp.data.data);
    });
  }, []);

// const TargetSearch = () => {
//   /* MobX Store */
//   const rootStore = useContext(RootStoreContext);
//   const {fetchGeneList, displayLoading , genes } = rootStore.geneStore; 

//   /* Local State Management */

//   useEffect(() => {
//     console.log("TargetSearch: fetchGeneList()");
//     fetchGeneList();
//   }, [fetchGeneList]); // eslint-disable-line react-hooks/exhaustive-deps


//   /* local variables */

  const dt = useRef(null);
  

  /* Table Body Templates */

  const AccessionNumberBodyTemplate = (targetDashTable) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Accession Number</span>
        {targetDashTable.AccessionNumber}
        </React.Fragment>
    );
  };

  const GeneNameBodyTemplate = (targetDashTable) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Gene Name</span>
        {targetDashTable.GeneName}
      </React.Fragment>
    );
  };

  const ScoreBodyTemplate = (targetDashTable) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Score</span>
        {targetDashTable.Score}
      </React.Fragment>
    );
  };

  const HTSFeasibilityBodyTemplate = (targetDashTable) => {
    return (
      <React.Fragment>
        <span className="p-column-title">HTS Feasibility</span>
        {targetDashTable.HTSFeasibility}
      </React.Fragment>
    );
  };

  const SBDFeasibilityBodyTemplate = (targetDashTable) => {
    return (
      <React.Fragment>
        <span className="p-column-title">SBD Feasibility</span>
        {targetDashTable.SBDFeasibility}
      </React.Fragment>
    );
  };

  const ProgressibilityBodyTemplate = (targetDashTable) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Progressibility</span>
        {targetDashTable.Progressibility}
      </React.Fragment>
    );
  };

  const SafetyBodyTemplate = (targetDashTable) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Safety</span>
        {targetDashTable.Safety}
      </React.Fragment>
    );
  };

 

  /* Table Header  */
  const header = (
    <div className="table-header">
      <span className="heading">H37Rv Genes</span>
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
  if (targetDashTable === null) {
    return <Loading />;
  }

  return (
    <div className="datatable-targets">
      <br />
      <div className="card">
      <DataTable
          ref={dt}
          value={targetDashTable}
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
            header="Gene Name"
            body={GeneNameBodyTemplate}
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by Gene Name"
            className="narrow-column"
          />

          <Column
            field="Score"
            header="Score"
            body={ScoreBodyTemplate}
          />

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

          <Column 
          field="safety" 
          header="Safety" 
          body={SafetyBodyTemplate} 
          />

          </DataTable>
        
      </div>
      </div>
  );
};
export default TargetDashTable;
