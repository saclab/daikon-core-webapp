import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import "./Loading.css";

let Loading = () => {
  return (
    <React.Fragment>
      <div className="backdrop">
      
      </div>
      <div className="loader">
      <ProgressSpinner />
      <br />
      <br />
      
      <h2>Please Wait ..</h2>
      <p>Our servers are working hard <br />to put things together ..</p>
    </div>
    </React.Fragment>
    
  );
};

export default Loading;
