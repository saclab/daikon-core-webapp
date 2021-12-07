import { action, makeObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";

import agent from "../api/agent";

export default class ProjectStore {
  rootStore;

  loadingProjects = false;
  projectRegistry = new Map();
  projectRegistryCacheValid = false;
  selectedProject = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      loadingProjects: observable,
      fetchProjects: action,
      projectRegistry: observable,
      projectRegistryCacheValid: observable,
      selectedProject: observable,
    });
  }

  fetchProjects = async () => {
    console.log("projectStore: fetchProjects() Start");
    this.loadingProjects = true;
    if (this.projectRegistryCacheValid && this.projectRegistry.size !== 0) {
      console.log("projectStore: fetchProjects() cache hit");
      this.loadingProjects = false;
      return;
    }
    try {
      console.log("projectStore: fetchProjects() cache miss");
      var resp = await agent.Projects.list();
      runInAction(() => {
        console.log(resp);
        resp.forEach((project) => {
          this.projectRegistry.set(project.id, project);
        });
        this.projectRegistryCacheValid = true;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingProjects = false;
      });
    }
  };
}
