import React from "react";

const PortfolioInformationPriority = () => {
  return (
    <div className="p-d-flex" style={{ height: "45px" }}>
      <div
        className="p-mr-2"
        style={{ textAlign: "center", lineHeight: "0.5", width: "50%"}}
      >
        Priority
        <h3>High</h3>
      </div>
      <div
        className="p-mr-2"
        style={{ textAlign: "center", lineHeight: "0.5", width: "50%" }}
      >
        Probability
        <h3>Medium</h3>
      </div>
    </div>
  );
};

export default PortfolioInformationPriority;
