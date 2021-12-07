import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { toast } from "react-toastify";

import agent from "../api/agent";

export default class FHAStore {
  rootStore;

  creatingFHA = false;
  loadingFHAProjects = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      creatingFHA: observable,
      createFHA: action,
      filterFhaProjects: observable,
    });
  }

  createFHA = async (newFha) => {
    console.log("FHAStore: createFHA Start");
    console.log(newFha);
    this.creatingFHA = true;
    let res = null;
    // send to server
    try {
      res = await agent.Projects.createFHA(newFha);
      runInAction(() => {
        toast.success("Successfully created new FHA");
        this.rootStore.projectStore.projectRegistryCacheValid = false;
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.creatingFHA = false;
        console.log("FHAStore: createFHA Complete");
      });
    }
    return res;
  };

  filterFhaProjects = () => {
    return Array.from(
      this.rootStore.projectStore.projectRegistry.values()
    ).filter((project) => {
      return project.currentStage === "FHA";
    });
  };
}
