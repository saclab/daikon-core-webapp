import { ContextMenu } from "primereact/contextmenu";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import SmilesDrawer from "smiles-drawer";

const SmilesView = ({ smiles, width = 200, height = 200 }) => {
  const cm = useRef(null);

  let canId = smiles + Date.now() + Math.floor(Math.random() * 100);

  useEffect(() => {
    let options = { width: width, height: height, bondThickness: 1.0 };

    // Initialize the drawer to draw to canvas
    let smilesDrawer = new SmilesDrawer.Drawer(options);
    SmilesDrawer.parse(
      smiles,
      function (tree) {
        smilesDrawer.draw(tree, canId, "light", false);
      },
      function (err) {
        console.error(err);
      }
    );
  }, [height, smiles, width, canId]);

  const contextMenuItems = [
    {
      label: "Copy Smiles String",
      icon: "icon icon-conceptual icon-structures",
      command: () => {
        navigator.clipboard.writeText(smiles);
        toast.success("Copied " + smiles + " to clipboard");
      },
    },
  ];

  return (
    <div style={{ width: width, height: height }}>
      <ContextMenu model={contextMenuItems} ref={cm} />
      <canvas id={canId} onContextMenu={(e) => cm.current.show(e)} />
    </div>
  );
};

export default SmilesView;
