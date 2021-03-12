import React from "react";
import { ProgressBar } from "primereact/progressbar";
import "./Loading.css";

let Loading = () => {
  return (
    <React.Fragment>
      <div className="backdrop">
      
      <div className="Loading">
        <div className="LoadingWrap">
          <div className="LoadingBox">
            <h1>Please Wait!</h1>
            <ProgressBar mode="indeterminate" />
            <h4>Fetching...</h4>
            
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
    
  );
};

export default Loading;
