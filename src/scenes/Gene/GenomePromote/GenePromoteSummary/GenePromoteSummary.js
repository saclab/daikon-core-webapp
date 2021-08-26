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
        
          <h4 >Impact of chemical inhibition</h4>
         
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
          <h4>Chemical inhibition</h4>
          <h5>a) in live Mtb</h5>
          <GenePromoteSummaryAnswers
            oKey="3a1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <GenePromoteSummaryAnswers
            oKey="3a2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="3a3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="3a4"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <h5>b) in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="3b1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <GenePromoteSummaryAnswers
            oKey="3b2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <Divider />
        </div>
        <div className="card">
          <h4>Impact of genetic inhibition</h4>
          <h5>a) During infections</h5>

          <GenePromoteSummaryAnswers
            oKey="4a1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <GenePromoteSummaryAnswers
            oKey="4a2a"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="4a2b"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <GenePromoteSummaryAnswers
            oKey="4a3a"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="4a3b"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <GenePromoteSummaryAnswers
            oKey="4a4"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <h5>b) on replication Mtb in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="4b1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <GenePromoteSummaryAnswers
            oKey="4b2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="4b3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <h5>c) on nonreplicating Mtb in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="4c1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <GenePromoteSummaryAnswers
            oKey="4c2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="4c3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="4c4"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <GenePromoteSummaryAnswers
            oKey="4c5"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <Divider />
        </div>

        <div className="card">
          <h4>Liabilities</h4>
          <h5>Metabolic liabilities</h5>
          <GenePromoteSummaryAnswers
            oKey="5a1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />

          <GenePromoteSummaryAnswers
            oKey="5a2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <Divider />
          <h5>Genetic</h5>
          <GenePromoteSummaryAnswers
            oKey="5a3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
          <Divider />
          <h5>Other</h5>
          <GenePromoteSummaryAnswers
            oKey="5b1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
          <br />
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
