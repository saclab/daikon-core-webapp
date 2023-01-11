import {
  action,
  makeObservable,
  observable,
  runInAction
} from "mobx";

import agent from "../api/agent";

export default class DataViewStore {
  rootStore;

  loadingTargetDash = false;
  targetDash = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      loadingTargetDash: observable,
      targetDash: observable,
      loadTargetDash: action,
    });
  }

  loadTargetDash = async () => {
    console.log("DataViewStore: loadTargetDash");
    this.loadingTargetDash = true;

    if (this.targetDash === null) {
      try {
        console.log("DataViewStore: loadTargetDash Fetch");
        this.targetDash = await agent.DataView.targetDash();
      } catch (error) {
        this.targetDash = null;
        console.log(error);
      } finally {
        runInAction(() => {
          this.loadingTargetDash = false;
          console.log("DataViewStore: loadTargetDash Complete");
        });
      }
    }
    else {
      this.loadingTargetDash = false;
    }

  };

}
