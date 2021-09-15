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
  }, [geneStore.getPromotionQuestions, geneStore.promotionQuestionsDisplayLoading, geneStore]);

  if (geneStore.promotionQuestionsDisplayLoading) {
    <Loading />;
  }

  if (!geneStore.promotionQuestionsDisplayLoading && geneStore.promotionQuestionsRegistry.size !== 0) {
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
      <div>
        <div className="card">
          <h4 style={{background: "#cccccc", height: "1.6rem"}}>Impact of chemical inhibition</h4>

          <h5>a) During infections</h5>

          <GenePromoteSummaryAnswers
            oKey="2a1"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <GenePromoteSummaryAnswers
            oKey="2a1b"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="2a2"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <GenePromoteSummaryAnswers
            oKey="2a3a"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="2a3b"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <GenePromoteSummaryAnswers
            oKey="2a4a"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="2a5"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <h5>b) on replication Mtb in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="2b1"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <GenePromoteSummaryAnswers
            oKey="2b2"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="2b4"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <h5>c) on nonreplicating Mtb in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="2c1"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <GenePromoteSummaryAnswers
            oKey="2c2"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="2c3"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="2c4"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="2c5"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <Divider />
        </div>

        <div className="card">
          <h4 style={{background: "#cccccc", height: "1.6rem"}}>Chemical inhibition</h4>
          <h5>a) in live Mtb</h5>
          <GenePromoteSummaryAnswers
            oKey="3a1"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <GenePromoteSummaryAnswers
            oKey="3a2"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="3a3"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="3a4"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <h5>b) in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="3b1"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <GenePromoteSummaryAnswers
            oKey="3b2"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <Divider />
        </div>
        <div className="card">

          <h4 style={{background: "#cccccc", height: "1.6rem"}}>Impact of genetic inhibition</h4>
          <h5>a) During infections</h5>

          <GenePromoteSummaryAnswers
            oKey="4a1"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <GenePromoteSummaryAnswers
            oKey="4a2a"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="4a2b"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <GenePromoteSummaryAnswers
            oKey="4a3a"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="4a3b"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <GenePromoteSummaryAnswers
            oKey="4a4"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <h5>b) on replication Mtb in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="4b1"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <GenePromoteSummaryAnswers
            oKey="4b2"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="4b3"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <h5>c) on nonreplicating Mtb in vitro</h5>
          <GenePromoteSummaryAnswers
            oKey="4c1"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <GenePromoteSummaryAnswers
            oKey="4c2"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="4c3"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="4c4"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <GenePromoteSummaryAnswers
            oKey="4c5"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <Divider />
        </div>

        <div className="card">

          <h4 style={{background: "#cccccc", height: "1.6rem"}}>Liabilities</h4>

          <h5>Metabolic liabilities</h5>
          <GenePromoteSummaryAnswers
            oKey="5a1"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         

          <GenePromoteSummaryAnswers
            oKey="5a2"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          

          <h5>Genetic</h5>
          <GenePromoteSummaryAnswers
            oKey="5a3"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          

          <h5>Other</h5>
          <GenePromoteSummaryAnswers
            oKey="5b1"
            questionObj={geneStore.promotionQuestionsRegistry}
            ansObj={answers}
          />
         
          <Divider />
        </div>
      </div>

    </div>
    );
  }

  return <Loading />
};

export default observer(TargetPromotionForm);
