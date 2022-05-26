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
import { MultiSelect } from "primereact/multiselect";
import FDate from "../../../app/common/FDate/FDate";


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
  const [selectedStatus, setSelectedStatus] = useState(null);
  const statuses = ["Active", "Terminated"];

  const onStatusChange = (e) => {
    console.log(e.value);
    dt.current.filter(e.value, "status", "equals");
    setSelectedStatus(e.value);
  };

  const statusFilter = (
    <SelectButton
      value={selectedStatus}
      options={statuses}
      onChange={onStatusChange}
      itemTemplate={stageItemTemplate}
      className="p-column-filter"
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
          <NavLink to={"/fha/" + rowData.id}>
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
      <div className="datatable-portfolio-dash">
        <SectionHeading
          icon="icon icon-conceptual icon-chemical"
          heading="FHA"
          color={appColors.sectionHeadingBg.fha}
        />
        <div className="card">
          <DataTable
            ref={dt}
            value={filterFhaProjects()}
            paginator
            rows={10}
            // header={header}
            className="p-datatable-targets"
            //globalFilter={globalFilter}
            emptyMessage="No FHAs found."
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
              field="ProjectName"
              header="Project Name"
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
              field="PrimaryOrganization"
              header="Primary Organization"
              body={PrimaryOrganizationBodyTemplate}
            />

            <Column
              field="status"
              header="Status"
              body={StatusBodyTemplate}
              filter
              filterElement={statusFilter}
              style={{ width: "250px" }}
            />

            <Column field="Date" header="FHA Date" body={DateBodyTemplate} />
          </DataTable>
        </div>
      </div>
    );
  }

  return <Loading />;
};

export default observer(FHADash);
