import { ProgressBar } from "primereact/progressbar";
import React from "react";

const PleaseWait = () => {
  return (
    <div>
      <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
    </div>
  );
};

export default PleaseWait;
