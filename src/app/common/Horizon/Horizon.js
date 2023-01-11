import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import Tree from "react-d3-tree";
import { RootStoreContext } from "../../stores/rootStore";
import FailedLoading from "../FailedLoading/FailedLoading";
import PleaseWait from "../PleaseWait/PleaseWait";
import HorizonNode from "./HorizonNode/HorizonNode";

const Horizon = ({ accessionNumber, targetName }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    generatingHorizon,
    fetchHorizon,
    fetchHorizonByAccession,
    selectedHorizon,
    horizonLength,
  } = rootStore.generalStore;

  useEffect(() => {
    if (targetName) {
      if (
        selectedHorizon === null ||
        selectedHorizon.attributes.targetName !== targetName
      ) {
        targetName && fetchHorizon(targetName);
      }
    }

    if (accessionNumber) {
      if (
        selectedHorizon === null ||
        selectedHorizon.attributes.accessionNumber !== accessionNumber
      ) {
        accessionNumber && fetchHorizonByAccession(accessionNumber);
      }
    }
  }, [
    targetName,
    accessionNumber,
    fetchHorizon,
    fetchHorizonByAccession,
    selectedHorizon,
  ]);

  if (targetName === null || targetName === "undefined") {
    return <>Nothing</>;
  }

  if (generatingHorizon) {
    return <PleaseWait />;
  }

  if (!generatingHorizon && selectedHorizon !== null) {
    const nodeSize = {
      x: 230,
      y: 200,
    };

    const textLayout = {
      textAnchor: "start",
      x: 30,
      y: -10,
    };

    let translate = {
      x: 50,
      y: (JSON.stringify(selectedHorizon).match(/[^\\]":/g).length / 2) * 8,
    };

    const foreignObjectProps = {
      width: nodeSize.x,
      height: nodeSize.y,
      x: 20,
    };

    return (
      // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
      <div>
        <div id="treeWrapper" style={{ width: "100%", height: horizonLength }}>
          <Tree
            data={selectedHorizon}
            nodeSize={nodeSize}
            //nodeSvgShape={nodeSvgShape}
            textLayout={textLayout}
            translate={translate}
            zoom="0.9"
            collapsible={false}
            allowForeignObjects
            renderCustomNodeElement={(rd3tProps) => (
              <HorizonNode
                dataObj={rd3tProps.nodeDatum}
                toggleNode={rd3tProps.toggleNode}
                foreignObjectProps={foreignObjectProps}
              />
            )}
          />
        </div>
        <div
          style={{ float: "right", marginTop: "-50px", paddingRight: "50px" }}
        >
          <h1 style={{ color: "#CCCCCC", fontStyle: "italic" }}>
            Horizon View
          </h1>
        </div>
      </div>
    );
  }

  return <FailedLoading />;
};

export default observer(Horizon);
