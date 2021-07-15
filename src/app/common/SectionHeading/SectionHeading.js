import React from "react";

const SectionHeading = ({ icon, heading, sub }) => {
  return (
    <div
      style={{
        background: "#28477f",
        opacity: "1",
        color: "#FFFFFF",
        padding: "0.5em",
        marginBottom: "1em",
      }}
    >
      <h1 style={{ margin: "0px", fontWeight : "lighter"}}>
        <i class={icon}></i> {heading}
      </h1>
      {sub}
    </div>
  );
};

export default SectionHeading;
