import { Timeline } from "primereact/timeline";
import StageTag from "../../../../../app/common/StageTag/StageTag";
import FailedLoading from "../../../../../app/common/FailedLoading/FailedLoading";
import FDate from "../../../../../app/common/FDate/FDate";

const PostPortfolioInformationDates = ({ project }) => {
  if (!project) return <FailedLoading />;
  let timelineEvents = [];

  timelineEvents.push({
    stage: "Portfolio",
    date: project.spStart,
    predictedDateNextStage: project.h2LPredictedStart,
  });


  if (project.indEnabled) {
    timelineEvents.push({
      stage: "IND",
      date: project.indStart,
      predictedDateNextStage: project.clinicalP1PredictedStart,
    });
    if (project.status !== "Terminated" && !project.clinicalP1Enabled) {
      timelineEvents.push({
        stage: "P1",
        date: project.clinicalP1PredictedStart,
        isPredicted: true,
      });
    }
  }

  if (project.clinicalP1Enabled) {
    timelineEvents.push({
      stage: "P1",
      date: project.clinicalP1Start,
    });
  }
  if (project.status === "Terminated") {
    timelineEvents.push({
      stage: "Terminated"
    })
  }




  let generateDateItem = (item) => {
    return (
      <small className="p-text-secondary" style={{ paddingRight: "50px" }}>
        <FDate timestamp={item.date} hideTime={true} />
        {item.isPredicted ? "(*P)" : ""}
      </small>
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
          <i
            className="pi pi-times-circle"
            style={{ color: "#1F618D" }}
          ></i>
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
  );
};

export default PostPortfolioInformationDates;
