import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import StageTag from "../../../../../app/common/StageTag/StageTag";
import TagGeneral from "../../../../../app/common/TagGeneral/TagGeneral";
import "./LocalComponents.css";

const PostPortfolioInformationGeneralInformation = ({ project }) => {
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
      name: "IND Description",
      value: (
        <div
          className="overflow-hidden text-overflow-ellipsis"
          style={{ maxWidth: "400px" }}
        >
          {project.indDescription}
        </div>
      ),
    },
  ];
  if (project.clinicalP1Enabled) {
    data.push({
      name: "P1 Description",
      value: (
        <div
          className="overflow-hidden text-overflow-ellipsis"
          style={{ maxWidth: "400px" }}
        >
          {project.clinicalP1Description}
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

export default PostPortfolioInformationGeneralInformation;
