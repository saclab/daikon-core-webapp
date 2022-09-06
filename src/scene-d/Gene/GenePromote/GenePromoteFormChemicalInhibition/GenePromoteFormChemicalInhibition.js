import React from "react";
import { SplitButton } from "primereact/splitbutton";
import Question from "../../../../app/common/Question/Question";

const GenePromoteFormChemicalInhibition = (props) => {
  const nextButtonItems = [
    {
      label: "Back",
      icon: "pi pi-arrow-left",
      command: () => {
        props.onFormSet(0);
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
        <h3>a) in live Mtb</h3>
        <hr />
        <div className="fluid">
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("3a1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("3a2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("3a3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("3a4")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <br />
        </div>
      </div>
      <div className="card">
        <h3>b) in vitro</h3>
        <hr />
        <div className="fluid">
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("3b1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("3b2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="flex justify-content-end">
            <div className="flex">
              <SplitButton
                label="Next"
                icon="pi pi-arrow-right"
                model={nextButtonItems}
                className="p-button-success"
                onClick={() => {
                  props.onFormSet(2);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenePromoteFormChemicalInhibition;
