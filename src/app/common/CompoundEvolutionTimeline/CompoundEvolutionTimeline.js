import React, { useState, useRef, useEffect, useContext } from "react";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./CompoundEvolutionTimeline.css";
import { Chip } from "primereact/chip";
import { observer } from "mobx-react-lite";
import StageTag from "../StageTag/StageTag";
import dateFormat from "dateformat";
import SmilesView from "../SmilesView/SmilesView";
import { Divider } from "primereact/divider";
import { Sidebar } from "primereact/sidebar";
import { Message } from "primereact/message";
import CompoundEvolutionAddNew from "./CompoundEvolutionAddNew/CompoundEvolutionAddNew";
import { RootStoreContext } from "../../stores/rootStore";
import PleaseWait from "../PleaseWait/PleaseWait";
import FailedLoading from "../FailedLoading/FailedLoading";
import FDate from "../FDate/FDate";
const CompoundEvolutionTimeline = ({ project, stageFilter, disableAdd }) => {
  const [displayAddStructureForm, setdisplayAddStructureForm] = useState(false);
  const rootStore = useContext(RootStoreContext);

  const {
    loadingCompoundEvolution,
    fetchCompoundEvolution,
    selectedCompoundEvolution,
    loadingProject,
  } = rootStore.projectStore;

  useEffect(() => {
    fetchCompoundEvolution(project.id);
  }, [fetchCompoundEvolution, project]);

  if (loadingProject || loadingCompoundEvolution) {
    return <PleaseWait />;
  }

  if (!loadingProject && !loadingCompoundEvolution) {
    let evolutionData = selectedCompoundEvolution;
    if (stageFilter && selectedCompoundEvolution) {
      console.log("Stage Filter " + stageFilter);
      console.log(selectedCompoundEvolution);
      evolutionData = [
        ...selectedCompoundEvolution.filter(
          (e) => e.addedOnStage === stageFilter
        ),
      ];
      console.log(evolutionData);
    }
    const customizedContent = (item) => {
      return (
        <div className="p-d-flex">
          <div className="p-mr-2">
            <SmilesView smiles={item.compound.smile} width={300} height={300} />
          </div>
          <div className="p-mr-4 p-col-2" style={{ lineHeight: "1.5rem" }}>
            Mol Weight : {item.compound.molWeight} <br />
            Mol Area : {item.compound.molArea} <br />
            IC50 : {item.iC50} <br />
            MIC : {item.mic}
            <br />
          </div>
          <div className="p-mr-2">
            <Divider align="left">
              <div className="p-d-inline-flex p-ai-center">
                <i className="pi pi-info-circle p-mr-2"></i>
                <b>Notes</b>
              </div>
            </Divider>
            {item.notes}
          </div>
        </div>
      );
    };

    const customizedOppositeContent = (item) => {
      return (
        <Chip
          label={<FDate timestamp={item.addedOnDate} hideTime={true}/>}
          style={{ fontSize: "small" }}
        />
      );
    };

    const customizedMarker = (item) => {
      return <StageTag stage={item.addedOnStage} />;
    };

    return (
      <div className="compound-evolution-timeline">
        <Divider align="right">
          <Button
            label="Add a compound"
            icon="pi pi-plus"
            className="p-button-outlined"
            onClick={() => setdisplayAddStructureForm(true)}
            disabled={disableAdd}
          ></Button>
        </Divider>

        <Timeline
          value={evolutionData}
          className="customized-timeline"
          marker={customizedMarker}
          content={customizedContent}
          opposite={customizedOppositeContent}
        />

        <Sidebar
          visible={displayAddStructureForm}
          position="right"
          style={{ width: "30em", overflowX: "auto" }}
          blockScroll={true}
          onHide={() => setdisplayAddStructureForm(false)}
        >
          <h3>{project.projectName}| Add a compound</h3>

          <hr />
          <Message
            severity="info"
            text={`This would add a new compound to stage ${project.currentStage}`}
          />
          <br />
          <br />
          <CompoundEvolutionAddNew
            closeSidebar={() => setdisplayAddStructureForm(false)}
          />
        </Sidebar>
      </div>
    );
  }

  return <FailedLoading />;
};

export default observer(CompoundEvolutionTimeline);
