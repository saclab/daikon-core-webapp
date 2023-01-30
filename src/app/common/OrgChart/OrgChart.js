import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "../../stores/rootStore";

import PleaseWait from "../PleaseWait/PleaseWait";

const OrgChart = ({ activeOrgs, primary }) => {
  console.log(activeOrgs);
  const rootStore = useContext(RootStoreContext);
  const { fetchingAppVars, appVars, fetchAppVars } = rootStore.generalStore;

  useEffect(() => {
    if (appVars === null) {
      fetchAppVars();
    }
  }, [appVars, fetchAppVars]);

  if (fetchingAppVars) {
    return <PleaseWait />;
  }
  console.log(appVars);

  let flattenActiveOrgs = [
    ...activeOrgs.map((activeOrg) => activeOrg.appOrg.alias),
  ];
  console.log("Flattened activeOrgs");
  console.log(flattenActiveOrgs);

  let generateApporgsDivs = appVars.appOrgs.map((appOrg) => {
    if (appOrg.alias === primary) {
      return (
        <div class="flex align-items-center justify-content-center w-7rem h-2rem bg-green-500 text-white border-round m-2 p-1">
          <p tooltip="Enter your username">
            <i class="icon icon-common icon-star" /> {appOrg.alias}
          </p>
        </div>
      );
    }
    if (flattenActiveOrgs.includes(appOrg.alias)) {
      return (
        <div class="flex align-items-center justify-content-center w-7rem h-2rem bg-green-500 text-white border-round m-2 p-1">
          <p tooltip="Enter your username">{appOrg.alias}</p>
        </div>
      );
    }
    return (
      <div class="flex align-items-center justify-content-center w-7rem h-2rem surface-500 text-white border-round m-2 p-1">
        <p tooltip="Enter your username">{appOrg.alias}</p>
      </div>
    );
  });

  return (
    <div>
      <div class="card">
        <div class="flex flex-row flex-wrap card-container blue-container">
          {generateApporgsDivs}
        </div>
      </div>
    </div>
  );
};

export default OrgChart;
