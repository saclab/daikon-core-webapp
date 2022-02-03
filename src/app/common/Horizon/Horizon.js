import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import Tree from "react-d3-tree";
import { RootStoreContext } from "../../stores/rootStore";
import HorizonNode from "./HorizonNode/HorizonNode";
import PleaseWait from "../PleaseWait/PleaseWait";
import FailedLoading from "../FailedLoading/FailedLoading";

const Horizon = ({ targetName }) => {
  const rootStore = useContext(RootStoreContext);
  const { generatingHorizon, fetchHorizon, selectedHorizon } =
    rootStore.generalStore;

  useEffect(() => {
    console.log("EFFECT");
    console.log(targetName);
    if (
      selectedHorizon === null ||
      selectedHorizon.attributes.targetName !== targetName
    ) {
      targetName && fetchHorizon(targetName);
    }
  }, [targetName, fetchHorizon, selectedHorizon]);

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
      transform: undefined,
    };

    const translate = {
      x: 50,
      y: 130,
    };

    const foreignObjectProps = {
      width: nodeSize.x,
      height: nodeSize.y,
      x: 20,
    };

    return (
      // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
      <div id="treeWrapper" style={{ width: "100%", height: "20rem" }}>
        <Tree
          data={selectedHorizon}
          nodeSize={nodeSize}
          //nodeSvgShape={nodeSvgShape}
          textLayout={textLayout}
          translate={translate}
          zoom="0.8"
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
    );
  }

  return <FailedLoading />;
};

export default observer(Horizon);
