import React from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";

const Question = ({ question, updateObject, readObject }) => {
  if(typeof question?.identification === 'undefined') return <React.Fragment />;

  return (
    <div className="p-d-flex" style={{marginTop: "7px"}}>
      <div className="p-mr-2 p-as-center">
        <Tooltip
          target={".questionBody" + question.identification}
          content={question.toolTip}
          tooltipOptions={{ position: "top" }}
        />
        <div
          className={"questionBody" + question.identification}
          style={{ width: "18rem" }}
        >
          <b>{question.identification} | </b>
          {question.questionBody} :{" "}
        </div>
      </div>
      <div className="p-mr-2">
        <Dropdown
          id={question.identification}
          style={{ width: "10rem" }}
          options={question.possibleAnswers}
          value={readObject?.[question.identification]?.answerValue}
          onChange={(e) => updateObject(e)}
        />
      </div>
      <div className="p-mr-2 p-as-stretch">
        <span className="p-float-label">
          <InputText
            style={{ minWidth: "40rem" }}
            id={question.identification+"Description"}
            value={readObject?.[question.identification]?.answerDescription}
            onChange={(e) => updateObject(e)}
          />
          <label htmlFor="username">Description</label>
        </span>
      </div>
    </div>
  );
};

export default Question;
