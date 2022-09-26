import React from "react";
import { Divider } from "primereact/divider";
import { SplitButton } from "primereact/splitbutton";
import GenePromoteSummaryAnswers from "./GenePromoteSummaryAnswers/GenePromoteSummaryAnswers";

const GenePromoteSummary = (props) => {
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

  console.log(props.promotionQuestionsRegistry);

  return (
    <React.Fragment>
      <div className="flex flex-column w-full">
        <div className="flex">
          <h2>Submit For Review</h2>
        </div>

        <div className="flex flex-column">
          <h4 style={{ background: "#cccccc", height: "1.6rem" }}>
            Summary
          </h4>
        </div>
        <div className="flex flex-column">
          
          <GenePromoteSummaryAnswers
            oKey="t1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="t2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="t3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

        </div>
        <div className="flex flex-column">
          <Divider />
        </div>

        <div className="flex justify-content-end">
          <div className="flex">
            <SplitButton
              label="Submit"
              icon="pi pi-arrow-right"
              model={nextButtonItems}
              className="p-button-success"
              onClick={() => {
                props.onFormSubmit();
              }}
            />
          </div>

        </div>
      </div>
    </React.Fragment >
  );
};

export default GenePromoteSummary;
