import React from "react";
import { Card } from "primereact/card";
import "./LocalComponents.css";
import StageTag from "../../../../../app/common/StageTag/StageTag";

const PortfolioInformationGeneralInformation = ({ project }) => {
  let displaySupportingOrgs =
    project.supportingOrgs.length !== 0
      ? project.supportingOrgs.map((org) => {
          return <p>- {org.appOrg.name}</p>;
        })
      : null;

  return (
    <div>
      <div style={{ width: "30rem", lineHeight: "50%" }}>
        <div className="p-d-inline-flex">
          <div className="p-mr-2" style={{padding : "0.5rem"}}>Current Stage : </div>
          <div className="p-mr-2">
            <StageTag stage={project.currentStage} />
          </div>
        </div>

        <p>{project.h2LDescription}</p>
        <p>Id : {project.id}</p>
        <p>Accession No: {project.accessionNo}</p>
        <p>Status : {project.status}</p>
        <p>Primary Org : {project?.primaryOrg?.name}</p>
        <p>Supporting Orgs :</p>
        <div style={{ marginLeft: "1rem" }}> {displaySupportingOrgs}</div>
      </div>
    </div>
  );
};

export default PortfolioInformationGeneralInformation;
