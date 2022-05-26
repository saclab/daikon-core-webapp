import React from "react";
import { appVersion } from "../../../config";
import cssClass from "./Footer.module.css";

const Footer = () => {
  return (

    <div className={cssClass.Footer}>
      <hr className={cssClass.Hr} />
      <div className={["p-d-flex", "p-flex-column", cssClass.Text].join(" ")}>
        <div className="p-mb-2 p-ml-auto">
          {" "}
          &copy; | DAIKON {appVersion.stream} {appVersion.release} {appVersion.channel}
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
