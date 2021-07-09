import React, { useEffect, useRef, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./HitsTable.css";
import SmilesView from "../../../../app/common/SmilesView/SmilesView";
import Vote from "../../../../app/common/Vote/Vote";

const HitsTable = ({ screens }) => {
  /* Local State Management */
  const [displayMolViewContainer, setDisplayMolViewContainer] = useState(false);

  /* local variables */

  let data = [
    {
      id: 9000,
      ScreenId: 7000,
      ScreenName: "Rv3800c-1",
      AccessionNumber: "Rv3800c",
      GeneName: "Pks13",
      Library: "Sacchettini",
      CompoundId: "SACC-0128319",
      Structure:
        "OC1=C(C(C2=CC=CN=C2)C2=C(O)OC3=C(C=CC=C3)C2=O)C(=O)C2=C(O1)C=CC=C2",
      EnzymeActivity: "89.9",
      Method: "method name",
      MIC: "5.6",
      Vote: 2,
    },

    {
      id: 9001,
      ScreenId: 7000,
      ScreenName: "Rv3800c-1",
      AccessionNumber: "Rv3800c",
      GeneName: "Pks13",
      Library: "Sacchettini",
      CompoundId: "SACC-0098704",
      Structure: "CS(C)=O",
      EnzymeActivity: "2.88",
      Method: "method name",
      MIC: "2.4",
      Vote: 2,
    },
  ];

  const dt = useRef(null);

  /* Table Body Templates */

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

  const CompoundIdBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Compound Id</span>
        {rowData.CompoundId}
      </React.Fragment>
    );
  };

  const StructureBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Structure</span>
        <div style={{ minWidth: "350px", marginRight: "50px" }}>
          <SmilesView smiles={rowData.Structure} />
        </div>
      </React.Fragment>
    );
  };

  const EnzymeActivityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Enzyme Activity (IC50)</span>
        {rowData.EnzymeActivity}
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

  const MICBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">MIC</span>
        {rowData.MIC}
      </React.Fragment>
    );
  };

  const VoteBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Vote</span>
        <Vote />
      </React.Fragment>
    );
  };

  /* Table Header  */
  const header = (
    <div className="table-header">
      <span className="heading">Hits of Rv0667-1</span>
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

  return (
    <div className="datatable-screen-table">
     
      <div className="card">
        <DataTable
          ref={dt}
          value={data}
          paginator
          rows={10}
          header={header}
          className="p-datatable-screen-table"
          //globalFilter={globalFilter}
          emptyMessage="No genes found."
          resizableColumns
          columnResizeMode="fit"
          showGridlines
        >
          <Column
            field="GeneName"
            header="Gene Name"
            body={GeneNameBodyTemplate}
            style={{ width: "9%" }}
          />

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
            field="Structure"
            header="Structure"
            body={StructureBodyTemplate}
            style={{ minWidth: "250px"}}
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

export default HitsTable;
