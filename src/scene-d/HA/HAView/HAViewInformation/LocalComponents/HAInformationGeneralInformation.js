import React from "react";
import "./LocalComponents.css";

const HAInformationGeneralInformation = ({ project }) => {
  return (
    <div className="flex flex-column">
      <div className="flex">
        <h2>
          <i>Hit Assessment</i>
        </h2>
      </div>
      <div className="flex">
        <p>{project.haDescription}</p>
      </div>
      <div className="flex flex-column">
        <p>Expanded Id : {project.id}</p>
        <p>
          Target: <b>{project.targetName}</b>
        </p>
        <p>
          Project Status : <b>{project.status}</b>
        </p>
      </div>
    </div>
  );
};

export default HAInformationGeneralInformation;
