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
import HADiscussion from "./HADiscussion/HADiscussion";
import HAPromotionQuestionaire from "./HAPromotionQuestionaire/HAPromotionQuestionaire";
import HAViewInformation from "./HAViewInformation/HAViewInformation";

const HAView = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [displayPromotionDialog, setDisplayPromotionDialog] = useState(false);
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
  if (!loadingProject && selectedProject !== null) {
    const sideMenuItems = [
      {
        label: "Sections",
        items: [
          {
            label: "HA Information",
            icon: "icon icon-conceptual icon-chemical",
            command: () => {
              navigate("information/");
            },
          },
          // {
          //   label: "Links",
          //   icon: "icon icon-common icon-external-link-square-alt",
          //   command: () => {
          //     navigate("links/");
          //   },
          // },
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

    if (user.roles.includes("admin") && !selectedProject?.h2LEnabled) {
      actions.items.push({
        label: "Promote to H2L",
        icon: "icon icon-common icon-database-submit",
        command: (event) => {
          setDisplayPromotionDialog(true);
        },
      });
    }

    if (selectedProject?.h2LEnabled) {
      actions.items.push({
        label: "View Portfolio",
        icon: "icon icon-common icon-database-submit",
        command: (event) => {
          navigate(`/d/portfolio/${selectedProject.id}`);
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
                  <HAViewInformation id={params.id} project={selectedProject} />
                }
              />

              <Route
                path="discussion"
                element={<HADiscussion project={selectedProject} />}
              />
            </Routes>
          </div>
        </div>
        <Sidebar
          visible={displayPromotionDialog}
          position="right"
          style={{ width: "30em", overflowX: "auto" }}
          onHide={() => setDisplayPromotionDialog(false)}
        >
          <h3>{selectedProject.projectName}</h3>
          <i className="icon icon-common icon-plus-circle"></i> &nbsp; Promote
          to <b>H2L</b>
          <hr />
          <Message
            severity="info"
            text={"This would create a new portfolio with stage H2L."}
          />
          <br />
          <br />
          <HAPromotionQuestionaire
            closeSidebar={() => setDisplayPromotionDialog(false)}
          />
        </Sidebar>
      </React.Fragment>
    );
  }

  return <FailedLoading />;
};

export default observer(HAView);
