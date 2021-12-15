import { Timeline } from "primereact/timeline";
import dateFormat from "dateformat";
import StageTag from "../../../../../app/common/StageTag/StageTag";

const PortfolioInformationDates = ({ project }) => {
  let timelineEvents = [];
  timelineEvents.push({ stage: "FHA", date: project.fhaStart });
  timelineEvents.push({ stage: "H2L", date: project.h2LStart });
  timelineEvents.push({ stage: "LO", date: project.h2LStart });
  timelineEvents.push({ stage: "SP", date: project.h2LStart });

  return (
    <div style={{ lineHeight: "50%" }}>
      <h2>Timeline</h2>
      <Timeline
        value={timelineEvents}
        layout="horizontal"
        align="top"
        opposite={(item) => <StageTag stage={item.stage} />}
        content={(item) => (
          <small className="p-text-secondary">
            {dateFormat(item.date, "mmmm dS, yyyy")}
          </small>
        )}
        style={{ lineHeight: "100%" }}
      />
    </div>
  );
};

export default PortfolioInformationDates;
