import React, { useState, useRef, useEffect, useContext } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { BreadCrumb } from "primereact/breadcrumb";
import NotFound from "../../../app/layout/NotFound/NotFound";
import Loading from "../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { Column } from "primereact/column";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import UserManagerUsers from "./UserManagerUsers/UserManagerUsers";
import UserManagerOrgs from "./UserManagerOrgs/UserManagerOrgs";



const UserManager = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  const SideMenuItems = [
    {
      label: "Sections",
      items: [
        {
          label: "Users",
          icon: "icon icon-common icon-users",
          command: () => {
            setActiveIndex(0);
          },
        },
        {
          label: "Orgs",
          icon: "ri-organization-chart",
          command: () => {
            setActiveIndex(1);
          },
        },
        {
          label: "Roles",
          icon: "icon icon-common icon-group",
          command: () => {
            setActiveIndex(2);
          },
        },
      ],
    },
  ];
  return (
    <React.Fragment>
      <Toast ref={toast} />
      <br />
      <div className="p-d-flex">
        <div className="p-mr-2">
          <Menu model={SideMenuItems} />
        </div>
        <div className="p-mr-2" style={{ width: "100vw" }}>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              {/* <BreadCrumb model={breadCrumbItems} /> */}
            </div>
            <div className="p-mb-2">
              <SectionHeading
                icon="ri-user-settings-fill"
                heading={"User Manager"}
              />
            </div>
            <div className="p-mb-2">
              <TabView
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
              >
                <TabPanel header="Users" headerClassName="hide">
                  <SectionHeading
                    icon="icon icon-common icon-users"
                    heading={" All Users"}
                    color={"#f4f4f4"}
                    textColor={"#000000"}
                  />
                 <UserManagerUsers />
                </TabPanel>
                <TabPanel header="Orgs" headerClassName="hide">
                  <SectionHeading
                    icon="ri-organization-chart"
                    heading={"Orgs"}
                    color={"#f4f4f4"}
                    textColor={"#000000"}
                  />
                  <UserManagerOrgs />
                </TabPanel>
                <TabPanel header="Roles" headerClassName="hide">
                <SectionHeading
                    icon="icon icon-common icon-group"
                    heading={"Roles"}
                    color={"#f4f4f4"}
                    textColor={"#000000"}
                  />
                  Roles
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserManager;
