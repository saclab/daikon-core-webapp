import React from "react";

const GenePromoteSummaryAnswers = ({ oKey, questionObj, ansObj }) => {
  
  return (
    <div className="p-d-flex" style={{ marginTop: "2px" }}>
      <div className="p-mr-2">
        <p style={{ width: "18rem", marginRight: "25px"}}>
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
        <p style={{ width: "7rem" }}>{ansObj[oKey].answerValue}</p>
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
