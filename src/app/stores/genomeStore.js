import {
  action,
  computed,
  makeObservable,
  observable,
  configure,
  runInAction,
} from "mobx";
import { createContext } from "react";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class GenomeStore {
  displayLoading = false;
  genomesRegistry = new Map();
  genome = null;

  constructor() {
    makeObservable(this, {
      genomes: computed,
      displayLoading: observable,
      fetchGenomesList: action,
      genomesRegistry: observable,
      getGenome: action,
      genome: observable
    });
  }

  /* Fetch Genomes list from API */
  fetchGenomesList = async () => {
    this.displayLoading = true;
    try {
      var resp = await agent.Genomes.list();
      runInAction(() => {
        resp.forEach((genome) => {
          this.genomesRegistry.set(genome.id, genome);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
      });
    }
  };

  get genomes() {
    return Array.from(this.genomesRegistry.values());
  }

  getGenome = async (id) => {
    this.displayLoading = true;
    try {
      this.genome = await agent.Genomes.view(id);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
      });
    }
  };
}

export default createContext(new GenomeStore());
