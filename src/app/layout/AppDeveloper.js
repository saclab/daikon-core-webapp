import { observer } from "mobx-react-lite";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BugReport from "../../screen-developer/BugReport/BugReport";
import DataDiscrepancy from "../../screen-developer/DataDiscrepancy/DataDiscrepancy";
import Documentation from "../../screen-developer/Documentation/Documentation";
import FeatureRequest from "../../screen-developer/FeatureRequest/FeatureRequest";
import MenuBarDeveloper from "./MenuBarDeveloper/MenuBarDeveloper";
const AppDeveloper = () => {
  return (
    <div className="flex flex-column">
      <div className="block mb-2">
        <MenuBarDeveloper />
      </div>
      <div className="flex ml-3 mr-3 fadein animation-duration-1000">
        <Routes>
          <Route index element={<Navigate replace to="bug-report/" />} />
          <Route path={"bug-report/*"} element={<BugReport />} />
          <Route path={"feature-request/*"} element={<FeatureRequest />} />
          <Route path={"data-discrepancy/*"} element={<DataDiscrepancy />} />
          <Route path={"documentation/*"} element={<Documentation />} />
        </Routes>
      </div>
    </div>
  );
};

export default observer(AppDeveloper);
