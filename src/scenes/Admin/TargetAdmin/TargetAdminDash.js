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
  const { fetchTargetList, displayLoading, targets } =
    rootStore.targetStoreAdmin;

  useEffect(() => {
    console.log("TargetSearch: fetchTargetList()");
    fetchTargetList();
  }, [fetchTargetList]); // eslint-disable-line react-hooks/exhaustive-deps

  const dt = useRef(null);

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

  if (displayLoading) {
    return <Loading />;
  }

  return (
    <div>
      <DataTable
        ref={dt}
        value={targets}
        paginator
        rows={10}
        // header={header}
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
      </DataTable>
    </div>
  );
};
export default observer(TargetAdminDash);
