import React, { useEffect } from "react";
import SmilesDrawer from "smiles-drawer";
import SmilesView from "../../common/SmilesView/SmilesView";

const TestMolView = () => {
  return (
    <React.Fragment>
      <SmilesView
        smiles="OC1=C(C(C2=CC=CN=C2)C2=C(O)OC3=C(C=CC=C3)C2=O)C(=O)C2=C(O1)C=CC=C2"
        
      />
    </React.Fragment>
  );
};

export default TestMolView;
