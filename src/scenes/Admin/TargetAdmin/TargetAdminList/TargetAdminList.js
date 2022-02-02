import React, { useEffect, useRef, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./TargetAdminList.css";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Loading from "../../../../app/layout/Loading/Loading";

const TargetAdminList = () => {
  const rootStore = useContext(RootStoreContext);
  const { fetchTargetList, displayLoading, targets } = rootStore.targetStore;

  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    console.log("TargetSearch: fetchTargetList()");
    fetchTargetList();
  }, [fetchTargetList]); // eslint-disable-line react-hooks/exhaustive-deps

  const dt = useRef(null);

  const TargetNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <NavLink to={"/admin/target/" + rowData.id}>{rowData.name}</NavLink>
      </React.Fragment>
    );
  };

  const AssociatedGenesBodyTemplate = (rowData) => {
    return (
      <div
        className="surface-overlay border-round border-1 p-3 mt-3 white-space-nowrap overflow-hidden text-overflow-ellipsis"
        style={{ width: "2px" }}
      >
        {rowData.targetGenesAccesionNumbers.join()}
      </div>
    );
  };

  const ImpactScoreBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.impactScore}</React.Fragment>;
  };

  const LikeScoreBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.likeScore}</React.Fragment>;
  };

  const BucketScoreBodyTemplate = (rowData) => {
    return (
      <React.Fragment>{rowData.bucket ? rowData.bucket : "n.a"}</React.Fragment>
    );
  };

  // const HTSFeasibilityBodyTemplate = (rowData) => {
  //   return <React.Fragment>{rowData.htsFeasibility}</React.Fragment>;
  // };

  // const SBDFeasibilityBodyTemplate = (rowData) => {
  //   return <React.Fragment>{rowData.sbdFeasibility}</React.Fragment>;
  // };

  // const ProgressibilityBodyTemplate = (rowData) => {
  //   return <React.Fragment>{rowData.progressibility}</React.Fragment>;
  // };

  // const SafetyBodyTemplate = (rowData) => {
  //   return <React.Fragment>{rowData.safety}</React.Fragment>;
  // };

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
          emptyMessage="No targets found."
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
            header="Associated Genes"
            body={AssociatedGenesBodyTemplate}
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by Gene"
            className="narrow-column"
          />

          <Column
            field="impactScore"
            header="Biological Impact Score"
            body={ImpactScoreBodyTemplate}
          />
          <Column
            field="likeScore"
            header="Likelihood Score"
            body={LikeScoreBodyTemplate}
          />
          <Column
            field="bucket"
            header="Bucket Score"
            body={BucketScoreBodyTemplate}
          />

          {/* <Column
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

          <Column field="safety" header="Safety" body={SafetyBodyTemplate} /> */}
        </DataTable>
      </div>
    </div>
  );
};
export default observer(TargetAdminList);
