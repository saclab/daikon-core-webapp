import React from "react";
import { ProgressBar } from "primereact/progressbar";

import "./NetworkError.css";

const NetworkError = () => {
  return (
    <div>
      <div className="LandingLogin">
        <div className="LandingWrap">
          <div className="LandingLoginBox">
            <h1>Are you connected?</h1>
            <ProgressBar mode="indeterminate" />
            <h4>Network Error</h4>
            <p>
              We <b>can't</b> connect to the server right now. <br />
              Either you have lost network connectivity or our servers are not
              responding. Please wait for some time and refresh the page. If the
              problem persists, please contact the network admin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkError;
