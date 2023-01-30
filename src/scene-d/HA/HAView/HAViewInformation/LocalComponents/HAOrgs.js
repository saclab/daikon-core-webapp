import React from "react";
import OrgChart from "../../../../../app/common/OrgChart/OrgChart";

const HAOrgs = ({ project }) => {
  return (
    <div className="flex flex-column">
      <OrgChart
        activeOrgs={project?.supportingOrgs}
        primary={project?.primaryOrg?.alias}
      />
    </div>
  );
};

export default HAOrgs;
