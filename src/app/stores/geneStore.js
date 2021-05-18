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
  historyDisplayLoading = false;

  geneRegistry = new Map();
  geneRegistryExpanded = new Map();
  geneHistoryRegistry = new Map();
  selectedGene = null;
  selectedGeneHistory = null;

  pdbCrossReferenceRegistry = new Map();
  selectedPdbCrossReference = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      uniprotDisplayLoading: observable,
      historyDisplayLoading: observable,

      genes: computed,
      fetchGeneList: action,
      geneRegistry: observable,

      gene: computed,
      fetchGene: action,
      selectedGene: observable,

      fetchGeneHistory: action,
      selectedGeneHistory: observable,
      geneHistory: computed,

      pdbCrossReference: computed,
      fetchPdbCrossReference: action,
      selectedPdbCrossReference: observable,

      editGene: action,
      cancelEditGene: action,
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
    console.log("geneStore: fetchGene Start");
    this.displayLoading = true;

    // first check cache
    let fetchedGene = this.geneRegistryExpanded.get(id);
    console.log("CACHE");
    console.log(fetchedGene);
    if (fetchedGene && fetchedGene.hasOwnProperty("genePublicData")) {
      console.log("geneStore: fetchGene found in cache");
      this.selectedGene = fetchedGene;
      this.displayLoading = false;
    }
    // if not found fetch from api
    else {
      try {
        fetchedGene = await agent.Gene.view(id);
        runInAction(() => {
          console.log("geneStore: fetchGene fetched from api");
          console.log(this.selectedGene);
          this.selectedGene = fetchedGene;
          this.geneRegistryExpanded.set(id, fetchedGene);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.displayLoading = false;
          console.log("geneStore: fetchGene Complete");
        });
      }
    }
  };

  get gene() {
    return this.selectedGene;
  }

  /* Gene History */

  fetchGeneHistory = async () => {
    console.log("geneStore: fetchGeneHistory Start");
     this.historyDisplayLoading = true;
    let id = this.selectedGene.id;

    // first check cache
    let fetchedGeneHistory = this.geneHistoryRegistry.get(id);
    console.log("CACHE");
    console.log(fetchedGeneHistory);
    if (fetchedGeneHistory) {
      console.log("geneStore: fetchedGeneHistory found in cache");
      this.historyDisplayLoading = false;
      this.selectedGeneHistory = fetchedGeneHistory;
    }
    // if not found fetch from api
    else {
      try {
        fetchedGeneHistory = await agent.Gene.history(id);
        runInAction(() => {
          console.log("geneStore: fetchGeneHistory fetched from api");
          console.log(fetchedGeneHistory);

          this.geneHistoryRegistry.set(id, fetchedGeneHistory);
          this.selectedGeneHistory = fetchedGeneHistory;
         
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.historyDisplayLoading = false;
          console.log("geneStore: fetchGeneHistory Complete");
        });
      }
    }
  };

  get geneHistory() {
    return this.selectedGeneHistory;
  }

  /* End Gene History */

  /* Fetch PDB cross reference with id from API */

  fetchPdbCrossReference = async (accessionNumber) => {
    console.log("geneStore: fetchPdbCrossReference Start");
    this.uniprotDisplayLoading = true;

    let fetchedPdbCrossReference =
      this.pdbCrossReferenceRegistry.get(accessionNumber);
    // check cache
    if (fetchedPdbCrossReference) {
      console.log("geneStore: fetchPdbCrossReference Cache hit");
      this.selectedPdbCrossReference = fetchedPdbCrossReference;
      this.uniprotDisplayLoading = false;
    } else {
      try {
        let fetchedPdbCrossReferenceArray = [];
        fetchedPdbCrossReference = await uniprot.Pdb.crossReference(
          accessionNumber
        );
        runInAction(() => {
          console.log("geneStore: fetchPdbCrossReference Cache miss");
          console.log(fetchedPdbCrossReference);
          /*
            Uniprot handled 
            1. fetchedPdbCrossReference.uniprot.entry returns an object or an array
                so we are checking both the cases, if array we are looping over all the entries
            2. !EXCEPTION : entry.accession sometimes is returned as an array. There is absolutely NO way to 
               link this to the corresponding chains to from the href, we are always defaulting to the
               first element in the array. Links might break.
           */
          // 1 check if entry is array
          if (Array.isArray(fetchedPdbCrossReference.uniprot.entry)) {
            fetchedPdbCrossReference.uniprot.entry.forEach((entry) => {
              entry.dbReference.forEach((obj) => {
                if (obj._attributes.type === "PDB") {
                  let nobj = {
                    id: null,
                    method: null,
                    resolution: null,
                    chains: null,
                    accession: null,
                  };
                  nobj.id = obj._attributes.id;
                  nobj.accession = Array.isArray(entry.accession)
                    ? entry.accession[0]._text
                    : entry.accession._text;
                  obj.property.forEach((subObj) => {
                    if (subObj._attributes.type === "method")
                      nobj.method = subObj._attributes.value;
                    if (subObj._attributes.type === "resolution")
                      nobj.resolution = subObj._attributes.value;
                    if (subObj._attributes.type === "chains")
                      nobj.chains = subObj._attributes.value;
                  });
                  fetchedPdbCrossReferenceArray.push(nobj);
                }
              });
            });
          } else {
            fetchedPdbCrossReference.uniprot.entry.dbReference.forEach(
              (obj) => {
                if (obj._attributes.type === "PDB") {
                  let nobj = {
                    id: null,
                    method: null,
                    resolution: null,
                    chains: null,
                    accession: null,
                  };
                  nobj.id = obj._attributes.id;
                  nobj.accession = Array.isArray(
                    fetchedPdbCrossReference.uniprot.entry.accession
                  )
                    ? fetchedPdbCrossReference.uniprot.entry.accession[0]._text
                    : fetchedPdbCrossReference.uniprot.entry.accession._text;
                  obj.property.forEach((subObj) => {
                    if (subObj._attributes.type === "method")
                      nobj.method = subObj._attributes.value;
                    if (subObj._attributes.type === "resolution")
                      nobj.resolution = subObj._attributes.value;
                    if (subObj._attributes.type === "chains")
                      nobj.chains = subObj._attributes.value;
                  });
                  fetchedPdbCrossReferenceArray.push(nobj);
                }
              }
            );
          }

          this.pdbCrossReferenceRegistry.set(accessionNumber, {
            accessionNumber: accessionNumber,
            data: fetchedPdbCrossReferenceArray,
          });
          this.selectedPdbCrossReference = {
            accessionNumber: accessionNumber,
            data: fetchedPdbCrossReferenceArray,
          };
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
    }
  };

  get pdbCrossReference() {
    return this.selectedPdbCrossReference;
  }

  editGene = async () => {
    console.log("geneStore: editGene Start");
    this.displayLoading = true;
    let updatedGene = null;
    console.log(this.selectedGene);
    // send to server
    try {
      updatedGene = await agent.Gene.edit(this.selectedGene);
      runInAction(() => {
        console.log("geneStore: fetchGene fetched from api");
        console.log(this.selectedGene);
        this.selectedGene = updatedGene;
        this.geneRegistryExpanded.set(updatedGene.id, updatedGene);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.geneHistoryRegistry.delete(updatedGene.id);
        this.displayLoading = false;
        console.log("geneStore: edit Complete");
      });
    }
  };

  cancelEditGene = () => {
    console.log("geneStore: cancelEditGene");
    this.selectedGene = this.geneRegistryExpanded.get(this.selectedGene.id);
  };
}
