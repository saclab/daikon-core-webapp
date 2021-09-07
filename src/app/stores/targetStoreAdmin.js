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
  targetRegistryAdmin = new Map();
  selectedTarget = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      targetRegistryAdmin: observable,
      fetchTargetAdmin: action,
      selectedTarget: observable,
    });
  }
  /* Fetch specific Target with id from API */

  fetchTargetAdmin = async (id) => {
    console.log("targetStoreAdmin: fetchTargetAdmin Start");
    this.displayLoading = true;

    // first check cache
    let fetchedTargetAdmin = this.targetRegistryAdmin.get(id);
    console.log("CACHE");
    console.log(fetchedTargetAdmin);

    if (fetchedTargetAdmin) {
      console.log("targetStoreAdmin: fetchedTargetAdmin found in cache");
      this.selectedTarget = fetchedTargetAdmin;
      this.displayLoading = false;
    }
    // if not found fetch from api
    else {
      try {
        fetchedTargetAdmin = await localhost.TargetAdmin.details(id);
        runInAction(() => {
          console.log("targetStoreAdmin: fetchTargetAdmin fetched from api");

          this.selectedTarget = fetchedTargetAdmin;
          this.targetRegistryAdmin.set(id, fetchedTargetAdmin);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.displayLoading = false;
          console.log("targetStoreAdmin: fetchTargetAdmin Complete");
        });
      }
    }
  };

  // get target() {
  //   console.log("From Target Store Admin");
  //   console.log(this.selectedTarget);
  //   return this.selectedTarget;
  // }


}
