import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import React from "react";
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
  projectName,
  customButtons,
}) => {
  const headerTemplate = (options) => {
    const toggleIcon = options.collapsed
      ? "icon icon-common icon-ellipsis-h"
      : "pi pi-chevron-up";
    let background = color ? color : "#332288";
    let htextColor = textColor ? textColor : "#ffffff";
    if (customButtons === undefined) customButtons = [];
    let generateCustomButtons = () => {
      return customButtons.map((button) => (
        <div
          key={button?.label || (Math.random() + 1).toString(36).substring(7)}
          className="flex"
        >
          <Button
            className="p-button-outlined p-button-info"
            label={button?.label}
            icon={button?.icon}
            onClick={button?.action}
            disabled={button?.disabled}
            loading={button?.loading}
          />
        </div>
      ));
    };

    let customButtonSet = (
      <div className="flex ml-5 gap-2">{generateCustomButtons()}</div>
    );

    let displayHorizonButton = (
      <div
        style={{ float: "right", marginLeft: "auto", paddingRight: "0.5em" }}
      >
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
        className="flex w-full"
        style={{
          background: background,
          opacity: "1",
          color: "#000000",
          padding: "0.5em",
          marginBottom: "1em",
        }}
      >
        <div className="flex card-container w-full">
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
          {customButtons.length > 0 && customButtonSet}
          {displayHorizon ? displayHorizonButton : <p />}
        </div>
      </div>
    );
  };
  return (
    <Panel
      className="w-full"
      headerTemplate={headerTemplate}
      collapsed={true}
      toggleable
    >
      <Horizon
        accessionNumber={accessionNumber}
        targetName={targetName || projectName}
      />
    </Panel>
  );
};

export default SectionHeading;
