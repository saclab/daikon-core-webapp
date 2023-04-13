import React from "react";
import { SplitButton } from "primereact/splitbutton";
import Question from "../../../../app/common/Question/Question";

const PromoteSampleDoc1 = (props) => {
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
      <div className="flex flex-column">
        <h3>Promotion Document</h3>
        <hr />
        <div className="fluid">
          <div className="field">
            <Question
              question={props.promotionQuestionsRegistry.get("t1")}
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

export default PromoteSampleDoc1;
