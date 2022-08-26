import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Tag } from "primereact/tag";
import { SelectButton } from "primereact/selectbutton";
import FDate from "../../../app/common/FDate/FDate";
import './FHADashDataTable.css'


// import "./PortfolioDashDataTable.css";
import { appColors } from '../../../colors';

const FHADash = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingProjects, fetchProjects, projectRegistry } =
    rootStore.projectStore;
  const { filterFhaProjects } = rootStore.fhaStore;

  /* Local State Management */

  useEffect(() => {
    if (projectRegistry.size === 0) {
      fetchProjects();
    }
  }, [fetchProjects, projectRegistry]); // eslint-disable-line react-hooks/exhaustive-deps


  /* local variables */

  const dt = useRef(null);

  const stageItemTemplate = (option) => {
    return (
      <span className={`customer-badge status-${option}`}>{option}</span>
    );
  };

  /* STATUS FILTER */
  const statuses = ["Active", "Terminated"];



  const statusFilter = (options) => (
    <SelectButton
      value={options.value}
      options={statuses}
      onChange={(e) => options.filterApplyCallback(e.value)}
      itemTemplate={stageItemTemplate}
      className="p-column-filter p-button-sm"

    />
  );
  /* END STATUS FILTER */

  const TargetBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Target</span>
        {rowData.targetName}
      </React.Fragment>
    );
  };

  const ProjectNoBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Project Id</span>
        {rowData.id.substring(0, 8)}
      </React.Fragment>
    );
  };

  const ProjectNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Project Name</span>
        <b>
          <NavLink to={"./" + rowData.id}>
            {rowData.projectName}
          </NavLink>
        </b>
      </React.Fragment>
    );
  };

  const PrimaryOrganizationBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Primary Organization</span>
        {rowData.primaryOrg.alias}
      </React.Fragment>
    );
  };

  const StatusBodyTemplate = (rowData) => {
    if (rowData.status === "Active") {
      return (
        <React.Fragment>
          <span className="p-column-title">Status</span>
          <Tag className="table-status-active" value="Active" />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <span className="p-column-title">Status</span>
        <Tag className="table-status-inactive" value="Terminated" />
      </React.Fragment>
    );
  };

  const DateBodyTemplate = (rowData) => {
    let inputDate = new Date(rowData.fhaStart).setHours(0, 0, 0, 0);
    let todaysDate = new Date().setHours(0, 0, 0, 0);

    if (rowData.Status === "Active" && inputDate < todaysDate) {
      return (
        <React.Fragment>
          <span className="p-column-title">Date</span>
          <FDate className="p-column-title" timestamp={rowData.fhaStart} color={"#FFECB3"} />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <span className="p-column-title">Date</span>
        <FDate className="p-column-title" timestamp={rowData.fhaStart} color={"#000000"} />
      </React.Fragment>
    );
  };

  /** Loading Overlay */
  if (loadingProjects) {
    return <Loading />;
  }

  if (!loadingProjects) {

    return (
      <div className="flex flex-column w-full fadein animation-duration-500">
        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-conceptual icon-chemical"
            heading="FHA"
            color={appColors.sectionHeadingBg.fha}
          />
        </div>
        <div className="flex w-full">
          <div className="card w-full">
            <DataTable
              ref={dt}
              value={filterFhaProjects()}
              paginator
              rows={10}
              // header={header}
              className="datatable-fha-dash"
              //globalFilter={globalFilter}
              emptyMessage="No FHAs found."
              filterDisplay="row"
            >
              <Column
                field="id"
                header="Project Id"
                body={ProjectNoBodyTemplate}
                filter
                filterMatchMode="contains"
                filterPlaceholder="Search by ProjectNo"
                className="narrow-column"

              />

              <Column
                field="projectName"
                header="Project Name"
                filter
                filterMatchMode="contains"
                filterPlaceholder="Search by ProjectName"
                body={ProjectNameBodyTemplate}
              />

              <Column
                field="targetName"
                header="Target"
                body={TargetBodyTemplate}
                filter
                filterMatchMode="contains"
                filterPlaceholder="Filter by Target"
                className="narrow-column"
              />

              <Column
                field="primaryOrg.alias"
                header="Primary Organization"
                filter
                filterMatchMode="contains"
                body={PrimaryOrganizationBodyTemplate}
              />

              <Column
                field="status"
                header="Status"
                body={StatusBodyTemplate}
                filter
                filterElement={statusFilter}
                style={{ width: "250px" }}
                showFilterMenu={false}
              />

              <Column field="Date" header="FHA Date" body={DateBodyTemplate} />
            </DataTable>
          </div>
        </div>

      </div>
    );
  }

  return <Loading />;
};

export default observer(FHADash);
