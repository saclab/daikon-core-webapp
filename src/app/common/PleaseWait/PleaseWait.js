import { ProgressBar } from "primereact/progressbar";
import React from "react";

const PleaseWait = () => {
  return (
    <div>
      <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
      <h3>Please wait...</h3>
    </div>
  );
};

export default PleaseWait;
