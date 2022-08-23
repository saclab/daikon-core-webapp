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
        props.onFormSet(4);
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
            Impact of chemical inhibition
          </h4>
        </div>
        <div className="flex flex-column">
          <h5>a) During infections</h5>
          <GenePromoteSummaryAnswers
            oKey="2a1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="2a1b"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="2a2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="2a3a"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="2a3b"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="2a4a"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="2a5"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
        </div>

        <div className="flex flex-column">
          <h5>b) on replication Mtb in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="2b1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="2b2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="2b4"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
        </div>

        <div className="flex flex-column">
          <h5>c) on nonreplicating Mtb in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="2c1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="2c2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="2c3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="2c4"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="2c5"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

        </div>
        <div className="flex">
          <Divider />
        </div>

        <div className="flex flex-column">
          <h4 style={{ background: "#cccccc", height: "1.6rem" }}>
            Chemical inhibition
          </h4>
        </div>
        <div className="flex flex-column">
          <h5>a) in live Mtb</h5>
          <GenePromoteSummaryAnswers
            oKey="3a1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="3a2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="3a3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="3a4"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
        </div>

        <div className="flex flex-column">
          <h5>b) in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="3b1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="3b2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
        </div>

        <div className="flex flex-column">
          <Divider />
        </div>

        <div className="flex flex-column">
          <h4 style={{ background: "#cccccc", height: "1.6rem" }}>
            Impact of genetic inhibition
          </h4>
        </div>

        <div className="flex flex-column">
          <h5>a) During infections</h5>

          <GenePromoteSummaryAnswers
            oKey="4a1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="4a2a"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="4a2b"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="4a3a"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="4a3b"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="4a4"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
        </div>

        <div className="flex flex-column">
          <h5>b) on replication Mtb in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="4b1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="4b2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="4b3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
        </div>

        <div className="flex flex-column">
          <h5>c) on nonreplicating Mtb in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="4c1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="4c2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="4c3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="4c4"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="4c5"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
        </div>

        <div className="flex flex-column">
          <Divider />
        </div>

        <div className="flex flex-column">
          <h4 style={{ background: "#cccccc", height: "1.6rem" }}>
            Liabilities
          </h4>
        </div>

        <div className="flex flex-column">
          <h5>Metabolic liabilities</h5>
          <GenePromoteSummaryAnswers
            oKey="5a1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="5a2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <h5>Genetic</h5>
          <GenePromoteSummaryAnswers
            oKey="5a3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

        </div>

        <div className="flex flex-column">
          <h5>Other</h5>
          <GenePromoteSummaryAnswers
            oKey="5b1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
        </div>

        <div className="flex flex-column">
          <Divider />
        </div>

        <div className="flex flex-column">
          <h4 style={{ background: "#cccccc", height: "1.6rem" }}>
            Tractability
          </h4>
        </div>

        <div className="flex flex-column">
          <h5>a) High throughput screening feasibility</h5>

          <GenePromoteSummaryAnswers
            oKey="6a1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6a2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6a3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6a4"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6a5"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6a6"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6a7"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

        </div>

        <div className="flex flex-column">
          <h5>b) Structure based feasibility</h5>
          <GenePromoteSummaryAnswers
            oKey="6b1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6b2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6b3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6b4"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6b5"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

        </div>

        <div className="flex flex-column">
          <h5>c) Progressibility considerations</h5>
          <GenePromoteSummaryAnswers
            oKey="6c1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6c2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6c3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6c4"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6c5"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6c6"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />
        </div>
        <div className="flex flex-column">
          <h5>d) Safety considerations</h5>
          <GenePromoteSummaryAnswers
            oKey="6d1"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6d2"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6d3"
            questionObj={props.promotionQuestionsRegistry}
            ansObj={props.targetPromotionFormValue}
          />

          <GenePromoteSummaryAnswers
            oKey="6d4"
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
