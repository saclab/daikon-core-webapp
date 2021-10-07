import React from "react";
import Question from "../../../../app/common/Question/Question";
import { SplitButton } from "primereact/splitbutton";

const GenomePromoteFormTarget = (props) => {
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
      <div className="card">
        <h3>a) Sub module 1</h3>
        <hr />
        <div className="p-fluid">
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6a1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6a2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6a3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6a4")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6a5")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6a6")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
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
        <h3>b) Sub Module 2</h3>
        <hr />
        <div className="p-fluid">
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6b1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6b2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6b3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6b4")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
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
        <h3>c) Sub Module 3</h3>
        <hr />
        <div className="p-fluid">
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6c1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6c2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6c3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6c4")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6c5")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
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
        <h3>d) Sub Module 4</h3>
        <hr />
        <div className="p-fluid">
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6d1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6d2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6d3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("6d4")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <br />
          <div className="p-field p-grid p-jc-end">
            <div className="p-col-12 p-md-2">
              <SplitButton
                label="Next"
                icon="pi pi-arrow-right"
                model={nextButtonItems}
                className="p-button-success p-button-sm"
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

export default GenomePromoteFormTarget;
