import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";

const Vote = () => {
  let data = [
    {
      yes: 4,
      neutral: 1,
      no: 1,
    },
  ];
  const colors = { yes: "#76D7C4", neutral: "#F7DC6F", no: "#F1948A" };
  const getColor = (bar) => colors[bar.id];
  return (
    <div
      style={{
        height: "20px",
        width: "200px",
        marginTop: "10px",
        borderRadius: "10px",
      }}
    >
      <ResponsiveBar
        data={data}
        keys={["yes", "neutral", "no"]}
        layout="horizontal"
        padding={0.0}
        valueScale={{ type: "linear" }}
        
        colors={getColor}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={null}
      />
      <p style={{ fontSize: "small" }}>
        <Button
          icon="pi pi-thumbs-up"
          className="p-button-rounded p-button-text p-button-lg"
          tooltip="Vote Yes"
          tooltipOptions={{position: 'bottom'}}
        />
        <Button
          icon="ri-emotion-normal-line"
          className="p-button-rounded p-button-text p-button-lg"
          tooltip="Vote Neutral"
          tooltipOptions={{position: 'bottom'}}
        />
        <Button
          icon="pi pi-thumbs-down"
          className="p-button-rounded p-button-text p-button-lg"
          tooltip="Vote No"
          tooltipOptions={{position: 'bottom'}}
        />
      </p>
    </div>
  );
};

export default Vote;
