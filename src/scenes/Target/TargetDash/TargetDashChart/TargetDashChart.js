import React from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import history from "../../../../history";
const TargetDashChart = () => {
  let data = [
    {
      id: "RpoB",
      data: [
        {
          x: 0.75,
          y: 0.9,
          guid: "aaaaa"
        },
      ],
    },
    {
      id: "birA",
      data: [
        {
          x: 0.51,
          y: 0.51,
          guid: "aaaaab"
        },
      ],
    },
    {
      id: "Pks13",
      data: [
        {
          x: 0.45,
          y: 0.65,
          guid: "aaaaac"
        },
      ],
    },
    {
      id: "PptT",
      data: [
        {
          x: 0.4,
          y: 0.6,
        },
      ],
    },
    {
      id: "AccA3",
      data: [
        {
          x: 0.26,
          y: 0.4,
        },
      ],
    },
    {
      id: "MenG/H",
      data: [
        {
          x: 0.25,
          y: 0.3,
        },
      ],
    },
    {
      id: "MDH",
      data: [
        {
          x: 0.1,
          y: 0.3,
        },
      ],
    },
    {
      id: "CyA",
      data: [
        {
          x: 0.35,
          y: 0.8,
        },
      ],
    },
  ];

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
    history.push("./"+node.data.guid);
  }

  return (
    <div style={{ height: "650px", width: "650px", marginTop:"10px"}}>
      <ResponsiveScatterPlot
        data={data}
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
          legend: "Like Score",
          legendPosition: "middle",
          legendOffset: 46,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Impact Score",
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
        annotations={[
          {
            type: "circle",
            match: { id: "PptT" },
            noteX: 50,
            noteY: 50,
            offset: 3,
            noteTextOffset: -3,
            noteWidth: 10,
            note: "an annotation",
          },
        ]}
        renderNode={CustomNode}
      />
    </div>
  );
};

export default TargetDashChart;
