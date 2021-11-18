import React from "react";

import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import history from "../../../../history";
const TargetDashChart = ({ targets }) => {
  let graphData = [];

  console.log("START generating graphdata");
  console.log(targets.length);
  targets.forEach((target) => {
    graphData.push({
      id: target.geneName,
      data: [
        {
          x: target.likeScore,
          y: target.impactScore,
          guid: target.id,
        },
      ],
    });
  });
  console.log("END generating graphdata");

  console.log("Rendering graph");
  console.log(graphData.length);
  const CustomNode = ({
    node,
    x,
    y,
    size,
    color,
    blendMode,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
  }) => {
    return (
      <React.Fragment>
        <g transform={`translate(${x},${y}) rotate(45)`}>
          <circle
            r={size / 2}
            fill={color}
            style={{ mixBlendMode: blendMode }}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
          />

          <text x="15" y="0" fill="black" fontSize="smaller">
            {node.id.substring(0, node.id.length - 2)}
          </text>
        </g>
      </React.Fragment>
    );
  };

  let nodeClicked = (node, event) => {
    console.log(node);
    console.log(event);
    history.push("./" + node.data.guid);
  };

  return (
    <div style={{ height: "650px", width: "650px", marginTop: "10px" }}>
      <ResponsiveScatterPlot
        data={graphData}
        margin={{ top: 0, right: 10, bottom: 80, left: 80 }}
        xScale={{ type: "linear", min: 0, max: 1 }}
        yScale={{ type: "linear", min: 0, max: 1 }}
        blendMode="darken"
        colors="nivo"
        axisTop={null}
        axisRight={null}
        nodeSize={5}
        onClick={nodeClicked}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Likelihood Score --->",
          legendPosition: "middle",
          legendOffset: 46,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Biological Impact Score --->",
          legendPosition: "middle",
          legendOffset: -60,
        }}
        layers={[
          "grid",
          "axes",
          "nodes",
          "markers",
          "mesh",
          "legends",
          "annotations",
        ]}
        renderNode={CustomNode}
      />
    </div>
  );
};

export default TargetDashChart;
