import React from "react";
import { Panel } from "primereact/panel";
import Horizon from "../Horizon/Horizon";

const SectionHeading = ({
  icon,
  heading,
  sub,
  displayHorizon,
  color,
  textColor,
  accessionNumber,
  targetName,
  projectName
}) => {
  const headerTemplate = (options) => {
    const toggleIcon = options.collapsed
      ? "icon icon-common icon-ellipsis-h"
      : "pi pi-chevron-up";
    let background = color ? color : "#332288";
    let htextColor = textColor ? textColor : "#ffffff";
    let displayHorizonButton = (
      <div class="absolute right-0">
        <div className="flex pr-3">
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
        <div className="flex">
          <div className="flex">
            <h1
              style={{
                margin: "0px",
                fontWeight: "lighter",
                color: htextColor,
              }}
            >
              <i className={icon}></i> {heading}
            </h1>
          </div>
          <div className="flex">{sub}</div>
          {displayHorizon ? displayHorizonButton : <p />}
        </div>
      </div>
    );
  };
  return (
    <Panel headerTemplate={headerTemplate} collapsed={true} toggleable>
      <Horizon accessionNumber={accessionNumber} targetName={targetName || projectName} />
    </Panel>
  );
};

export default SectionHeading;
