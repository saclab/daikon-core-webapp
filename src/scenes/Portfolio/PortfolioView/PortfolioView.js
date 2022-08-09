import React, { useState, useRef, useEffect, useContext } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { observer } from "mobx-react-lite";
import { Sidebar } from "primereact/sidebar";
import { Message } from "primereact/message";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading/Loading";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import Discussion from "../../../app/common/Discussion/Discussion";
import PortfolioInformation from "./PortfolioInformation/PortfolioInformation";
import FailedLoading from "../../../app/common/FailedLoading/FailedLoading";
import PortfolioPromotionsPromoteToLO from "./PortfolioPromotions/PortfolioPromotionsPromoteToLO";
import PortfolioPromotionsPromoteToSP from "./PortfolioPromotions/PortfolioPromotionsPromoteToSP";
import PortfolioBaseHits from "./PortfolioBaseHits/PortfolioBaseHits";
import PortfolioPromotionsPromoteToIND from "./PortfolioPromotions/PortfolioPromotionsPromoteToIND";
import { appColors } from '../../../colors';
import PortfolioDiscussion from './PortfolioDiscussion/PortfolioDIscussion';

const PortfolioView = ({ match, history }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
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
    console.log("EFFECT");
    console.log(params.id);
    if (selectedProject === null || selectedProject.id !== params.id) {
      console.log("Will fetch from store" + params.id);
      fetchProject(params.id);
    }
  }, [params.id, selectedProject, fetchProject]);

  /** Loading Overlay */
  if (loadingProject) {
    console.log("Loading.....");
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
              navigate('information/');
            },
          },
          {
            label: "Base Hits",
            icon: "icon icon-conceptual icon-structures-3d",
            command: () => {
              navigate('base-hits/');
            },
          },
          {
            label: "Discussion",
            icon: "ri-discuss-line",
            command: () => {
              navigate('discussion/');
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
          navigate(`/project/${selectedProject.id}/settings/`);
        },
      });
    }

    sideMenuItems.push(actions);
    console.log("selectedProject");
    console.log(selectedProject);
    const breadCrumbItems = [
      {
        label: "Portfolio",
        command: () => {
          navigate("/portfolio/");
        },
      },
      { label: selectedProject.projectName },
    ];

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
              <Route path="information/" element={<PortfolioInformation
                id={params.id}
                project={selectedProject}
              />} />
              <Route path="base-hits/" element={<PortfolioBaseHits project={selectedProject} />} />

              <Route path="discussion" element={<PortfolioDiscussion
                project={selectedProject}
              />} />
            </Routes>
          </div>
        </div>
        <Sidebar
          visible={displayLOPromotionDialog}
          position="right"
          style={{ width: "30em", overflowX: "auto" }}
          blockScroll={true}
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
          blockScroll={true}
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
          blockScroll={true}
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
            closeSidebar={() => setDisplayINDPromotionDialog(false)} />
        </Sidebar>
      </React.Fragment>
    );
  }

  return <FailedLoading />;
};

export default observer(PortfolioView);
