import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { MultiSelect } from "primereact/multiselect";
import { SelectButton } from "primereact/selectbutton";
import { Tag } from "primereact/tag";
import React, { useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FDate from "../../../app/common/FDate/FDate";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import StageTag from "../../../app/common/StageTag/StageTag";
import Loading from "../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { appColors } from "../../../colors";
import "./ProjectListDataTable.css";

const Projects = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadingProjects, fetchProjects, projectRegistry, projects } =
    rootStore.projectStore;
  const navigate = useNavigate();

  /* Local State Management */

  useEffect(() => {
    if (projectRegistry.size === 0) {
      fetchProjects();
    }
  }, [fetchProjects, projectRegistry]); // eslint-disable-line react-hooks/exhaustive-deps

  /* local variables */

  const dt = useRef(null);

  /* STAGE FILTER */
  const stages = ["H2L", "LO", "SP", "IND", "P1"];

  const stageItemTemplate = (option) => {
    return <StageTag stage={option} />;
  };

  const stageFilter = (options) => (
    <MultiSelect
      value={options.value}
      options={stages}
      onChange={(e) => options.filterApplyCallback(e.value)}
      itemTemplate={stageItemTemplate}
      placeholder="Select a Stage"
      className="p-column-filter"
    />
  );
  /* END STAGE FILTER */

  /* STATUS FILTER */
  const statuses = ["Active", "Terminated"];

  const statusFilter = (options) => (
    <SelectButton
      value={options.value}
      options={statuses}
      onChange={(e) => options.filterApplyCallback(e.value)}
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

        <NavLink to={"./" + rowData.id}>{rowData.id.substring(0, 8)}</NavLink>
      </React.Fragment>
    );
  };

  const ProjectNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Project Name</span>
        <b>
          <NavLink to={"./" + rowData.id}>{rowData.projectName}</NavLink>
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
    let inputDate = new Date(rowData.haStart).setHours(0, 0, 0, 0);
    let stageDate = rowData.h2LStart;

    if (rowData.h2LEnabled) {
      inputDate = new Date(rowData.h2LStart).setHours(0, 0, 0, 0);
      stageDate = rowData.h2LStart;
    }
    if (rowData.loEnabled) {
      inputDate = new Date(rowData.loStart).setHours(0, 0, 0, 0);
      stageDate = rowData.loStart;
    }
    if (rowData.spEnabled) {
      inputDate = new Date(rowData.spStart).setHours(0, 0, 0, 0);
      stageDate = rowData.spStart;
    }
    if (rowData.indEnabled) {
      inputDate = new Date(rowData.indStart).setHours(0, 0, 0, 0);
      stageDate = rowData.indStart;
    }
    if (rowData.clinicalP1Enabled) {
      inputDate = new Date(rowData.clinicalP1Start).setHours(0, 0, 0, 0);
      stageDate = rowData.clinicalP1Start;
    }
    let todaysDate = new Date().setHours(0, 0, 0, 0);

    if (rowData.Status === "Active" && inputDate < todaysDate) {
      return (
        <React.Fragment>
          <span className="p-column-title">Date</span>
          <FDate
            className="p-column-title"
            timestamp={stageDate}
            color={"#FFECB3"}
          />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <span className="p-column-title">Date</span>
        <FDate
          className="p-column-title"
          timestamp={stageDate}
          color={"#000000"}
        />
      </React.Fragment>
    );
  };

  const StageBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Current Stage</span>
        <Tag
          className={`table-stage-${rowData.currentStage}`}
          value={rowData.currentStage}
        />
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
            icon="icon icon-common icon-briefcase"
            heading="Project"
            color={appColors.sectionHeadingBg.project}
          />
        </div>
        <div className="flex w-full gap-2 mb-2 justify-content-end flex-wrap">
          <Button
            label="Create New"
            icon="icon icon-common icon-plus"
            className="p-button-secondary"
            style={{ width: "20rem" }}
            onClick={() => navigate("/pm/project/new")}
          />
        </div>
        <div className="flex w-full">
          <DataTable
            ref={dt}
            value={projects()}
            paginator
            rows={10}
            // header={header}
            className="w-full datatable-project-list"
            //globalFilter={globalFilter}
            emptyMessage="No projects found."
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
              body={ProjectNameBodyTemplate}
              filter
              filterMatchMode="contains"
              filterPlaceholder="Filter by Project"
              className="narrow-column"
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

            <Column
              field="Date"
              header="Date"
              body={DateBodyTemplate}
              style={{ width: "100px" }}
              sortable
            />

            <Column
              field="currentStage"
              header="Current Stage"
              body={StageBodyTemplate}
              filter
              filterField="currentStage"
              filterElement={stageFilter}
              showFilterMenu={false}
              filterMatchMode="in"
            />
          </DataTable>
        </div>
        <div className="card"></div>
      </div>
    );
  }
  return <Loading />;
};

export default observer(Projects);
