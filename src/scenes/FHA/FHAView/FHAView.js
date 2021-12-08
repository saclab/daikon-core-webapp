import React, { useState, useRef, useEffect, useContext } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { BreadCrumb } from "primereact/breadcrumb";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading/Loading";
import NotFound from "../../../app/layout/NotFound/NotFound";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import FHAViewInformation from "./FHAViewInformation/FHAViewInformation";
import Discussion from "../../../app/common/Discussion/Discussion";

const FHAView = ({ match, history }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  const { loadingProject, fetchProject, selectedProject } =
    rootStore.projectStore;

  useEffect(() => {
    console.log("EFFECT");
    console.log(match.params.id);
    if (selectedProject === null || selectedProject.id !== match.params.id) {
      fetchProject(match.params.id);
    }
  }, [match.params.id, selectedProject, fetchProject]);

  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "FHA Information",
          icon: "icon icon-conceptual icon-chemical",
          command: () => {
            setActiveIndex(0);
          },
        },
        {
          label: "Links",
          icon: "icon icon-common icon-external-link-square-alt",
          command: () => {
            setActiveIndex(1);
          },
        },
        {
          label: "Discussion",
          icon: "ri-discuss-line",
          command: () => {
            setActiveIndex(2);
          },
        },
      ],
    },
  ];

  if (user.roles.includes("admin")) {
    items.push({
      label: "Actions",
      items: [
        {
          label: "Promote to H2L",
          icon: "icon icon-common icon-database-submit",
          command: (event) => {
            // setDisplayPromotionDialog(true);
          },
        },
      ],
    });
  }

  /** Loading Overlay */
  if (loadingProject) {
    console.log("Loading.....");
    return <Loading />;
  }
  if (selectedProject !== null) {
    console.log("selectedProject");
    console.log(selectedProject);
    const breadCrumbItems = [
      {
        label: "FHA",
        command: () => {
          history.push("/fha/");
        },
      },
      { label: selectedProject.projectName },
    ];

    return (
      <React.Fragment>
        <Toast ref={toast} />
        <br />
        <div className="p-d-flex">
          <div className="p-mr-2">
            <Menu model={items} />
          </div>
          <div className="p-mr-2" style={{ width: "100vw" }}>
            <div className="p-d-flex p-flex-column">
              <div className="p-mb-2">
                <BreadCrumb model={breadCrumbItems} />
              </div>
              <div className="p-mb-2">
                <SectionHeading
                  icon="icon icon-conceptual icon-chemical"
                  heading={selectedProject.projectName}
                  accessionNumber={selectedProject.accessionNo}
                  displayHorizion={true}
                />
              </div>
              <div className="p-mb-2">
                <TabView
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                >
                  <TabPanel header="Header I" headerClassName="hide">
                    <FHAViewInformation
                      id={match.params.id}
                      project={selectedProject}
                    />
                  </TabPanel>
                  <TabPanel header="Header II" headerClassName="hide">
                    tab 2
                  </TabPanel>
                  <TabPanel header="Header III" headerClassName="hide">
                    <Discussion
                      reference={selectedProject?.accessionNo}
                      section={"FHA"}
                    />
                  </TabPanel>
                </TabView>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return <NotFound />;
};

export default observer(FHAView);
