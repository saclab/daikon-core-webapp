import { Timeline } from "primereact/timeline";
import dateFormat from "dateformat";
import StageTag from "../../../../../app/common/StageTag/StageTag";
import FailedLoading from "../../../../../app/common/FailedLoading/FailedLoading";
import FDate from "../../../../../app/common/FDate/FDate";

const PortfolioInformationDates = ({ project }) => {
  if (!project) return <FailedLoading />;
  let timelineEvents = [];

  if (project.fhaEnabled) {
    timelineEvents.push({
      stage: "FHA",
      date: project.fhaStart,
      predictedDateNextStage: project.h2LPredictedStart,
    });
  }

  if (project.h2LEnabled) {
    timelineEvents.push({
      stage: "H2L",
      date: project.h2LStart,
      predictedDateNextStage: project.loPredictedStart,
    });
    if (!project.loEnabled) {
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
    if (!project.spEnabled) {
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
    if (!project.indEnabled) {
      timelineEvents.push({
        stage: "IND",
        date: project.indPredictedStart,
        isPredicted: true,
      });
    }
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

export default PortfolioInformationDates;
