import React, { useState, useRef, useEffect, useContext } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { BreadCrumb } from "primereact/breadcrumb";
import { Menu } from "primereact/menu";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { observer } from "mobx-react-lite";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import history from "../../../history";

const GeneAdminDash = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "Import Genes",
          icon: "ri-book-open-line",
          command: () => {
            setActiveIndex(0);
          },
        },
        {
          label: "Non-Public Data",
          icon: "ri-git-repository-private-fill",
          command: () => {
            setActiveIndex(2);
          },
        },
      ],
    },
  ];

  const breadCrumbItems = [
    {
      label: "Genes Admin",
      command: () => {
        history.push("/admin/gene/");
      },
    },
    { label: "Genes Import" },
  ];

  return (
    <div style={{ width: "700px" }}>
      <Toast ref={toast} />
      <br />
      <div className="p-d-flex">
        <div className="p-mr-2">
          <Menu model={items} />
        </div>
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2" style={{ minWidth: "1000px" }}>
              <BreadCrumb model={breadCrumbItems} />
            </div>
            <div className="p-mb-2">
              <SectionHeading
                icon="icon icon-conceptual icon-dna"
                color="#EE1E40"
                heading={"Sync Genes with mycobrowser"}
              />
            </div>
            <div className="p-mb-2">
              <TabView
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
              >
                <TabPanel header="Header I" headerClassName="hide">
                  <h1>Tab 1</h1>
                </TabPanel>
                <TabPanel header="Header II" headerClassName="hide">
                  <h1>Tab 2</h1>
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneAdminDash;
