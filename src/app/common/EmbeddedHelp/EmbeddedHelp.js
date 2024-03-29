import React from "react";

const EmbeddedHelp = ({ children }) => {
  return (
    <div className="flex mb-1">
      <div className="flex">
        <i className="icon icon-common icon-info" />
      </div>
      <div
        className="flex p-1 text-sm font-italic"
        style={{ color: "#696969" }}
      >
        {children}
      </div>
    </div>
  );
};

export default EmbeddedHelp;
