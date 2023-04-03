import { SplitButton } from "primereact/splitbutton";
import React from "react";
import Question from "../../../../app/common/Question/Question";

const GenePromoteFormLiabilities = (props) => {
  const nextButtonItems = [
    {
      label: "Back",
      icon: "pi pi-arrow-left",
      command: () => {
        props.onFormSet(2);
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
        <h3>Metabolic liabilities</h3>
        <hr />
        <div className="fluid">
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("5a1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("5a2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <br />
        </div>
      </div>

      <div className="card">
        <h3>Genetic</h3>
        <hr />
        <div className="fluid">
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("5a3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <br />
        </div>
      </div>

      <div className="card">
        <h3>Other</h3>
        <hr />
        <div className="fluid">
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("5b1")}
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
                  props.onFormSet(4);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenePromoteFormLiabilities;
