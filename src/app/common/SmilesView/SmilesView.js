import React, { useEffect } from "react";
import SmilesDrawer from "smiles-drawer";

const SmilesView = ({ smiles, width = 200, height = 200 }) => {
  useEffect(() => {
    let options = { width: width, height: height };

    // Initialize the drawer to draw to canvas
    let smilesDrawer = new SmilesDrawer.Drawer(options);
    SmilesDrawer.parse(
      smiles,
      function (tree) {
        smilesDrawer.draw(tree, smiles, "light", false);
      },
      function (err) {
        console.log(err);
      }
    );
  }, [height, smiles, width]);

  return (
    <React.Fragment>
      <canvas id={smiles} />
    </React.Fragment>
  );
};

export default SmilesView;
