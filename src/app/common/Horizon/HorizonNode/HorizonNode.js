import React from "react";
import { Button } from "primereact/button";
import history from "../../../../history";

const HorizonNode = (dataObj, toggleNode, foreignObjectProps) => {
  switch (dataObj.dataObj.name) {
    case "Gene":
      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-conceptual icon-dna"
              style={{
                background: "#ffffff",
                color: "#000000",
                border: "0px solid #000000",
                fontSize: "2em",
              }}
              onClick={() => {
                history.push(`/gene/${dataObj.dataObj.attributes.id}`);
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="190" height="160">
            <div>
              <p>
                <b>Gene</b>
                <br />
                {dataObj.dataObj.attributes.accessionNumber}
                <br />
                {dataObj.dataObj.attributes.geneName}
              </p>
            </div>
          </foreignObject>
        </g>
      );
    case "Target":
      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-common icon-target"
              style={{
                background: "#ffffff",
                color: "#000000",
                border: "0px solid #000000",
                fontSize: "2em",
              }}
              onClick={() => {
                history.push(`/target/${dataObj.dataObj.attributes.id}`);
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
            <div>
              <p>
                <b>Target</b> <br />
                {dataObj.dataObj.attributes.targetName}
                <br />
                {dataObj.dataObj.attributes.targetType}
                <br />
                {dataObj.dataObj.attributes.bucketScore}{" "}
                <i className="ri-blaze-line"></i>
              </p>
            </div>
          </foreignObject>
        </g>
      );
    case "Screen":
      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-common icon-search"
              style={{
                background: "#ffffff",
                color: "#000000",
                border: "0px solid #000000",
                fontSize: "2em",
              }}
              onClick={() => {
                history.push(
                  `/screen/${dataObj.dataObj.attributes.targetName}`
                );
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
            <div>
              <p>
                <b>Screen</b> <br />
                {dataObj.dataObj.attributes.screenName}
              </p>
            </div>
          </foreignObject>
        </g>
      );
    case "FHA":
      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-conceptual icon-chemical"
              style={{
                background: "#ffffff",
                color: "#000000",
                border: "0px solid #000000",
                fontSize: "2em",
              }}
              onClick={() => {
                history.push(`/fha/${dataObj.dataObj.attributes.id}`);
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
            <div>
              <p>
                <b>FHA</b> <br />
                {dataObj.dataObj.attributes.projectName}
              </p>
            </div>
          </foreignObject>
        </g>
      );
    case "Portfolio":
      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-common icon-analyse"
              style={{
                background: "#ffffff",
                color: "#000000",
                border: "0px solid #000000",
                fontSize: "2em",
              }}
              onClick={() => {
                history.push(`/portfolio/${dataObj.dataObj.attributes.id}`);
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
            <div>
              <p>
                <b>Portfolio</b> <br />
                {dataObj.dataObj.attributes.projectName}
                <br />-
                {["H2L", "LO", "SP"].includes(
                  dataObj.dataObj.attributes.currentStage
                )
                  ? dataObj.dataObj.attributes.currentStage
                  : "Complete"}
              </p>
            </div>
          </foreignObject>
        </g>
      );
    case "PostPortfolio":
      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-common icon-drug"
              style={{
                background: "#ffffff",
                color: "#000000",
                border: "0px solid #000000",
                fontSize: "2em",
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
            <div>
              <p>
                <b>Post Portfolio</b> <br />
                Project-X
              </p>
            </div>
          </foreignObject>
        </g>
      );
    default:
      return (
        <g>
          <circle r={15}></circle>
        </g>
      );
  }
};

export default HorizonNode;
