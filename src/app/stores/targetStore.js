import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import localhost from "../api/localhost";


export default class TargetStore {
  rootStore;

  displayLoading = false;
  
  historyDisplayLoading = false;

  targetRegistry = new Map();
  targetRegistryExpanded = new Map();
  targetHistoryRegistry = new Map();
  selectedTarget = null;
  selectedTargetHistory = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      historyDisplayLoading: observable,

      targets: computed,
      fetchTargetList: action,
      targetRegistry: observable,

      target: computed,
      fetchTarget: action,
      selectedTarget: observable,

      fetchTargetHistory: action,
      selectedTargetHistory: observable,
      targetHistory: computed,


      editTarget: action,
      cancelEditTarget: action,
    });
  }

  /* Fetch Target list from API */
  fetchTargetList = async () => {
    console.log("targetStore: fetchTargetList() Start");
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
        fetchedTarget = await localhost.Target.view(id);
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

  /* Target History */

  fetchTargetHistory = async () => {
    console.log("targetStore: fetchTargetHistory Start");
    this.historyDisplayLoading = true;
    let id = this.selectedTarget.id;

    // first check cache
    let fetchedTargetHistory = this.targetHistoryRegistry.get(id);
    console.log("CACHE");
    console.log(fetchedTargetHistory);
    if (fetchedTargetHistory) {
      console.log("targetStore: fetchedTargetHistory found in cache");
      this.historyDisplayLoading = false;
      this.selectedTargetHistory = fetchedTargetHistory;
    }
    // if not found fetch from api
    else {
      try {
        fetchedTargetHistory = await localhost.Target.history(id);
        runInAction(() => {
          console.log("targetStore: fetchTargetHistory fetched from api");
          console.log(fetchedTargetHistory);

          this.targetHistoryRegistry.set(id, fetchedTargetHistory);
          this.selectedTargetHistory = fetchedTargetHistory;
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.historyDisplayLoading = false;
          console.log("targetStore: fetchTargetHistory Complete");
        });
      }
    }
  };

  get targetHistory() {
    return this.selectedTargetHistory;
  }

  /* End Target History */


  editTarget = async () => {
    console.log("targetStore: editTarget Start");
    this.displayLoading = true;
    let updatedTarget = null;
    console.log(this.selectedTarget);
    // send to server
    try {
      updatedTarget = await localhost.Target.edit(this.selectedTarget);
      runInAction(() => {
        console.log("targetStore: fetchTarget fetched from api");
        console.log(this.selectedTarget);
        this.selectedTarget = updatedTarget;
        this.targetRegistryExpanded.set(updatedTarget.id, updatedTarget);
        this.targetHistoryRegistry.delete(updatedTarget.id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
        console.log("targetStore: edit Complete");
      });
    }
  };

  cancelEditTarget = () => {
    console.log("targetStore: cancelEditTarget");
    this.selectedTarget = this.targetRegistryExpanded.get(this.selectedTarget.id);
  };
}
