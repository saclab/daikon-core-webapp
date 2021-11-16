import React, { useState } from "react";
import Tree from "react-d3-tree";
import HorizionNode from "./HorizionNode/HorizionNode";

export const Horizion = () => {
  const orgChart = {
    name: "Gene",
    attributes: {
      accessionNumber: "Rv-1234",
      geneName: "pptT",
    },
    children: [
      {
        name: "Target",
        attributes: {
          accessionNumber: "Rv-1234",
          proteinName: "PptT",
          bucketScore: "2a",
        },
        children: [
          {
            name: "Screen",
            attributes: {
              accessionNumber: "Rv-1234",
              proteinName: "pptT",
              screenName: "PptT-1",
            },
            children: [
              {
                name: "FHA",
                attributes: {
                  projectName: "project-x",
                },
                children: [
                  {
                    name: "Portfolio",
                    attributes: {
                      projectName: "project-x",
                    },
                    children: [
                      {
                        name: "PostPortfolio",
                        attributes: {
                          projectName: "project-x",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Screen",
            attributes: {
              screenName: "pptT-2",
            },
          },
        ],
      },
    ],
  };

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
    y: 100,
  };

  const initialDepth = 5;

  const nodeSvgShape = { shape: "circle", shapeProps: { r: 25 } };

  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };

  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: "100%", height: "20rem" }}>
      <Tree
        data={orgChart}
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
};
