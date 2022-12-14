import React from "react";

const GenePromoteSummaryAnswers = ({ oKey, questionObj, ansObj }) => {

  console.log(ansObj[oKey]);

  let qClass = (ansObj[oKey] === undefined || ansObj[oKey].answer === '') ?
    "flex align-items-center w-2 pl-2 border-1 border-round border-red-500 surface-overlay" :
    "flex align-items-center w-2 pl-2 border-1 border-round"

  let dClass = () => {
    let allowedAns = ['Yes', 'No', 'Active', 'Inactive', 'High', 'Medium', 'Low'];
    let unallowedAns = ['Unknown']

    if (ansObj[oKey] === undefined || ansObj[oKey].answer === '') {
      return "flex align-items-center w-6 pl-2 border-1 border-round border-red-500 surface-overlay"
    }
    if (allowedAns.includes(ansObj[oKey]?.answer)
      && (ansObj[oKey]?.description === undefined || ansObj[oKey]?.description === '')) {
      return "flex align-items-center w-6 pl-2 border-1 border-round border-red-500 surface-overlay"
    }
    else {
      return "flex align-items-center w-6 pl-2 border-1 border-round"
    }

  }

  return (
    <div className="flex align-content-center gap-2 mb-2">
      <div className="flex align-items-center w-4 pl-2 border-1 border-round">
        <p>
          <b>{oKey} | </b>
          {questionObj.get(oKey)?.questionBody} :{" "}
        </p>
      </div>
      <div className={qClass}>
        <p>{ansObj[oKey]?.answer}</p>
      </div>
      <div className={dClass()} style={{ overflowWrap: "break-word" }}>
        <p style={{ overflowWrap: "break-word", minWidth: "40rem", minHeight: "2.5rem" }}>{ansObj[oKey]?.description}</p>
      </div>
    </div>
  );
};

export default GenePromoteSummaryAnswers;
