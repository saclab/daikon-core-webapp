import React from "react";
import { ProgressBar } from "primereact/progressbar";
import loadingGif from "../../../assets/icon-1.1s-200px.gif"
import "./Loading.css";

let Loading = ({ message }) => {
  return (
    <React.Fragment>
      <div className="backdrop">

        <div className="cursor-wait Loading">
          <div className="LoadingWrap">
            <div className="shadow-8 LoadingBox">
              <div className="flex pb-3">

                <div className="flex">
                  <div className="flex">
                    <img src={loadingGif} style={{ width: "100px" }} alt={"Loading.."} />
                  </div>

                  <div className="inline-block pl-6" style={{ lineHeight: "1em" }}>
                    <h1 className="Text">Loading...</h1>
                    <h3 className="Text">Please Wait.</h3>
                  </div>

                </div>
                <div className="flex">

                </div>
              </div>
              <div className="flex flex-column">
                <div className="block">
                  <ProgressBar mode="indeterminate" />
                </div>
                <div className="flex -my-2 justify-content-end">
                  <h4 className="bg-yellow-500 pl-3 pr-3 Text">{message !== null ? message : "Fetching..."}</h4>
                </div>


              </div>
            </div>





          </div>
        </div>
      </div>
    </React.Fragment >

  );
};

export default Loading;
