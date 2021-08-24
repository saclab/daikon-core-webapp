import React from "react";
import { SplitButton } from "primereact/splitbutton";
import Question from "../../../../app/common/Question/Question";

const GenomePromoteFormChemicalInhibition = (props) => {
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
        <h3>a) in live Mtb</h3>
        <hr />
        <div className="p-fluid">
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("3a1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("3a2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("3a3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
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
        <div className="p-fluid">
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("3b1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("3b2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenomePromoteFormChemicalInhibition;
