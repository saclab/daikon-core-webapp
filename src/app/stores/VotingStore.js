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
    this.enablingVoting = true;

    let res = null;
    // send to server
    try {
      res = await agent.Vote.enableVoting(voteIds);

      runInAction(() => {
        toast.success("Success, Voting is allowed.");
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.enablingVoting = false;
      });
    }

    return res;
  };

  freezeVoting = async (voteIds) => {
    this.freezingVoting = true;

    let res = null;
    // send to server
    try {
      res = await agent.Vote.freezeVoting(voteIds);

      runInAction(() => {
        toast.success("Success, Voting has been frozen");
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.freezingVoting = false;
      });
    }

    return res;
  };

  vote = async (voteObj) => {
    this.voting = true;

    let res = null;
    // send to server
    try {
      res = await agent.Vote.castVote(voteObj);

      runInAction(() => {
        toast.success("Voting Successfull");
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.voting = false;
      });
    }

    return res;
  };
}
