import { action, makeObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";

import agent from "../api/agent";

export default class VotingStore {
  rootStore;

  voting = false;
  enablingVoting = false;
  freezingVoting = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      voting: observable,
      vote: action,

      enablingVoting: observable,
      enableVoting: action,

      freezingVoting: observable,
      freezeVoting: action,
    });
  }

  enableVoting = async (voteIds) => {
    console.log("votingStore: enableVoting() Start");
    this.enablingVoting = true;

    let res = null;
    // send to server
    try {
      res = await agent.Vote.enableVoting(voteIds);

      runInAction(() => {
        toast.success("Success, Voting is allowed.");
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.enablingVoting = false;
        console.log("votingStore: enableVoting() End");
      });
    }
    console.log(res);
    return res;
  };

  freezeVoting = async (voteIds) => {
    console.log("votingStore: freezeVoting() Start");
    this.freezingVoting = true;

    let res = null;
    // send to server
    try {
      res = await agent.Vote.freezeVoting(voteIds);

      runInAction(() => {
        toast.success("Success, Voting has been frozen");
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.freezingVoting = false;
        console.log("votingStore: enableVoting() End");
      });
    }
    console.log(res);
    return res;
  };

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
