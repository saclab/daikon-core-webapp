import React, { useState, useRef, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";

import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";

import cssClass from "./GenomePromote.module.css";
import GenomePromoteFormImpactOfChemInhibit from "./GenomePromoteFormImpactOfChemInhibit/GenomePromoteFormImpactOfChemInhibit";
import GenomePromoteFormChemicalInhibition from "./GenomePromoteFormChemicalInhibition/GenomePromoteFormChemicalInhibition";
import GenomePromoteFormImpactOfGeneticInhibit from "./GenomePromoteFormImpactOfGeneticInhibit/GenomePromoteFormImpactOfGeneticInhibit";
import GenomePromoteFormLiabilities from "./GenomePromoteFormLiabilities/GenomePromoteFormLiabilities";

import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading/Loading";
import GenePromoteSummary from "./GenePromoteSummary/GenePromoteSummary";
import Success from "../../../app/common/Success/Success";

const GenomePromote = ({ match }) => {
  const toast = useRef(null);
  const rootStore = useContext(RootStoreContext);

  const {
    promotionQuestionsDisplayLoading,
    getPromotionQuestions,
    promotionQuestionsRegistry,
    gene,
    fetchGene,
    submitPromotionQuestionaire,
  } = rootStore.geneStore;

  useEffect(() => {
    if (promotionQuestionsRegistry.size === 0) {
      getPromotionQuestions();
    }
    if (gene === null || gene.id !== match.params.id) {
      fetchGene(match.params.id);
    }
  }, [
    promotionQuestionsRegistry,
    getPromotionQuestions,
    gene,
    fetchGene,
    match.params.id,
  ]);

  const [formSuccess, setFormSuccess] = useState(false);

  // const [targetPromotionFormValue, setTargetPromotionFormValue] = useState({
  //   "2a1": { answerValue: "", answerDescription: "" },
  //   "2a1b": { answerValue: "", answerDescription: "" },
  //   "2a2": { answerValue: "", answerDescription: "" },
  //   "2a3a": { answerValue: "", answerDescription: "" },
  //   "2a3b": { answerValue: "", answerDescription: "" },
  //   "2a4a": { answerValue: "", answerDescription: "" },
  //   "2a5": { answerValue: "", answerDescription: "" },
  //   "2b1": { answerValue: "", answerDescription: "" },
  //   "2b2": { answerValue: "", answerDescription: "" },
  //   "2b4": { answerValue: "", answerDescription: "" },
  //   "2c1": { answerValue: "", answerDescription: "" },
  //   "2c2": { answerValue: "", answerDescription: "" },
  //   "2c3": { answerValue: "", answerDescription: "" },
  //   "2c4": { answerValue: "", answerDescription: "" },
  //   "2c5": { answerValue: "", answerDescription: "" },
  //   "3a1": { answerValue: "", answerDescription: "" },
  //   "3a2": { answerValue: "", answerDescription: "" },
  //   "3a3": { answerValue: "", answerDescription: "" },
  //   "3a4": { answerValue: "", answerDescription: "" },
  //   "3b1": { answerValue: "", answerDescription: "" },
  //   "3b2": { answerValue: "", answerDescription: "" },
  //   "4a1": { answerValue: "", answerDescription: "" },
  //   "4a2a": { answerValue: "", answerDescription: "" },
  //   "4a2b": { answerValue: "", answerDescription: "" },
  //   "4a3a": { answerValue: "", answerDescription: "" },
  //   "4a3b": { answerValue: "", answerDescription: "" },
  //   "4a4": { answerValue: "", answerDescription: "" },
  //   "4b1": { answerValue: "", answerDescription: "" },
  //   "4b2": { answerValue: "", answerDescription: "" },
  //   "4b3": { answerValue: "", answerDescription: "" },
  //   "4c1": { answerValue: "", answerDescription: "" },
  //   "4c2": { answerValue: "", answerDescription: "" },
  //   "4c3": { answerValue: "", answerDescription: "" },
  //   "4c4": { answerValue: "", answerDescription: "" },
  //   "4c5": { answerValue: "", answerDescription: "" },
  //   "5a1": { answerValue: "", answerDescription: "" },
  //   "5a2": { answerValue: "", answerDescription: "" },
  //   "5a3": { answerValue: "", answerDescription: "" },
  //   "5b1": { answerValue: "", answerDescription: "" },
  // });

  const [targetPromotionFormValue, setTargetPromotionFormValue] = useState({
    "3a2": {
      answerValue: "Yes",
      answerDescription: "p",
    },
    "2b4": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "3a1": {
      answerValue: "Yes",
      answerDescription: "p",
    },
    "2c5": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "2c4": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "2c3": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "2c2": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "2c1": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "2a4a": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "2b1": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "2a5": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "2a3b": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "2a3a": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "2a2": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "2a1b": {
      answerValue: "Yes",
      answerDescription: "p",
    },
    "3a3": {
      answerValue: "Yes",
      answerDescription: "p",
    },
    "2b2": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "3a4": {
      answerValue: "Yes",
      answerDescription: "p",
    },
    "4c1": {
      answerValue: "Active",
      answerDescription: "cdcd",
    },
    "3b2": {
      answerValue: "Yes",
      answerDescription: "p",
    },
    "5b1": {
      answerValue: "Active",
      answerDescription: "cdc",
    },
    "5a3": {
      answerValue: "Yes",
      answerDescription: "cdcd",
    },
    "5a2": {
      answerValue: "Active",
      answerDescription: "cdcd",
    },
    "5a1": {
      answerValue: "Inactive",
      answerDescription: "dc",
    },
    "4c5": {
      answerValue: "Inactive",
      answerDescription: "cdc",
    },
    "4c4": {
      answerValue: "Active",
      answerDescription: "cdcd",
    },
    "4c3": {
      answerValue: "Inactive",
      answerDescription: "cdcdc",
    },
    "4c2": {
      answerValue: "Active",
      answerDescription: "cdcd",
    },
    "4b3": {
      answerValue: "Inactive",
      answerDescription: "cdcd",
    },
    "4b2": {
      answerValue: "Active",
      answerDescription: "cdcd",
    },
    "4b1": {
      answerValue: "Inactive",
      answerDescription: "sxcc",
    },
    "4a4": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "4a3b": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "4a3a": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "4a2b": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "4a2a": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "4a1": {
      answerValue: "Active",
      answerDescription: "p",
    },
    "3b1": {
      answerValue: "Yes",
      answerDescription: "p",
    },
    "2a1": {
      answerValue: "Yes",
      answerDescription: "qwe",
    },
  });

  const updateTargetPromotionFormValue = (e) => {
    var { location, newFormValue, newField } = null;
    if (e.target.id.endsWith("Description")) {
      console.log("Description Field");
      location = e.target.id.slice(0, -11);
      newFormValue = { ...targetPromotionFormValue };
      newField = { ...newFormValue[location] };
      newField.answerDescription = e.target.value;
      newFormValue[location] = newField;
      setTargetPromotionFormValue(newFormValue);
    } else {
      location = e.target.id;
      newFormValue = { ...targetPromotionFormValue };
      newField = { ...newFormValue[location] };
      newField.answerValue = e.target.value;
      newFormValue[location] = newField;
      setTargetPromotionFormValue(newFormValue);
    }
  };

  const submitTargetPromotionFormValueForm = () => {
    var validationFail = false;
    Object.keys(targetPromotionFormValue).map((key) => {
      if (targetPromotionFormValue[key].answerValue === "") {
        validationFail = true;
      }
      if (
        !(
          targetPromotionFormValue[key].answerValue === "Unknown" ||
          targetPromotionFormValue[key].answerValue === "n/a"
        ) &&
        targetPromotionFormValue[key].answerDescription === ""
      ) {
        validationFail = true;
      }
    });

    if (validationFail) {
      toast.current.show({
        severity: "error",
        summary: "Error Submitting",
        detail: "Required fields are missing.",
        life: 3000,
      });
      return;
    }

    var data = {
      id: gene.id,
      answers: targetPromotionFormValue,
    };

    console.log(data);

    submitPromotionQuestionaire(data).then((res) => {
      if (res !== null) {
        setFormSuccess(true);
      }
    });
  };

  const stepItems = [
    { label: "Impact of chemical inhibition" },
    { label: "Chemical inhibition" },
    { label: "Impact of genetic inhibition" },
    { label: "Liabilities" },
    // { label: "Tractability" },
    // { label: "Interactions" },
    { label: "Submit" },
  ];

  const [activeForm, setActiveForm] = useState(0);

  /** Loading Overlay */
  if (promotionQuestionsDisplayLoading) {
    return <Loading />;
  }

  if (formSuccess) {
    return (
      <Success
        message={
          "The promotion request has been submitted. Once reviewed, it would be promoted to a target."
        }
      />
    );
  }

  let formToDisplay = () => {
    if (!promotionQuestionsDisplayLoading) {
      console.log(activeForm);
      switch (activeForm) {
        case 0:
          return (
            <GenomePromoteFormImpactOfChemInhibit
              promotionQuestionsRegistry={promotionQuestionsRegistry}
              targetPromotionFormValue={targetPromotionFormValue}
              updateTargetPromotionFormValue={(e) =>
                updateTargetPromotionFormValue(e)
              }
              onFormSet={(active) => setActiveForm(active)}
            />
          );

        case 1:
          return (
            <GenomePromoteFormChemicalInhibition
              promotionQuestionsRegistry={promotionQuestionsRegistry}
              targetPromotionFormValue={targetPromotionFormValue}
              updateTargetPromotionFormValue={(e) =>
                updateTargetPromotionFormValue(e)
              }
              onFormSet={(active) => setActiveForm(active)}
            />
          );

        case 2:
          return (
            <GenomePromoteFormImpactOfGeneticInhibit
              promotionQuestionsRegistry={promotionQuestionsRegistry}
              targetPromotionFormValue={targetPromotionFormValue}
              updateTargetPromotionFormValue={(e) =>
                updateTargetPromotionFormValue(e)
              }
              onFormSet={(active) => setActiveForm(active)}
            />
          );

        case 3:
          return (
            <GenomePromoteFormLiabilities
              promotionQuestionsRegistry={promotionQuestionsRegistry}
              targetPromotionFormValue={targetPromotionFormValue}
              updateTargetPromotionFormValue={(e) =>
                updateTargetPromotionFormValue(e)
              }
              onFormSet={(active) => setActiveForm(active)}
            />
          );

        case 4:
          return (
            <GenePromoteSummary
              promotionQuestionsRegistry={promotionQuestionsRegistry}
              targetPromotionFormValue={targetPromotionFormValue}
              onFormSet={(active) => setActiveForm(active)}
              onFormSubmit={submitTargetPromotionFormValueForm}
            />
          );

        // case 4:
        //   return (
        //     <GenomePromoteFormTractability
        //       promotionQuestionsRegistry={promotionQuestionsRegistry}
        //       targetPromotionFormValue={targetPromotionFormValue}
        //       updateTargetPromotionFormValue={(e) =>
        //         updateTargetPromotionFormValue(e)
        //       }
        //       onFormSet={(active) => setActiveForm(active)}
        //     />
        //   );

        // case 5:
        //   return (
        //     <GenomePromoteFormInteractions
        //       promotionQuestionsRegistry={promotionQuestionsRegistry}
        //       targetPromotionFormValue={targetPromotionFormValue}
        //       updateTargetPromotionFormValue={(e) =>
        //         updateTargetPromotionFormValue(e)
        //       }
        //       onFormSet={(active) => setActiveForm()}
        //     />
        //   );

        // case 6:
        //   return <GenomePromoteBucketScore />;

        default:
          break;
      }
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
          <Steps model={stepItems} activeIndex={activeForm} />
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

export default observer(GenomePromote);
