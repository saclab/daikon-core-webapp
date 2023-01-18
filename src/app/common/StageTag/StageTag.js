import { Tag } from "primereact/tag";
import React from "react";
import "./StageTag.css";

const StageTag = ({ stage, stageName }) => {
  return (
    <div className="stage-tag">
      <Tag className={`stage-${stage}`} value={stageName ? stageName : stage} />
    </div>
  );
};

export default StageTag;
