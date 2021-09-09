import React, { useEffect, useState, useContext } from "react";
import { Divider } from "primereact/divider";
import { SplitButton } from "primereact/splitbutton";
import { Button } from "primereact/button";
import { toast } from "react-toastify";

import Question from "../../../../../app/common/Question/Question";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import Loading from "../../../../../app/layout/Loading/Loading";
import Success from "../../../../../app/common/Success/Success";

const GeneAdminPromotionRequest = ({
  GeneID,
  AnswerRegistry,
  QuestionsRegistry,
}) => {
  const rootStore = useContext(RootStoreContext);

  const {
    fetchGenePromotionList,
    displayLoading,
    genePromotionRegistry,
    promoteGene,
  } = rootStore.geneStoreAdmin;

  const geneStore = rootStore.geneStore;
  const questionaire = AnswerRegistry.get(GeneID);

  const [targetPromotionFormValue, setTargetPromotionFormValue] = useState(
    questionaire.answers
  );
  const [formSuccess, setFormSuccess] = useState(false);

  const updateTargetPromotionFormValue = (e) => {
    if (e.target.id.endsWith("Description")) {
      console.log("Description Field");
      var location = e.target.id.slice(0, -11);
      var newFormValue = { ...targetPromotionFormValue };
      var newField = { ...newFormValue[location] };
      newField.answerDescription = e.target.value;
      newFormValue[location] = newField;
      setTargetPromotionFormValue(newFormValue);
    } else {
      var location = e.target.id;
      var newFormValue = { ...targetPromotionFormValue };
      var newField = { ...newFormValue[location] };
      newField.answerValue = e.target.value;
      newFormValue[location] = newField;
      setTargetPromotionFormValue(newFormValue);
    }
  };

  if (displayLoading) {
    return <Loading />;
  }

  const submitPromoteGeneForm = () => {
    let promotionReqData = {
      geneID: GeneID,
      answers: targetPromotionFormValue,
    };
    promoteGene(promotionReqData).then((res) => {
      if (res !== null) {
        toast.success("Success. The gene has been promoted.");
        genePromotionRegistry.delete(GeneID);
      }
    });
  };

  return (
    <div>
      <div
        style={{
          padding: "1px 1px",
        }}
      >
        <h4>Submitted by : {questionaire.submittedBy}</h4>
      </div>

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
      <Button
        label="Promote"
        className="p-button-success"
        style={{ float: "right" }}
        onClick={() => submitPromoteGeneForm()}
      />
    </div>
  );
};

export default GeneAdminPromotionRequest;
