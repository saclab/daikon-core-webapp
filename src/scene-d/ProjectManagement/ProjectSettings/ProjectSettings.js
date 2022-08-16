import React, { useRef, useEffect, useContext } from "react";
import { Divider } from 'primereact/divider';
import { BreadCrumb } from "primereact/breadcrumb";
import { Toast } from "primereact/toast";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from '../../../app/layout/Loading/Loading';
import SectionHeading from '../../../app/common/SectionHeading/SectionHeading';
import FailedLoading from "../../../app/common/FailedLoading/FailedLoading";
import ProjectSettingsGeneralInformation from "./LocalComponents/ProjectSettingsGeneralInformation";
import ProjectSettingsDates from './LocalComponents/ProjectSettingsDates';
import ProjectSettingsDescriptions from './LocalComponents/ProjectSettingsDescriptions';
import ProjectSettingsPriority from './LocalComponents/ProjectSettingsPriority';
import ProjectSettingsTerminate from "./LocalComponents/ProjectSettingsTerminate";

const ProjectSettings = ({ match }) => {

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  // const { user } = rootStore.userStore;
  const { loadingProject, fetchProject, selectedProject } =
    rootStore.projectStore;

  const toast = useRef(null);

  useEffect(() => {
    if (selectedProject === null || selectedProject.id !== match.params.id) {
      fetchProject(match.params.id);
    }
  }, [match.params.id, selectedProject, fetchProject]);

  /* Loading Overlay */
  if (loadingProject) {
    return <Loading />;
  }

  if (
    !loadingProject &&
    selectedProject !== null &&
    selectedProject.id === match.params.id
  ) {
    const breadCrumbItems = [
      {
        label: "Project Management Tools",
        command: () => {
          //history.push("/project/");
        },
      },
      {
        label: selectedProject.projectName,
        command: () => {
          //history.push("/project/");
        }
      },
      {
        label: "Settings"
      },


    ];

    return (
      <div><Toast ref={toast} />
        <br />
        <div className="p-d-flex">
          <div className="p-mr-2">
            {/* <Menu model={sideMenuItems} /> */}
          </div>
          <div className="p-mr-2" style={{ width: "100vw" }}>
            <div className="p-d-flex p-flex-column">
              <div className="p-mb-2">
                <BreadCrumb model={breadCrumbItems} />
              </div>
              <div className="p-mb-2">
                <SectionHeading
                  icon="icon icon-common icon-cog"
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
                <Divider align="left" type="dashed">
                  <div className="p-d-inline-flex p-ai-center">
                    <h2 style={{ color: "#1B4F72" }}>General</h2>
                  </div>
                </Divider>
                <ProjectSettingsGeneralInformation project={selectedProject} />

              </div>

              <div className="p-mb-2">
                <Divider align="left" type="dashed">
                  <div className="p-d-inline-flex p-ai-center">
                    <h2 style={{ color: "#1B4F72" }}>Dates</h2>
                  </div>
                </Divider>
                <ProjectSettingsDates project={selectedProject} />

              </div>

              <div className="p-mb-2">
                <Divider align="left" type="dashed">
                  <div className="p-d-inline-flex p-ai-center">
                    <h2 style={{ color: "#1B4F72" }}>Descriptions</h2>
                  </div>
                </Divider>
                <ProjectSettingsDescriptions project={selectedProject} />

              </div>

              <div className="p-mb-2">
                <Divider align="left" type="dashed">
                  <div className="p-d-inline-flex p-ai-center">
                    <h2 style={{ color: "#1B4F72" }}>Priority</h2>
                  </div>
                </Divider>
                <ProjectSettingsPriority project={selectedProject} />

              </div>


              <div className="p-mb-2">
                <Divider align="left" type="dashed">
                  <div className="p-d-inline-flex p-ai-center">
                    <h2 style={{ color: "#B7950B" }}>Lifecycle</h2>
                  </div>
                </Divider>
                <ProjectSettingsTerminate project={selectedProject} />



                {/* <ProjectSettingsGeneralInformation project={selectedProject} /> */}

              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }


  return <FailedLoading />






}

export default observer(ProjectSettings);