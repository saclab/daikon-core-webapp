import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Divider } from "primereact/divider";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Question from "../../../../../app/common/Question/Question";
import SectionHeading from "../../../../../app/common/SectionHeading/SectionHeading";
import { TargetPromotionInfoUserSection } from "../../../../../app/common/Values/Values";
import Loading from "../../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { appColors } from "../../../../../colors";

const TargetPromotionFormEdit = ({ data, selectedTarget }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const geneStore = rootStore.geneStore;
  const { editTargetPromotionInfo, editingTargetPromotionInfo } =
    rootStore.targetStore;

  let answers = {};
  data.forEach((ele) => {
    answers[ele.question.identification] = {
      answer: ele.answer,
      description: ele.description,
    };
  });

  const [targetPromotionFormValue, setTargetPromotionFormValue] =
    useState(answers);
  const [validationFails, setValidationFails] = useState([]);

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
    {
      label: "Promotion Info",
      command: () => {
        navigate(`/d/target/${selectedTarget.id}/promotion-info`);
      },
    },
    {
      label: "Edit",
    },
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
    const updateTargetPromotionFormValue = (e) => {
      var location = null;
      var newFormValue = null;
      var newField = null;

      if (e.target.id.endsWith("Description")) {
        location = e.target.id.slice(0, -11);
        newFormValue = { ...targetPromotionFormValue };
        newField = { ...newFormValue[location] };
        newField.description = e.target.value;
        newFormValue[location] = newField;
        setTargetPromotionFormValue(newFormValue);
      } else {
        location = e.target.id;
        newFormValue = { ...targetPromotionFormValue };
        newField = { ...newFormValue[location] };
        newField.answer = e.target.value;
        newFormValue[location] = newField;
        setTargetPromotionFormValue(newFormValue);
      }

      //console.log(targetPromotionFormValue);
    };

    let sections = TargetPromotionInfoUserSection;
    let generateForm = () => {
      return sections.map((section) => {
        let generateSubsections = section.subSections.map((subSection) => {
          let generateQuestions = subSection.questions.map((questionId) => {
            return (
              <div
                key={questionId + "abc"}
                className="flex justify-content-center"
              >
                <Question
                  question={geneStore.promotionQuestionsRegistry.get(
                    questionId
                  )}
                  updateObject={(e) => updateTargetPromotionFormValue(e)}
                  readObject={targetPromotionFormValue}
                  highlightRed={validationFails.includes(questionId)}
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
              <div className="flex flex-column justify-content-center gap-2 ">
                {generateQuestions}
              </div>
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

    let submitTargetPromotionFormValueForm = () => {
      var validationFail = false;
      var t_validationFails = [];
      Object.keys(targetPromotionFormValue).map((key) => {
        if (
          targetPromotionFormValue[key].answer === "" ||
          targetPromotionFormValue[key].answer === null
        ) {
          console.error("Validation fail, blank answer");
          console.log(key);
          validationFail = true;
          t_validationFails.push(key);
        }
        if (
          !(
            targetPromotionFormValue[key].answer === "Unknown" ||
            targetPromotionFormValue[key].answer === "NA"
          ) &&
          targetPromotionFormValue[key].description === ""
        ) {
          console.error("Validation fail, blank decription");
          console.log(key);
          validationFail = true;
          t_validationFails.push(key);
        }
      });
      setValidationFails(t_validationFails);

      if (validationFail) {
        toast.error("Required fields are missing.");
        return;
      }

      var data = [];

      Object.keys(targetPromotionFormValue).map((key) => {
        if (
          answers[key].answer !== targetPromotionFormValue[key].answer ||
          answers[key].description != targetPromotionFormValue[key].description
        ) {
          data.push({
            questionId: geneStore.promotionQuestionsRegistry.get(key).id,
            answer: targetPromotionFormValue[key].answer,
            description: targetPromotionFormValue[key].description,
          });
        }
      });

      if (data.length > 0) {
        editTargetPromotionInfo(data).then(() => navigate(-1));
      } else {
        toast.info("No changes to save.");
      }

      // submitPromotionQuestionaire(params.ptarget, data).then((res) => {
      //   if (res !== null) {
      //     setFormSuccess(true);
      //   }
      // });
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
          icon="icon icon-common icon-angle-right"
          heading={" Editing Target Promotion Info"}
          color={"#fde4cf"}
          textColor={"#000000"}
          customButtons={[
            {
              label: "Cancel",
              icon: "pi pi-times",
              action: () => navigate(-1),
              disabled: editingTargetPromotionInfo,
            },
            {
              label: "Save to database",
              icon: "icon icon-common icon-database-submit",
              action: () => submitTargetPromotionFormValueForm(),
              loading: editingTargetPromotionInfo,
            },
          ]}
        />
        {/* <Question
          question={geneStore.promotionQuestionsRegistry.get("2a1")}
          updateObject={(e) => updateTargetPromotionFormValue(e)}
          readObject={targetPromotionFormValue}
          highlightRed={validationFails.includes("2a1")}
        /> */}
        <div className="flex w-full flex-column ml-2">{generateForm()}</div>
      </div>
    );
  }

  return <Loading />;
};

export default observer(TargetPromotionFormEdit);
