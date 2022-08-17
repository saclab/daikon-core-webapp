import React, { useState, useRef, useEffect, useContext } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { observer } from "mobx-react-lite";
import { Sidebar } from "primereact/sidebar";
import { Message } from "primereact/message";
import Loading from '../../../app/layout/Loading/Loading';
import FailedLoading from '../../../app/common/FailedLoading/FailedLoading';
import ProjectSettings from "./ProjectSettings/ProjectSettings";

const ProjectView = () => {

  const params = useParams();
  const navigate = useNavigate();

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
            label: "Project Settings",
            icon: "icon icon-common icon-briefcase",
            command: () => {
              navigate('settings/');
            },
          },
        ],
      },
    ];

    return <div className="flex gap-2 w-full">
      <div className="flex">
        <Menu model={sideMenuItems} />
      </div>

      <div className="flex w-full">
        <Routes>
          <Route index element={<Navigate replace to="settings/" />} />
          <Route path="settings/" element={<ProjectSettings
            id={params.id}
            project={selectedProject}
          />} />

          {/* <Route path="discussion" element={<PortfolioDiscussion
            project={selectedProject}
          />} /> */}
        </Routes>
      </div>
    </div>
  }



  return (
    <FailedLoading />
  )
}

export default observer(ProjectView)