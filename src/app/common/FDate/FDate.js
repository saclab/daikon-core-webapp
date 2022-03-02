import React from "react";

const FDate = ({ timestamp, hideTime = false }) => {
  if (hideTime) {
    return (
      <React.Fragment>
        {new Date(timestamp + "Z").toLocaleDateString()}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {new Date(timestamp + "Z").toLocaleString()}
    </React.Fragment>
  );
};
export default FDate;
