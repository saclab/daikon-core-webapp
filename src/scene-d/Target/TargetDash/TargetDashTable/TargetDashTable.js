import React, { useRef } from "react";
// import _ from "lodash";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./TargetDashDataTable.css";
import { observer } from "mobx-react-lite";

const TargetDashTable = ({ targets }) => {
  const dt = useRef(null);

  /* Table Body Templates */

  const TargetNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Target Name</span>
        <NavLink to={"./" + rowData.id}>{rowData.name}</NavLink>
      </React.Fragment>
    );
  };

  const AssociatedGenesBodyTemplate = (rowData) => {
    //console.log("AssociatedGenesBodyTemplate");
    //console.log(rowData.targetGenesAccesionNumbers);
    if (rowData.targetGenesAccesionNumbers.length > 2) {
      return (
        <React.Fragment>
          <span className="p-column-title">Gene Name</span>
          {rowData.targetGenesAccesionNumbers[0]},{" "}
          {rowData.targetGenesAccesionNumbers[1]} and{" "}
          {rowData.targetGenesAccesionNumbers.length - 2} others
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <span className="p-column-title">Gene Name</span>
          {rowData.targetGenesAccesionNumbers.join(", ")}
        </React.Fragment>
      );
    }
  };

  const ImpactScoreBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Biological Impact Score</span>
        {rowData.impactScore}
      </React.Fragment>
    );
  };

  const LikeScoreBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Likelihood Score</span>
        {rowData.likeScore}
      </React.Fragment>
    );
  };

  const BucketScoreBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Bucket score</span>
        {rowData.bucket ? rowData.bucket : "n.a"}
      </React.Fragment>
    );
  };

  /* Table Header  */
  // const header = (
  //   <div className="table-header">
  //     <span className="heading">H37Rv Targets</span>
  //     {/* <span className="p-input-icon-left">
  //       <i className="pi pi-search" />
  //       <InputText
  //         type="search"
  //         onInput={(e) => setGlobalFilter(e.target.value)}
  //         placeholder="Search"
  //       />
  //     </span> */}
  //   </div>
  // );

  return (
    <div className="datatable-targets">
      <br />
      <div className="card">
        <DataTable
          ref={dt}
          value={targets}
          paginator
          rows={15}
          // header={header}
          className="datatable-targets"
          //globalFilter={globalFilter}
          emptyMessage="No Targets found."
        >
          <Column
            field="name"
            header="Target Name"
            body={TargetNameBodyTemplate}
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by Target"
            className="narrow-column"
            sortable
          />

          <Column
            field="associatedGenes"
            filterField="targetGenesAccesionNumbers"
            header="Associated Genes"
            body={AssociatedGenesBodyTemplate}
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by Accession No."
            className="narrow-column"
          />

          <Column
            field="impactScore"
            header="Biological Impact Score"
            body={ImpactScoreBodyTemplate}
            sortable
          />
          <Column
            field="likeScore"
            header="Likelihood Score"
            body={LikeScoreBodyTemplate}
            sortable
          />
          <Column
            field="bucket"
            header="Bucket Score"
            body={BucketScoreBodyTemplate}
            sortable
          />
        </DataTable>
      </div>
    </div>
  );
};
export default observer(TargetDashTable);
