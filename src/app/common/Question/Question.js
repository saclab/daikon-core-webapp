import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Tooltip } from "primereact/tooltip";
import React from "react";

const Question = ({ question, updateObject, readObject, highlightRed }) => {
  if (typeof question?.identification === "undefined")
    return <React.Fragment />;

  let getBorderCssClass = () => {
    let borderCssClass = ["flex", "flex-wrap", "align-content-center", "gap-2"];
    if (highlightRed)
      borderCssClass = borderCssClass.concat([
        "border-1",
        "border-round",
        "border-red-500",
        "border-dashed",
        "surface-overlay",
      ]);
    return borderCssClass.join(" ");
  };
  return (
    <div className={getBorderCssClass()}>
      <div className="flex align-items-center">
        <Tooltip
          target={".questionBody" + question.identification}
          content={question.toolTip}
          tooltipOptions={{ position: "top" }}
        />
        <div
          className={"questionBody" + question.identification}
          style={{ width: "19rem" }}
        >
          <b
            style={{
              backgroundColor: "#5D6D7E",
              color: "#ffffff",
              padding: "2px",
              marginRight: "4px",
            }}
          >
            {question.identification}
          </b>
          {question.questionBody}
        </div>
      </div>
      <div className="flex align-items-center">
        <Dropdown
          id={question.identification}
          style={{ width: "9rem", height: "2.5rem" }}
          options={question.possibleAnswers}
          value={readObject?.[question.identification]?.answer}
          onChange={(e) => updateObject(e)}
        />
      </div>
      <div className="flex align-items-center">
        <span className="float-label">
          <InputTextarea
            rows={1}
            style={{ minWidth: "40rem", minHeight: "2.5rem" }}
            id={question.identification + "Description"}
            value={readObject?.[question.identification]?.description || ""}
            onChange={(e) => updateObject(e)}
            placeholder="Description"
          />
        </span>
      </div>
    </div>
  );
};

export default Question;
