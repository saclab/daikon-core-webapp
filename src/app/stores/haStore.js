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

  get genes() {
    if (this.rootStore.appSettingsStore.activeStrainFilter === "global") {
      return Array.from(this.geneRegistry.values());
    }
    return Array.from(this.geneRegistry.values()).filter(
      (gene) =>
        gene.strainId === this.rootStore.appSettingsStore.activeStrainFilter
    );
  }

  filterHAProjects = () => {
    let HAProjects = Array.from(
      this.rootStore.projectStore.projectRegistry.values()
    ).filter((project) => {
      return project.currentStage === "HA";
    });

    if (this.rootStore.appSettingsStore.activeStrainFilter === "global") {
      return HAProjects;
    }

    return HAProjects.filter(
      (project) =>
        project.strainId === this.rootStore.appSettingsStore.activeStrainFilter
    );
  };
}
