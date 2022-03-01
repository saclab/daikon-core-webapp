import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import KeyValList from "../../../../app/common/KeyValList/KeyValList";
import { observer } from "mobx-react-lite";
import { ScrollPanel } from "primereact/scrollpanel";
import { ScrollTop } from "primereact/scrolltop";
import SmilesView from "../../../../app/common/SmilesView/SmilesView";
import "./ScrollPanel.css";
import { Timeline } from "primereact/timeline";
import dateFormat from "dateformat";
import PleaseWait from "../../../../app/common/PleaseWait/PleaseWait";
import FailedLoading from "../../../../app/common/FailedLoading/FailedLoading";
import FHAInformationGeneralInformation from "./LocalComponents/FHAInformationGeneralInformation";
import CompoundEvolutionTimeline from "../../../../app/common/CompoundEvolutionTimeline/CompoundEvolutionTimeline";
import FHAStatus from "./LocalComponents/FHAStatus";
import FHABaseHits from "./LocalComponents/FHABaseHits";

const FHAViewInformation = ({ id, project }) => {
  if (project?.baseHits === undefined) {
    return <PleaseWait />;
  }

  if (project.baseHits !== undefined) {
    let relatedStructures = project.baseHits.map((hit) => {
      return (
        <div style={{ minWidth: "250px", marginTop: "-20px" }}>
          <SmilesView smiles={hit.baseHit.compound.smile} />
        </div>
      );
    });

    let timelineEvents = [];
    timelineEvents.push({ stage: "FHA", date: project.fhaStart });

    return (
      <div>
        {/* First div for general information and dates */}
        <div className="p-d-flex p-flex-column p-flex-md-row">
          <div className="p-mb-2 p-mr-2">
            <Fieldset legend="FHA Information">
              <FHAInformationGeneralInformation project={project} />
            </Fieldset>
          </div>
          <div className="p-mb-2 p-mr-2">
            <Fieldset legend="FHA Status">
              <FHAStatus project={project} />
            </Fieldset>
          </div>
        </div>
        {/* Second div for structure evolution */}
        <div className="p-d-flex p-flex-column p-flex-md-row">
          <div className="p-mb-2 p-mr-2">
            <Fieldset legend="Compound Evolution">
              <CompoundEvolutionTimeline
                project={project}
                stageFilter="FHA"
                disableAdd={project.currentStage !== "FHA" ? true : false}
              />
            </Fieldset>
          </div>
        </div>
        <div className="p-d-flex p-flex-column p-flex-md-row">
          <div className="p-mb-2 p-mr-2">
            <Fieldset legend="Base Hits">
              <FHABaseHits project={project} />
            </Fieldset>
          </div>
        </div>
      </div>
    );
  }

  return <FailedLoading />;
};

export default observer(FHAViewInformation);
