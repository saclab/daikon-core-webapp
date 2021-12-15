import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import Tree from "react-d3-tree";
import { RootStoreContext } from "../../stores/rootStore";
import HorizionNode from "./HorizionNode/HorizionNode";
import PleaseWait from "../PleaseWait/PleaseWait";
import FailedLoading from "../FailedLoading/FailedLoading";

const Horizion = ({ accessionNumber }) => {
  const rootStore = useContext(RootStoreContext);
  const { generatingHorizion, fetchHorizion, selectedHorizion } =
    rootStore.generalStore;

  useEffect(() => {
    console.log("EFFECT");
    console.log(accessionNumber);
    if (
      selectedHorizion === null ||
      selectedHorizion.attributes.accessionNumber !== accessionNumber
    ) {
      accessionNumber && fetchHorizion(accessionNumber);
    }
  }, [accessionNumber, fetchHorizion, selectedHorizion]);

  if (accessionNumber === null || accessionNumber === "undefined") {
    return <>Nothing</>;
  }

  if (generatingHorizion) {
    return <PleaseWait />;
  }

  if (!generatingHorizion && selectedHorizion !== null) {
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
          data={selectedHorizion}
          nodeSize={nodeSize}
          //nodeSvgShape={nodeSvgShape}
          textLayout={textLayout}
          translate={translate}
          zoom="0.8"
          collapsible={false}
          allowForeignObjects
          renderCustomNodeElement={(rd3tProps) => (
            <HorizionNode
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

export default observer(Horizion);
