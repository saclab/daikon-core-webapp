import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Button } from "primereact/button";

const Vote = ({ id, voteData }) => {
  console.log(voteData);
  if (id && voteData) {
    const colors = {
      Positive: "#76D7C4",
      Neutral: "#F7DC6F",
      Negative: "#F1948A",
    };
    const getColor = (bar) => colors[bar.id];

    let votes = [
      {
        "Positive" : voteData.positive,
        "Neutral" : voteData.neutral,
        "Negative" : voteData.negative
      }
    ];
    // let votes = [
    //   {
    //     Positive: 3,
    //     Neutral: 5,
    //     Negative: 2,
    //   },
    // ];

    const votingButtonPanel = (
      <div style={{ marginLeft: "auto", marginRight: "auto", width: "200px" }}>
        <Button
          icon="icon icon-common icon-thumbs-up"
          className="p-button-rounded p-button-text p-button-lg"
          tooltip="Vote Yes"
          tooltipOptions={{ position: "bottom" }}
          style={{ color: "#76D7C4" }}
        />
        <Button
          icon="icon icon-common icon-hand-rock"
          className="p-button-rounded p-button-text p-button-lg"
          tooltip="Vote Neutral"
          tooltipOptions={{ position: "bottom" }}
          style={{ color: "#F7DC6F" }}
        />
        <Button
          icon="icon icon-common icon-thumbs-down"
          className="p-button-rounded p-button-text p-button-lg"
          tooltip="Vote No"
          tooltipOptions={{ position: "bottom" }}
          style={{ color: "#F1948A" }}
        />
      </div>
    );

    const generateUserVotedPanel = () => {
      return (
        <React.Fragment>
          <p style={{ fontSize: "small" }}>
            You have voted <q>{voteData.usersVote}</q>.
          </p>
        </React.Fragment>
      );

      //TODO: In future if users are allowed to change their vote.

      // if (voteData.votingProps.modificationAllowed) {
      //   return (
      //     <React.Fragment>
      //       <p style={{ fontSize: "small" }}>
      //         You have voted {voteData.votingProps.userVote}. Modify
      //       </p>
      //     </React.Fragment>
      //   );
      // } else {
      //   return (
      //     <React.Fragment>
      //       <p style={{ fontSize: "small" }}>
      //         You have voted <q>{voteData.votingProps.userVote}</q>.
      //       </p>
      //     </React.Fragment>
      //   );
      // }
    };

    let generateOptions = () => {
      if (voteData.hasUserVoted) {
        return generateUserVotedPanel();
      } else {
        return votingButtonPanel;
      }
    };
    return (
      <div
        style={{
          height: "20px",
          width: "200px",
          marginTop: "10px",
          borderRadius: "10px",
        }}
      >
        <ResponsiveBar
          data={votes}
          keys={["Positive", "Neutral", "Negative"]}
          layout="horizontal"
          padding={0.0}
          valueScale={{ type: "linear" }}
          colors={getColor}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          axisBottom={null}
          // isInteractive={false}
          tooltip={({ id, value, color }) => (
            <div
              style={{
                color,
                background: "#000000",
                padding: "6px",
              }}
            >
              {id} : {value}
            </div>
          )}
        />

        {generateOptions()}
      </div>
    );
  }

  return <p style={{ fontSize: "small" }}>Voting data is not available.</p>;
};

export default Vote;
