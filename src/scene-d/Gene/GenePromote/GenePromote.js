import { observer } from "mobx-react-lite";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmbeddedHelp from "../../../app/common/EmbeddedHelp/EmbeddedHelp";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import Success from "../../../app/common/Success/Success";
import Loading from "../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { appColors } from "../../../colors";
import GenePromoteSummary from "./GenePromoteSummary/GenePromoteSummary";
import cssClass from "./GenomePromote.module.css";
import PromoteSampleDoc1 from "./PromoteSampleDoc1/PromoteSampleDoc1";
import PromoteSampleDoc2 from "./PromoteSampleDoc2/PromoteSampleDoc2";

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
    getGenePromotionDataObj,
  } = rootStore.geneStore;

  useEffect(() => {
    if (promotionQuestionsRegistry.size === 0) {
      getPromotionQuestions();
    }
  }, [promotionQuestionsRegistry, getPromotionQuestions, params.ptarget]);

  const [formSuccess, setFormSuccess] = useState(false);

  const [targetPromotionFormValue, setTargetPromotionFormValue] = useState({
    t1: { answer: "", description: "" },
    t2: { answer: "", description: "" },
    t3: { answer: "", description: "" },
  });

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
    { label: "Documentation" },
    { label: "Target Values" },
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
            <PromoteSampleDoc1
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
            <PromoteSampleDoc2
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
            <GenePromoteSummary
              promotionQuestionsRegistry={promotionQuestionsRegistry}
              targetPromotionFormValue={targetPromotionFormValue}
              onFormSet={(active) => setActiveForm(active)}
              onFormSubmit={submitTargetPromotionFormValueForm}
            />
          );

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
            heading={`Target Promotion Module ${params.ptarget}`}
            color={appColors.sectionHeadingBg.gene}
          />
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
            <EmbeddedHelp>
              This is an example: Target Prioritization Tool implementation is
              required by the Organization. Please refer Developer's Guide
            </EmbeddedHelp>
            {formToDisplay()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(GenePromote);
