import React from "react";
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
    <div className="flex flex-column w-full">
      <div className="flex" style={{ width: "30rem", lineHeight: "50%" }}>
        <div className="flex">
          Current Stage :
        </div>
        <div className="flex">
          <StageTag stage={project.currentStage} />
        </div>
      </div>

      <div className="flex flex-column" style={{ width: "30rem", lineHeight: "100%" }}>
        <p>{project.h2LDescription ? '(H2L) ' + project.h2LDescription : ''}</p>
        <p>{project.loDescription ? '(LO) ' + project.loDescription : ''}</p>
        <p>{project.spDescription ? '(SP) ' + project.spDescription : ''}</p>
      </div>

      <div className="flex flex-column">
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

export default PortfolioInformationGeneralInformation;
