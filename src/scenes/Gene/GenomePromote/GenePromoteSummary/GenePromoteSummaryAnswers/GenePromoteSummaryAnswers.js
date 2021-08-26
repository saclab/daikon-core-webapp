import React from "react";

const GenePromoteSummaryAnswers = ({ oKey, questionObj, ansObj }) => {
  console.log(ansObj);
  return (
    <React.Fragment>
      {oKey} | {questionObj.get(oKey).questionBody} : {ansObj[oKey].answerValue}{" "}
      | {ansObj[oKey].answerDescription}
    </React.Fragment>
  );
};

export default GenePromoteSummaryAnswers;
