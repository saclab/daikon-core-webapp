import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { toast } from "react-toastify";
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
  editingEssentiality = false;
  addingEssentiality = false;
  editingProteinProduction = false;
  addingProteinProduction = false;
  editingProteinActivityAssay = false;
  addingProteinActivityAssay = false;
  editingCRISPRiStrain = false;
  addingCRISPRiStrain = false;
  editingResistanceMutation = false;
  addingeditingResistanceMutation = false;
  editingUnpublishedStructures = false;
  addingUnpublishedStructures = false;
  editingVulnerability = false;
  addingVulnerability = false;
  editingHypomorph = false;
  addingHypomorph = false;
  searchingGeneGroup = false;

  validateTargetNameLoading = false;
  proposedTargetNameValidated = "";

  geneRegistry = new Map();
  geneFunctionalCategories = [];
  geneRegistryExpanded = new Map();
  geneHistoryRegistry = new Map();

  selectedGene = null;
  selectedGeneHistory = null;

  pdbCrossReferenceRegistry = new Map();
  selectedPdbCrossReference = null;

  promotionQuestionsRegistry = new Map();

  genePromotionDataObj = {};

  searchedGeneGroup = null;

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
      geneFunctionalCategories: observable,

      gene: computed,
      fetchGene: action,
      selectedGene: observable,
      reloadGene: action,

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

      addEssentiality: action,
      editEssentiality: action,
      editingEssentiality: observable,
      addingEssentiality: observable,

      editingProteinProduction: observable,
      addingProteinProduction: observable,
      addProteinProduction: action,
      editProteinProduction: action,

      editingProteinActivityAssay: observable,
      addingProteinActivityAssay: observable,
      addProteinActivityAssay: action,
      editProteinActivityAssay: action,

      editingCRISPRiStrain: observable,
      addingCRISPRiStrain: observable,
      addCRISPRiStrain: action,
      editCRISPRiStrain: action,

      editingResistanceMutation: observable,
      addingeditingResistanceMutation: observable,
      addResistanceMutation: action,
      editResistanceMutation: action,

      editingUnpublishedStructures: observable,
      addingUnpublishedStructures: observable,
      addUnpublishedStructures: action,
      editUnpublishedStructures: action,

      editingVulnerability: observable,
      addingVulnerability: observable,
      addVulnerability: action,
      editVulnerability: action,

      editingHypomorph: observable,
      addingHypomorph: observable,
      addHypomorph: action,
      editHypomorph: action,

      validateTargetName: action,
      validateTargetNameLoading: observable,
      proposedTargetNameValidated: observable,

      saveGenePromotionDataObj: action,
      getGenePromotionDataObj: action,

      searchingGeneGroup: observable,
      searchedGeneGroup: observable,
      searchGeneGroup: action,
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
        this.geneFunctionalCategories = [
          ...new Set(this.genes.map((g) => g.functionalCategory)),
        ];
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

  reloadGene = async (id) => {
    id = id === null ? this.selectedGene.id : id;

    console.log("geneStore: reloadGene Start");
    this.displayLoading = true;
    try {
      let fetchedGene = await agent.Gene.view(id);
      runInAction(() => {
        console.log("geneStore: reloadGene fetched from api");
        console.log(this.selectedGene);
        this.selectedGene = fetchedGene;
        this.geneRegistryExpanded.set(id, fetchedGene);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
        console.log("geneStore: reloadGene Complete");
      });
    }
  };

  fetchGeneByAccessionNo = (accessionNo) => {
    return agent.Gene.viewByAccessionNo(accessionNo);
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
        console.log("geneStore: fetchPdbCrossReference Cache miss");

        // fetch from api
        fetchedPdbCrossReference = await uniprot.Pdb.crossReference(
          accessionNumber
        );

        console.log("after api call +++++++++++++++++")

        

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
        console.log("PDB Error Catch")
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
  submitPromotionQuestionaire = async (targetName, data) => {
    console.log("geneStore: submitPromotionQuestionaire Start");
    this.promotionQuestionsDisplayLoading = true;
    let res = null;

    // send to server
    try {
      res = await agent.Gene.submitPromotionQuestionaire(targetName, data);
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

  editEssentiality = async (editedEssentiality) => {
    console.log("geneStore: editEssentiality Start");

    this.editingEssentiality = true;
    // send to server
    try {
      await agent.Gene.editEssentiality(
        editedEssentiality.geneId,
        editedEssentiality.id,
        editedEssentiality
      );
      runInAction(() => {
        this.reloadGene(editedEssentiality.geneId);
        toast.success("Ok, edited essentiality data.");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.editingEssentiality = false;
      });
    }
  };

  addEssentiality = async (newEssentiality) => {
    console.log("geneStore: addEssentiality Start");

    this.addingEssentiality = true;
    // send to server
    try {
      await agent.Gene.addEssentiality(this.selectedGene.id, newEssentiality);
      runInAction(() => {
        this.reloadGene(this.selectedGene.id);
        toast.success("Ok, added new essentiality");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.addingEssentiality = false;
      });
    }
  };

  editProteinProduction = async (editedProteinProduction) => {
    console.log("geneStore: editProteinProduction Start");

    this.editingProteinProduction = true;
    // send to server
    try {
      await agent.Gene.editProteinProduction(
        editedProteinProduction.geneId,
        editedProteinProduction.id,
        editedProteinProduction
      );
      runInAction(() => {
        this.reloadGene(editedProteinProduction.geneId);
        toast.success("Ok, edited ProteinProduction data.");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.editingProteinProduction = false;
      });
    }
  };

  addProteinProduction = async (newProteinProduction) => {
    console.log("geneStore: addProteinProduction Start");

    this.addingProteinProduction = true;
    // send to server
    try {
      await agent.Gene.addProteinProduction(
        this.selectedGene.id,
        newProteinProduction
      );
      runInAction(() => {
        this.reloadGene(this.selectedGene.id);
        toast.success("Ok, added new ProteinProduction");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.addingProteinProduction = false;
      });
    }
  };

  editProteinActivityAssay = async (editedProteinActivityAssay) => {
    console.log("geneStore: editProteinActivityAssay Start");

    this.editingProteinActivityAssay = true;
    // send to server
    try {
      await agent.Gene.editProteinProductionAssasy(
        editedProteinActivityAssay.geneId,
        editedProteinActivityAssay.id,
        editedProteinActivityAssay
      );
      runInAction(() => {
        this.reloadGene(editedProteinActivityAssay.geneId);
        toast.success("Ok, edited ProteinActivityAssay data.");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.editingProteinActivityAssay = false;
      });
    }
  };

  addProteinActivityAssay = async (newProteinActivityAssay) => {
    console.log("geneStore: addProteinActivityAssay Start");

    this.addingProteinActivityAssay = true;
    // send to server
    try {
      await agent.Gene.addProteinProductionAssasy(
        this.selectedGene.id,
        newProteinActivityAssay
      );
      runInAction(() => {
        this.reloadGene(this.selectedGene.id);
        toast.success("Ok, added new ProteinActivityAssay");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.addingProteinActivityAssay = false;
      });
    }
  };

  editCRISPRiStrain = async (editedCRISPRiStrain) => {
    console.log("geneStore: editCRISPRiStrain Start");

    this.editingCRISPRiStrain = true;
    // send to server
    try {
      await agent.Gene.editCRISPRiStrain(
        editedCRISPRiStrain.geneId,
        editedCRISPRiStrain.id,
        editedCRISPRiStrain
      );
      runInAction(() => {
        this.reloadGene(editedCRISPRiStrain.geneId);
        toast.success("Ok, edited CRISPRiStrain data.");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.editingCRISPRiStrain = false;
      });
    }
  };

  addCRISPRiStrain = async (newCRISPRiStrain) => {
    console.log("geneStore: addCRISPRiStrain Start");

    this.addingCRISPRiStrain = true;
    // send to server
    try {
      await agent.Gene.addCRISPRiStrain(this.selectedGene.id, newCRISPRiStrain);
      runInAction(() => {
        this.reloadGene(this.selectedGene.id);
        toast.success("Ok, added new CRISPRiStrain");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.addingCRISPRiStrain = false;
      });
    }
  };

  editResistanceMutation = async (editedResistanceMutation) => {
    console.log("geneStore: editResistanceMutation Start");

    this.editingResistanceMutation = true;
    // send to server
    try {
      agent.Gene.editResistanceMutation(
        editedResistanceMutation.geneId,
        editedResistanceMutation.id,
        editedResistanceMutation
      );
      runInAction(() => {
        this.reloadGene(editedResistanceMutation.geneId);
        toast.success("Ok, edited ResistanceMutation data.");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.editingResistanceMutation = false;
      });
    }
  };

  addResistanceMutation = async (newResistanceMutation) => {
    console.log("geneStore: addResistanceMutation Start");

    this.addingResistanceMutation = true;
    // send to server
    try {
      await agent.Gene.addResistanceMutation(
        this.selectedGene.id,
        newResistanceMutation
      );
      runInAction(() => {
        this.reloadGene(this.selectedGene.id);
        toast.success("Ok, added new ResistanceMutation");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.addingResistanceMutation = false;
      });
    }
  };

  editUnpublishedStructures = async (editedUnpublishedStructures) => {
    console.log("geneStore: editUnpublishedStructures Start");

    this.editingUnpublishedStructures = true;
    // send to server
    try {
      await agent.Gene.editUnpublishedStructure(
        editedUnpublishedStructures.geneId,
        editedUnpublishedStructures.id,
        editedUnpublishedStructures
      );
      runInAction(() => {
        this.reloadGene(editedUnpublishedStructures.geneId);
        toast.success("Ok, edited UnpublishedStructures data.");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.editingUnpublishedStructures = false;
      });
    }
  };

  addUnpublishedStructures = async (newUnpublishedStructures) => {
    console.log("geneStore: addUnpublishedStructures Start");

    this.addingUnpublishedStructures = true;
    // send to server
    try {
      await agent.Gene.addUnpublishedStructure(
        this.selectedGene.id,
        newUnpublishedStructures
      );
      runInAction(() => {
        this.reloadGene(this.selectedGene.id);
        toast.success("Ok, added new UnpublishedStructures");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.addingUnpublishedStructures = false;
      });
    }
  };

  editVulnerability = async (editedVulnerability) => {
    console.log("geneStore: editVulnerabiliity Start");
    console.log(editedVulnerability);

    this.editingVulnerabiliity = true;
    // send to server
    try {
      await agent.Gene.editVulnerability(
        editedVulnerability.geneId,
        editedVulnerability.id,
        editedVulnerability
      );
      runInAction(() => {
        this.reloadGene(editedVulnerability.geneId);
        toast.success("Ok, edited vulnerability data.");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.editingVulnerabiliity = false;
      });
    }
  };

  addVulnerability = async (newVulnerability) => {
    console.log("geneStore: addVulnerabiliity Start");

    this.addingVulnerabiliity = true;
    // send to server
    try {
      await agent.Gene.addVulnerability(this.selectedGene.id, newVulnerability);
      runInAction(() => {
        this.reloadGene(this.selectedGene.id);
        toast.success("Ok, added new vulnerability");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.addingVulnerabiliity = false;
      });
    }
  };

  editHypomorph = async (editedHypomorph) => {
    console.log("geneStore: editHypomorph Start");

    this.editingHypomorph = true;
    // send to server
    try {
      runInAction(() => {
        this.reloadGene(editedHypomorph.geneId);
        toast.success("Ok, edited hypomorph data.");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.editingHypomorph = false;
      });
    }
  };

  addHypomorph = async (newHypomorph) => {
    console.log("geneStore: addHypomorph Start");

    this.addingHypomorph = true;
    // send to server
    try {
      runInAction(() => {
        this.reloadGene(this.selectedGene.id);
        toast.success("Ok, added new Hypomorph");
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.addingHypomorph = false;
      });
    }
  };

  validateTargetName = async (proposedTargetName) => {
    console.log("geneStore: validatedTargetName() Start");

    this.validateTargetNameLoading = true;
    this.proposedTargetNameValidated = "";
    try {
      this.proposedTargetNameValidated = await agent.Gene.validateTargetName(
        proposedTargetName
      );
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.validateTargetNameLoading = false;
      });
    }
  };

  saveGenePromotionDataObj = (data) => {
    this.genePromotionDataObj = { ...data };
  };

  getGenePromotionDataObj = () => {
    return this.genePromotionDataObj;
  };

  searchGeneGroup = async (geneId) => {
    console.log("geneStore: searchGeneGroup() Start");
    this.searchingGeneGroup = true;
    try {
      this.searchedGeneGroup = await agent.Gene.searchByIdGeneGroup(geneId);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.searchingGeneGroup = false;
      });
    }
  };
}
