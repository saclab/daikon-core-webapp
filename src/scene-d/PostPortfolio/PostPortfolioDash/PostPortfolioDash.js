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
import { appColors } from '../../../colors';
import "./PostPortfolioDash.css";
import StageTag from '../../../app/common/StageTag/StageTag';


const PostPortfolioDash = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingProjects, fetchProjects, projectRegistry } =
    rootStore.projectStore;

  const { filterPostPortfolioProjects } = rootStore.postPortfolioStore;
  /* Local State Management */

  useEffect(() => {
    if (projectRegistry.size === 0) {
      fetchProjects();
    }
  }, [fetchProjects, projectRegistry]); // eslint-disable-line react-hooks/exhaustive-deps

  /* local variables */

  const dt = useRef(null);

  /* STAGE FILTER */

  const stages = ["IND", "P1"];

  const stageItemTemplate = (option) => {
    return <StageTag stage={option} />;
  };

  const stageFilter = (options) => <MultiSelect
    value={options.value}
    options={stages}
    onChange={(e) => options.filterApplyCallback(e.value)}
    itemTemplate={stageItemTemplate}
    placeholder="Select a Stage"
    className="p-column-filter"
  />
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
        {rowData.geneName}
      </React.Fragment>
    );
  };

  const ProjectNoBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Project Id</span>

        <NavLink to={"./" + rowData.id}>
          {rowData.id.substring(0, 8)}
        </NavLink>
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
    if (rowData.h2LEnabled) inputDate = new Date(rowData.h2LStart).setHours(0, 0, 0, 0);
    if (rowData.loEnabled) inputDate = new Date(rowData.loStart).setHours(0, 0, 0, 0);
    if (rowData.spEnabled) inputDate = new Date(rowData.spStart).setHours(0, 0, 0, 0);
    if (rowData.indEnabled) inputDate = new Date(rowData.indStart).setHours(0, 0, 0, 0);
    if (rowData.clinicalP1Enabled) inputDate = new Date(rowData.clinicalP1Start).setHours(0, 0, 0, 0);

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
            icon="icon icon-common icon-drug"
            heading="Post Portfolio"
            color={appColors.sectionHeadingBg.postPortfolio}
          />
        </div>

        <div className="flex w-full">
          <DataTable
            ref={dt}
            value={filterPostPortfolioProjects()}
            paginator
            rows={10}
            // header={header}
            className="w-full datatable-postportfolio-dash"
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
              field="ProjectName"
              header="Project Name"
              body={ProjectNameBodyTemplate}
            />

            <Column
              field="Target"
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

            <Column field="Date"
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
      </div>
    );
  }
  return <Loading />;
};

export default observer(PostPortfolioDash);
