import React from "react";

import { observer } from "mobx-react-lite";
import KeyValList from "../../../../../app/common/KeyValList/KeyValList";



const ProjectSettingsGeneralInformation = ({ project }) => {
  // let displaySupportingOrgs =
  //   project.supportingOrgs.length !== 0
  //     ? project.supportingOrgs.map((org) => {
  //       return <p>- {org.appOrg.name}</p>;
  //     })
  //     : null;

  return (
    <div className="flex">
      {/* <KeyValList data={project} filter={
        ["id",
          "projectName",
          "createdAt",
          "createdBy",
          "targetName",
          "status",
          "currentStage",
          "currentStageDescription",
          "projectDisclosure",
          "disclosureDate",
          "priority",
          "priorityDescription",
          "probability",
          "probabilityDescription",
          "resource",
          "resourceDescription",
          "haStart",
          "haPredictedStart",
          "haDescription",
          "h2LStart",
          "h2LPredictedStart",
          "h2LDescription",
          "loStart",
          "loPredictedStart",
          "loDescription",
          "spStart",
          "spPredictedStart",
          "spDescription",
          "pcdDate",
          "pcdDescription",
          "indStart",
          "indPredictedStart",
          "indDescription",
          "clinicalP1Start",
          "clinicalP1PredictedStart",
          "clinicalP1Description",
        ]} /> */}
      <KeyValList data={project} filter={
        ["id",
          "projectName",
          "createdAt",
          "createdBy",
          "targetName",
          "status",
          "currentStage",
        ]} />
    </div>
  );
};

export default observer(ProjectSettingsGeneralInformation);
