import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Button } from "primereact/button";

const Vote = ({ id, voteData }) => {
  if (id && voteData && voteData.votingProps && voteData.votes) {


    const colors = { yes: "#76D7C4", neutral: "#F7DC6F", no: "#F1948A" };
    const getColor = (bar) => colors[bar.id];

    const votingButtonPanel = (
      <React.Fragment>
        <Button
          icon="pi pi-thumbs-up"
          className="p-button-rounded p-button-text p-button-lg"
          tooltip="Vote Yes"
          tooltipOptions={{ position: "bottom" }}
          style={{ color: "#76D7C4" }}
        />
        <Button
          icon="ri-emotion-normal-line"
          className="p-button-rounded p-button-text p-button-lg"
          tooltip="Vote Neutral"
          tooltipOptions={{ position: "bottom" }}
          style={{ color: "#F7DC6F" }}
        />
        <Button
          icon="pi pi-thumbs-down"
          className="p-button-rounded p-button-text p-button-lg"
          tooltip="Vote No"
          tooltipOptions={{ position: "bottom" }}
          style={{ color: "#F1948A" }}
        />
      </React.Fragment>
    );

    const generateUserVotedPanel = () => {
      if (voteData.votingProps.modificationAllowed) {
        return (
          <React.Fragment>
            <p style={{ fontSize: "small" }}>
              You have voted {voteData.votingProps.userVote}. Modify
            </p>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <p style={{ fontSize: "small" }}>
              You have voted <q>{voteData.votingProps.userVote}</q>.
            </p>
          </React.Fragment>
        );
      }
    };

    let generateOptions = () => {
      if (voteData.votingProps.userVoted) {
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
          data={voteData.votes}
          keys={["yes", "neutral", "no"]}
          layout="horizontal"
          padding={0.0}
          valueScale={{ type: "linear" }}
          colors={getColor}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          axisBottom={null}
        />

        {generateOptions()}
      </div>
    );
  }

  return <p style={{ fontSize: "small" }}>Voting data is not available.</p>;
};

export default Vote;
