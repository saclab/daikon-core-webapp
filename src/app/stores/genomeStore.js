import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import agent from "../api/agent";



export default class GenomeStore {
  rootStore;

  displayLoading = false;
  genomesRegistry = new Map();
  genome = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      genomes: computed,
      displayLoading: observable,
      fetchGenomesList: action,
      genomesRegistry: observable,
      getGenome: action,
      genome: observable,
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
