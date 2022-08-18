import React, { useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import { TabView, TabPanel } from "primereact/tabview";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import UserManagerUsers from "./UserManagerUsers/UserManagerUsers";
import UserManagerOrgs from "./UserManagerOrgs/UserManagerOrgs";
import SectionHeading from '../../app/common/SectionHeading/SectionHeading';
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";

const AppAdminUserManager = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  const params = useParams();
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
