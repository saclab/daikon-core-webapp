import { observer } from "mobx-react-lite";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GenePromoteFormChemicalInhibition from "./GenePromoteFormChemicalInhibition/GenePromoteFormChemicalInhibition";
import GenePromoteFormImpactOfGeneticInhibit from "./GenePromoteFormImpactOfGeneticInhibit/GenePromoteFormImpactOfGeneticInhibit";
import GenePromoteFormLiabilities from "./GenePromoteFormLiabilities/GenePromoteFormLiabilities";
import GenePromoteFormTractability from "./GenePromoteFormTractability/GenePromoteFormTractability";
import cssClass from "./GenomePromote.module.css";

import SectionHeading from '../../../app/common/SectionHeading/SectionHeading';
import Success from "../../../app/common/Success/Success";
import Loading from "../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { appColors } from '../../../colors';
import GenePromoteFormImpactOfChemInhibit from "./GenePromoteFormImpactOfChemInhibit/GenePromoteFormImpactOfChemInhibit";
import GenePromoteSummary from "./GenePromoteSummary/GenePromoteSummary";

const GenePromote = () => {
  const toast = useRef(null);
  const rootStore = useContext(RootStoreContext);

  const params = useParams();
  const navigate = useNavigate();

  const {
    promotionQuestionsDisplayLoading,
    getPromotionQuestions,
    promotionQuestionsRegistry,
    submitPromotionQuestionaire,
    getGenePromotionDataObj
  } = rootStore.geneStore;

  useEffect(() => {
    if (promotionQuestionsRegistry.size === 0) {
      getPromotionQuestions();
    }
  }, [
    promotionQuestionsRegistry,
    getPromotionQuestions,
    params.ptarget,
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

  /*//Test data:
  const [targetPromotionFormValue, setTargetPromotionFormValue] = useState({
    "3a2": {
      answer: "Yes",
      description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia",
    },
    "2b4": {
      answer: "Active",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
    "3a1": {
      answer: "Yes",
      description: "p",
    },
    "2c5": {
      answer: "Active",
      description: "p",
    },
    "2c4": {
      answer: "Active",
      description: "p",
    },
    "2c3": {
      answer: "Active",
      description: "p",
    },
    "2c2": {
      answer: "Active",
      description: "p",
    },
    "2c1": {
      answer: "Active",
      description: "p",
    },
    "2a4a": {
      answer: "Active",
      description: "p",
    },
    "2b1": {
      answer: "Active",
      description: "p",
    },
    "2a5": {
      answer: "Active",
      description: "p",
    },
    "2a3b": {
      answer: "Active",
      description: "p",
    },
    "2a3a": {
      answer: "Active",
      description: "p",
    },
    "2a2": {
      answer: "Active",
      description: "p",
    },
    "2a1b": {
      answer: "Yes",
      description: "p",
    },
    "3a3": {
      answer: "Yes",
      description: "p",
    },
    "2b2": {
      answer: "Active",
      description: "p",
    },
    "3a4": {
      answer: "Yes",
      description: "p",
    },
    "4c1": {
      answer: "Active",
      description: "cdcd",
    },
    "3b2": {
      answer: "Yes",
      description: "p",
    },
    "5b1": {
      answer: "Active",
      description: "cdc",
    },
    "5a3": {
      answer: "Yes",
      description: "cdcd",
    },
    "5a2": {
      answer: "Active",
      description: "cdcd",
    },
    "5a1": {
      answer: "Inactive",
      description: "dc",
    },
    "4c5": {
      answer: "Inactive",
      description: "cdc",
    },
    "4c4": {
      answer: "Active",
      description: "cdcd",
    },
    "4c3": {
      answer: "Inactive",
      description: "cdcdc",
    },
    "4c2": {
      answer: "Active",
      description: "cdcd",
    },
    "4b3": {
      answer: "Inactive",
      description: "cdcd",
    },
    "4b2": {
      answer: "Active",
      description: "cdcd",
    },
    "4b1": {
      answer: "Inactive",
      description: "sxcc",
    },
    "4a4": {
      answer: "Active",
      description: "p",
    },
    "4a3b": {
      answer: "Active",
      description: "p",
    },
    "4a3a": {
      answer: "Active",
      description: "p",
    },
    "4a2b": {
      answer: "Active",
      description: "p",
    },
    "4a2a": {
      answer: "Active",
      description: "p",
    },
    "4a1": {
      answer: "Active",
      description: "p",
    },
    "3b1": {
      answer: "Yes",
      description: "p",
    },
    "2a1": {
      answer: "Yes",
      description: "qwe",
    },
  });
  */

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
      ...getGenePromotionDataObj(),
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

    submitPromotionQuestionaire(params.ptarget, data).then((res) => {
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
            <GenePromoteFormImpactOfChemInhibit
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
            <GenePromoteFormChemicalInhibition
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
            <GenePromoteFormImpactOfGeneticInhibit
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
            <GenePromoteFormLiabilities
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
            <GenePromoteFormTractability
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
      <div className="flex flex-column w-full">
        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-conceptual icon-dna"
            heading={`Target Promotion Questionaire for ${params.ptarget}`}
            color={appColors.sectionHeadingBg.gene}
          />
          {/* <h2 className="heading">Target Promotion Questionaire for {params.ptarget}</h2> */}
        </div>
        <div className="flex w-full">
          <Steps model={stepItems} activeIndex={activeForm} className="w-full" />
        </div>
        <div className="flex w-full">
          <div className={[cssClass.GenomePromoteForm].join(" ")}>
            {formToDisplay()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(GenePromote);
