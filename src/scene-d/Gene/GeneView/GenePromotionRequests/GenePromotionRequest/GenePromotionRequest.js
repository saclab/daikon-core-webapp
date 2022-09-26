import React, { useState, useContext } from "react";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { Panel } from "primereact/panel";
import { NavLink } from "react-router-dom";
import Question from "../../../../../app/common/Question/Question";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import Loading from "../../../../../app/layout/Loading/Loading";
import EmbededHelp from "../../../../../app/common/EmbededHelp/EmbededHelp";

const GenePromotionRequest = ({
  GenePromotionRequest,
  TargetName,
  AnswerRegistry,
  QuestionsRegistry,
  GeneRegistry,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { displayLoading, genePromotionRegistry, promoteGene } =
    rootStore.geneStoreAdmin;

  const questionaire = AnswerRegistry.get(TargetName);

  const [targetPromotionFormValue, setTargetPromotionFormValue] = useState(
    questionaire.answers
  );

  const updateTargetPromotionFormValue = (e) => {
    var location = null;
    var newFormValue = null;
    var newField = null;

    if (e.target.id.endsWith("Description")) {
      console.log("Description Field");
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
  };

  if (displayLoading) {
    return <Loading />;
  }

  const submitPromoteGeneForm = () => {
    var promotionReqData = {
      targetName: GenePromotionRequest.targetName,
      targetType: GenePromotionRequest.targetType,
      genePromtionRequestGenes : GenePromotionRequest.genePromtionRequestGenes,
      
      genePromotionRequestValues: [],
    };

    Object.keys(targetPromotionFormValue).map((key) => {
      promotionReqData.genePromotionRequestValues.push({
        questionId: QuestionsRegistry.get(key).id,
        answer: targetPromotionFormValue[key].answer,
        description: targetPromotionFormValue[key].description,
      });
    });

    promoteGene(promotionReqData).then((res) => {
      console.log(res);
      if (res?.id) {
        toast.success("Success. The gene has been promoted.");
        genePromotionRegistry.delete(TargetName);
      }
    });
  };

  const getGeneInformatin = () => {
    let genes = questionaire.genePromtionRequestGenes.map((gene) => {
      return (
        <NavLink to={`/d/gene/${gene.geneId}`}>
          {GeneRegistry.get(gene.geneId).accessionNumber + " "}
        </NavLink>
      );
    });

    return <React.Fragment>{genes}</React.Fragment>;
  };

  return (
    <div>
      <div className="p-d-flex p-flex-column">
        <div className="p-mr-2" style={{ minWidth: "1000px" }}>
          <Panel header="Summary" toggleable>
            <h4>Target Type : {questionaire.targetType}</h4>
            <h4>Target Name : {questionaire.targetName}</h4>
            <h4>Genes : {getGeneInformatin()}</h4>
            <h4>Submitted by : </h4>
          </Panel>
          <br />
        </div>
        <div className="p-mr-2" style={{ minWidth: "1000px" }}>
          <Panel header="Submitted Promotion Questionaire" toggleable>
            <Question
              question={QuestionsRegistry.get("t1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("t2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("t3")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            
          </Panel>
          <br />
        </div>
        <div className="flex">
          <Panel header="Additional Questions (Admin only)" toggleable>
            <EmbededHelp>
              This section can be used for more modules specific to admin
            </EmbededHelp>

            <Button
              label="Promote"
              className="p-button-success"
              style={{ float: "right" }}
              onClick={() => submitPromoteGeneForm()}
            />
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default GenePromotionRequest;
