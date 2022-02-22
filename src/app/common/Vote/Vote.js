import React, { useState, useRef, useEffect, useContext } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { confirmDialog } from "primereact/confirmdialog"; // To use confirmDialog method
import { RootStoreContext } from "../../stores/rootStore";

const Vote = ({ id, voteData, callBack }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { voting, vote } = rootStore.votingStore;

  const [displayVoteConfirmation, setDisplayVoteConfirmation] = useState(false);

  if (id && voteData) {
    const colors = {
      Positive: "#76D7C4",
      Neutral: "#F7DC6F",
      Negative: "#F1948A",
    };
    const getColor = (bar) => colors[bar.id];

    let votes = [
      {
        Positive: voteData.positive,
        Neutral: voteData.neutral,
        Negative: voteData.negative,
      },
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
          tooltip="Vote Positive"
          tooltipOptions={{ position: "bottom" }}
          style={{ color: "#76D7C4" }}
          loading={voting}
          onClick={(e) => voteButtonCliked(e, "Positive")}
        />
        <Button
          icon="icon icon-common icon-hand-rock"
          className="p-button-rounded p-button-text p-button-lg"
          tooltip="Vote Neutral"
          tooltipOptions={{ position: "bottom" }}
          style={{ color: "#F7DC6F" }}
          onClick={(e) => voteButtonCliked(e, "Neutral")}
          loading={voting}
        />
        <Button
          icon="icon icon-common icon-thumbs-down"
          className="p-button-rounded p-button-text p-button-lg"
          tooltip="Vote Negative"
          tooltipOptions={{ position: "bottom" }}
          style={{ color: "#F1948A" }}
          onClick={(e) => voteButtonCliked(e, "Negative")}
          loading={voting}
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
    };

    let generateOptions = () => {
      if (voteData.hasUserVoted) {
        return generateUserVotedPanel();
      } else {
        return votingButtonPanel;
      }
    };

    let voteButtonCliked = (e, selectedVote) => {
      let vobj = {
        voteId: voteData.id,
        voteButton: selectedVote,
      };

      confirmDialog({
        message:
          "Actu seu hic fal cera cui pati. Nec lapis via idque sic licet. Illa apti de duce ideo me meis. In naturas efficta invenio mo quinimo ex ac mutetur. Opinionum nia una imo praeclare perfacile." +
          " Click to continue voting " +
          selectedVote.toLowerCase() +
          "?",
        header: "Voting confirmation",

        acceptLabel: "Vote " + selectedVote,
        rejectLabel: "Cancel",
        accept: () =>
          vote(vobj).then(() => {
            /* CALL BACK will call a function that has been passed as a prop */
            if (callBack !== undefined) callBack();
          }),
        style: { width: "50vw" },
      });
    };

    /* Final Render */
    return (
      <React.Fragment>
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
        <Dialog
          header="Confirm Vote"
          visible={displayVoteConfirmation}
          style={{ width: "50vw" }}
          //footer={renderFooter("displayBasic2")}
          onHide={() => setDisplayVoteConfirmation(false)}
          blockScroll={true}
          maximizable={false}
        ></Dialog>
      </React.Fragment>
    );
  }

  return <p style={{ fontSize: "small" }}>Voting data is not available.</p>;
};

export default Vote;
