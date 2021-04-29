import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import agent from "../api/agent";



export default class GeneStore {
  rootStore;

  displayLoading = false;
  geneRegistry = new Map();
  selectedGene = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,

      genes: computed,
      fetchGeneList: action,
      geneRegistry: observable,

      gene: computed,      
      fetchGene: action,
      selectedGene: observable
    });
  }

  /* Fetch Gene list from API */
  fetchGeneList = async () => {
    console.log("geneStore: fetchGeneList() Start");
    this.displayLoading = true;
    try {
      var resp = await agent.Gene.list();
      runInAction(() => {
        console.log(resp);
        resp.forEach((fetchedGene) => {
          this.geneRegistry.set(fetchedGene.id, fetchedGene);
        });
        console.log(this.geneRegistry);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
      });
    }
  };

  get genes() {
    console.log("geneStore: genes() Start");
    return Array.from(this.geneRegistry.values());
  }


  /* Fetch specific Gene with id from API */

  fetchGene = async (id) => {
    console.log("geneStore: selectedGene Start");
    this.displayLoading = true;
    try {
      this.selectedGene = await agent.Gene.view(id);
      runInAction(() => {
        console.log(this.selectedGene);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
        console.log("geneStore: selectedGene Complete");
      });
    }
  };

  get gene() {
    return this.selectedGene;
  }
}
