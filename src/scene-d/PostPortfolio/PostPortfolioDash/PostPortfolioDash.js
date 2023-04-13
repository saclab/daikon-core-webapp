import { observer } from "mobx-react-lite";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import Loading from "../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";

import { MultiSelect } from "primereact/multiselect";
import { SelectButton } from "primereact/selectbutton";
import { Tag } from "primereact/tag";
import FDate from "../../../app/common/FDate/FDate";
import StageTag from "../../../app/common/StageTag/StageTag";
import TagGeneral from "../../../app/common/TagGeneral/TagGeneral";
import { appColors } from "../../../colors";
import "./PostPortfolioDash.css";

const PostPortfolioDash = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingProjects, fetchProjects, projectRegistry } =
    rootStore.projectStore;

  const { filterPostPortfolioProjects } = rootStore.postPortfolioStore;
  const { activeStrainFilterObj } = rootStore.appSettingsStore;
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

  let todaysDate = new Date().setHours(0, 0, 0, 0);

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
    return <TagGeneral tag={rowData.status} />;
  };

  const DateBodyTemplate = (rowData) => {
    let inputDate = new Date(rowData.h2LPredictedStart).setHours(0, 0, 0, 0);
    let stageDate = rowData.h2LPredictedStart;

    if (rowData.h2LEnabled) {
      inputDate = new Date(rowData.loPredictedStart).setHours(0, 0, 0, 0);
      stageDate = rowData.loPredictedStart;
    }
    if (rowData.loEnabled) {
      inputDate = new Date(rowData.spPredictedStart).setHours(0, 0, 0, 0);
      stageDate = rowData.spPredictedStart;
    }
    if (rowData.spEnabled) {
      inputDate = new Date(rowData.indPredictedStart).setHours(0, 0, 0, 0);
      stageDate = rowData.indPredictedStart;
    }
    if (rowData.indEnabled) {
      inputDate = new Date(rowData.clinicalP1PredictedStart).setHours(
        0,
        0,
        0,
        0
      );
      stageDate = rowData.clinicalP1PredictedStart;
    }
    if (rowData.clinicalP1Enabled) {
      inputDate = new Date(rowData.clinicalP1Start).setHours(0, 0, 0, 0);
      stageDate = rowData.clinicalP1Start;
    }

    if (rowData.status === "Terminated") {
      return (
        <React.Fragment>
          <span className="p-column-title">Date</span>
          <FDate
            className="p-column-title"
            timestamp={stageDate}
            color={"#9EA29D"}
          />
        </React.Fragment>
      );
    }

    if (rowData.clinicalP1Enabled) {
      return (
        <React.Fragment>
          <span className="p-column-title">Date</span>
          <FDate
            className="p-column-title"
            timestamp={stageDate}
            color={"#222222"}
          />
        </React.Fragment>
      );
    }

    if (rowData.status === "Active" && inputDate < todaysDate) {
      return (
        <React.Fragment>
          <span className="p-column-title">Date</span>
          <FDate
            className="p-column-title"
            timestamp={stageDate}
            color={"#9B8800"}
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
          color={"#1D7E00"}
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
            icon="icon icon-common icon-drug"
            heading={"Post Portfolio" + " /" + activeStrainFilterObj.name + "/"}
            color={appColors.sectionHeadingBg.postPortfolio}
          />
        </div>

        <div className="flex w-full">
          <DataTable
            ref={dt}
            value={filterPostPortfolioProjects()}
            paginator
            rows={20}
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
              field="projectName"
              header="Project Name"
              body={ProjectNameBodyTemplate}
              filter
              filterMatchMode="contains"
              filterPlaceholder="Filter by Project"
            />

            <Column
              field="targetName"
              header="Target"
              body={TargetBodyTemplate}
              filter
              filterMatchMode="contains"
              filterPlaceholder="Filter by Target"
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
              field="date"
              header="Date"
              body={DateBodyTemplate}
              style={{ width: "100px" }}
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
