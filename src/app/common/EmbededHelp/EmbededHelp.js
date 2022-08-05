import React from "react";

const EmbededHelp = ({ children }) => {
  return <div className="flex mb-1">
    <div className="flex">
      <i class="icon icon-common icon-info" />
    </div>
    <div className="flex p-1 text-sm font-italic" style={{ color: "#696969" }}>
      {children}
    </div>
  </div>;
};

export default EmbededHelp;
