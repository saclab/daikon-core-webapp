import React from "react";
import { Card } from "primereact/card";
import "./LocalComponents.css";
import StageTag from "../../../../../app/common/StageTag/StageTag";

const FHAInformationGeneralInformation = ({ project }) => {
  let displaySupportingOrgs =
    project.supportingOrgs.length !== 0
      ? project.supportingOrgs.map((org) => {
          return <p>- {org.appOrg.name}</p>;
        })
      : null;

  return (
    <div>
      <div>
        <div className="p-d-inline-flex">
          <h2><i>Formal Hit Assessment</i></h2>
        </div>
        <div style={{ width: "30rem", lineHeight: "100%" }}>
          <p>{project.h2LDescription}</p>
        </div>

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

export default FHAInformationGeneralInformation;
