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
      editTargetAdmin: action,
      cancelEditTargetAdmin: action,
    });
  }
  /* Fetch specific TargetAdmin with id from API */

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
  

  /* Edit TargetAdmin */

  editTargetAdmin = async () => {
    console.log("targetStoreAdmin: editTargetAdmin Start");
    this.displayLoading = true;
    let updatedTarget = null;
    console.log(this.selectedTarget);
    // send to servers
    try {
      updatedTarget = await localhost.TargetAdmin.edit(this.selectedTarget);
      runInAction(() => {
        console.log("targetStoreAdmin: fetchTarget fetched from api");
        console.log(this.selectedTarget);
        this.selectedTarget = updatedTarget;
        this.targetRegistryAdmin.set(updatedTarget.id, updatedTarget);
        
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
        console.log("targetStoreAdmin: edit Complete");
      });
    }
  };

  cancelEditTargetAdmin = () => {
    console.log("targetStoreAdmin: cancelEditTargetAdmin");
    this.selectedTarget = this.targetRegistryAdmin.get(this.selectedTarget.id);
  };


}
