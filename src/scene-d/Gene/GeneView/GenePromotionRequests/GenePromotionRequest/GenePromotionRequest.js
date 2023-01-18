import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Panel } from "primereact/panel";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Question from "../../../../../app/common/Question/Question";
import Loading from "../../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

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
      genePromtionRequestGenes: GenePromotionRequest.genePromtionRequestGenes,

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
          <Panel header="Submitted Promotion Questionnaire" toggleable>
            <h2>Impact of chemical inhibition</h2>

            <h5>a) During infections</h5>

            <Question
              question={QuestionsRegistry.get("2a1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("2a1b")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("2a2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("2a3a")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("2a3b")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("2a4a")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("2a5")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <h5>b) on replication Mtb in vitro</h5>
            <Question
              question={QuestionsRegistry.get("2b1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("2b2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("2b4")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <h5>c) on nonreplicating Mtb in vitro</h5>
            <Question
              question={QuestionsRegistry.get("2c1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("2c2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("2c3")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("2c4")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("2c5")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Divider />

            <h2>
              <br />
              Chemical inhibition
            </h2>
            <h5>a) in live Mtb</h5>
            <Question
              question={QuestionsRegistry.get("3a1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("3a2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("3a3")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("3a4")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <h5>b) in vitro</h5>
            <Question
              question={QuestionsRegistry.get("3b1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("3b2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Divider />

            <h2>
              <br />
              Impact of genetic inhibition
            </h2>
            <h5>a) During infections</h5>

            <Question
              question={QuestionsRegistry.get("4a1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("4a2a")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("4a2b")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("4a3a")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("4a3b")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("4a4")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <h5>b) on replication Mtb in vitro</h5>
            <Question
              question={QuestionsRegistry.get("4b1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("4b2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("4b3")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <h5>c) on nonreplicating Mtb in vitro</h5>
            <Question
              question={QuestionsRegistry.get("4c1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("4c2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("4c3")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("4c4")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("4c5")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Divider />

            <h2>
              <br />
              Liabilities
            </h2>

            <h5>Metabolic liabilities</h5>
            <Question
              question={QuestionsRegistry.get("5a1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("5a2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <h5>Genetic</h5>
            <Question
              question={QuestionsRegistry.get("5a3")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <h5>Other</h5>
            <Question
              question={QuestionsRegistry.get("5b1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Divider />

            <h2>
              <br />
              Chemical inhibition
            </h2>
            <h5>a) in live Mtb</h5>
            <Question
              question={QuestionsRegistry.get("3a1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("3a2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("3a3")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("3a4")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <h5>b) in vitro</h5>
            <Question
              question={QuestionsRegistry.get("3b1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("3b2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Divider />

            <h2>
              <br />
              Tractability
            </h2>
            <h5>a) High throughput screening feasibility</h5>

            <Question
              question={QuestionsRegistry.get("6a1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6a2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6a3")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6a4")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6a5")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6a6")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6a7")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <h5>b) Structure based feasibility</h5>
            <Question
              question={QuestionsRegistry.get("6b1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6b2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6b3")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6b4")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6b5")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <h5>c) Progressibility considerations</h5>
            <Question
              question={QuestionsRegistry.get("6c1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6c2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6c3")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6c4")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6c5")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6c6")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Divider />

            <h5>d) Safety considerations</h5>
            <Question
              question={QuestionsRegistry.get("6d1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6d2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6d3")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <Question
              question={QuestionsRegistry.get("6d4")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />
          </Panel>
          <br />
        </div>
        <div className="flex">
          <Panel header="Additional Questions (Admin only)" toggleable>
            <h2>Interaction with other drugs/compounds</h2>

            <h5>a) Chemical inhibition during growth in vitro</h5>
            <Question
              question={QuestionsRegistry.get("7a1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />
            <Question
              question={QuestionsRegistry.get("7a2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <h5>b) Chemical inhibition during infection</h5>
            <Question
              question={QuestionsRegistry.get("7b1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />
            <Question
              question={QuestionsRegistry.get("7b2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <h5>c) Genetic inhibition during infection</h5>
            <Question
              question={QuestionsRegistry.get("7c1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />
            <Question
              question={QuestionsRegistry.get("7c2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

            <h5>d) Genetic inhibition during infection</h5>
            <Question
              question={QuestionsRegistry.get("7d1")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />
            <Question
              question={QuestionsRegistry.get("7d2")}
              updateObject={(e) => updateTargetPromotionFormValue(e)}
              readObject={targetPromotionFormValue}
            />

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
