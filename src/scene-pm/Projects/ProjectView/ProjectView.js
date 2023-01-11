import { observer } from "mobx-react-lite";
import { Menu } from "primereact/menu";
import React, { useContext, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams
} from "react-router-dom";
import FailedLoading from "../../../app/common/FailedLoading/FailedLoading";
import Loading from "../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProjectSettings from "./ProjectSettings/ProjectSettings";

const ProjectView = () => {
  const params = useParams();
  const navigate = useNavigate();

  const rootStore = useContext(RootStoreContext);
  const { loadingProject, fetchProject, selectedProject } =
    rootStore.projectStore;

  useEffect(() => {
    if (selectedProject === null || selectedProject.id !== params.id) {
      console.log("Will fetch from store" + params.id);
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
            label: "Project Settings",
            icon: "icon icon-common icon-briefcase",
            command: () => {
              navigate("settings/");
            },
          },
          {
            label: "Create New",
            icon: "icon icon-common icon-plus",
            command: () => {
              navigate("/pm/project/new");
            },
          },
          {
            label: "Create Clone",
            icon: "icon icon-common icon-code-branch",
            command: () => {
              navigate("/pm/project/new");
            },
          },
        ],
      },
    ];

    return (
      <div className="flex gap-2 w-full">
        <div className="flex">
          <Menu model={sideMenuItems} />
        </div>

        <div className="flex w-full">
          <Routes>
            <Route index element={<Navigate replace to="settings/" />} />
            <Route
              path="settings/"
              element={
                <ProjectSettings id={params.id} project={selectedProject} />
              }
            />

            {/* <Route path="discussion" element={<PortfolioDiscussion
            project={selectedProject}
          />} /> */}
          </Routes>
        </div>
      </div>
    );
  }

  return <FailedLoading />;
};

export default observer(ProjectView);
