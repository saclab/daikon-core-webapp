import React from "react";
import Question from "../../../../app/common/Question/Question";
import { SplitButton } from "primereact/splitbutton";

const GenomePromoteFormLiabilities = (props) => {
  const nextButtonItems = [
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
        <h3>Metabolic liabilities</h3>
        <hr />
        <div className="p-fluid">
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("5a1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
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
        <div className="p-fluid">
          <div className="p-field p-grid">
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
        <div className="p-fluid">
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("5b1")}
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

export default GenomePromoteFormLiabilities;
