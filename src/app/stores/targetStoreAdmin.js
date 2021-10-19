import { action, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { toast } from "react-toastify";

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
      importTarget: action,
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

      console.log(this.selectedTarget);
    }
    // if not found fetch from api
    else {
      try {
        fetchedTargetAdmin = await agent.TargetAdmin.details(id);
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

    // send to servers
    try {
      updatedTarget = await agent.TargetAdmin.edit(this.selectedTarget);
      runInAction(() => {
        console.log(updatedTarget);
        toast.success("Changes are saved");
        this.selectedTarget = updatedTarget;
        this.targetRegistryAdmin.set(updatedTarget.id, updatedTarget);
      });
    } catch (error) {
      console.log(error);
      toast.error(error.data.title);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
        console.log("targetStoreAdmin: edit Complete");
      });
    }
    return updatedTarget;
  };

  importTarget = async (targetEntry) => {
    console.log("targetStoreAdmin: importTarget() Start");
    this.displayLoading = true;
    try {
      var res = await agent.TargetAdmin.import(targetEntry);

      runInAction(() => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      runInAction(() => {
        this.displayLoading = false;
      });
    }
    return res;
  };
}
