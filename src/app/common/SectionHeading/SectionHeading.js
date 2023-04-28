import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import React from "react";
import Horizon from "../Horizon/Horizon";

const SectionHeading = ({
  icon,
  heading,
  strainName,
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
    let hTextColor = textColor ? textColor : "#ffffff";
    if (customButtons === undefined) customButtons = [];
    let generateCustomButtons = () => {
      return customButtons.map((button) => (
        <div
          key={button?.label || (Math.random() + 1).toString(36).substring(7)}
          className="flex"
        >
          <Button
            className={
              "p-button-outlined " + button?.className || "p-button-info"
            }
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
        className="flex align-content-center flex-wrap card-container gap-4"
        style={{ float: "right", marginLeft: "auto", paddingRight: "0.5em" }}
      >
        {strainName && (
          <div className="flex align-items-center justify-content-center">
            <h4
              style={{
                margin: "0px",
                fontWeight: "lighter",
                color: hTextColor,
              }}
            >
              / {strainName} /
            </h4>
          </div>
        )}

        <div className="flex align-items-center justify-content-center w-3rem">
          <button
            className={options.togglerClassName}
            onClick={options.onTogglerClick}
          >
            <h1
              style={{
                margin: "0px",
                fontWeight: "lighter",
                color: hTextColor,
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
        className="flex w-full flex-wrap align-content-center"
        style={{
          background: background,
          opacity: "1",
          color: "#000000",
          padding: "0.5em",
          marginBottom: "1em",
        }}
      >
        <div className="flex w-full align-content-center">
          <div className="flex">
            <h1
              style={{
                margin: "0px",
                fontWeight: "lighter",
                color: hTextColor,
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
