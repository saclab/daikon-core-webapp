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

  updateHit = async (hit) => {
    console.log("HitStore: updateHit() Start");
    this.updatingHit = true;

    let res = null;

    // send to server
    try {
      res = await agent.Hit.update(hit.Id, hit);
      runInAction(() => {
        //console.log(res);
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.updatingHit = false;
        console.log("HitStore: updateHit() End");
      });
    }
    console.log(res);
    return res;
  };
}
