import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import agent from "../api/agent";


export default class TargetStore {
  rootStore;
  displayLoading = false;
  targetRegistry = new Map();
  targetRegistryExpanded = new Map();
  selectedTarget = null;
  
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,

      targets: computed,
      fetchTargetList: action,
      targetRegistry: observable,

      target: computed,
      fetchTarget: action,
      selectedTarget: observable,
    });
  }

  /* Fetch Target list from API */
  fetchTargetList = async () => {
    console.log("targetStore: fetchTargetList() Start");
    this.displayLoading = true;
    try {
      var resp = await agent.Target.list();
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

  get targets() {
    console.log("targetStore: targets() Start");
    return Array.from(this.targetRegistry.values());
  }

  /* Fetch specific Target with id from API */

  fetchTarget = async (id) => {
    console.log("targetStore: fetchTarget Start");
    this.displayLoading = true;

    // first check cache
    let fetchedTarget = this.targetRegistryExpanded.get(id);
    console.log("CACHE");
    console.log(fetchedTarget);
    if (fetchedTarget && fetchedTarget.hasOwnProperty("targetPromotionForm")) {
      console.log("targetStore: fetchTarget found in cache");
      this.selectedTarget = fetchedTarget;
      this.displayLoading = false;
    }
    // if not found fetch from api
    else {
      try {
        fetchedTarget = await agent.Target.view(id);
        runInAction(() => {
          console.log("targetStore: fetchTarget fetched from api");
          console.log(this.selectedTarget);
          this.selectedTarget = fetchedTarget;
          this.targetRegistryExpanded.set(id, fetchedTarget);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.displayLoading = false;
          console.log("targetStore: fetchTarget Complete");
        });
      }
    }
  };

  get target() {
    console.log("From Target Store");
    console.log(this.selectedTarget);
    return this.selectedTarget;
  }

  
}
