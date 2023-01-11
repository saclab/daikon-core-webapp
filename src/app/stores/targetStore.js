import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction
} from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { _helper_associatedGenesAccessionNumbersToArray } from "./targetStoreHelper";

export default class TargetStore {
  rootStore;
  displayLoading = false;
  targetRegistry = new Map();
  targetRegistryExpanded = new Map();
  selectedTarget = null;
  questionsRegistry = new Map();
  questionsLoading = false;
  cacheValid = false;
  promoteTargetToScreenDisplayLoading = false;

  selectedTargetHistory = null;
  historyDisplayLoading = false;
  targetHistoryRegistry = new Map();

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,

      targets: computed,
      fetchTargetList: action,
      targetRegistry: observable,

      target: computed,
      fetchTarget: action,
      selectedTarget: observable,

      questionsLoading: observable,
      fetchQuestions: action,

      promoteTargetToScreenDisplayLoading: observable,
      promoteTargetToScreen: action,

      historyDisplayLoading: observable,
      fetchTargetHistory: action,
      selectedTargetHistory: observable,
      targetHistory: computed,

      editTargetSummary: action,
      cancelEditTargetSummary: action

    });
  }

  /* end helpers */

  /* Fetch Target list from API */
  fetchTargetList = async () => {
    console.log("targetStore: fetchTargetList() Start");
    this.displayLoading = true;
    if (this.targetRegistry.size !== 0) {
      console.log("targetStore: fetchTargetList() cache hit");
      this.displayLoading = false;
      return;
    }
    try {
      var resp = await agent.Target.list();
      runInAction(() => {
        console.log(resp);
        resp.forEach((fetchedTarget) => {
          fetchedTarget = {
            ...fetchedTarget,
            targetGenesAccesionNumbers:
              _helper_associatedGenesAccessionNumbersToArray(fetchedTarget),
          };
          // console.log("_helper_associatedGenesAccessionNumbersToArray(fetchedTarget)")
          // console.log(_helper_associatedGenesAccessionNumbersToArray(fetchedTarget));
          this.targetRegistry.set(fetchedTarget.id, fetchedTarget);
        });
        console.log(this.targetRegistry);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
      });
    }
  };

  get targets() {
    console.log("targetStore: targets() Start");
    return Array.from(this.targetRegistry.values());
  }

  /* Fetch specific Target with id from API */

  fetchTarget = async (id) => {
    console.log("targetStore: fetchTarget Start");
    this.displayLoading = true;

    // first check cache
    let fetchedTarget = this.targetRegistryExpanded.get(id);
    console.log("CACHE");
    console.log(fetchedTarget);
    if (fetchedTarget) {
      console.log("targetStore: fetchTarget found in cache");
      this.selectedTarget = fetchedTarget;
      this.displayLoading = false;
    }
    // if not found fetch from api
    else {
      try {
        fetchedTarget = await agent.Target.details(id);
        runInAction(() => {
          console.log("targetStore: fetchTarget fetched from api");
          fetchedTarget = {
            ...fetchedTarget,
            targetGenesAccesionNumbers:
              _helper_associatedGenesAccessionNumbersToArray(fetchedTarget),
          };
          console.log(this.selectedTarget);
          this.selectedTarget = fetchedTarget;
          this.targetRegistryExpanded.set(id, fetchedTarget);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.displayLoading = false;
          console.log("targetStore: fetchTarget Complete");
        });
      }
    }
  };

  get target() {
    console.log("From Target Store");
    console.log(this.selectedTarget);
    return this.selectedTarget;
  }

  fetchQuestions = async () => {
    console.log("targetStore: fetchQuestions() Start");
    this.questionsLoading = true;
    // check cache
    if (this.questionsRegistry.size !== 0) {
      console.log("targetStore: fetchQuestions() cache hit");
      this.questionsLoading = false;
      return this.questionsRegistry;
    }

    // then fetch
    try {
      console.log("targetStore: fetchQuestions() cache miss");
      var resp = await agent.Gene.promotionQuestions();
      runInAction(() => {
        console.log(resp);
        resp.forEach((fetchedPromotionQuestion) => {
          this.questionsRegistry.set(
            fetchedPromotionQuestion.identification,
            fetchedPromotionQuestion
          );
        });
        console.log(this.questionsRegistry);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.questionsLoading = false;
        return this.questionsRegistry;
      });
    }
  };

  /* submit Promotion Questionaire from API */
  promoteTargetToScreen = async (newScreen) => {
    console.log("targetStore: promoteTargetToScreen Start");
    this.promoteTargetToScreenDisplayLoading = true;
    let res = null;

    // send to server
    try {
      res = await agent.Screen.create(newScreen);
      runInAction(() => {
        toast.success(
          "Successfully added a new screening series. Please navigate to view screens"
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.rootStore.screenStore.screenRegistryCacheValid = false;
        this.promoteTargetToScreenDisplayLoading = false;
        console.log("targetStore: promoteTargetToScreen Complete");
      });
    }
    return res;
  };


  fetchTargetHistory = async () => {
    console.log("targetStore: fetchTargetHistory Start");
    this.historyDisplayLoading = true;
    let id = this.selectedTarget.id;

    // first check cache
    let fetchedTargetHistory = this.targetHistoryRegistry.get(id);
    console.log("CACHE");
    console.log(fetchedTargetHistory);
    if (fetchedTargetHistory) {
      console.log("targetStore: fetchedTargetHistory found in cache");
      this.historyDisplayLoading = false;
      this.selectedTargetHistory = fetchedTargetHistory;
    }
    // if not found fetch from api
    else {
      try {
        fetchedTargetHistory = await agent.Target.history(id);
        runInAction(() => {
          console.log("targetStore: fetchTargetHistory fetched from api");
          console.log(fetchedTargetHistory);

          this.targetHistoryRegistry.set(id, fetchedTargetHistory);
          this.selectedTargetHistory = fetchedTargetHistory;
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.historyDisplayLoading = false;
          console.log("targetStore: fetchTargetHistory Complete");
        });
      }
    }
  }

  get targetHistory() {
    return this.selectedTargetHistory;
  }


  editTargetSummary = async () => {
    console.log("targetStore: editTargetSummary Start");
    this.displayLoading = true;
    let updatedTarget = null;
    console.log(this.selectedTarget);
    // send to server
    try {
      updatedTarget = await agent.TargetAdmin.editSummary(this.selectedTarget);
      runInAction(() => {
        console.log("targetStore: fetchTarget fetched from api");
        this.targetRegistryExpanded.delete(updatedTarget.id)
        this.fetchTarget(updatedTarget.id)

      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
        console.log("targetStore: edit Complete");
      });
    }
  };

  cancelEditTargetSummary = () => {
    console.log("targetStore: cancelEditTargetSummary");
    this.selectedTarget = this.targetRegistryExpanded.get(this.selectedTarget.id);
  };
}
