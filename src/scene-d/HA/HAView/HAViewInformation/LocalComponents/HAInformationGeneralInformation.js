import React from "react";
import "./LocalComponents.css";

const HAInformationGeneralInformation = ({ project }) => {
  let displaySupportingOrgs =
    project.supportingOrgs.length !== 0
      ? project.supportingOrgs.map((org) => {
        return <p>- {org.appOrg.name}</p>;
      })
      : null;

  return (
    <div className="flex flex-column">
      <div className="flex">
        <h2><i>Hit Assessment</i></h2>
      </div>
      <div className="flex">
        <p>{project.haDescription}</p>
      </div>
      <div className="flex flex-column">
        <p>Expanded Id : {project.id}</p>
        <p>Target: <b>{project.targetName}</b></p>
        <p>Project Status : <b>{project.status}</b></p>
        <p>Primary Org : <b>{project?.primaryOrg?.name}</b></p>
        <p>Supporting Orgs :</p>
        <div style={{ marginLeft: "1rem" }}> <b>{displaySupportingOrgs}</b></div>
      </div>
    </div>
  );
};

export default HAInformationGeneralInformation;
