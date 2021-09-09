import React, { useEffect, useContext } from "react";
import { Divider } from "primereact/divider";
import { observer } from "mobx-react-lite";

import GenePromoteSummaryAnswers from "../../../Gene/GenomePromote/GenePromoteSummary/GenePromoteSummaryAnswers/GenePromoteSummaryAnswers";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Loading from "../../../../app/layout/Loading/Loading";

const TargetPromotionForm = (props) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const geneStore = rootStore.geneStore;
  const targetStore = rootStore.targetStore;

  useEffect(() => {
    if (geneStore.promotionQuestionsRegistry.size === 0) {
      geneStore.getPromotionQuestions();
    }
    
    console.log(geneStore.promotionQuestionsDisplayLoading);
  }, [geneStore.getPromotionQuestions, geneStore.promotionQuestionsDisplayLoading]);

  if (geneStore.promotionQuestionsDisplayLoading) {
    <Loading />;
  }

  if (!geneStore.promotionQuestionsDisplayLoading) {
    console.log("Question Registry");
    console.log(geneStore.promotionQuestionsRegistry);

    let answers = {};
    targetStore.target.targetScorecard.targetScoreCardValues.forEach((ele) => {
      answers[ele.questionIdentification] = {
        answerValue: ele.answer,
        answerDescription: ele.description,
      };
    });

    return (
      <div>
        <div className="card">
          <h4 style={{ background: "#cccccc", height: "1.6rem" }}>
            Impact of chemical inhibition
          </h4>

          <h5>a) During infections</h5>
          <GenePromoteSummaryAnswers
            oKey="2a1"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />

          <h5>b) on replication Mtb in vitro</h5>

          <h5>c) on nonreplicating Mtb in vitro</h5>

          <Divider />
        </div>
        <div className="card">
          <h4 style={{ background: "#cccccc", height: "1.6rem" }}>
            Chemical inhibition
          </h4>
          <h5>a) in live Mtb</h5>

          <h5>b) in vitro</h5>

          <Divider />
        </div>

        <div className="card">
          <h4 style={{ background: "#cccccc", height: "1.6rem" }}>
            Impact of genetic inhibition
          </h4>
          <h5>a) During infections</h5>

          <h5>b) on replication Mtb in vitro</h5>

          <h5>c) on nonreplicating Mtb in vitro</h5>

          <Divider />
        </div>
      </div>
    );
  }

  return <Loading />
};

export default observer(TargetPromotionForm);
