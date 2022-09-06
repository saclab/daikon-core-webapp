import React from "react";
import "./LocalComponents.css";
import StageTag from "../../../../../app/common/StageTag/StageTag";
import ProjectStatus from "../../../../../app/common/ProjectStatus/ProjectStatus";

const PostPortfolioInformationGeneralInformation = ({ project }) => {
  let displaySupportingOrgs =
    project.supportingOrgs.length !== 0
      ? project.supportingOrgs.map((org) => {
        return <p>- {org.appOrg.name}</p>;
      })
      : null;

  return (
    <div className="flex flex-column w-full">
      <div className="flex flex-column">
        <ProjectStatus status={project.status} />
      </div>
      <div className="flex align-content-center">
        <p>Expanded Id : {project.id}</p>
      </div>

      <div className="flex flex-column mb-2" style={{ width: "30rem", lineHeight: "100%" }}>
        <div className="flex">{project.indDescription ? '(IND) ' + project.indDescription : ''}</div>
        <div className="flex">{project.clinicalP1Description ? '(P1) ' + project.clinicalP1Description : ''}</div>
      </div>

      <div className="flex flex-column">
        <table>
          <tr>
            <td>Target:</td>
            <td><b>{project.targetName}</b></td>
          </tr>
          <tr>
            <td>Current Stage :</td>
            <td><b> <StageTag stage={project.currentStage} /></b></td>
          </tr>
          <tr>
            <td>Status:</td>
            <td><b>{project.status}</b></td>
          </tr>
          <tr>
            <td>Primary Org:</td>
            <td><b>{project?.primaryOrg?.name}</b></td>
          </tr>
          <tr>
            <td>Supporting Orgs:</td>
            <td><b>{displaySupportingOrgs}</b></td>
          </tr>
        </table>
      </div>
    </div >
  );
};

export default PostPortfolioInformationGeneralInformation;
