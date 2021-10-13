import React from "react";
import { Panel } from "primereact/panel";

const SectionHeading = ({ icon, heading, sub, link, color, textColor }) => {
  const headerTemplate = (options) => {
    const toggleIcon = options.collapsed
      ? "icon icon-common icon-ellipsis-h"
      : "pi pi-chevron-up";
    let background = color ? color : "#28477f";
    let htextColor = textColor ? textColor : "#ffffff";
    let linkButton = (
      <div className="p-mr-2" style={{ float: "right", marginLeft: "auto" }}>
        <button
          className={options.togglerClassName}
          onClick={options.onTogglerClick}
        >
          <h1
            style={{
              margin: "0px",
              fontWeight: "lighter",
              color: htextColor,
            }}
          >
            <i className={toggleIcon}></i>
          </h1>
        </button>
      </div>
    );

    return (
      <div
        style={{
          background: background,
          opacity: "1",
          color: "#FFFFFF",
          padding: "0.5em",
          marginBottom: "1em",
        }}
      >
        <div className="p-d-flex" style={{ minWidth: "70em" }}>
          <div className="p-mr-2">
            <h1 style={{ margin: "0px", fontWeight: "lighter", color: htextColor}}>
              <i className={icon}></i> {heading}
            </h1>
          </div>
          <div className="p-mr-2">{sub}</div>
          {link ? linkButton : <p />}
        </div>
      </div>
    );
  };
  return (
    <Panel headerTemplate={headerTemplate} collapsed={true} toggleable>
      Links
    </Panel>
  );
};

export default SectionHeading;
