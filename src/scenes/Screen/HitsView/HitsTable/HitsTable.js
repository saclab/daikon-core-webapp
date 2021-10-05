import React, {  useRef } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./HitsTable.css";
import SmilesView from "../../../../app/common/SmilesView/SmilesView";
import Vote from "../../../../app/common/Vote/Vote";

const HitsTable = ({hits}) => {
  /* Local State Management */
  //const [displayMolViewContainer, setDisplayMolViewContainer] = useState(false);

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
      Vote: {
        votingProps: {
          userVoted: false,
          userVote: "Yes",
          votingAllowed: true,
          modificationAllowed: false,
        },
        votes: [
          {
            yes: 4,
            neutral: 1,
            no: 1,
          },
        ],
      },
    },

    {
      id: 9001,
      ScreenId: 7000,
      ScreenName: "Rv3800c-1",
      AccessionNumber: "Rv3800c",
      GeneName: "Pks13",
      Library: "Sacchettini",
      CompoundId: "SACC-0098704",
      Structure:
        "OC1=C(C(C2=CC=C(O2)C2=CC=C(C=C2)N(=O)=O)C2=C(O)C3=CC=CC=C3OC2=O)C(=O)OC2=CC=CC=C12",
      EnzymeActivity: "2.88",
      Method: "method name",
      MIC: "2.4",
      Vote: {
        votingProps: {
          userVoted: true,
          userVote: "Yes",
          votingAllowed: true,
          modificationAllowed: false,
        },
        votes: [
          {
            yes: 1,
            neutral: 6,
            no: 1,
          },
        ],
      },
    },
    {
      id: 9002,
      ScreenId: 7000,
      ScreenName: "Rv3800c-1",
      AccessionNumber: "Rv3800c",
      GeneName: "Pks13",
      Library: "Sacchettini",
      CompoundId: "SACC-0098708",
      Structure: "OC1=C(C(C2=CN=CS2)C2=C(O)C3=CC=CC=C3OC2=O)C(=O)OC2=CC=CC=C12",
      EnzymeActivity: "2.88",
      Method: "method name",
      MIC: "2.4",
      Vote: {
        votingProps: {
          userVoted: false,
          userVote: "Yes",
          votingAllowed: true,
          modificationAllowed: false,
        },
        votes: [
          {
            yes: 1,
            neutral: 1,
            no: 6,
          },
        ],
      },
    },
    {
      id: 9003,
      ScreenId: 7000,
      ScreenName: "Rv3800c-1",
      AccessionNumber: "Rv3800c",
      GeneName: "Pks13",
      Library: "Sacchettini",
      CompoundId: "SACC-0089649",
      Structure:
        "COC1=CC=C(C=C1CN1CCOCC1)C(C1=C(O)C2=CC=CC=C2OC1=O)C1=C(O)C2=C(OC1=O)C=CC=C2",
      EnzymeActivity: "2.88",
      Method: "method name",
      MIC: "2.4",
      Vote: {
        votingProps: {
          userVoted: false,
          userVote: "Yes",
          votingAllowed: true,
          modificationAllowed: false,
        },
        votes: [
          {
            yes: 0,
            neutral: 0,
            no: 0,
          },
        ],
      },
    },
  ];

  const dt = useRef(null);

  /* Table Body Templates */

  const LibraryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Library</span>
        {rowData.library}
      </React.Fragment>
    );
  };

  const CompoundIdBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Compound Id</span>
        {rowData.compoundId}
      </React.Fragment>
    );
  };

  const StructureBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Structure</span>
        <div style={{ minWidth: "350px", marginRight: "50px" }}>
          <SmilesView smiles={rowData.structure} />
        </div>
      </React.Fragment>
    );
  };

  const EnzymeActivityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Enzyme Activity (IC50)</span>
        {rowData.enzymeActivity}
      </React.Fragment>
    );
  };

  const MethodBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Method</span>
        {rowData.method}
      </React.Fragment>
    );
  };

  const MICBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">MIC</span>
        {rowData.mic}
      </React.Fragment>
    );
  };

  const ClusterBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Cluster</span>
        {rowData.clusterGroup}
      </React.Fragment>
    );
  };

  const VoteBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Vote</span>
        <Vote id={rowData.id} voteData={rowData.Vote} />
      </React.Fragment>
    );
  };

  /* Table Header  */
  // const header = (
  //   <div className="table-header">
  //     <span className="heading">Hits of Rv0667-1</span>
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
      <div className="card">
        <DataTable
          ref={dt}
          value={hits}
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

export default HitsTable;
