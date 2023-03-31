import { observer } from "mobx-react-lite";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import Success from "../../../app/common/Success/Success";
import Loading from "../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { appColors } from "../../../colors";
import GenePromoteFormChemicalInhibition from "./GenePromoteFormChemicalInhibition/GenePromoteFormChemicalInhibition";
import GenePromoteFormImpactOfChemInhibit from "./GenePromoteFormImpactOfChemInhibit/GenePromoteFormImpactOfChemInhibit";
import GenePromoteFormImpactOfGeneticInhibit from "./GenePromoteFormImpactOfGeneticInhibit/GenePromoteFormImpactOfGeneticInhibit";
import GenePromoteFormLiabilities from "./GenePromoteFormLiabilities/GenePromoteFormLiabilities";
import GenePromoteFormTractability from "./GenePromoteFormTractability/GenePromoteFormTractability";
import GenePromoteSummary from "./GenePromoteSummary/GenePromoteSummary";
import { _defaultFormData } from "./GenePromote_helper";
import cssClass from "./GenomePromote.module.css";

const GenePromote = () => {
  const toast = useRef(null);
  const rootStore = useContext(RootStoreContext);

  const params = useParams();

  const {
    promotionQuestionsDisplayLoading,
    getPromotionQuestions,
    promotionQuestionsRegistry,
    submitPromotionQuestionaire,
    getGenePromotionDataObj,
  } = rootStore.geneStore;

  const [targetPromotionFormValue, setTargetPromotionFormValue] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [activeForm, setActiveForm] = useState(0);

  useEffect(() => {
    if (promotionQuestionsRegistry.size === 0) {
      getPromotionQuestions();
    }
  }, [promotionQuestionsRegistry, getPromotionQuestions]);

  /** Loading Overlay */
  if (promotionQuestionsDisplayLoading) {
    return <Loading />;
  }
  if (
    !promotionQuestionsDisplayLoading &&
    promotionQuestionsRegistry.size > 0 &&
    Object.keys(targetPromotionFormValue).length == 0
  ) {
    let targetNameKey = "promote_" + params.ptarget;
    let storedFormData = localStorage.getItem(targetNameKey);
    setTargetPromotionFormValue(_defaultFormData(promotionQuestionsRegistry));
    if (storedFormData !== null) {
      setTargetPromotionFormValue(JSON.parse(storedFormData));
    }
  }

  const updateTargetPromotionFormValue = (e) => {
    var location = null;
    var newFormValue = null;
    var newField = null;

    if (e.target.id.endsWith("Description")) {
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

  const saveFormToLocalStorage = () => {
    let targetNameKey = "promote_" + params.ptarget;
    localStorage.setItem(
      targetNameKey,
      JSON.stringify(targetPromotionFormValue)
    );
    toast.current.show({
      severity: "success",
      summary: "Saved Locally",
      detail: "Saved locally in browser. Please submit the form when complete.",
      life: 6000,
    });
  };

  const resetFormLocalStorage = () => {
    let targetNameKey = "promote_" + params.ptarget;
    localStorage.removeItem(targetNameKey);
    setTargetPromotionFormValue(_defaultFormData(promotionQuestionsRegistry));
    toast.current.show({
      severity: "success",
      summary: "Cleared",
      life: 3000,
    });
  };

  const submitTargetPromotionFormValueForm = () => {
    var validationFail = false;
    Object.keys(targetPromotionFormValue).map((key) => {
      if (targetPromotionFormValue[key].answer === "") {
        console.error("Validation fail, blank answer");
        console.log(targetPromotionFormValue[key]);
        validationFail = true;
      }
      if (
        !(
          targetPromotionFormValue[key].answer === "Unknown" ||
          targetPromotionFormValue[key].answer === "NA"
        ) &&
        targetPromotionFormValue[key].description === ""
      ) {
        console.error("Validation fail, blank description");
        console.log(targetPromotionFormValue[key]);
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

  if (formSuccess) {
    let targetNameKey = "promote_" + params.ptarget;
    localStorage.removeItem(targetNameKey);
    return (
      <Success
        message={"Thank you, Target WG will review & assigns a bucket."}
      />
    );
  }

  let formToDisplay = () => {
    if (!promotionQuestionsDisplayLoading) {
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
              saveFormToLocalStorage={() => saveFormToLocalStorage()}
              resetFormLocalStorage={() => resetFormLocalStorage()}
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
              saveFormToLocalStorage={() => saveFormToLocalStorage()}
              resetFormLocalStorage={() => resetFormLocalStorage()}
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
              saveFormToLocalStorage={() => saveFormToLocalStorage()}
              resetFormLocalStorage={() => resetFormLocalStorage()}
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
              saveFormToLocalStorage={() => saveFormToLocalStorage()}
              resetFormLocalStorage={() => resetFormLocalStorage()}
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
              saveFormToLocalStorage={() => saveFormToLocalStorage()}
              resetFormLocalStorage={() => resetFormLocalStorage()}
            />
          );

        case 5:
          return (
            <GenePromoteSummary
              promotionQuestionsRegistry={promotionQuestionsRegistry}
              targetPromotionFormValue={targetPromotionFormValue}
              onFormSet={(active) => setActiveForm(active)}
              onFormSubmit={submitTargetPromotionFormValueForm}
              saveFormToLocalStorage={() => saveFormToLocalStorage()}
              resetFormLocalStorage={() => resetFormLocalStorage()}
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
            heading={`Target Promotion Questionnaire for ${params.ptarget}`}
            color={appColors.sectionHeadingBg.gene}
          />
          {/* <h2 className="heading">Target Promotion Questionnaire for {params.ptarget}</h2> */}
        </div>
        <div className="flex w-full">
          <Steps
            model={stepItems}
            activeIndex={activeForm}
            className="w-full"
          />
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
