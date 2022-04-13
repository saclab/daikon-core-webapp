import React from "react";

const FDate = ({ timestamp, hideTime = true, color = "#17202A" }) => {
  if (hideTime) {
    return (
      <span style={{ color: color }}>
        {new Date(timestamp + "Z").toLocaleDateString()}
      </span>
    );
  }
  return <span>{new Date(timestamp + "Z").toLocaleString()}</span>;
};
export default FDate;
