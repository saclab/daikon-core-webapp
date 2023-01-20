import { SplitButton } from "primereact/splitbutton";
import React from "react";
import Question from "../../../../app/common/Question/Question";

const GenePromoteFormImpactOfGeneticInhibit = (props) => {
  const nextButtonItems = [
    {
      label: "Back",
      icon: "pi pi-arrow-left",
      command: () => {
        props.onFormSet(1);
      },
    },
    {
      label: "Save form data in browser",
      icon: "pi pi-cloud-download",
      command: () => {
        props.saveFormToLocalStorage();
      },
    },
    {
      label: "Reset",
      icon: "pi pi-refresh",
      command: () => {
        props.resetFormLocalStorage();
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="flex flex-column">
        <h3>a) During infections</h3>
        <hr />
        <div className="fluid">
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("4a1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("4a2a")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("4a2b")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("4a3a")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("4a3b")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("4a4")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <br />
        </div>
      </div>

      <div className="card">
        <h3>b) on replication Mtb in vitro</h3>
        <hr />
        <div className="p-fluid">
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("4b1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("4b2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("4b3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <br />
        </div>
      </div>

      <div className="card">
        <h3>c) on nonreplicating Mtb in vitro</h3>
        <hr />
        <div className="p-fluid">
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("4c1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("4c2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("4c3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("4c4")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("4c5")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <br />
          <div className="flex justify-content-end">
            <div className="flex">
              <SplitButton
                label="Next"
                icon="pi pi-arrow-right"
                model={nextButtonItems}
                className="p-button-success"
                onClick={() => {
                  props.onFormSet(3);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenePromoteFormImpactOfGeneticInhibit;
