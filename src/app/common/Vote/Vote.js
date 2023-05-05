import ReactECharts from "echarts-for-react";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import React, { useContext } from "react";
import { RootStoreContext } from "../../stores/rootStore";

/*
Usage: 
The voting module requires the parent module to import ConfirmDialog.
This is to prevent multiple binding of the ConfirmDialog if more than
one voting element is present in the screen.
*/

const Vote = ({ id, voteData, callBack }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { voting, vote } = rootStore.votingStore;

  if (id && voteData) {
    let votes = {
      Positive: voteData.positive,
      Neutral: voteData.neutral,
      Negative: voteData.negative,
    };
    // let votes =
    // {
    //   Positive: 0,
    //   Neutral: 0,
    //   Negative: 0,
    // }

    const votingButtonPanel = (
      <div className="flex justify-content-center" style={{ width: "10rem" }}>
        <div className="flex">
          <Button
            icon="icon icon-common icon-thumbs-up"
            className="p-button-rounded p-button-text p-button-lg"
            tooltip="Vote Positive"
            tooltipOptions={{ position: "bottom" }}
            style={{ color: "#76D7C4" }}
            loading={voting}
            onClick={(e) => voteButtonClicked(e, "Positive")}
          />
        </div>
        <div className="flex">
          <Button
            icon="icon icon-common icon-hand-rock"
            className="p-button-rounded p-button-text p-button-lg"
            tooltip="Vote Neutral"
            tooltipOptions={{ position: "bottom" }}
            style={{ color: "#F7DC6F" }}
            onClick={(e) => voteButtonClicked(e, "Neutral")}
            loading={voting}
          />
        </div>
        <div className="flex">
          <Button
            icon="icon icon-common icon-thumbs-down"
            className="p-button-rounded p-button-text p-button-lg"
            tooltip="Vote Negative"
            tooltipOptions={{ position: "bottom" }}
            style={{ color: "#F1948A" }}
            onClick={(e) => voteButtonClicked(e, "Negative")}
            loading={voting}
          />
        </div>
      </div>
    );

    const generateUserVotedPanel = () => {
      return (
        <div className="w-min">
          <p style={{ fontSize: "small" }}>
            You have voted <q>{voteData.usersVote}</q>.
          </p>
        </div>
      );
    };

    let generateOptions = () => {
      if (voteData.hasUserVoted) {
        return generateUserVotedPanel();
      } else {
        if (voteData.isVotingAllowed) return votingButtonPanel;
      }
    };

    let voteButtonClicked = (e, selectedVote) => {
      let vobj = {
        voteId: voteData.id,
        voteButton: selectedVote,
      };

      confirmDialog({
        message:
          "" + " Click to continue voting " + selectedVote.toLowerCase() + "?",
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

    let option = {
      grid: {
        left: "3%",
        right: "3%",
        bottom: "0%",
        containLabel: false,
      },
      xAxis: {
        type: "value",
        show: false,
      },
      yAxis: {
        type: "category",
        data: ["Votes"],
        show: false,
      },

      series: [
        {
          name: "Positive",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          itemStyle: {
            color: "#76D7C4",
          },
          data: [votes.Positive],
        },
        {
          name: "Neutral",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          itemStyle: {
            color: "#F7DC6F",
          },
          data: [votes.Neutral],
        },
        {
          name: "Negative",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          itemStyle: {
            color: "#F1948A",
          },
          data: [votes.Negative],
        },
      ],
    };

    let renderVotingChartOrNoVotes = () => {
      if (votes.Positive === 0 && votes.Neutral === 0 && votes.Negative === 0) {
        return <p style={{ fontSize: "small" }}>No votes submitted</p>;
      } else {
        return (
          <ReactECharts
            option={option}
            // onEvents={onEvents}
            style={{ height: "6rem", width: "10rem" }}
          />
        );
      }
    };

    /* Final Render */
    return (
      <React.Fragment>
        <div className="flex flex-column w-auto min-w-10">
          <div className="flex">{renderVotingChartOrNoVotes()}</div>
          <div className="flex">{generateOptions()}</div>
        </div>
      </React.Fragment>
    );
  }

  return <p style={{ fontSize: "small" }}>Voting data is not available.</p>;
};

export default Vote;
