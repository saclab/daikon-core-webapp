import { SplitButton } from "primereact/splitbutton";
import React from "react";
import Question from "../../../../app/common/Question/Question";

const GenePromoteFormImpactOfChemInhibit = (props) => {
  const nextButtonItems = [
    {
      label: "Save form data in browser",
      icon: "pi pi-cloud-download",
      command: () => {},
    },
    {
      label: "Reset",
      icon: "pi pi-refresh",
      command: () => {},
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
              question={props.promotionQuestionsRegistry.get("2a1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("2a1b")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field ">
            <Question
              question={props.promotionQuestionsRegistry.get("2a2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field ">
            <Question
              question={props.promotionQuestionsRegistry.get("2a3a")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field ">
            <Question
              question={props.promotionQuestionsRegistry.get("2a3b")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field ">
            <Question
              question={props.promotionQuestionsRegistry.get("2a4a")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field ">
            <Question
              question={props.promotionQuestionsRegistry.get("2a5")}
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
        <div className="fluid">
          <div className="field ">
            <Question
              question={props.promotionQuestionsRegistry.get("2b1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field ">
            <Question
              question={props.promotionQuestionsRegistry.get("2b2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field ">
            <Question
              question={props.promotionQuestionsRegistry.get("2b4")}
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
        <div className="fluid">
          <div className="field ">
            <Question
              question={props.promotionQuestionsRegistry.get("2c1")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field ">
            <Question
              question={props.promotionQuestionsRegistry.get("2c2")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field ">
            <Question
              question={props.promotionQuestionsRegistry.get("2c3")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field ">
            <Question
              question={props.promotionQuestionsRegistry.get("2c4")}
              updateObject={(e) => props.updateTargetPromotionFormValue(e)}
              readObject={props.targetPromotionFormValue}
            />
          </div>

          <div className="field ">
            <Question
              question={props.promotionQuestionsRegistry.get("2c5")}
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
                  props.onFormSet(1);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenePromoteFormImpactOfChemInhibit;
