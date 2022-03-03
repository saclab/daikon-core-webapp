import React from "react";
import FDate from "../../../../../app/common/FDate/FDate";

const FHAStatus = ({ project }) => {
  return (
    <div>
      <div>
        <p>
          FHA Status :{" "}
          <b>{project.currentStage === "FHA" ? "Ongoing" : "Complete"}</b>
        </p>
        <p>
          FHA Start Date:{" "}
          <b>
            <FDate timestamp={project.fhaStart} hideTime={true} />
          </b>
        </p>
        <p>
          {project.currentStage === "FHA" ? (
            <>
              LO Predicted Start:{" "}
              <b>
                <FDate timestamp={project.loPredictedStart} hideTime={true} />
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
