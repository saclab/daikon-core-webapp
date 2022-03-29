import React from "react";
import { Card } from "primereact/card";
import "./LocalComponents.css";
import StageTag from "../../../../../app/common/StageTag/StageTag";

const PostPortfolioInformationGeneralInformation = ({ project }) => {
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
          <div className="p-mr-2" style={{ padding: "0.5rem" }}>
            Current Stage :{" "}
          </div>
          <div className="p-mr-2">
            <StageTag stage={project.currentStage} />
          </div>
        </div>
        <div style={{ width: "30rem", lineHeight: "100%" }}>
          <p>{project.indDescription ? '(IND) ' + project.indDescription : ''}</p>
          <p>{project.clinicalP1Description ? '(P1) ' + project.clinicalP1Description : ''}</p>


        </div>

        <p>Expanded Id : {project.id}</p>
        <p>Target: <b>{project.targetName}</b></p>
        <p>Status : <b>{project.status}</b></p>
        <p>Primary Org : <b>{project?.primaryOrg?.name}</b></p>
        <p>Supporting Orgs :</p>
        <div style={{ marginLeft: "1rem" }}> <b>{displaySupportingOrgs}</b></div>
      </div>
    </div>
  );
};

export default PostPortfolioInformationGeneralInformation;
