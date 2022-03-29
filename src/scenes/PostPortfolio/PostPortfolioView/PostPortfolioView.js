import React, { useState, useRef, useEffect, useContext } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { BreadCrumb } from "primereact/breadcrumb";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { observer } from "mobx-react-lite";
import { Sidebar } from "primereact/sidebar";
import { Message } from "primereact/message";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading/Loading";
import NotFound from "../../../app/layout/NotFound/NotFound";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import Discussion from "../../../app/common/Discussion/Discussion";
import FailedLoading from "../../../app/common/FailedLoading/FailedLoading";


const PostPortfolioView = ({ match, history }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayP1PromotionDialog, setDisplayP1PromotionDialog] =
    useState(false);
  const [displayEOLDialog, setDisplayEOLDialog] =
    useState(false);
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
      console.log("Will fetch from store" + match.params.id);
      fetchProject(match.params.id);
    }
  }, [match.params.id, selectedProject, fetchProject]);

  /** Loading Overlay */
  if (loadingProject) {
    console.log("Loading.....");
    return <Loading />;
  }

  if (
    !loadingProject &&
    selectedProject !== null &&
    selectedProject.id === match.params.id
  ) {
    const sideMenuItems = [
      {
        label: "Sections",
        items: [
          {
            label: "Post Portfolio Information",
            icon: "icon icon-common icon-analyse",
            command: () => {
              setActiveIndex(0);
            },
          },
          {
            label: "Base Hits",
            icon: "icon icon-conceptual icon-structures-3d",
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

    var actions = {
      label: "Actions",
      items: [],
    };

    if (user.roles.includes("admin")) {
      if (selectedProject.currentStage === "IND") {
        actions.items.push({
          label: "Promote to P1",
          icon: "icon icon-common icon-database-submit",
          command: (event) => {
            setDisplayP1PromotionDialog(true);
          },
        });
      }

      if (selectedProject.currentStage === "P1") {
        actions.items.push({
          label: "Mark Project Complete",
          icon: "icon icon-common icon-database-submit",
          command: (event) => {
            setDisplayEOLDialog(true);
          },
        });
      }
    }


      sideMenuItems.push(actions);
      console.log("selectedProject");
      console.log(selectedProject);
      const breadCrumbItems = [
        {
          label: "Portfolio",
          command: () => {
            history.push("/portfolio/");
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
              <Menu model={sideMenuItems} />
            </div>
            <div className="p-mr-2" style={{ width: "100vw" }}>
              <div className="p-d-flex p-flex-column">
                <div className="p-mb-2">
                  <BreadCrumb model={breadCrumbItems} />
                </div>
                <div className="p-mb-2">
                  <SectionHeading
                    icon="icon icon-common icon-drug"
                    heading={
                      selectedProject.projectName +
                      " | " +
                      selectedProject?.currentStage
                    }
                    targetName={selectedProject.targetName}
                    displayHorizon={true}
                  />
                </div>
                <div className="p-mb-2">
                  <TabView
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                  >
                    <TabPanel header="Header I" headerClassName="hide">
                      {/* <PostPortfolioInformation
                      id={match.params.id}
                      project={selectedProject}
                    /> */}
                    </TabPanel>
                    <TabPanel header="Header II" headerClassName="hide">
                      {/* <PortfolioBaseHits project={selectedProject} /> */}
                    </TabPanel>
                    <TabPanel header="Header III" headerClassName="hide">
                      <Discussion
                        reference={selectedProject?.targetName}
                        section={"Portfolio"}
                      />
                    </TabPanel>
                  </TabView>
                </div>
              </div>
            </div>
          </div>
          <Sidebar
            visible={displayP1PromotionDialog}
            position="right"
            style={{ width: "30em", overflowX: "auto" }}
            blockScroll={true}
            onHide={() => setDisplayP1PromotionDialog(false)}
          >
            <h3>{selectedProject.projectName}</h3>
            <i className="icon icon-common icon-plus-circle"></i> &nbsp; Promote
            to <b>LO</b>
            <hr />
            <Message
              severity="info"
              text={"This would promote the project to LO."}
            />
            <br />
            <br />
            {/* <PortfolioPromotionsPromoteToLO
            closeSidebar={() => setDisplayLOPromotionDialog(false)}
          /> */}
          </Sidebar>

          <Sidebar
            visible={displayEOLDialog}
            position="right"
            style={{ width: "30em", overflowX: "auto" }}
            blockScroll={true}
            onHide={() => setDisplayEOLDialog(false)}
          >
            <h3>{selectedProject.projectName}</h3>
            <i className="icon icon-common icon-plus-circle"></i> &nbsp; Promote
            to <b>SP</b>
            <hr />
            <Message
              severity="info"
              text={"This would promote the project to SP."}
            />
            <br />
            <br />
            {/* <PortfolioPromotionsPromoteToSP
            closeSidebar={() => setDisplaySPPromotionDialog(false)}
          /> */}
          </Sidebar>

        </React.Fragment>
      );
    }

    return <FailedLoading />;
  };

  export default observer(PostPortfolioView);
