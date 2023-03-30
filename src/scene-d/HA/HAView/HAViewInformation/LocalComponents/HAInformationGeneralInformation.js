import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import TagGeneral from "../../../../../app/common/TagGeneral/TagGeneral";
import "./LocalComponents.css";

const HAInformationGeneralInformation = ({ project }) => {
  let data = [
    {
      name: "Id",
      value: project.id,
    },
    {
      name: "Internal Id",
      value: project.projectLegacyId,
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
      name: "Project Status",
      value: <TagGeneral tag={project.status} />,
    },
    {
      name: "Description",
      value: project.haDescription,
    },
  ];
  return (
    <div className="flex flex-column flex-wrap card-container">
      <DataTable className="noDataTableHeader" value={data}>
        <Column field="name"></Column>
        <Column field="value"></Column>
      </DataTable>
    </div>
  );
};

export default HAInformationGeneralInformation;
