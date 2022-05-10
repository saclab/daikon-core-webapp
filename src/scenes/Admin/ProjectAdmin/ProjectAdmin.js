import React, { useState, useRef } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import ProjectAdminNewProject from "./ProjectAdminNewProject/ProjectAdminNewProject";


const ProjectAdmin = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "Project List",
          icon: "icon icon-common icon-classification",
          command: () => {
            setActiveIndex(0);
          },
        },
        {
          label: "New Project",
          icon: "ri-book-open-line",
          command: () => {
            setActiveIndex(1);
          },
        },
      ],
    },
  ];


  return (
    <div>
      <Toast ref={toast} />
      <br />
      <div className="p-d-flex">
        <div className="p-mr-2">
          <Menu model={items} />
        </div>
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <TabView
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
              >
                <TabPanel header="Header I" headerClassName="hide">
                  {/* <TargetAdminList /> */}
                </TabPanel>
                <TabPanel header="Header II" headerClassName="hide">
                  <ProjectAdminNewProject />
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAdmin;
