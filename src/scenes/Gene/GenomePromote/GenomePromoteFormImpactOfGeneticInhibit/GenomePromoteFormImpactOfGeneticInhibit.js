import React from "react";
import Question from "../../../../app/common/Question/Question";
import { SplitButton } from "primereact/splitbutton";

const GenomePromoteFormImpactOfGeneticInhibit = (props) => {
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
        <h3>a) During infections</h3>
        <hr />
        <div className="p-fluid">
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("4a1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("4a2a")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("4a2b")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("4a3a")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("4a3b")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="p-field p-grid">
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
        <div className="p-fluid">
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("4b1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("4b2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
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
        <div className="p-fluid">
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("4c1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("4c2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("4c3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("4c4")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <div className="p-field p-grid">
            <Question
              question={props.promotionQuestionsRegistry.get("4c5")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>
          <br />
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenomePromoteFormImpactOfGeneticInhibit;
