import React from "react";
import cssClass from "./HorizionNode.module.css";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

const HorizionNode = (dataObj, toggleNode, foreignObjectProps) => {
 

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
      break;
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
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
            <div>
              <p>
                <b>Target</b> <br />
                {dataObj.dataObj.attributes.accessionNumber}
                <br />
                {dataObj.dataObj.attributes.proteinName}
                <br />
                {dataObj.dataObj.attributes.bucketScore} <i className="ri-blaze-line"></i>
              </p>
            </div>
          </foreignObject>
        </g>
      );
      break;
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
      break;
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
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
          <div>
              <p>
                <b>FHA</b> <br />
                Project-X
              </p>
            </div>
          </foreignObject>
        </g>
      );
      break;
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
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
          <div>
              <p>
                <b>Portfolio</b> <br />
                Project-X
              </p>
            </div>
          </foreignObject>
        </g>
      );
      break;
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
      break;
    default:
      return (
        <g>
          <circle r={15}></circle>
        </g>
      );
  }
};

export default HorizionNode;
