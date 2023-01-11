import { action, makeObservable, observable, runInAction } from "mobx";

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
    this.loadingTargetDash = true;

    if (this.targetDash === null) {
      try {
        this.targetDash = await agent.DataView.targetDash();
      } catch (error) {
        this.targetDash = null;
        console.error(error);
      } finally {
        runInAction(() => {
          this.loadingTargetDash = false;
        });
      }
    } else {
      this.loadingTargetDash = false;
    }
  };
}
