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

  console.log(props.promotionQuestionsRegistry);

  return (
    <div>
      <h2>Submit For Review</h2>
      <hr />
      <br />

      <div>
        <div className="card">
          <h4>Impact of chemical inhibition</h4>
          <h5>a) During infections</h5>

          <GenePromoteSummaryAnswers
            oKey="2a1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <GenePromoteSummaryAnswers
            oKey="2a1b"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="2a2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <GenePromoteSummaryAnswers
            oKey="2a3a"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="2a3b"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <GenePromoteSummaryAnswers
            oKey="2a4a"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="2a5"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <h5>b) on replication Mtb in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="2b1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <GenePromoteSummaryAnswers
            oKey="2b2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="2b4"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <h5>c) on nonreplicating Mtb in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="2c1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <GenePromoteSummaryAnswers
            oKey="2c2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="2c3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="2c4"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="2c5"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <Divider />
        </div>
        <div className="card">
          <h5>Chemical inhibition</h5>
          <p></p>

          <Divider />
        </div>
        <div className="card">
          <h5>Impact of genetic inhibition</h5>
          <p></p>

          <Divider />
        </div>
        <div className="card">
          <h5>Liabilities</h5>
          <p></p>

          <Divider />
        </div>
      </div>

      <br />
      <SplitButton
        label="Submit"
        icon="pi pi-arrow-right"
        model={nextButtonItems}
        className="p-button-success p-button-sm"
        onClick={() => {
          props.onFormSubmit();
        }}
      />
    </div>
  );
};

export default GenePromoteSummary;
