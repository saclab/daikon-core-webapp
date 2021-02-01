import React, { useState, useRef, useEffect } from "react";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";

import cssClass from "./GenomePromote.module.css";
import GenomePromoteFormTarget from "./GenomePromoteFormTarget/GenomePromoteFormTarget";
import GenomePromoteFormImpactOfChemInhibit from "./GenomePromoteFormImpactOfChemInhibit/GenomePromoteFormImpactOfChemInhibit";
import GenomePromoteFormChemicalInhibition from "./GenomePromoteFormChemicalInhibition/GenomePromoteFormChemicalInhibition";
import GenomePromoteFormImpactOfGeneticInhibit from "./GenomePromoteFormImpactOfGeneticInhibit/GenomePromoteFormImpactOfGeneticInhibit";
import GenomePromoteFormLiabilities from "./GenomePromoteFormLiabilities/GenomePromoteFormLiabilities";
import GenomePromoteFormTractability from "./GenomePromoteFormTractability/GenomePromoteFormTractability";
import GenomePromoteFormInteractions from "./GenomePromoteFormInteractions/GenomePromoteFormInteractions";
import GenomePromoteBucketScore from "./GenomePromoteBucketScore/GenomePromoteBucketScore";

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

  let formData = {
    activeIndex: 0,
    genomePromoteFormTarget: null,
    genomePromoteFormImpactOfChemInhibit: null,
    genomePromoteFormChemicalInhibition: null,
    genomePromoteFormImpactOfGeneticInhibit: null,
    genomePromoteFormLiabilities: null,
    genomePromoteFormTractability: null,
    genomePromoteFormInteractions: null,
  };

  const [formDataState, setFormDataState] = useState(formData);

  const setFormData = (activeIndex, formName, data) => {
    let newFormData = { ...formDataState };
    newFormData.activeIndex = activeIndex;
    newFormData[formName] = { ...data };
    setFormDataState(newFormData);
    console.log(formDataState);
  };

  let formToDisplay = () => {
    switch (formDataState.activeIndex) {
      case 0:
        return (
          <GenomePromoteFormTarget
            onFormSet={(data) =>
              setFormData(1, "GenomePromoteFormTarget", data)
            }
          />
        );

      case 1:
        return (
          <GenomePromoteFormImpactOfChemInhibit
            onFormSet={(data) =>
              setFormData(2, "GenomePromoteFormImpactOfChemInhibit", data)
            }
          />
        );

      case 2:
        return (
          <GenomePromoteFormChemicalInhibition
            onFormSet={(data) =>
              setFormData(3, "GenomePromoteFormChemicalInhibition", data)
            }
          />
        );

      case 3:
        return (
          <GenomePromoteFormImpactOfGeneticInhibit
            onFormSet={(data) =>
              setFormData(4, "GenomePromoteFormImpactOfGeneticInhibit", data)
            }
          />
        );

      case 4:
        return (
          <GenomePromoteFormLiabilities
            onFormSet={(data) =>
              setFormData(5, "GenomePromoteFormLiabilities", data)
            }
          />
        );

      case 5:
        return (
          <GenomePromoteFormTractability
            onFormSet={(data) =>
              setFormData(6, "GenomePromoteFormTractability", data)
            }
          />
        );

      case 6:
        return (
          <GenomePromoteFormInteractions
            onFormSet={(data) =>
              setFormData(7, "GenomePromoteFormInteractions", data)
            }
          />
        );

        case 7:
        return (
          <GenomePromoteBucketScore />
        );

      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Toast ref={toast} />
      <div className="p-d-flex p-flex-column">
        <div className="p-mb-2">
          <h2 className="heading">Promoting Gene Rv1297 to Target</h2>
        </div>
        <div className="p-mb-2">
          <Steps model={stepItems} activeIndex={formDataState.activeIndex} />
        </div>
        <div className="p-mb-2">
          <div className={[cssClass.GenomePromoteForm].join(" ")}>
            {formToDisplay()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenomePromote;
