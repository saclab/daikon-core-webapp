import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import FDate from "../../../../../app/common/FDate/FDate";
import TagGeneral from "../../../../../app/common/TagGeneral/TagGeneral";

const HAStatus = ({ project }) => {
  let data = [
    {
      name: "HA Status",
      value: (
        <TagGeneral
          tag={project.currentStage === "HA" ? "Ongoing" : "Complete"}
        />
      ),
    },
    {
      name: "HA Start Date",
      value: <FDate timestamp={project.haStart} hideTime={true} />,
    },
  ];
  if (project.currentStage === "HA") {
    data.push({
      name: "H2L Predicted Start",
      value: <FDate timestamp={project.h2LPredictedStart} hideTime={true} />,
    });
  }

  return (
    <div className="flex flex-column flex-wrap card-container">
      <DataTable className="noDataTableHeader" value={data}>
        <Column field="name"></Column>
        <Column field="value"></Column>
      </DataTable>
    </div>
  );
};

export default HAStatus;
