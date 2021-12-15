import React from "react";

const ConfigurationMissing = () => {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "small",
        display: "table",
        margin: "auto",
      }}
    >
      <h1>TPT App</h1>
      <h1><i className="pi pi-exclamation-triangle"></i></h1>
      <p style={{ padding: "1em", color: "#AAAAAA" }}>
       / Failed loading the app /
      </p>
      <p style={{ padding: "0em", color: "#AAAAAA" }}>
        The app configuration is missing.
      </p>
    </div>
  );
};

export default ConfigurationMissing;
