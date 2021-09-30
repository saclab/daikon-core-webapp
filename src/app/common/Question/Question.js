import React from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from 'primereact/inputtextarea';
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
          value={readObject?.[question.identification]?.answer}
          onChange={(e) => updateObject(e)}
        />
      </div>
      <div className="p-mr-2 p-as-stretch">
        <span className="p-float-label">
          <InputTextarea rows={1}
            style={{ minWidth: "40rem" }}
            id={question.identification+"Description"}
            value={readObject?.[question.identification]?.description}
            onChange={(e) => updateObject(e)}
            placeHolder="Description"
          />
          
        </span>
      </div>
    </div>
  );
};

export default Question;
