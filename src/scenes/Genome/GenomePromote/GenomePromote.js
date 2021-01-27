import React, { useState, useRef, useEffect } from "react";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";

import cssClass from "./GenomePromote.module.css";
import GenomePromoteFormTarget from "./GenomePromoteFormTarget/GenomePromoteFormTarget";
import GenomePromoteFormImpactOfChemInhibit from "./GenomePromoteFormImpactOfChemInhibit/GenomePromoteFormImpactOfChemInhibit";
import GenomePromoteFormChemicalInhibition from "./GenomePromoteFormChemicalInhibition/GenomePromoteFormChemicalInhibition";
import GenomePromoteFormImpactOfGeneticInhibit from "./GenomePromoteFormImpactOfGeneticInhibit/GenomePromoteFormImpactOfGeneticInhibit";

const GenomePromote = ({ params, history }) => {
  const toast = useRef(null);

  const stepItems = [
    { label: "Target" },
    { label: "Impact of chemical inhibition" },
    { label: "Chemical inhibition" },
    { label: "Impact of genetic inhibition" },
    { label: "Liabilities" },
    { label: "Tractability" },
    { label: "Interactions" },
  ];

  const activeIndex = 3;
  /* END FORMS*/

  return (
    <React.Fragment>
      <Toast ref={toast} />
      <div className="p-d-flex p-flex-column">
        <div className="p-mb-2">
          <h2 className="heading">Promoting Gene Rv1297 to Target</h2>
        </div>
        <div className="p-mb-2">
          <Steps model={stepItems} activeIndex={activeIndex}/>
        </div>
        <div className="p-mb-2">
          <div className={[cssClass.GenomePromoteForm].join(" ")}>
            {/* <GenomePromoteFormTarget /> */}
            {/* <GenomePromoteFormImpactOfChemInhibit /> */}
            {/* <GenomePromoteFormChemicalInhibition /> */}
            <GenomePromoteFormImpactOfGeneticInhibit />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenomePromote;
