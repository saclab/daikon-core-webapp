import React from "react";
import { ProgressBar } from "primereact/progressbar";

const PleaseWait = () => {
  return (
    <div>
      <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
      <h3>Please wait...</h3>
    </div>
  );
};

export default PleaseWait;
