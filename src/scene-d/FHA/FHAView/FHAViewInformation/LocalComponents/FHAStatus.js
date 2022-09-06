import React from "react";
import FDate from "../../../../../app/common/FDate/FDate";

const FHAStatus = ({ project }) => {
  return (
    <div>
      <div>
        <p>
          HA Status :{" "}
          <b>{project.currentStage === "FHA" ? "Ongoing" : "Complete"}</b>
        </p>
        <p>
          HA Start Date:{" "}
          <b>
            <FDate timestamp={project.fhaStart} hideTime={true} />
          </b>
        </p>
        <p>
          {project.currentStage === "FHA" ? (
            <>
              H2L Predicted Start:{" "}
              <b>
                <FDate timestamp={project.h2LPredictedStart} hideTime={true} />
              </b>
            </>
          ) : (
            "FHA Complete"
          )}
        </p>
      </div>
    </div>
  );
};

export default FHAStatus;
