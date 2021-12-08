import { action, makeObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";

import agent from "../api/agent";

export default class ProjectStore {
  rootStore;

  loadingProjects = false;
  loadingProject = false;
  projectRegistry = new Map();
  projectRegistryExpanded = new Map();
  projectRegistryCacheValid = false;
  selectedProject = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      loadingProjects: observable,
      loadingProject: observable,
      fetchProjects: action,
      fetchProject: action,
      projectRegistry: observable,
      projectRegistryExpanded: observable,
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

  fetchProject = async (id) => {
    console.log("projectStore: fetchProject Start for id " + id);
    this.loadingProject = true;

    // first check cache
    let fetchedProject = this.projectRegistryExpanded.get(id);
    if (fetchedProject) {
      console.log("projectStore: fetchProject found in cache");
      this.selectedProject = fetchedProject;
      this.loadingProject = false;
    }
    // if not found fetch from api
    else {
      try {
        fetchedProject = await agent.Projects.details(id);
        runInAction(() => {
          console.log("projectStore: fetchProject fetched from api");
          this.selectedProject = fetchedProject;
          this.projectRegistryExpanded.set(id, fetchedProject);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.loadingProject = false;
          console.log("projectStore: fetchProject Complete");
        });
      }
    }
  };
}
