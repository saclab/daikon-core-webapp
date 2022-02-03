import { action, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class GeneStoreAdmin {
  rootStore;

  displayLoading = false;
  creatingGeneGroup = false;
  loadingGeneGroup = false;

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

  createGeneGroup = async (geneGroup) => {
    console.log("geneStoreAdmin: createGeneGroup() Start");
    this.creatingGeneGroup = true;
    try {
      var res = await agent.GeneAdmin.createGeneGroup(geneGroup);

      runInAction(() => {
        toast.success("Successfully created Gene Group");
        this.creatingGeneGroup = false;
        return res;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.creatingGeneGroup = false;
      });
    }
    return res;
  };
}
