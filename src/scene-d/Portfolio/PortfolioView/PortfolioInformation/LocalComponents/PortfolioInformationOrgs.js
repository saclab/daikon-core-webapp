import React from "react";
import OrgChart from "../../../../../app/common/OrgChart/OrgChart";

const PortfolioInformationOrgs = ({ project }) => {
  return (
    <div className="flex flex-column">
      <OrgChart
        projectId={project.id}
        activeOrgs={project?.supportingOrgs}
        primary={project?.primaryOrg?.alias}
        allowEdit={true}
      />
    </div>
  );
};

export default PortfolioInformationOrgs;
