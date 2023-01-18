import { observer } from "mobx-react-lite";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import UserManagerOrgs from "./UserManagerOrgs/UserManagerOrgs";
import UserManagerUsers from "./UserManagerUsers/UserManagerUsers";

const AppAdminUserManager = () => {
  const toast = useRef(null);

  const navigate = useNavigate();

  const SideMenuItems = [
    {
      label: "Sections",
      items: [
        {
          label: "Users",
          icon: "icon icon-common icon-users",
          command: () => {
            navigate("users/");
          },
        },
        {
          label: "Orgs",
          icon: "ri-organization-chart",
          command: () => {
            navigate("orgs/");
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
            <Route index element={<Navigate replace to="users/" />} />
            <Route path="users/" element={<UserManagerUsers />} />
            <Route path="orgs" element={<UserManagerOrgs />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(AppAdminUserManager);
