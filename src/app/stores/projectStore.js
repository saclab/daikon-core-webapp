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

  loadingCompoundEvolution = false;
  compoundEvolutionRegistry = new Map();
  compoundEvolutionRegistryCacheValid = false;
  selectedCompoundEvolution = null;
  addingCompoundEvolution = false;

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

      loadingCompoundEvolution: observable,
      fetchCompoundEvolution: action,
      compoundEvolutionRegistryCacheValid: observable,
      selectedCompoundEvolution: observable,
      addCompoundEvolution: action,
      addingCompoundEvolution: observable,
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
    console.log("The cache is");
    console.log(this.projectRegistryExpanded);
    let fetchedProject = this.projectRegistryExpanded.get(id);
    if (fetchedProject) {
      console.log("projectStore: fetchProject found in cache");
      console.log(fetchedProject);
      this.selectedProject = fetchedProject;
      this.loadingProject = false;
      console.log(this.selectedProject);
    }
    // if not found fetch from api
    else {
      try {
        fetchedProject = await agent.Projects.details(id);
        runInAction(() => {
          console.log("projectStore: fetchProject fetched from api");
          console.log(fetchedProject);
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

  fetchCompoundEvolution = async (projectId) => {
    console.log(
      "projectStore: fetchCompoundEvolution Start for id " + projectId
    );
    this.loadingCompoundEvolution = true;

    // first check cache
    let fetchedCompoundEvolution =
      this.compoundEvolutionRegistry.get(projectId);
    if (this.compoundEvolutionRegistryCacheValid && fetchedCompoundEvolution) {
      console.log("projectStore: fetchProject found in cache");
      this.selectedCompoundEvolution = fetchedCompoundEvolution;
      this.loadingCompoundEvolution = false;
    }
    // if not found fetch from api
    else {
      try {
        fetchedCompoundEvolution = await agent.Projects.getcompoundevolution(
          projectId
        );
        runInAction(() => {
          console.log("projectStore: getcompoundevolution fetched from api");
          this.selectedCompoundEvolution = fetchedCompoundEvolution;
          this.compoundEvolutionRegistry.set(projectId, fetchedCompoundEvolution);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.loadingCompoundEvolution = false;
          console.log("projectStore: getcompoundevolution Complete");
        });
      }
    }
  };

  addCompoundEvolution = async (newCompoundEvolution) => {
    console.log("ProjectStore: addCompoundEvolution Start");
    console.log(newCompoundEvolution);
    this.addingCompoundEvolution = true;
    let res = null;
    // send to server
    try {
      res = await agent.Projects.addcompoundevolution(
        this.selectedProject.id,
        newCompoundEvolution
      );
      runInAction(() => {
        toast.success("Successfully added new structure");
        this.compoundEvolutionRegistryCacheValid = false;

      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.addingCompoundEvolution = false;
        console.log("ProjectStore: addCompoundEvolution Complete");
      });
    }
    return res;
  };
}
