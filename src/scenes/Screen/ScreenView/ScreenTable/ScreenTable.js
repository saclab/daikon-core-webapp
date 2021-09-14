import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./ScreenTable.css";

const ScreenStatus = ({ screens }) => {
  console.log(Array.from(screens));
  /* Local State Management */

  /* local variables */

  const dt = useRef(null);

  /* Table Body Templates */

  const ScreenNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Screen Name</span>
        {rowData.ScreenName}
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

  const LibraryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Library</span>
        {rowData.Library}
      </React.Fragment>
    );
  };

  const ScientistNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Scientist</span>
        {rowData.ScientistName}
      </React.Fragment>
    );
  };

  const StartDateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Start Date</span>
        {rowData.StartDate}
      </React.Fragment>
    );
  };

  const EndDateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">End Date</span>
        {rowData.EndDate}
      </React.Fragment>
    );
  };

  const MethodBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Method</span>
        {rowData.Method}
      </React.Fragment>
    );
  };

  const ProtocolBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Protocol</span>
        {rowData.Protocol}
      </React.Fragment>
    );
  };

  const HitsBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Hits</span>
        <NavLink to={"/screen/" + rowData.TargetId + "/hits/" + rowData.id}>
          {rowData.Hits}
        </NavLink>
      </React.Fragment>
    );
  };

  const StatusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Status</span>
        {rowData.Status}
      </React.Fragment>
    );
  };

  const CommentsBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Comments</span>
        {rowData.Comments}
      </React.Fragment>
    );
  };

  const hitsHeader = (
    <React.Fragment>
      <i class="icon icon-common icon-fullscreen"></i> &nbsp; Hits
    </React.Fragment>
  );

  /* Table Header  */
  // const header = (
  //   <div className="table-header">
  //     <span className="heading">Screens</span>
  //     {/* <span className="p-input-icon-left">
  //         <i className="pi pi-search" />
  //         <InputText
  //           type="search"
  //           onInput={(e) => setGlobalFilter(e.target.value)}
  //           placeholder="Search"
  //         />
  //       </span> */}
  //   </div>
  // );

  return (
    <div className="datatable-screen-table">
      <br />
      <div className="card">
        <DataTable
          ref={dt}
          value={screens}
          paginator
          rows={10}
          // header={header}
          className="p-datatable-screen-table"
          //globalFilter={globalFilter}
          emptyMessage="No genes found."
        >
          <Column
            field="ScreenName"
            header="Screen Name"
            body={ScreenNameBodyTemplate}
          />

          <Column
            field="GeneName"
            header="Gene Name"
            body={GeneNameBodyTemplate}
          />
          <Column field="Status" header="Status" body={StatusBodyTemplate} />
          <Column field="Library" header="Library" body={LibraryBodyTemplate} />
          <Column
            field="ScientistName"
            header="Scientist"
            body={ScientistNameBodyTemplate}
          />
          <Column
            field="StartDate"
            header="Start Date"
            body={StartDateBodyTemplate}
          />
          <Column
            field="EndDate"
            header="End Date"
            body={EndDateBodyTemplate}
          />
          <Column field="Method" header="Method" body={MethodBodyTemplate} />
          <Column
            field="Protocol"
            header="Protocol"
            body={ProtocolBodyTemplate}
          />
          <Column field="Hits" header={hitsHeader} body={HitsBodyTemplate} />
          <Column
            field="Comments"
            header="Comments"
            body={CommentsBodyTemplate}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default ScreenStatus;
