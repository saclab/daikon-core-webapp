import { observer } from "mobx-react-lite";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import { RootStoreContext } from "../../../app/stores/rootStore";

const CompoundDash = () => {
  const rootStore = useContext(RootStoreContext);
  const { displayLoading, fetchCompounds, compounds, compoundRegistry } =
    rootStore.compoundStore;

  useEffect(() => {
    fetchCompounds();
  }, [fetchCompounds]);

  /* local variables */

  const dt = useRef(null);

  if (!displayLoading) {
    const GuidBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">GUID</span>
          <NavLink to={"/tools/compounds/" + rowData.id}>{rowData.id}</NavLink>
        </React.Fragment>
      );
    };

    return (
      <div className="flex flex-column w-full fadein animation-duration-500">
        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-common icon-math"
            heading="All Compounds"
            //color={appColors.sectionHeadingBg.portfolio}
          />
        </div>
        <div className="flex w-full">
          <DataTable
            ref={dt}
            value={compounds}
            paginator
            rows={20}
            // header={header}
            className="w-full datatable-portfolio-dash"
            //globalFilter={globalFilter}
            emptyMessage="No compounds found."
            filterDisplay="row"
          >
            <Column
              field="id"
              header="Guid"
              body={GuidBodyTemplate}
              filter
              filterMatchMode="contains"
              filterPlaceholder="Search by Guid"
              className="narrow-column"
            />

            <Column
              field="externalCompoundIds"
              header="Compound Id"
              //body={ProjectNameBodyTemplate}
              filter
              filterMatchMode="contains"
              filterPlaceholder="Filter by Compound ID"
            />

            <Column
              field="smile"
              header="SMILES"
              //body={TargetBodyTemplate}
              // filter
              // filterMatchMode="contains"
              // filterPlaceholder="Filter by Target"
            />
          </DataTable>
        </div>
        <div className="card"></div>
      </div>
    );
  }

  if (displayLoading) return <div>Loading...</div>;

  return <div>CompoundDash</div>;
};

export default observer(CompoundDash);
