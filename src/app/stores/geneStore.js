import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import agent from "../api/agent";
import uniprot from "../api/uniprot";
import Ebi from "../api/ebi";
import {
  _helper_formatLigands,
  _helper_extractPdbCrossReference,
} from "./geneStore_Helper";

export default class GeneStore {
  rootStore;

  displayLoading = false;
  uniprotDisplayLoading = false;
  historyDisplayLoading = false;
  promotionQuestionsDisplayLoading = false;

  geneRegistry = new Map();
  geneRegistryExpanded = new Map();
  geneHistoryRegistry = new Map();
  selectedGene = null;
  selectedGeneHistory = null;

  pdbCrossReferenceRegistry = new Map();
  selectedPdbCrossReference = null;

  promotionQuestionsRegistry = new Map();

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      uniprotDisplayLoading: observable,
      historyDisplayLoading: observable,
      promotionQuestionsDisplayLoading: observable,

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

      getPromotionQuestions: action,
      submitPromotionQuestionaire: action,
    });
  }

  /* Fetch Gene list from API */
  fetchGeneList = async () => {
    console.log("geneStore: fetchGeneList() Start");
    if (this.geneRegistry.size !== 0) {
      console.log("geneStore: fetchGeneList() cache hit");
      this.displayLoading = false;
      return;
    }
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


  fetchGeneByAccessionNo = (accessionNo) => {
    return agent.Gene.viewByAccessionNo(accessionNo)
  }

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
        console.log("geneStore: fetchPdbCrossReference Cache miss");

        // fetch from api
        fetchedPdbCrossReference = await uniprot.Pdb.crossReference(
          accessionNumber
        );

        // from the bulk of data extract the Crossreference part
        let fetchedPdbCrossReferenceArray = _helper_extractPdbCrossReference(
          fetchedPdbCrossReference
        );

        // Now add ligands to each protein
        let fetchedPdbCrossReferenceArrayWithLigand = [];
        /*TIP: async will not work with foreach loop, use Promise.all and map method instead */
        await Promise.all(
          fetchedPdbCrossReferenceArray.map(async (nobj) => {
            // fetch from ebi
            let ligands = await Ebi.Ebi.ligands(nobj.id);

            nobj.ligands = _helper_formatLigands(ligands);

            fetchedPdbCrossReferenceArrayWithLigand.push(nobj);
            console.log(nobj);
          })
        );

        runInAction(() => {
          this.pdbCrossReferenceRegistry.set(accessionNumber, {
            accessionNumber: accessionNumber,
            data: fetchedPdbCrossReferenceArrayWithLigand,
          });
          this.selectedPdbCrossReference = {
            accessionNumber: accessionNumber,
            data: fetchedPdbCrossReferenceArrayWithLigand,
          };
          console.log(this.fetchedPdbCrossReferenceArrayWithLigand);
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
        this.geneHistoryRegistry.delete(updatedGene.id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
        console.log("geneStore: edit Complete");
      });
    }
  };

  cancelEditGene = () => {
    console.log("geneStore: cancelEditGene");
    this.selectedGene = this.geneRegistryExpanded.get(this.selectedGene.id);
  };

  /* get Promotion Questions from API */
  getPromotionQuestions = async () => {
    console.log("geneStore: fetchPromotionQuestions() Start");
    this.promotionQuestionsDisplayLoading = true;
    // check cache
    if (!this.promotionQuestionsRegistry.size === 0) {
      this.promotionQuestionsDisplayLoading = false;
      return this.promotionQuestionsRegistry;
    }

    // then fetch
    try {
      var resp = await agent.Gene.promotionQuestions();
      runInAction(() => {
        console.log(resp);
        resp.forEach((fetchedPromotionQuestion) => {
          this.promotionQuestionsRegistry.set(
            fetchedPromotionQuestion.identification,
            fetchedPromotionQuestion
          );
        });
        console.log(this.promotionQuestionsRegistry);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.promotionQuestionsDisplayLoading = false;
        return this.promotionQuestionsRegistry;
      });
    }
  };

  /* submit Promotion Questionaire from API */
  submitPromotionQuestionaire = async (data) => {
    console.log("geneStore: submitPromotionQuestionaire Start");
    this.promotionQuestionsDisplayLoading = true;
    let res = null;

    // send to server
    try {
      res = await agent.Gene.submitPromotionQuestionaire(
        this.selectedGene.id,
        data
      );
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.promotionQuestionsDisplayLoading = false;
        console.log("geneStore: submitPromotionQuestionaire Complete");
      });
    }
    return res;
    
  };
}
