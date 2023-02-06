import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Divider } from "primereact/divider";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import { TargetPromotionInfoUserSection } from "../../../../app/common/Values/Values";
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

    let sections = TargetPromotionInfoUserSection;

    let generateUI = () => {
      return sections.map((section) => {
        let generateSubsections = section.subSections.map((subSection) => {
          let generateQuestions = subSection.questions.map((questionId) => {
            return (
              <div key={questionId + "abc"} className="flex">
                <GenePromoteSummaryAnswers
                  oKey={questionId}
                  questionObj={geneStore.promotionQuestionsRegistry}
                  ansObj={answers}
                />
              </div>
            );
          });
          return (
            <div
              key={subSection.topic.replace(/[^a-z0-9]/gi, "")}
              className="flex flex-column"
            >
              <div className="flex">
                <Divider allign="left" type="dashed">
                  {subSection.topic}
                </Divider>
              </div>
              <div className="flex flex-column gap-2 ">{generateQuestions}</div>
            </div>
          );
        });

        return (
          <div
            key={section.heading.replace(/[^a-z0-9]/gi, "")}
            className="flex flex-column"
          >
            <div className="flex">
              <Divider allign="left">
                <b className="font-bold">{section.heading}</b>
              </Divider>
            </div>
            {generateSubsections}
          </div>
        );
      });
    };

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
              icon: "pi pi-tablet",
              action: () => navigate("edit/"),
            },
          ]}
        />
        <div className="flex w-full flex-column">{generateUI()}</div>
      </div>
    );
  }

  return <Loading />;
};

export default observer(TargetPromotionForm);
