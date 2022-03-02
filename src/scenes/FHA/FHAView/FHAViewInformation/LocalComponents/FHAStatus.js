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
          FHA Complete Date:{" "}
          <b>
            {project.currentStage === "FHA" ? (
              "-"
            ) : (
              <FDate timestamp={project.h2LStart} hideTime={true} />
            )}
          </b>
        </p>
      </div>
    </div>
  );
};

export default FHAStatus;
