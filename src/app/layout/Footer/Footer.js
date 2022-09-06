import React from "react";
import { appVersion } from "../../../appVersion";
import cssClass from "./Footer.module.css";

const Footer = () => {
  return (

    <div className={cssClass.Footer}>
      <hr className={cssClass.Hr} />
      <div className={["flex flex-column", cssClass.Text].join(" ")}>

        <div className="flex justify-content-end">
          &copy; | DAIKON {appVersion.stream} {appVersion.release} {appVersion.channel}
        </div>
        <div className="flex justify-content-end">
          <a href="/">Contact</a> | <a href="/">Disclaimer</a>
        </div>


      </div>
    </div>

  );
};

export default Footer;
