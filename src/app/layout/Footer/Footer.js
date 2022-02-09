import React from "react";
import cssClass from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={cssClass.Footer}>
      <hr className={cssClass.Hr} />
      <div className={["p-d-flex", "p-flex-column", cssClass.Text].join(" ")}>
        <div className="p-mb-2 p-ml-auto">
          {" "}
          &copy; TB Drug Accelerator | Target and Project Tracker (TPT) 2022
        </div>
        <div className="p-mb-2 p-ml-auto">
          {" "}
          <a href="/">Contact</a> | <a href="/">Disclaimer</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
