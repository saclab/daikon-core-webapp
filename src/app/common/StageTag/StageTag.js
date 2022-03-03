import React from "react";
import "./StageTag.css";
import { Tag } from "primereact/tag";

const StageTag = ({ stage, stageName }) => {
  return (
    <div className="stage-tag">
      <Tag className={`stage-${stage}`} value={stageName ? stageName : stage} />
    </div>
  );
};

export default StageTag;
