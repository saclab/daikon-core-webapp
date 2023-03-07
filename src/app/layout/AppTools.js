import { observer } from "mobx-react-lite";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CompoundDash from "../../screen-tools/Compounds/CompoundsDash/CompoundDash";
import MenuBarTools from "./MenuBarTools/MenuBarTools";
const AppDeveloper = () => {
  return (
    <div className="flex flex-column">
      <div className="block mb-2">
        <MenuBarTools />
      </div>
      <div className="flex ml-3 mr-3 fadein animation-duration-1000">
        <Routes>
          <Route index element={<Navigate replace to="compounds/" />} />
          <Route path={"compounds/*"} element={<CompoundDash />} />
        </Routes>
      </div>
    </div>
  );
};

export default observer(AppDeveloper);
