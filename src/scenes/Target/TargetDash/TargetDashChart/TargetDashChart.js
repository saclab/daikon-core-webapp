import React, { useState } from "react";
import { Slider } from 'primereact/slider';

import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import history from "../../../../history";
const TargetDashChart = ({ targets }) => {
  let graphData = [];

  const [likeScoreCutoff, setLikeScoreCutoff] = useState(0.02);
  const [impactScoreCutoff, setImpactScoreCutoff] = useState(0.02);


  console.log("START generating graphdata");

  targets.forEach((target) => {

    if ((target.likeScore >= likeScoreCutoff) && (target.impactScore >= impactScoreCutoff)) {
      graphData.push({
        id: target.name,
        data: [
          {
            x: target.likeScore,
            y: target.impactScore,
            guid: target.id,
          },
        ],
      });
    }

  });
  console.log("END generating graphdata");

  console.log("Rendering graph");
  console.log(graphData.length);
  const CustomNode = ({ node, onMouseEnter, onMouseMove, onMouseLeave, onClick }) => {

    console.log("Test");
    console.log(node)
    return (
      <React.Fragment>
        <g transform={`translate(${node.x},${node.y}) rotate(45)`}>
          <circle
            r={node.size / 2}
            fill={node.color}
            style={{ mixBlendMode: node.blendMode }}
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
    <div>
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
          nodeComponent={CustomNode}
        />
      </div>
      <div style={{ padding: "0px 60px 0px 60px", margin: "-40px 0px 0px 0px" }}>
        <h4><i className="icon icon-common icon-filter" /> Filters</h4>
        <h5>Likelihood Score: {likeScoreCutoff}</h5>
        <Slider min={0} max={1} step={0.01} value={likeScoreCutoff} onChange={(e) => setLikeScoreCutoff(e.value)} />
        <h5>Biological Impact Score: {impactScoreCutoff}</h5>
        <Slider min={0} max={1} step={0.01} value={impactScoreCutoff} onChange={(e) => setImpactScoreCutoff(e.value)} />
      </div>
    </div>
  );
};

export default TargetDashChart;
