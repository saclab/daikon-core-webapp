import { observer } from "mobx-react-lite";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { SelectButton } from "primereact/selectbutton";
import { Tag } from "primereact/tag";
import React, { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import FDate from "../../../app/common/FDate/FDate";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import Loading from "../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import './HADashDataTable.css';


// import "./PortfolioDashDataTable.css";
import { appColors } from '../../../colors';

const HADash = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingProjects, fetchProjects, projectRegistry } =
    rootStore.projectStore;
  const { filterHAProjects } = rootStore.haStore;

  /* Local State Management */

  useEffect(() => {
    if (projectRegistry.size === 0) {
      fetchProjects();
    }
  }, [fetchProjects, projectRegistry]); // eslint-disable-line react-hooks/exhaustive-deps


  /* local variables */

  const dt = useRef(null);
  let todaysDate = new Date().setHours(0, 0, 0, 0);

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
    let inputDate = new Date(rowData.h2LPredictedStart).setHours(0, 0, 0, 0);
    let stageDate = rowData.h2LPredictedStart;

    if (rowData.status === "Terminated") {
      return (
        <React.Fragment>
          <span className="p-column-title">Date</span>
          <FDate className="p-column-title" timestamp={stageDate} color={"#9EA29D"} />
        </React.Fragment>
      );
    }
    if (rowData.h2LEnabled) {
      return (
        <React.Fragment>
          <span className="p-column-title">Date</span>
          <FDate className="p-column-title" timestamp={stageDate} color={"#1D7E00"} />
        </React.Fragment>
      );
    }
    if (rowData.status === "Active" && inputDate < todaysDate) {
      return (
        <React.Fragment>
          <span className="p-column-title">Date</span>
          <FDate className="p-column-title" timestamp={stageDate} color={"#9B8800"} />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <span className="p-column-title">Date</span>
        <FDate className="p-column-title" timestamp={stageDate} color={"#1D7E00"} />
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
            heading="Hit Assessment"
            color={appColors.sectionHeadingBg.ha}
          />
        </div>
        <div className="flex w-full">
          <div className="card w-full">
            <DataTable
              ref={dt}
              value={filterHAProjects()}
              paginator
              rows={20}
              // header={header}
              className="datatable-ha-dash"
              //globalFilter={globalFilter}
              emptyMessage="No HAs found."
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

              <Column field="Date" header="H2L Predictated Start" body={DateBodyTemplate} />
            </DataTable>
          </div>
        </div>

      </div>
    );
  }

  return <Loading />;
};

export default observer(HADash);
