import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Divider } from "primereact/divider";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        <SectionHeading
          icon="icon icon-common icon-info"
          heading={" Target Promotion Info"}
          color={"#f4f4f4"}
          textColor={"#000000"}
          customButtons={[
            {
              label: "Edit",
              action: () => navigate("edit/"),
            },
          ]}
        />
        <div className="flex w-full">
          <div>
            <div>
              <div className="card">
                <h4
                  style={{
                    background: "#cccccc",
                    height: "1.5rem",
                    margin: "1rem",
                  }}
                >
                  Impact of chemical inhibition
                </h4>

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
                <h4 style={{ background: "#cccccc", height: "1.6rem" }}>
                  Chemical inhibition
                </h4>
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
                <h4 style={{ background: "#cccccc", height: "1.6rem" }}>
                  Impact of genetic inhibition
                </h4>
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
                <h4 style={{ background: "#cccccc", height: "1.6rem" }}>
                  Liabilities
                </h4>

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
              <div className="card">
                <h4 style={{ background: "#cccccc", height: "1.6rem" }}>
                  Tractability
                </h4>
                <h5>a) High throughput screening feasibility</h5>

                <GenePromoteSummaryAnswers
                  oKey="6a1"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6a2"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6a3"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6a4"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6a5"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6a6"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6a7"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <h5>b) Structure based feasibility</h5>
                <GenePromoteSummaryAnswers
                  oKey="6b1"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6b2"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6b3"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6b4"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6b5"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <h5>c) Progressibility considerations</h5>
                <GenePromoteSummaryAnswers
                  oKey="6c1"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6c2"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6c3"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6c4"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6c5"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6c6"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <h5>d) Safety considerations</h5>
                <GenePromoteSummaryAnswers
                  oKey="6d1"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6d2"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6d3"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="6d4"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <Divider />
              </div>
              <div className="card">
                <h4 style={{ background: "#cccccc", height: "1.6rem" }}>
                  Interaction with other drugs/compounds
                </h4>
                <h5>a) Chemical inhibition during growth in vitro</h5>

                <GenePromoteSummaryAnswers
                  oKey="7a1"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="7a2"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <h5>b) Chemical inhibition during infection</h5>
                <GenePromoteSummaryAnswers
                  oKey="7b1"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="7b2"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <h5>c) Genetic inhibition during infection</h5>
                <GenePromoteSummaryAnswers
                  oKey="7c1"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="7c2"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <h5>d) Genetic inhibition during infection</h5>
                <GenePromoteSummaryAnswers
                  oKey="7d1"
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />

                <GenePromoteSummaryAnswers
                  oKey="7d2"
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
