import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import agent from "../api/agent";
import uniprot from "../api/uniprot";



export default class GeneStore {
  rootStore;

  displayLoading = false;
  uniprotDisplayLoading = false;
  geneRegistry = new Map();
  selectedGene = null;
  selectedPdbCrossReference = new Array();

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      uniprotDisplayLoading : observable,

      genes: computed,
      fetchGeneList: action,
      geneRegistry: observable,

      gene: computed,      
      fetchGene: action,
      selectedGene: observable,

      pdbCrossReference : computed,
      fetchPdbCrossReference: action,
      selectedPdbCrossReference: observable,
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

    /* Fetch PDB cross reference with id from API */

    fetchPdbCrossReference = async (id) => {
      console.log("geneStore: fetchPdbCrossReference Start");
      this.uniprotDisplayLoading = true;
      try {
        let fetchedPdbCrossReference = await uniprot.Pdb.crossReference(id);
        runInAction(() => {
    
          fetchedPdbCrossReference.uniprot.entry.dbReference.forEach((obj) => {
            if(obj._attributes.type==="PDB") {
              let nobj = {
                id : null,
                method : null,
                resolution : null,
                chains : null
              }
              nobj.id = obj._attributes.id;
              obj.property.forEach((subObj) => {
                if(subObj._attributes.type === "method") nobj.method = subObj._attributes.value;
                if(subObj._attributes.type === "resolution") nobj.resolution = subObj._attributes.value;
                if(subObj._attributes.type === "chains") nobj.chains = subObj._attributes.value;                
              });
              this.selectedPdbCrossReference.push(nobj)
            }
          }
          );

          

          console.log(this.selectedPdbCrossReference);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.uniprotDisplayLoading = false;
          console.log("geneStore: fetchPdbCrossReference Complete");
        });
      }
    };

    get pdbCrossReference() {
      return this.selectedPdbCrossReference;
    }
}
