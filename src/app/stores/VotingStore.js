import { action, makeObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";

import agent from "../api/agent";

export default class VotingStore {
  rootStore;

  voting = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      voting: observable,
      vote: action,
    });
  }

  vote = async (voteObj) => {
    console.log("votingStore: vote() Start");
    this.voting = true;

    let res = null;

    // send to server
    try {
      res = await agent.Vote.castVote(voteObj);

      runInAction(() => {
        toast.success("Voting Successfull");
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.voting = false;
        console.log("votingStore: vote() End");
      });
    }
    console.log(res);
    return res;
  };
}
