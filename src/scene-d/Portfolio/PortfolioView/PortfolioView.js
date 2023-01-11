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
import PortfolioBaseHits from "./PortfolioBaseHits/PortfolioBaseHits";
import PortfolioDiscussion from "./PortfolioDiscussion/PortfolioDIscussion";
import PortfolioInformation from "./PortfolioInformation/PortfolioInformation";
import PortfolioPromotionsPromoteToIND from "./PortfolioPromotions/PortfolioPromotionsPromoteToIND";
import PortfolioPromotionsPromoteToLO from "./PortfolioPromotions/PortfolioPromotionsPromoteToLO";
import PortfolioPromotionsPromoteToSP from "./PortfolioPromotions/PortfolioPromotionsPromoteToSP";

const PortfolioView = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [displayLOPromotionDialog, setDisplayLOPromotionDialog] =
    useState(false);
  const [displaySPPromotionDialog, setDisplaySPPromotionDialog] =
    useState(false);
  const [displayINDPromotionDialog, setDisplayINDPromotionDialog] =
    useState(false);
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
            label: "Portfolio Information",
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
      if (selectedProject.currentStage === "H2L") {
        actions.items.push({
          label: "Promote to LO",
          icon: "icon icon-common icon-database-submit",
          command: (event) => {
            setDisplayLOPromotionDialog(true);
          },
        });
      }

      if (selectedProject.currentStage === "LO") {
        actions.items.push({
          label: "Promote to SP",
          icon: "icon icon-common icon-database-submit",
          command: (event) => {
            setDisplaySPPromotionDialog(true);
          },
        });
      }

      if (selectedProject.currentStage === "SP") {
        actions.items.push({
          label: "Promote to IND",
          icon: "icon icon-common icon-database-submit",
          command: (event) => {
            setDisplayINDPromotionDialog(true);
          },
        });
      }
    }

    if (selectedProject?.indEnabled) {
      actions.items.push({
        label: "View Post Portfolio",
        icon: "icon icon-common icon-database-submit",
        command: (event) => {
          navigate(`/d/post-portfolio/${selectedProject.id}`);
        },
      });
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
                  <PortfolioInformation
                    id={params.id}
                    project={selectedProject}
                  />
                }
              />
              <Route
                path="base-hits/"
                element={<PortfolioBaseHits project={selectedProject} />}
              />

              <Route
                path="discussion"
                element={<PortfolioDiscussion project={selectedProject} />}
              />
            </Routes>
          </div>
        </div>
        <Sidebar
          visible={displayLOPromotionDialog}
          position="right"
          style={{ width: "30em", overflowX: "auto" }}
          onHide={() => setDisplayLOPromotionDialog(false)}
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
          <PortfolioPromotionsPromoteToLO
            closeSidebar={() => setDisplayLOPromotionDialog(false)}
          />
        </Sidebar>

        <Sidebar
          visible={displaySPPromotionDialog}
          position="right"
          style={{ width: "30em", overflowX: "auto" }}
          onHide={() => setDisplaySPPromotionDialog(false)}
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
          <PortfolioPromotionsPromoteToSP
            closeSidebar={() => setDisplaySPPromotionDialog(false)}
          />
        </Sidebar>

        <Sidebar
          visible={displayINDPromotionDialog}
          position="right"
          style={{ width: "30em", overflowX: "auto" }}
          onHide={() => setDisplayINDPromotionDialog(false)}
        >
          <h3>{selectedProject.projectName}</h3>
          <i className="icon icon-common icon-plus-circle"></i> &nbsp; Promote
          to <b>IND</b>
          <hr />
          <Message
            severity="info"
            text={"This would promote the project to post portfolio stage IND."}
          />
          <br />
          <br />
          <PortfolioPromotionsPromoteToIND
            closeSidebar={() => setDisplayINDPromotionDialog(false)}
          />
        </Sidebar>
      </React.Fragment>
    );
  }

  return <FailedLoading />;
};

export default observer(PortfolioView);
