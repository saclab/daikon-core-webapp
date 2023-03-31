import React from "react";
import SmilesView from "../SmilesView/SmilesView";

const SmilesViewWithDetails = ({ compound, width = 200, height = 200 }) => {
  return (
    <React.Fragment>
      <SmilesView
        smiles={compound.smile}
        compoundId={compound.id}
        width={width}
        height={height}
      />
    </React.Fragment>
  );
};

export default SmilesViewWithDetails;
