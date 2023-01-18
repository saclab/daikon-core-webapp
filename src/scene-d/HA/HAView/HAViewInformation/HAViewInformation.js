import { observer } from "mobx-react-lite";
import { Fieldset } from "primereact/fieldset";
import React, { useContext } from "react";
// import SmilesView from "../../../../app/common/SmilesView/SmilesView";
import { BreadCrumb } from 'primereact/breadcrumb';
import { useNavigate } from 'react-router-dom';
import CompoundEvolutionTimeline from "../../../../app/common/CompoundEvolutionTimeline/CompoundEvolutionTimeline";
import FailedLoading from "../../../../app/common/FailedLoading/FailedLoading";
import PleaseWait from "../../../../app/common/PleaseWait/PleaseWait";
import SectionHeading from '../../../../app/common/SectionHeading/SectionHeading';
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { appColors } from "../../../../colors";
import HABaseHits from "./LocalComponents/HABaseHits";
import HAInformationGeneralInformation from "./LocalComponents/HAInformationGeneralInformation";
import HAStatus from "./LocalComponents/HAStatus";
import "./ScrollPanel.css";

const HAViewInformation = ({ id, project }) => {
  const navigate = useNavigate();

  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  if (project?.baseHits === undefined) {
    return <PleaseWait />;
  }

  if (project.baseHits !== undefined) {
    // let relatedStructures = project.baseHits.map((hit) => {
    //   return (
    //     <div style={{ minWidth: "250px", marginTop: "-20px" }}>
    //       <SmilesView smiles={hit.baseHit.compound.smile} />
    //     </div>
    //   );
    // });

    let timelineEvents = [];
    timelineEvents.push({ stage: "HA", date: project.haStart });


    const breadCrumbItems = [
      {
        label: "Hit Assessment",
        command: () => {
          navigate("/d/ha/");
        },
      },
      {
        label: project.projectName,
        command: () => {
          navigate(`/d/ha/${project.id}`);
        }
      },
      { label: "Information" },
    ];


    return (
      <React.Fragment>

        <div className="flex flex-column gap-2 w-full">

          <div className="flex w-full pb-2">
            <BreadCrumb model={breadCrumbItems} />
          </div>

          <div className="flex w-full">
            <SectionHeading
              icon="icon icon-conceptual icon-chemical"
              heading={project.projectName}
              targetName={project.targetName || project.screenName || project.projectName}
              projectName={project.projectName}
              displayHorizon={true}
              color={appColors.sectionHeadingBg.ha}
            />
          </div>

          <div className="flex w-full">
            <div className="flex">
              <Fieldset legend="HA Information">
                <HAInformationGeneralInformation project={project} />
              </Fieldset>
            </div>
            <div className="flex">
              <Fieldset legend="HA Status">
                <HAStatus project={project} />
              </Fieldset>
            </div>
          </div>

          <div className="flex w-full">
            <Fieldset legend="Compound Evolution">
              <CompoundEvolutionTimeline
                project={project}
                stageFilter="HA"
                disableAdd={project.currentStage !== "HA" ? true : false}
                enableEdit={user.roles.includes("admin")}
              />
            </Fieldset>
          </div>

          <div className="flex w-full">
            <Fieldset legend="Base Hits" className="w-full">
              <HABaseHits project={project} />
            </Fieldset>
          </div>

        </div>

      </React.Fragment>
    );
  }

  return <FailedLoading />;
};

export default observer(HAViewInformation);
