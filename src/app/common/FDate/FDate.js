import React from "react";

const FDate = ({ timestamp, hideTime = true, color = "#17202A" }) => {
  if (timestamp === undefined) {
    return <span></span>;
  }

  if (hideTime) {
    return (
      <span style={{ color: color }}>
        {new Date(timestamp).toLocaleDateString()}
      </span>
    );
  }
  return <span>{new Date(timestamp).toLocaleString()}</span>;
};
export default FDate;
