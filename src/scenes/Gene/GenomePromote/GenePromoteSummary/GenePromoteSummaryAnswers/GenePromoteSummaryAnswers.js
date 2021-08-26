import React from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

const GenePromoteSummaryAnswers = ({ oKey, questionObj, ansObj }) => {
  console.log(ansObj);
  return (
    <div className="p-d-flex" style={{ marginTop: "2px" }}>
      <div className="p-mr-2">
        <p style={{ width: "18rem" }}>
          <b>{oKey} | </b>
          {questionObj.get(oKey).questionBody} :{" "}
        </p>
      </div>
      <div className="p-mr-2">
        {/* <InputText
          className="p-inputtext-sm"
          style={{ width: "10rem" }}
          value={ansObj[oKey].answerValue}
          readOnly={true}
        /> */}
        <p style={{ width: "6rem" }}>{ansObj[oKey].answerValue}</p>
      </div>
      <div className="p-mr-2 p-as-stretch">
        <span className="p-float-label">
          {/* <InputTextarea rows={1}
            className="p-inputtext-sm"
            style={{ minWidth: "40rem" }}
            value={ansObj[oKey].answerDescription}
            readOnly={true}
          /> */}

          <p style={{ minWidth: "40rem" }}>{ansObj[oKey].answerDescription}</p>
        </span>
      </div>
    </div>
  );
};

export default GenePromoteSummaryAnswers;
