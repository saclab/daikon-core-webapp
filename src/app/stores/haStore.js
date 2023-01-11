import { action, makeObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";

import agent from "../api/agent";

export default class HAStore {
  rootStore;

  creatingHA = false;
  loadingHAProjects = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      creatingHA: observable,
      createHA: action,
      filterHAProjects: observable,
    });
  }

  createHA = async (newHA) => {
    this.creatingHA = true;
    let res = null;
    // send to server
    try {
      res = await agent.Projects.createHA(newHA);
      runInAction(() => {
        toast.success("Successfully created new HA");
        this.rootStore.projectStore.projectRegistryCacheValid = false;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.creatingHA = false;
      });
    }
    return res;
  };

  filterHAProjects = () => {
    return Array.from(
      this.rootStore.projectStore.projectRegistry.values()
    ).filter((project) => {
      return project.currentStage === "HA" || project.currentStage === "HA";
    });
  };
}
