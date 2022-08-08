import React from "react";
import { Fieldset } from "primereact/fieldset";
import { observer } from "mobx-react-lite";
// import SmilesView from "../../../../app/common/SmilesView/SmilesView";
import "./ScrollPanel.css";
import PleaseWait from "../../../../app/common/PleaseWait/PleaseWait";
import FailedLoading from "../../../../app/common/FailedLoading/FailedLoading";
import FHAInformationGeneralInformation from "./LocalComponents/FHAInformationGeneralInformation";
import CompoundEvolutionTimeline from "../../../../app/common/CompoundEvolutionTimeline/CompoundEvolutionTimeline";
import FHAStatus from "./LocalComponents/FHAStatus";
import FHABaseHits from "./LocalComponents/FHABaseHits";
import { appColors } from "../../../../colors";
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../../../app/common/SectionHeading/SectionHeading';
import { BreadCrumb } from 'primereact/breadcrumb';

const FHAViewInformation = ({ id, project }) => {
  const navigate = useNavigate();

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
    timelineEvents.push({ stage: "FHA", date: project.fhaStart });


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
              targetName={project.targetName}
              projectName={project.projectName}
              displayHorizon={true}
              color={appColors.sectionHeadingBg.fha}
            />
          </div>

          <div className="flex w-full">
            <div className="flex">
              <Fieldset legend="HA Information">
                <FHAInformationGeneralInformation project={project} />
              </Fieldset>
            </div>
            <div className="flex">
              <Fieldset legend="HA Status">
                <FHAStatus project={project} />
              </Fieldset>
            </div>
          </div>

          <div className="flex w-full">
            <Fieldset legend="Compound Evolution">
              <CompoundEvolutionTimeline
                project={project}
                stageFilter="HA"
                disableAdd={project.currentStage !== "FHA" ? true : false}
              />
            </Fieldset>
          </div>

          <div className="flex w-full">
            <Fieldset legend="Base Hits" className="w-full">
              <FHABaseHits project={project} />
            </Fieldset>
          </div>

        </div>

      </React.Fragment>
    );
  }

  return <FailedLoading />;
};

export default observer(FHAViewInformation);
