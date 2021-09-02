import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import localhost from "../api/localhost";

export default class TargetStoreAdmin {
  rootStore;
  displayLoading = false;
  targetRegistry = new Map();

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      fetchTargetList: action,
      targetRegistry: observable,
    });
  }
  fetchTargetList = async () => {
    console.log("targetStoreAdmin: fetchTargetList() Start");
    this.displayLoading = true;
    try {
      var resp = await localhost.Target.list();
      runInAction(() => {
        console.log(resp);
        resp.forEach((fetchedTarget) => {
          this.targetRegistry.set(fetchedTarget.id, fetchedTarget);
        });
        console.log(this.targetRegistry);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
      });
    }
  };
}
