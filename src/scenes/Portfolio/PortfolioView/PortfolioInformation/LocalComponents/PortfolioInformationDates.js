import { Timeline } from "primereact/timeline";
import dateFormat from "dateformat";
import StageTag from "../../../../../app/common/StageTag/StageTag";
import FailedLoading from "../../../../../app/common/FailedLoading/FailedLoading";

const PortfolioInformationDates = ({ project }) => {
  if (!project) return <FailedLoading />;
  let timelineEvents = [];

  if (project.fhaEnabled)
    timelineEvents.push({ stage: "FHA", date: project.fhaStart });
  if (project.h2LEnabled)
    timelineEvents.push({ stage: "H2L", date: project.h2LStart });
  if (project.loEnabled)
    timelineEvents.push({ stage: "LO", date: project.loStart });
  if (project.spEnabled)
    timelineEvents.push({ stage: "SP", date: project.spStart });

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
