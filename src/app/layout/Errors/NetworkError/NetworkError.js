import { ProgressBar } from "primereact/progressbar";
import React, { useContext } from "react";

import { RootStoreContext } from "../../../stores/rootStore";
import "./NetworkError.css";

const NetworkError = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

  return (
    <div>
      <div className="LandingLogin">
        <div className="LandingWrap">
          <div className="LandingLoginBox">
            <h1>Are you connected?</h1>
            <ProgressBar mode="indeterminate" />
            <h4>Server Connection Error</h4>
            <p>
              We <b>can't</b> connect to the server right now. <br />
              Either you have lost network connectivity or our servers are not
              responding. Please wait for some time and{" "}
              <u
                onClick={() => window.location.reload()}
                style={{ cursor: "pointer" }}
              >
                refresh
              </u>{" "}
              the page. If the problem persists, please contact the network
              admin. You can also try to{" "}
              <u onClick={logout} style={{ cursor: "pointer" }}>
                logout and clear cookies.
              </u>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkError;
