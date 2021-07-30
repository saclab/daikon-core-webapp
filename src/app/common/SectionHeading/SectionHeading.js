import React from "react";
import { Panel } from "primereact/panel";

const SectionHeading = ({ icon, heading, sub, link }) => {

  const headerTemplate = (options) => {
    const toggleIcon = options.collapsed
      ? "icon icon-common icon-ellipsis-h"
      : "pi pi-chevron-up";


      let linkButton = <div
      className="p-mr-2"
      style={{ float: "right", marginLeft: "auto" }}
    >
      <button
        className={options.togglerClassName}
        onClick={options.onTogglerClick}
      >
        <h1
          style={{
            margin: "0px",
            fontWeight: "lighter",
            color: "#ffffff",
          }}
        >
          <i className={toggleIcon}></i>
        </h1>
      </button>
    </div>;

    return (
      <div
        style={{
          background: "#28477f",
          opacity: "1",
          color: "#FFFFFF",
          padding: "0.5em",
          marginBottom: "1em",
        }}
      >
        <div className="p-d-flex" style={{ width: "100%" }}>
          <div className="p-mr-2">
            <h1 style={{ margin: "0px", fontWeight: "lighter" }}>
              <i className={icon}></i> {heading}
            </h1>
          </div>
          <div className="p-mr-2">{sub}</div>
           {link?linkButton:<p />}
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
