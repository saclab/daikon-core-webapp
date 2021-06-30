import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Card } from "primereact/card";

const TargetScorecardBar = () => {

  let data = [
    {
      "category": "Chemical",
      "in vivo": 20,
      "in vivoColor": "hsl(258, 70%, 50%)",
      "in vitro R": 75,
      "in vitro RColor": "hsl(22, 70%, 50%)",
      "in vitro NR": 10,
      "in vitro NRColor": "hsl(146, 70%, 50%)"
    },
    {
      "category": "Genetic",
      "in vivo": 100,
      "in vivoColor": "hsl(258, 70%, 50%)",
      "in vitro R": 39,
      "in vitro RColor": "hsl(22, 70%, 50%)",
      "in vitro NR": 51,
      "in vitro NRColor": "hsl(146, 70%, 50%)"
    },
  ];

  return (
    <Card title="Impact Score" style={{ marginLeft: "50px", width: "500px", height: "425px" }}>
    <div style={{ height: "325px", width: "500px" }}>
      <ResponsiveBar
        data={data}
        keys={[ 'in vivo', 'in vitro R', 'in vitro NR' ]}
        indexBy="category"
        margin={{ top: 5, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        valueFormat={{ format: '', enabled: false }}
        colors={{ scheme: 'paired' }}
        
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Inhibition',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '%',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    </div>
    </Card>
  )
}

export default TargetScorecardBar
