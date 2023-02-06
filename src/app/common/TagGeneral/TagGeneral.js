import _ from "lodash";
import { Tag } from "primereact/tag";
import React from "react";
import "./TagGeneral.css";

const TagGeneral = ({ tag, text }) => {
  return (
    <div className="tag-general">
      <Tag className={`tag-${_.lowerCase(tag)}`} value={text ? text : tag} />
    </div>
  );
};

export default TagGeneral;
