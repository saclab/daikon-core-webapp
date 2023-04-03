import { observer } from "mobx-react-lite";
import { Divider } from "primereact/divider";
import React, { useContext, useEffect } from "react";

import { BreadCrumb } from "primereact/breadcrumb";
import { useNavigate } from "react-router-dom";
import EmbeddedHelp from "../../../../app/common/EmbeddedHelp/EmbeddedHelp";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import Loading from "../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { appColors } from "../../../../colors";
import GenePromoteSummaryAnswers from "../../../Gene/GenePromote/GenePromoteSummary/GenePromoteSummaryAnswers/GenePromoteSummaryAnswers";

const TargetPromotionForm = ({ data, selectedTarget }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const geneStore = rootStore.geneStore;

  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "Targets",
      command: () => {
        navigate("/d/target/");
      },
    },
    {
      label: selectedTarget.name,
      command: () => {
        navigate(`/d/target/${selectedTarget.id}`);
      },
    },
    { label: "Promotion Info" },
  ];

  useEffect(() => {
    if (geneStore.promotionQuestionsRegistry.size === 0) {
      geneStore.getPromotionQuestions();
    }

    console.log(geneStore.promotionQuestionsDisplayLoading);
  }, [
    geneStore.getPromotionQuestions,
    geneStore.promotionQuestionsDisplayLoading,
    geneStore,
  ]);

  if (geneStore.promotionQuestionsDisplayLoading || data === null) {
    return <Loading />;
  }

  if (
    !geneStore.promotionQuestionsDisplayLoading &&
    geneStore.promotionQuestionsRegistry.size !== 0
  ) {
    let answers = {};
    data.forEach((ele) => {
      answers[ele.question.identification] = {
        answer: ele.answer,
        description: ele.description,
      };
    });

    return (
      <div className="flex flex-column w-full">
        <div className="flex w-full pb-2">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-common icon-target"
            heading={selectedTarget.name}
            targetName={selectedTarget.name}
            displayHorizon={true}
            color={appColors.sectionHeadingBg.target}
          />
        </div>
        <div className="flex w-full">
          <div>
            <div>
              <div className="card">
                <EmbeddedHelp>
                  This is an example: Target Prioritization Tool implementation
                  is required by the Organization. Please refer Developer's
                  Guide
                </EmbeddedHelp>

                <GenePromoteSummaryAnswers
                  oKey="t1"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="t2"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="t3"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <Divider />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Loading />;
};

export default observer(TargetPromotionForm);
