import React from "react";
import FDate from "../../../../../app/common/FDate/FDate";

const HAStatus = ({ project }) => {
  return (
    <div>
      <div>
        <p>
          HA Status :{" "}
          <b>{project.currentStage === "HA" ? "Ongoing" : "Complete"}</b>
        </p>
        <p>
          HA Start Date:{" "}
          <b>
            <FDate timestamp={project.haStart} hideTime={true} />
          </b>
        </p>
        <p>
          {project.currentStage === "HA" ? (
            <>
              H2L Predicted Start:{" "}
              <b>
                <FDate timestamp={project.h2LPredictedStart} hideTime={true} />
              </b>
            </>
          ) : (
            "HA Complete"
          )}
        </p>
      </div>
    </div>
  );
};

export default HAStatus;
