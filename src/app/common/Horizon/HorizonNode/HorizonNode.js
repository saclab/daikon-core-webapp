import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { appColors } from "../../../../colors";

const HorizonNode = (dataObj, toggleNode, foreignObjectProps) => {

  const navigate = useNavigate();

  let nodeColors = {
    gene: appColors.horizonText.gene,
    target: appColors.horizonText.target,
    screen: appColors.horizonText.screen,
    ha: appColors.horizonText.ha,
    ha: appColors.horizonText.ha,
    portfolio: appColors.horizonText.portfolio,
    postPortfolio: appColors.horizonText.postPortfolio
  }

  // let nodeColors = {
  //   gene: "#000000",
  //   target: "#000000",
  //   screen: "#000000",
  //   ha: "#000000",
  //   portfolio: "#000000",
  //   postPortfolio: "#000000"
  // }
  switch (dataObj.dataObj.name) {
    case "Gene":
      if (dataObj.dataObj.attributes.accessionNumber === "Unknown") {
        return <g></g>
      }
      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-conceptual icon-dna"
              style={{
                background: "#ffffff",
                color: nodeColors.gene,
                border: "0px solid #000000",
                fontSize: "2em",
              }}
              onClick={() => {
                navigate(`/d/gene/${dataObj.dataObj.attributes.id}`);
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="190" height="160">
            <div style={{ color: nodeColors.gene }}>
              <p >
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

    case "SimpleProtein":
      if (dataObj.dataObj.attributes.targetName === "Unknown") {
        return <g></g>
      }

      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-conceptual icon-expression"
              style={{
                background: "#ffffff",
                color: nodeColors.gene,
                border: "0px solid #000000",
                fontSize: "2em",
              }}
              onClick={() => {
                navigate(`/d/gene/${dataObj.dataObj.attributes.id}`);
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="190" height="160">
            <div style={{ color: nodeColors.gene }}>
              <p>
                <b>Protein</b>

                <br />
                {dataObj.dataObj.attributes.targetName}
              </p>
            </div>
          </foreignObject>
        </g>
      );

    case "ProteinComplex":
      let accessionDisplay = [];

      console.log(dataObj.dataObj.attributes.accessionNumbers.length);

      if (dataObj.dataObj.attributes.accessionNumbers.length > 5) {
        accessionDisplay = (
          <React.Fragment>
            <i className="icon icon-conceptual icon-dna" />{" "}
            {dataObj.dataObj.attributes.accessionNumbers[0]}
            <br />
            <i className="icon icon-conceptual icon-dna" />{" "}
            {dataObj.dataObj.attributes.accessionNumbers[1]}
            <br />
            <i className="icon icon-conceptual icon-dna" />{" "}
            {dataObj.dataObj.attributes.accessionNumbers[2]}
            <br />
            <i className="icon icon-conceptual icon-dna" />{" "}
            {dataObj.dataObj.attributes.accessionNumbers[3]}
            <br />
            <i className="icon icon-conceptual icon-dna" />{" "}
            {dataObj.dataObj.attributes.accessionNumbers[4]}
            <br />
            and {dataObj.dataObj.attributes.accessionNumbers.length - 5} others.
          </React.Fragment>
        );
      } else {
        accessionDisplay = dataObj.dataObj.attributes.accessionNumbers.map(
          (acn) => {
            return (
              <React.Fragment>
                <i className="icon icon-conceptual icon-dna" /> {acn}
                <br />
              </React.Fragment>
            );
          }
        );
      }

      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-conceptual icon-proteins"
              style={{
                background: "#ffffff",
                color: nodeColors.gene,
                border: "0px solid #000000",
                fontSize: "2em",
              }}
              onClick={() => {
                // navigate(`/d/gene/${dataObj.dataObj.attributes.id}`);
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="190" height="160">
            <div style={{ color: nodeColors.gene }}>
              <p>
                <b>Protein Complex</b>
                <br />
                {accessionDisplay}
                <br />
                {/* {dataObj.dataObj.attributes.geneName} */}
              </p>
            </div>
          </foreignObject>
        </g>
      );
    case "Target":
      if (dataObj.dataObj.attributes.targetName === "Unknown") {
        return <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-common icon-question"
              style={{
                background: "#ffffff",
                color: nodeColors.target,
                border: "0px solid #000000",
                fontSize: "2em",
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
            <div>
              <p>
                <b>Target</b> <br />
                {dataObj.dataObj.attributes.targetName}
              </p>
            </div>
          </foreignObject>
        </g>
      }
      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-common icon-target"
              style={{
                background: "#ffffff",
                color: nodeColors.target,
                border: "0px solid #000000",
                fontSize: "2em",
              }}
              onClick={() => {
                navigate(`/d/target/${dataObj.dataObj.attributes.id}`);
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
            <div style={{ color: nodeColors.target }}>
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

      if (dataObj.dataObj.attributes.screenMethod === "Phenotypic") {
        return (
          <g>
            <foreignObject x="-10" y="-30" width="40" height="50">
              <Button
                icon="icon icon-common icon-search"
                style={{
                  background: "#ffffff",
                  color: nodeColors.screen,
                  border: "0px solid #000000",
                  fontSize: "2em",
                }}
                onClick={() => {
                  navigate(`/d/screen/phenotypic/${dataObj.dataObj.attributes.link}`);
                }}
              />
            </foreignObject>
            <foreignObject x="10" y="0" width="250" height="160">
              <div style={{ color: nodeColors.screen }}>
                <p>
                  <b>Screen</b> <br />
                  {dataObj.dataObj.attributes.screenName}
                  <br />
                  <i>{dataObj.dataObj.attributes.screenMethod}</i>
                </p>
              </div>
            </foreignObject>
          </g>
        );
      }
      if (dataObj.dataObj.attributes.targetName === "Unknown") {
        return <g><foreignObject x="-10" y="-30" width="40" height="50">
          <Button
            icon="icon icon-common icon-question"
            style={{
              background: "#ffffff",
              color: nodeColors.screen,
              border: "0px solid #000000",
              fontSize: "2em",
            }}
          />
        </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
            <div>
              <p>
                <b>Screen</b> <br />
                <i>{dataObj.dataObj.attributes.screenMethod}</i>
              </p>
            </div>
          </foreignObject></g>
      }
      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-common icon-search"
              style={{
                background: "#ffffff",
                color: nodeColors.screen,
                border: "0px solid #000000",
                fontSize: "2em",
              }}
              onClick={() => {
                navigate(`/d/screen/target-based/${dataObj.dataObj.attributes.targetName}`);
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
            <div style={{ color: nodeColors.screen }}>
              <p>
                <b>Screen</b> <br />
                {dataObj.dataObj.attributes.screenName}
                <br />
                <i>{dataObj.dataObj.attributes.screenMethod}</i>
              </p>
            </div>
          </foreignObject>
        </g>
      );
    case "HA":
      var objColor = nodeColors.ha;
      if (dataObj.dataObj.attributes.status === "Terminated") {
        objColor = "#AAAAAA";
      }
      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-conceptual icon-chemical"
              style={{
                background: "#ffffff",
                color: objColor,
                border: "0px solid #000000",
                fontSize: "2em",
              }}
              onClick={() => {
                navigate(`/d/ha/${dataObj.dataObj.attributes.id}`);
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
            <div>
              <p style={{ color: objColor }}>
                <b>HA</b> <br />
                {dataObj.dataObj.attributes.projectName}<br />
                {dataObj.dataObj.attributes.status === "Terminated" ? "Terminated" : ""}
              </p>
            </div>
          </foreignObject>
        </g>
      );
    case "HA":
      var objColor = nodeColors.ha;
      if (dataObj.dataObj.attributes.status === "Terminated") {
        objColor = "#AAAAAA";
      }
      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-conceptual icon-chemical"
              style={{
                background: "#ffffff",
                color: objColor,
                border: "0px solid #000000",
                fontSize: "2em",
              }}
              onClick={() => {
                navigate(`/d/ha/${dataObj.dataObj.attributes.id}`);
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
            <div>
              <p style={{ color: objColor }}>
                <b>HA</b> <br />
                {dataObj.dataObj.attributes.projectName}<br />
                {dataObj.dataObj.attributes.status === "Terminated" ? "Terminated" : ""}
              </p>
            </div>
          </foreignObject>
        </g>
      );
    case "Portfolio":
      objColor = nodeColors.portfolio;
      if (dataObj.dataObj.attributes.status === "Terminated") {
        objColor = "#AAAAAA";
      }
      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-common icon-analyse"
              style={{
                background: "#ffffff",
                color: objColor,
                border: "0px solid #000000",
                fontSize: "2em",
              }}
              onClick={() => {
                navigate(`/d/portfolio/${dataObj.dataObj.attributes.id}`);
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
            <div>
              <p style={{ color: objColor }}>
                <b>Portfolio</b> <br />
                {dataObj.dataObj.attributes.projectName}
                <br />-
                {["H2L", "LO", "SP"].includes(
                  dataObj.dataObj.attributes.currentStage
                )
                  ? dataObj.dataObj.attributes.currentStage
                  : "Complete"}
                <br />
                {dataObj.dataObj.attributes.status === "Terminated" ? "Terminated" : ""}
              </p>
            </div>
          </foreignObject>
        </g>
      );
    case "PostPortfolio":
      objColor = nodeColors.postPortfolio;
      if (dataObj.dataObj.attributes.status === "Terminated") {
        objColor = "#AAAAAA";
      }
      return (
        <g>
          <foreignObject x="-10" y="-30" width="40" height="50">
            <Button
              icon="icon icon-common icon-drug"
              style={{
                background: "#ffffff",
                color: objColor,
                border: "0px solid #000000",
                fontSize: "2em",
              }}
              onClick={() => {
                navigate(`/d/post-portfolio/${dataObj.dataObj.attributes.id}`);
              }}
            />
          </foreignObject>
          <foreignObject x="10" y="0" width="250" height="160">
            <div>
              <p style={{ color: objColor }}>
                <b>Post Portfolio</b> <br />
                {dataObj.dataObj.attributes.projectName}
                <br />-
                {["IND", "P1"].includes(
                  dataObj.dataObj.attributes.currentStage
                )
                  ? dataObj.dataObj.attributes.currentStage
                  : "Complete"}<br />
                {dataObj.dataObj.attributes.status === "Terminated" ? "Terminated" : ""}
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
