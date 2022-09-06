import React from "react";
const Unauthorized = () => {
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
        Unauthorized.
      </p>
      <p style={{ padding: "0em", color: "#AAAAAA" }}>
        Your role in the app does not have sufficient permissions to view this section.
        If you have reached this section in error please report to an administrator.
      </p>
    </div>
  );
};

export default Unauthorized;
