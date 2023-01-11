import { action, makeObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";

export default class GeneStoreAdmin {
  rootStore;

  displayLoading = false;
  creatingGeneGroup = false;
  loadingGeneGroup = false;
  geneGroups = [];

  genePromotionRegistry = new Map();

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      fetchGenePromotionList: action,
      genePromotionRegistry: observable,
      promoteGene: action,

      creatingGeneGroup: observable,
      loadingGeneGroup: observable,
      createGeneGroup: action,
      geneGroups: observable,
    });
  }

  /* Fetch Gene Promotions list from API */
  fetchGenePromotionList = async () => {
    this.displayLoading = true;
    try {
      var resp = await agent.GeneAdmin.promotionRequests();
      runInAction(() => {
        resp.forEach((fetchedPromotionRequest) => {
          let formattedPromotionRequest = {
            targetName: fetchedPromotionRequest.targetName,
            genePromtionRequestGenes:
              fetchedPromotionRequest.genePromtionRequestGenes,
            targetType: fetchedPromotionRequest.targetType,
            answers: {},
          };
          fetchedPromotionRequest.genePromotionRequestValues.forEach(
            (value) => {
              formattedPromotionRequest.answers[value.question.identification] =
                {
                  answer: value.answer,
                  answeredBy: value.answeredBy,
                  description: value.description,
                };
            }
          );

          this.genePromotionRegistry.set(
            fetchedPromotionRequest.targetName,
            formattedPromotionRequest
          );
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
      });
    }
  };

  promoteGene = async (promotionReq) => {
    this.displayLoading = true;
    try {
      var res = await agent.TargetAdmin.create(promotionReq);
      runInAction(() => {
        console.log(res);
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
      });
    }
    return res;
  };

  createGeneGroup = async (geneGroup) => {
    this.creatingGeneGroup = true;
    try {
      var res = await agent.GeneAdmin.createGeneGroup(geneGroup);

      runInAction(() => {
        toast.success("Successfully created Gene Group");
        this.creatingGeneGroup = false;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.creatingGeneGroup = false;
      });
    }
    return res;
  };

  listGeneGroups = async () => {
    this.loadingGeneGroup = true;
    try {
      this.geneGroups = await agent.GeneAdmin.listGeneGroups();
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loadingGeneGroup = false;
      });
    }
  };
}
