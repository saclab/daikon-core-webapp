import React from "react";
import { ResponsiveWaffle } from "@nivo/waffle";
import { Card } from "primereact/card";

const TargetScorecardWaffle = () => {
  let data = [
    {
      id: "Yes or Active",
      label: "Yes/Active",
      value: 15,
      color: "#28B463",
    },
    {
      id: "No or Inactive",
      label: "No/Inactive",
      value: 25,
      color: "#ba72ff",
    },
  ];
  return (
    <Card title="Score Confidence" subTitle="63% of questions are answered.">
      <div style={{ height: "300px", width: "500px" }}>
        <ResponsiveWaffle
          data={data}
          total={63}
          rows={6}
          columns={11}
          margin={{ top: 50, right: 0, bottom: 0, left: 0 }}
          colors={{ scheme: "dark2" }}
          borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={11}
          legends={[
            {
              anchor: "top-left",
              direction: "column",
              justify: false,
              translateX: 20,
              translateY: -50,
              itemsSpacing: 4,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 1,
              itemTextColor: "#777",
              symbolSize: 10,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                    itemBackground: "#f7fafb",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </Card>
  );
};

export default TargetScorecardWaffle;
