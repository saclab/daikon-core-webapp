import { action, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";

export default class HitsStore {
  rootStore;

  postingHit = false;
  updatingHit = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      postingHit: observable,
      newHit: action,

      updatingHit: observable,
      updateHit: action,
    });
  }

  newHit = async (hit) => {
    this.postingHit = true;

    let res = null;

    // send to server
    try {
      res = await agent.Hit.create(hit);
      runInAction(() => {
        //console.log(res);
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.postingHit = false;
      });
    }
    return res;
  };

  updateHit = async (hit) => {
    this.updatingHit = true;

    let res = null;

    // send to server
    try {
      res = await agent.Hit.update(hit.Id, hit);
      runInAction(() => {
        //console.log(res);
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.updatingHit = false;
      });
    }
    return res;
  };
}
