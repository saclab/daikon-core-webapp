import React from "react";
import { ProgressBar } from "primereact/progressbar";
import loadingGif from "../../../assets/icon-1.1s-200px.gif"
import "./Loading.css";

let Loading = ({ message }) => {
  return (
    <React.Fragment>
      <div className="backdrop">

        <div className="Loading">
          <div className="LoadingWrap">
            <div className="LoadingBox">
              <div className="p-grid">
                <div className="p-col-3">
                  <img src={loadingGif} style={{ width: "100px" }} alt={"Loading.."} />
                </div>
                <div className="p-col-6" style={{ lineHeight: "1em" }}>
                  <h1 className="Text">Loading...</h1>
                  <h3 className="Text">Please Wait.</h3>
                </div>
              </div>


              <ProgressBar mode="indeterminate" />
              <h4 className="Text">{message !== null ? message : "Fetching..."}</h4>

            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
};

export default Loading;
