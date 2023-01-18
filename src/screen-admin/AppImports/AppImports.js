import { observer } from "mobx-react-lite";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AppImportsTarget from "./AppImportsTarget/AppImportsTarget";

const AppImports = () => {
  const toast = useRef(null);

  const navigate = useNavigate();

  const SideMenuItems = [
    {
      label: "Sections",
      items: [
        {
          label: "Targets",
          icon: "icon icon-common icon-snowflake",
          command: () => {
            navigate("targets/");
          },
        },
      ],
    },
  ];
  return (
    <React.Fragment>
      <Toast ref={toast} />
      <div className="flex gap-2 w-full">
        <div className="flex">
          <Menu model={SideMenuItems} />
        </div>
        <div className="flex w-full">
          <Routes>
            <Route index element={<Navigate replace to="targets/" />} />
            <Route path="targets/" element={<AppImportsTarget />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(AppImports);
