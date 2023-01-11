import {
    action,
    makeObservable,
    observable,
    runInAction
} from "mobx";

import { toast } from "react-toastify";
import agent from "../api/agent";

export default class PortfolioStore {
  rootStore;

  creatingH2L = false;
  creatingLO = false;
  creatingSP = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      creatingH2L: observable,
      createH2L: action,

      creatingLO: observable,
      createLO: action,

      creatingSP: observable,
      createSP: action,

      filterPortfolioProjects: action,
    });
  }

  createH2L = async (newH2L) => {
    console.log("PortfolioStore: createH2L Start");
    console.log(newH2L);
    this.creatingH2L = true;
    let res = null;
    // send to server
    try {
      res = await agent.Projects.createH2L(
        this.rootStore.projectStore.selectedProject.id,
        newH2L
      );
      runInAction(() => {
        toast.success("Successfully created new HA");
        this.rootStore.projectStore.projectRegistryCacheValid = false;
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.creatingH2L = false;
        console.log("PortfolioStore: createH2L Complete");
      });
    }
    return res;
  };

  createLO = async (newLO) => {
    console.log("PortfolioStore: createLO Start");
    console.log(newLO);
    this.creatingLO = true;
    let res = null;
    // send to server
    try {
      res = await agent.Projects.createLO(
        this.rootStore.projectStore.selectedProject.id,
        newLO
      );
      runInAction(() => {
        toast.success("Successfully promoted project to LO");
        this.rootStore.projectStore.projectRegistryCacheValid = false;
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.creatingLO = false;
        console.log("PortfolioStore: createLO Complete");
      });
    }
    return res;
  };

  createSP = async (newSP) => {
    console.log("PortfolioStore: createSP Start");
    console.log(newSP);
    this.creatingSP = true;
    let res = null;
    // send to server
    try {
      res = await agent.Projects.createSP(
        this.rootStore.projectStore.selectedProject.id,
        newSP
      );
      runInAction(() => {
        toast.success("Successfully promoted project to SP");
        this.rootStore.projectStore.projectRegistryCacheValid = false;
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.creatingSP = false;
        console.log("PortfolioStore: createSP Complete");
      });
    }
    return res;
  };

  filterPortfolioProjects = () => {
    return Array.from(
      this.rootStore.projectStore.projectRegistry.values()
    ).filter((project) => {
      return (
        project.currentStage === "H2L" ||
        project.currentStage === "LO" ||
        project.currentStage === "SP"
      );
    });
  };
}
