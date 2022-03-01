import React from "react";

const FHAStatus = ({ project }) => {
  return (
    <div>
      <div>
        <p>
          FHA Status :{" "}
          <b>{project.currentStage === "FHA" ? "Ongoing" : "Complete"}</b>
        </p>
        <p>
          FHA Start Date: <b>{project.fhaStart}</b>
        </p>
        <p>
          FHA Complete Date:{" "}
          <b>{project.currentStage === "FHA" ? "-" : project.h2LStart}</b>
        </p>
      </div>
    </div>
  );
};

export default FHAStatus;
