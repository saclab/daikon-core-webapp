import { ContextMenu } from "primereact/contextmenu";
import { Dialog } from "primereact/dialog";
import { Timeline } from "primereact/timeline";
import React, { useRef, useState } from "react";
import EmbededHelp from "../../../../../app/common/EmbededHelp/EmbededHelp";
import FailedLoading from "../../../../../app/common/FailedLoading/FailedLoading";
import FDate from "../../../../../app/common/FDate/FDate";
import PredictedDateEditor from "../../../../../app/common/PredictedDateEditor/PredictedDateEditor";
import StageTag from "../../../../../app/common/StageTag/StageTag";

const PortfolioInformationDates = ({ project }) => {
  const cm = useRef(null);
  const [displayEditContainer, setDisplayEditContainer] = useState(false);

  if (!project) return <FailedLoading />;
  let timelineEvents = [];

  if (project.haEnabled) {
    timelineEvents.push({
      stage: "HA",
      date: project.haStart,
      predictedDateNextStage: project.h2LPredictedStart,
    });
  }

  if (project.h2LEnabled) {
    timelineEvents.push({
      stage: "H2L",
      date: project.h2LStart,
      predictedDateNextStage: project.loPredictedStart,
    });
    if (project.status !== "Terminated" && !project.loEnabled) {
      timelineEvents.push({
        stage: "LO",
        date: project.loPredictedStart,
        isPredicted: true,
      });
    }
  }

  if (project.loEnabled) {
    timelineEvents.push({
      stage: "LO",
      date: project.loStart,
      predictedDateNextStage: project.spPredictedStart,
    });
    if (project.status !== "Terminated" && !project.spEnabled) {
      timelineEvents.push({
        stage: "SP",
        date: project.spPredictedStart,
        isPredicted: true,
      });
    }
  }

  if (project.spEnabled) {
    timelineEvents.push({
      stage: "SP",
      date: project.spStart,
      predictedDateNextStage: project.indPredictedStart,
    });
    if (project.status !== "Terminated" && !project.indEnabled) {
      timelineEvents.push({
        stage: "IND",
        date: project.indPredictedStart,
        isPredicted: true,
      });
    }
  }

  if (project.status === "Terminated") {
    timelineEvents.push({
      stage: "Terminated",
    });
  }

  const contextMenuItems = [
    {
      label: "Edit",
      icon: "pi pi-tablet",
      command: () => setDisplayEditContainer(true),
    },
  ];

  let headerEditDialog = () => (
    <React.Fragment>
      <i className="icon icon-common icon-database"></i> &nbsp; Editing
      Predicted Start Date
    </React.Fragment>
  );

  let generateDateItem = (item) => {
    return (
      <div onContextMenu={(e) => item.isPredicted && cm.current.show(e)}>
        <small className="p-text-secondary" style={{ paddingRight: "50px" }}>
          <FDate timestamp={item.date} hideTime={true} />
          {item.isPredicted ? "(*P)" : ""}
        </small>
      </div>
    );
  };

  const customizedMarker = (item) => {
    if (item.isPredicted) {
      return (
        <span>
          <i
            className="icon icon-common icon-dot-circle"
            style={{ color: "#D4E6F1" }}
          ></i>
        </span>
      );
    }
    if (item.stage === project.currentStage) {
      return (
        <span>
          <i
            className="icon icon-common icon-dot-circle"
            style={{ color: "#1F618D" }}
          ></i>
        </span>
      );
    }
    if (item.stage === "Terminated") {
      return (
        <span>
          <i className="pi pi-times-circle" style={{ color: "#1F618D" }}></i>
        </span>
      );
    }
    return (
      <span>
        <i
          className="icon icon-common icon-check-circle"
          style={{ color: "#1F618D" }}
        ></i>
      </span>
    );
  };

  const tagGenerator = (item) => {
    if (item.isPredicted) {
      return <StageTag stage={"Dotted"} stageName={item.stage} />;
    }
    return <StageTag stage={item.stage} />;
  };

  return (
    <>
      <div style={{ lineHeight: "50%" }}>
        <h2>Timeline</h2>
        <Timeline
          value={timelineEvents}
          layout="horizontal"
          align="top"
          opposite={(item) => tagGenerator(item)}
          content={(item) => generateDateItem(item)}
          style={{ lineHeight: "100%" }}
          marker={customizedMarker}
        />
      </div>
      <ContextMenu model={contextMenuItems} ref={cm}></ContextMenu>
      <Dialog
        header={headerEditDialog}
        visible={displayEditContainer}
        closable={true}
        draggable={true}
        style={{ width: "50vw" }}
        onHide={() => setDisplayEditContainer(false)}
      >
        <EmbededHelp>
          Project's primary organization and participating organization can
          propose a new predicted start date.
        </EmbededHelp>
        <PredictedDateEditor
          project={project}
          postSave={() => setDisplayEditContainer(false)}
        />
      </Dialog>
    </>
  );
};

export default PortfolioInformationDates;
