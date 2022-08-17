import React, { useRef, useEffect, useContext } from "react";
import { Divider } from 'primereact/divider';
import { Fieldset } from "primereact/fieldset";
import { BreadCrumb } from "primereact/breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Loading from '../../../../app/layout/Loading/Loading';
import SectionHeading from '../../../../app/common/SectionHeading/SectionHeading';
import FailedLoading from "../../../../app/common/FailedLoading/FailedLoading";
import ProjectSettingsGeneralInformation from "./LocalComponents/ProjectSettingsGeneralInformation";
import ProjectSettingsDates from './LocalComponents/ProjectSettingsDates';
import ProjectSettingsDescriptions from './LocalComponents/ProjectSettingsDescriptions';
import ProjectSettingsPriority from './LocalComponents/ProjectSettingsPriority';
import ProjectSettingsTerminate from "./LocalComponents/ProjectSettingsTerminate";
import { appColors } from '../../../../colors';

const ProjectSettings = ({ id, project }) => {

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  // const { user } = rootStore.userStore;
  const { loadingProject, fetchProject, selectedProject } =
    rootStore.projectStore;

  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedProject === null || selectedProject.id !== id) {
      fetchProject(id);
    }
  }, [id, selectedProject, fetchProject]);

  /* Loading Overlay */
  if (loadingProject) {
    return <Loading />;
  }

  if (
    !loadingProject &&
    selectedProject !== null &&
    selectedProject.id === id
  ) {
    const breadCrumbItems = [
      {
        label: "Project Management",
        command: () => {
          navigate("/pm/");
        },
      },
      {
        label: "Projects",
        command: () => {
          navigate("/pm/projects");
        },
      },
      { label: selectedProject.projectName },
    ];

    return (
      <React.Fragment>

        <div className="flex flex-column w-full">

          <div className="flex w-full pb-2">
            <BreadCrumb model={breadCrumbItems} />
          </div>

          <div className="flex w-full">
            <SectionHeading
              icon="icon icon-common icon-cog"
              heading={
                project.projectName +
                " | " +
                project?.currentStage
              }
              targetName={project.targetName}
              displayHorizon={true}
              color={appColors.sectionHeadingBg.portfolio}
            />
          </div>

          <div className="flex w-full gap-2">
            <div className="flex">
              <Fieldset legend="Project Information">
                <ProjectSettingsGeneralInformation project={selectedProject} />
              </Fieldset>
            </div>
            <div className="flex-column w-full">
              <div className="flex mb-2" style={{width: "50rem"}}>
                <Fieldset className="w-full" legend="Project Dates">
                  <ProjectSettingsDates project={selectedProject} />
                </Fieldset>
              </div>
              <div className="flex mb-2" style={{width: "50rem"}}>
                <Fieldset className="w-full" legend="Project Descriptions">
                  <ProjectSettingsDescriptions project={selectedProject} />
                </Fieldset>
              </div>

              <div className="flex mb-2" style={{width: "50rem"}}>
                <Fieldset className="w-full" legend="Project Team P/P">
                  <ProjectSettingsPriority project={selectedProject} />
                </Fieldset>
              </div>
              <div className="flex mb-2" style={{width: "50rem"}}>
                <Fieldset className="w-full" legend="End of Lifecycle">
                  <ProjectSettingsTerminate project={selectedProject} />
                </Fieldset>
              </div>
            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }


  return <FailedLoading />






}

export default observer(ProjectSettings);