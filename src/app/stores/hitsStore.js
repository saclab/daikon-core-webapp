import { action, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";

export default class HitsStore {
  rootStore;

  postingHit = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      postingHit: observable,
      newHit: action,
    });
  }

  newHit = async (hit) => {
    console.log("HitStore: newHit() Start");
    this.postingHit = true;

    let res = null;

    // send to server
    try {
      res = await agent.Hit.create(hit);
      runInAction(() => {
        //console.log(res);
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.postingHit = false;
        console.log("HitStore: newHit() End");
      });
    }
    console.log(res);
    return res;
  };
}
