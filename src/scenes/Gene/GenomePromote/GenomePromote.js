import React, { useState, useRef, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";

import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";

import cssClass from "./GenomePromote.module.css";
import GenomePromoteFormImpactOfChemInhibit from "./GenomePromoteFormImpactOfChemInhibit/GenomePromoteFormImpactOfChemInhibit";
import GenomePromoteFormChemicalInhibition from "./GenomePromoteFormChemicalInhibition/GenomePromoteFormChemicalInhibition";
import GenomePromoteFormImpactOfGeneticInhibit from "./GenomePromoteFormImpactOfGeneticInhibit/GenomePromoteFormImpactOfGeneticInhibit";
import GenomePromoteFormLiabilities from "./GenomePromoteFormLiabilities/GenomePromoteFormLiabilities";
import GenomePromoteFormTractability from "./GenomePromoteFormTractability/GenomePromoteFormTractability";

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

  const [targetPromotionFormValue, setTargetPromotionFormValue] = useState({
    "2a1": { answer: "", description: "" },
    "2a1b": { answer: "", description: "" },
    "2a2": { answer: "", description: "" },
    "2a3a": { answer: "", description: "" },
    "2a3b": { answer: "", description: "" },
    "2a4a": { answer: "", description: "" },
    "2a5": { answer: "", description: "" },
    "2b1": { answer: "", description: "" },
    "2b2": { answer: "", description: "" },
    "2b4": { answer: "", description: "" },
    "2c1": { answer: "", description: "" },
    "2c2": { answer: "", description: "" },
    "2c3": { answer: "", description: "" },
    "2c4": { answer: "", description: "" },
    "2c5": { answer: "", description: "" },
    "3a1": { answer: "", description: "" },
    "3a2": { answer: "", description: "" },
    "3a3": { answer: "", description: "" },
    "3a4": { answer: "", description: "" },
    "3b1": { answer: "", description: "" },
    "3b2": { answer: "", description: "" },
    "4a1": { answer: "", description: "" },
    "4a2a": { answer: "", description: "" },
    "4a2b": { answer: "", description: "" },
    "4a3a": { answer: "", description: "" },
    "4a3b": { answer: "", description: "" },
    "4a4": { answer: "", description: "" },
    "4b1": { answer: "", description: "" },
    "4b2": { answer: "", description: "" },
    "4b3": { answer: "", description: "" },
    "4c1": { answer: "", description: "" },
    "4c2": { answer: "", description: "" },
    "4c3": { answer: "", description: "" },
    "4c4": { answer: "", description: "" },
    "4c5": { answer: "", description: "" },
    "5a1": { answer: "", description: "" },
    "5a2": { answer: "", description: "" },
    "5a3": { answer: "", description: "" },
    "5b1": { answer: "", description: "" },
    "6a1": { answer: "", description: "" },
    "6a2": { answer: "", description: "" },
    "6a3": { answer: "", description: "" },
    "6a4": { answer: "", description: "" },
    "6a5": { answer: "", description: "" },
    "6a6": { answer: "", description: "" },
    "6a7": { answer: "", description: "" },
    "6b1": { answer: "", description: "" },
    "6b2": { answer: "", description: "" },
    "6b3": { answer: "", description: "" },
    "6b4": { answer: "", description: "" },
    "6b5": { answer: "", description: "" },
    "6c1": { answer: "", description: "" },
    "6c2": { answer: "", description: "" },
    "6c3": { answer: "", description: "" },
    "6c4": { answer: "", description: "" },
    "6c5": { answer: "", description: "" },
    "6c6": { answer: "", description: "" },
    "6d1": { answer: "", description: "" },
    "6d2": { answer: "", description: "" },
    "6d3": { answer: "", description: "" },
    "6d4": { answer: "", description: "" },
  });

  // Test data:
  // const [targetPromotionFormValue, setTargetPromotionFormValue] = useState({
  //   "3a2": {
  //     answer: "Yes",
  //     description: "p",
  //   },
  //   "2b4": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "3a1": {
  //     answer: "Yes",
  //     description: "p",
  //   },
  //   "2c5": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "2c4": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "2c3": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "2c2": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "2c1": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "2a4a": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "2b1": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "2a5": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "2a3b": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "2a3a": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "2a2": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "2a1b": {
  //     answer: "Yes",
  //     description: "p",
  //   },
  //   "3a3": {
  //     answer: "Yes",
  //     description: "p",
  //   },
  //   "2b2": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "3a4": {
  //     answer: "Yes",
  //     description: "p",
  //   },
  //   "4c1": {
  //     answer: "Active",
  //     description: "cdcd",
  //   },
  //   "3b2": {
  //     answer: "Yes",
  //     description: "p",
  //   },
  //   "5b1": {
  //     answer: "Active",
  //     description: "cdc",
  //   },
  //   "5a3": {
  //     answer: "Yes",
  //     description: "cdcd",
  //   },
  //   "5a2": {
  //     answer: "Active",
  //     description: "cdcd",
  //   },
  //   "5a1": {
  //     answer: "Inactive",
  //     description: "dc",
  //   },
  //   "4c5": {
  //     answer: "Inactive",
  //     description: "cdc",
  //   },
  //   "4c4": {
  //     answer: "Active",
  //     description: "cdcd",
  //   },
  //   "4c3": {
  //     answer: "Inactive",
  //     description: "cdcdc",
  //   },
  //   "4c2": {
  //     answer: "Active",
  //     description: "cdcd",
  //   },
  //   "4b3": {
  //     answer: "Inactive",
  //     description: "cdcd",
  //   },
  //   "4b2": {
  //     answer: "Active",
  //     description: "cdcd",
  //   },
  //   "4b1": {
  //     answer: "Inactive",
  //     description: "sxcc",
  //   },
  //   "4a4": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "4a3b": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "4a3a": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "4a2b": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "4a2a": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "4a1": {
  //     answer: "Active",
  //     description: "p",
  //   },
  //   "3b1": {
  //     answer: "Yes",
  //     description: "p",
  //   },
  //   "2a1": {
  //     answer: "Yes",
  //     description: "qwe",
  //   },
  // });

  const updateTargetPromotionFormValue = (e) => {
    var location = null;
    var newFormValue = null;
    var newField = null;

    if (e.target.id.endsWith("Description")) {
      console.log("Description Field");
      location = e.target.id.slice(0, -11);
      newFormValue = { ...targetPromotionFormValue };
      newField = { ...newFormValue[location] };
      newField.description = e.target.value;
      newFormValue[location] = newField;
      setTargetPromotionFormValue(newFormValue);
    } else {
      location = e.target.id;
      newFormValue = { ...targetPromotionFormValue };
      newField = { ...newFormValue[location] };
      newField.answer = e.target.value;
      newFormValue[location] = newField;
      setTargetPromotionFormValue(newFormValue);
    }
  };

  const submitTargetPromotionFormValueForm = () => {
    var validationFail = false;
    Object.keys(targetPromotionFormValue).map((key) => {
      if (targetPromotionFormValue[key].answer === "") {
        validationFail = true;
      }
      if (
        !(
          targetPromotionFormValue[key].answer === "Unknown" ||
          targetPromotionFormValue[key].answer === "n/a"
        ) &&
        targetPromotionFormValue[key].description === ""
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
      genePromotionRequestValues: [],
    };

    Object.keys(targetPromotionFormValue).map((key) => {
      data.genePromotionRequestValues.push({
        questionId: promotionQuestionsRegistry.get(key).id,
        answer: targetPromotionFormValue[key].answer,
        description: targetPromotionFormValue[key].description,
      });
    });

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
    //{ label: "Target" },
    { label: "Tractability" },
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
            <GenomePromoteFormTractability
              promotionQuestionsRegistry={promotionQuestionsRegistry}
              targetPromotionFormValue={targetPromotionFormValue}
              updateTargetPromotionFormValue={(e) =>
                updateTargetPromotionFormValue(e)
              }
              onFormSet={(active) => setActiveForm(active)}
            />
          );

        case 5:
          return (
            <GenePromoteSummary
              promotionQuestionsRegistry={promotionQuestionsRegistry}
              targetPromotionFormValue={targetPromotionFormValue}
              onFormSet={(active) => setActiveForm(active)}
              onFormSubmit={submitTargetPromotionFormValueForm}
            />
          );

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
