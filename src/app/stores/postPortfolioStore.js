import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

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
    console.log("PostPortfolioStore: createIND Start");
    console.log(newIND);
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
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.creatingIND = false;
        console.log("PortfolioStore: createIND Complete");
      });
    }
    return res;
  };

  createP1 = async (newP1) => {
    console.log("PortfolioStore: createP1 Start");
    console.log(newP1);
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
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.creatingP1 = false;
        console.log("PortfolioStore: createP1 Complete");
      });
    }
    return res;
  };


  filterPostPortfolioProjects = () => {
    return Array.from(
      this.rootStore.projectStore.projectRegistry.values()
    ).filter((project) => {
      return (
        project.currentStage === "IND" ||
        project.currentStage === "P1"
      );
    });
  };
}
