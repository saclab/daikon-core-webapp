import React from "react";
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
    <div className="flex flex-column w-full">
      <div className="flex align-content-center">
        <div className="flex align-items-center justify-content-center mr-1">
          Current Stage :{" "}
        </div>
        <div className="flex align-items-center justify-content-center">
          <StageTag stage={project.currentStage} />
        </div>
      </div>
      <div className="flex flex-column" style={{ width: "30rem", lineHeight: "100%" }}>
        <div className="flex">{project.indDescription ? '(IND) ' + project.indDescription : ''}</div>
        <div className="flex">{project.clinicalP1Description ? '(P1) ' + project.clinicalP1Description : ''}</div>
      </div>
      <div className="flex flex-column">
        <p>Expanded Id : {project.id}</p>
        <p>Target: <b>{project.targetName}</b></p>
        <p>Status : <b>{project.status}</b></p>
        <p>Primary Org : <b>{project?.primaryOrg?.name}</b></p>
        <p>Supporting Orgs :</p>
        <div style={{ marginLeft: "1rem" }}> <b>{displaySupportingOrgs}</b></div>
      </div>
    </div >
  );
};

export default PostPortfolioInformationGeneralInformation;
