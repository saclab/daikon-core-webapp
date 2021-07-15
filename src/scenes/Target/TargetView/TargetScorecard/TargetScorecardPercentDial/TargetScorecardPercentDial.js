import React from "react";
import { Card } from "primereact/card";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TargetScorecardPercentDial = () => {
  const percentage = 24;

  return (
    <div className="p-d-flex">
      <Card
        title="Score"
        subTitle="Yes Vs No & Unknown"
        style={{ marginLeft: "50px", width: "300px", height: "425px" }}
      >
        <div className="p-as-center" style={{ width: "200px", margin: "auto", paddingTop: "40px" }}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={{
              // Customize the root svg element
              root: {},
              // Customize the path, i.e. the "completed progress"
              path: {
                // Path color
                stroke: "#269d78",
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Customize transition animation
                transition: "stroke-dashoffset 0.5s ease 0s",
                // Rotate the path
                transform: "rotate(0.25turn)",
                transformOrigin: "center center",
              },
              // Customize the circle behind the path, i.e. the "total progress"
              trail: {
                // Trail color
                stroke: "#d6d6d6",
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Rotate the trail
                transform: "rotate(0.25turn)",
                transformOrigin: "center center",
              },
              // Customize the text
              text: {
                // Text color
                fill: "#17202A",
                // Text size
                fontSize: "16px",
              },
              // Customize background - only used when the `background` prop is true
              background: {
                fill: "#3e98c7",
              },
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default TargetScorecardPercentDial;
