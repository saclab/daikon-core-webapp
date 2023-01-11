import { observer } from "mobx-react-lite";
import { Menu } from "primereact/menu";
import { Message } from "primereact/message";
import { Sidebar } from "primereact/sidebar";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import FailedLoading from "../../../app/common/FailedLoading/FailedLoading";
import Loading from "../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PostPortfolioBaseHits from "./PostPortfolioBaseHits/PostPortfolioBaseHits";
import PostPortfolioDiscussion from "./PostPortfolioDiscussion/PostPortfolioDiscussion";
import PostPortfolioInformation from "./PostPortfolioInformation/PostPortfolioInformation";
import PostPortfolioPromotionsPromoteToP1 from "./PostPortfolioPromotions/PostPortfolioPromotionsPromoteToP1";

const PostPortfolioView = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [displayP1PromotionDialog, setDisplayP1PromotionDialog] =
    useState(false);
  const [displayEOLDialog, setDisplayEOLDialog] = useState(false);
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  const { loadingProject, fetchProject, selectedProject } =
    rootStore.projectStore;

  useEffect(() => {
    if (selectedProject === null || selectedProject.id !== params.id) {
      fetchProject(params.id);
    }
  }, [params.id, selectedProject, fetchProject]);

  /** Loading Overlay */
  if (loadingProject) {
    return <Loading />;
  }

  if (
    !loadingProject &&
    selectedProject !== null &&
    selectedProject.id === params.id
  ) {
    const sideMenuItems = [
      {
        label: "Sections",
        items: [
          {
            label: "Post Portfolio Information",
            icon: "icon icon-common icon-analyse",
            command: () => {
              navigate("information/");
            },
          },
          {
            label: "Base Hits",
            icon: "icon icon-conceptual icon-structures-3d",
            command: () => {
              navigate("base-hits/");
            },
          },
          {
            label: "Discussion",
            icon: "ri-discuss-line",
            command: () => {
              navigate("discussion/");
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
    if (user.roles.includes("admin")) {
      actions.items.push({
        label: "Project Settings",
        icon: "icon icon-common icon-asterisk",
        command: () => {
          navigate(`/pm/project/${selectedProject.id}/settings/`);
        },
      });
    }

    sideMenuItems.push(actions);

    return (
      <React.Fragment>
        <Toast ref={toast} />
        <div className="flex gap-2 w-full">
          <div className="flex">
            <Menu model={sideMenuItems} />
          </div>
          <div className="flex w-full">
            <Routes>
              <Route index element={<Navigate replace to="information/" />} />
              <Route
                path="information/"
                element={
                  <PostPortfolioInformation
                    id={params.id}
                    project={selectedProject}
                  />
                }
              />
              <Route
                path="base-hits/"
                element={<PostPortfolioBaseHits project={selectedProject} />}
              />

              <Route
                path="discussion"
                element={<PostPortfolioDiscussion project={selectedProject} />}
              />
            </Routes>
          </div>
        </div>

        {/* <div className="p-d-flex">
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
                  color={appColors.sectionHeadingBg.postPortfolio}
                />
              </div>
              <div className="p-mb-2">
                <TabView
                  activeIndex={activeIndex}
                  onTabChange={(e) => navigate(""e.index)}
                >
                  <TabPanel header="Header I" headerClassName="hide">
                    <PostPortfolioInformation
                      id={params.id}
                      project={selectedProject}
                    />
                  </TabPanel>
                  <TabPanel header="Header II" headerClassName="hide">
                    <PostPortfolioBaseHits project={selectedProject} />
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
        </div> */}
        <Sidebar
          visible={displayP1PromotionDialog}
          position="right"
          style={{ width: "30em", overflowX: "auto" }}
          onHide={() => setDisplayP1PromotionDialog(false)}
        >
          <h3>{selectedProject.projectName}</h3>
          <i className="icon icon-common icon-plus-circle"></i> &nbsp; Promote
          to <b>P1</b>
          <hr />
          <Message
            severity="info"
            text={"This would promote the project to P1."}
          />
          <br />
          <br />
          <PostPortfolioPromotionsPromoteToP1
            closeSidebar={() => setDisplayP1PromotionDialog(false)}
          />
        </Sidebar>

        <Sidebar
          visible={displayEOLDialog}
          position="right"
          style={{ width: "30em", overflowX: "auto" }}
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
