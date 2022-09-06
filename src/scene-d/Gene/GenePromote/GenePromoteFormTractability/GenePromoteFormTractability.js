import React from "react";
import Question from "../../../../app/common/Question/Question";
import { SplitButton } from "primereact/splitbutton";

const GenePromoteFormTractability = (props) => {
  const nextButtonItems = [
    {
      label: "Back",
      icon: "pi pi-arrow-left",
      command: () => {
        props.onFormSet(3);
      },
    },
    {
      label: "Save form data in browser",
      icon: "pi pi-cloud-download",
      command: () => {
        console.log("Save form data local");
      },
    },
    {
      label: "Reset",
      icon: "pi pi-refresh",
      command: () => {
        console.log("Reset Section");
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="flex flex-column">
        <h3>a) High throughput screening feasibility</h3>
        <hr />
        <div className="fluid">
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6a1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6a2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6a3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6a4")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6a5")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6a6")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6a7")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <br />
        </div>
      </div>

      <div className="card">
        <h3>b) Structure based feasibility</h3>
        <hr />
        <div className="fluid">
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6b1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6b2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6b3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6b4")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6b5")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <br />
        </div>
      </div>

      <div className="card">
        <h3>c) Progressibility considerations</h3>
        <hr />
        <div className="fluid">
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6c1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6c2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6c3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6c4")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6c5")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6c6")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <br />
        </div>
      </div>

      <div className="card">
        <h3>d) Safety considerations</h3>
        <hr />
        <div className="fluid">
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6d1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6d2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6d3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("6d4")}
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
                  props.onFormSet(5);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenePromoteFormTractability;