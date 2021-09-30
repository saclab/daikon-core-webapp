import { action, makeObservable, observable, runInAction } from "mobx";
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

      promoteGene: action,
    });
  }

  /* Fetch Gene Promotions list from API */
  fetchGenePromotionList = async () => {
    console.log("geneStoreAdmin: fetchGenePromotionList() Start");
    this.displayLoading = true;
    try {
      var resp = await agent.GeneAdmin.promotionRequests();
      runInAction(() => {
        console.log("++++++++++++++++++++++++++++");
        console.log(resp);
        resp.forEach((fetchedGene) => {
          let formattedGene = {
            geneAccessionNumber: fetchedGene.geneAccessionNumber,
            geneId: fetchedGene.geneId,
            answers : {}
          };
          fetchedGene.genePromotionRequestValues.forEach((value) => {
            formattedGene.answers[value.question.identification] = {
              answer: value.answer,
              answeredBy: value.answeredBy,
              description: value.description,
            };
          });

          this.genePromotionRegistry.set(fetchedGene.geneId, formattedGene);
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

  promoteGene = async (promotionReq) => {
    console.log("geneStoreAdmin: promoteGene() Start");
    this.displayLoading = true;
    try {
      var res = await agent.TargetAdmin.create(promotionReq);

      runInAction(() => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
      });
    }
    return res;
  };
}
