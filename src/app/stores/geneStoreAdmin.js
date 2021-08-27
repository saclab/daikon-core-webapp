import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import agent from "../api/agent";

export default class GeneStoreAdmin {
  rootStore;

  displayLoading = false;

  genePromotionRegistry = new Map();

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      fetchGenePromotionList: action,
      genePromotionRegistry: observable,
    });
  }

  /* Fetch Gene Promotions list from API */
  fetchGenePromotionList = async () => {
    console.log("geneStoreAdmin: fetchGenePromotionList() Start");
    this.displayLoading = true;
    try {
      var resp = await agent.GeneAdmin.promotionList();
      runInAction(() => {
       // console.log(resp);
        resp.forEach((fetchedGene) => {
          this.genePromotionRegistry.set(fetchedGene.geneID, fetchedGene);
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
}
