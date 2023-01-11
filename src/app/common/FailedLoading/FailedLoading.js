import React from "react";
const FailedLoading = () => {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "small",
        display: "table",
        margin: "auto",
      }}
    >
      <i className="pi pi-exclamation-circle"></i>{" "}
      <p style={{ padding: "1em", color: "#AAAAAA" }}>
        Failed loading component.
      </p>
      <p style={{ padding: "0em", color: "#AAAAAA" }}>
        Please try re-syncing the page or if the problem persists, please report
        to an administrator.
      </p>
    </div>
  );
};

export default FailedLoading;
