import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import StageTag from "../../../../../app/common/StageTag/StageTag";
import TagGeneral from "../../../../../app/common/TagGeneral/TagGeneral";
import "./LocalComponents.css";

const PortfolioInformationGeneralInformation = ({ project }) => {
  let displaySupportingOrgs =
    project.supportingOrgs.length !== 0
      ? project.supportingOrgs.map((org) => {
          return <p>{org.appOrg.name}</p>;
        })
      : null;

  let data = [
    {
      name: "Id",
      value: project.id,
    },
    {
      name: "Target",
      value: (
        <div>
          <i className="icon icon-common icon-target" />{" "}
          {project.targetName ? project.targetName : "Unknown"}
        </div>
      ),
    },
    {
      name: "Current Stage",
      value: <StageTag stage={project.currentStage} />,
    },
    {
      name: "Project Status",
      value: <TagGeneral tag={project.status} />,
    },
    {
      name: "H2L Description",
      value: (
        <div
          className="overflow-hidden text-overflow-ellipsis"
          style={{ maxWidth: "400px" }}
        >
          {project.h2LDescription}
        </div>
      ),
    },
  ];
  if (project.loEnabled) {
    data.push({
      name: "LO Description",
      value: (
        <div
          className="overflow-hidden text-overflow-ellipsis"
          style={{ maxWidth: "400px" }}
        >
          {project.loDescription}
        </div>
      ),
    });
  }
  if (project.spEnabled) {
    data.push({
      name: "SP Description",
      value: (
        <div
          className="overflow-hidden text-overflow-ellipsis"
          style={{ maxWidth: "400px" }}
        >
          {project.spDescription}
        </div>
      ),
    });
  }

  return (
    <div className="flex flex-column flex-wrap card-container min-w-max">
      <DataTable className="noDataTableHeader" value={data}>
        <Column field="name"></Column>
        <Column field="value"></Column>
      </DataTable>
    </div>
  );
};

export default PortfolioInformationGeneralInformation;
