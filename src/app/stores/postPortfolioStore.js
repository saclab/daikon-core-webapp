import { action, makeObservable, observable, runInAction } from "mobx";

import { toast } from "react-toastify";
import agent from "../api/agent";

export default class PostPortfolioStore {
  rootStore;

  creatingIND = false;
  creatingP1 = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      creatingIND: observable,
      createIND: action,

      creatingP1: observable,
      createP1: action,

      filterPostPortfolioProjects: action,
    });
  }

  createIND = async (newIND) => {
    this.creatingIND = true;
    let res = null;
    // send to server
    try {
      res = await agent.Projects.createIND(
        this.rootStore.projectStore.selectedProject.id,
        newIND
      );
      runInAction(() => {
        toast.success("Successfully created new IND");
        this.rootStore.projectStore.projectRegistryCacheValid = false;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.creatingIND = false;
      });
    }
    return res;
  };

  createP1 = async (newP1) => {
    this.creatingP1 = true;
    let res = null;
    // send to server
    try {
      res = await agent.Projects.createP1(
        this.rootStore.projectStore.selectedProject.id,
        newP1
      );
      runInAction(() => {
        toast.success("Successfully promoted project to P1");
        this.rootStore.projectStore.projectRegistryCacheValid = false;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.creatingP1 = false;
      });
    }
    return res;
  };

  filterPostPortfolioProjects = () => {
    return Array.from(
      this.rootStore.projectStore.projectRegistry.values()
    ).filter((project) => {
      return project.currentStage === "IND" || project.currentStage === "P1";
    });
  };
}
