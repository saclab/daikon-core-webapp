import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
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
      cancelEditTargetSummary: action,
    });
  }

  /* end helpers */

  /* Fetch Target list from API */
  fetchTargetList = async () => {
    this.displayLoading = true;
    if (this.targetRegistry.size !== 0) {
      this.displayLoading = false;
      return;
    }
    try {
      var resp = await agent.Target.list();
      runInAction(() => {
        resp.forEach((fetchedTarget) => {
          fetchedTarget = {
            ...fetchedTarget,
            targetGenesAccesionNumbers:
              _helper_associatedGenesAccessionNumbersToArray(fetchedTarget),
          };
          //
          //
          this.targetRegistry.set(fetchedTarget.id, fetchedTarget);
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

  get targets() {
    return Array.from(this.targetRegistry.values());
  }

  /* Fetch specific Target with id from API */

  fetchTarget = async (id) => {
    this.displayLoading = true;

    // first check cache
    let fetchedTarget = this.targetRegistryExpanded.get(id);

    if (fetchedTarget) {
      this.selectedTarget = fetchedTarget;
      this.displayLoading = false;
    }
    // if not found fetch from api
    else {
      try {
        fetchedTarget = await agent.Target.details(id);
        runInAction(() => {
          fetchedTarget = {
            ...fetchedTarget,
            targetGenesAccesionNumbers:
              _helper_associatedGenesAccessionNumbersToArray(fetchedTarget),
          };

          this.selectedTarget = fetchedTarget;
          this.targetRegistryExpanded.set(id, fetchedTarget);
        });
      } catch (error) {
        console.error(error);
      } finally {
        runInAction(() => {
          this.displayLoading = false;
        });
      }
    }
  };

  get target() {
    return this.selectedTarget;
  }

  fetchQuestions = async () => {
    this.questionsLoading = true;
    // check cache
    if (this.questionsRegistry.size !== 0) {
      this.questionsLoading = false;
      return this.questionsRegistry;
    }

    // then fetch
    try {
      var resp = await agent.Gene.promotionQuestions();
      runInAction(() => {
        resp.forEach((fetchedPromotionQuestion) => {
          this.questionsRegistry.set(
            fetchedPromotionQuestion.identification,
            fetchedPromotionQuestion
          );
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.questionsLoading = false;
        return this.questionsRegistry;
      });
    }
  };

  /* submit Promotion Questionnaire from API */
  promoteTargetToScreen = async (newScreen) => {
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
      console.error(error);
    } finally {
      runInAction(() => {
        this.rootStore.screenStore.screenRegistryCacheValid = false;
        this.promoteTargetToScreenDisplayLoading = false;
      });
    }
    return res;
  };

  fetchTargetHistory = async () => {
    this.historyDisplayLoading = true;
    let id = this.selectedTarget.id;

    // first check cache
    let fetchedTargetHistory = this.targetHistoryRegistry.get(id);

    if (fetchedTargetHistory) {
      this.historyDisplayLoading = false;
      this.selectedTargetHistory = fetchedTargetHistory;
    }
    // if not found fetch from api
    else {
      try {
        fetchedTargetHistory = await agent.Target.history(id);
        runInAction(() => {
          this.targetHistoryRegistry.set(id, fetchedTargetHistory);
          this.selectedTargetHistory = fetchedTargetHistory;
        });
      } catch (error) {
        console.error(error);
      } finally {
        runInAction(() => {
          this.historyDisplayLoading = false;
        });
      }
    }
  };

  get targetHistory() {
    return this.selectedTargetHistory;
  }

  editTargetSummary = async () => {
    this.displayLoading = true;
    let updatedTarget = null;

    // send to server
    try {
      updatedTarget = await agent.TargetAdmin.editSummary(this.selectedTarget);
      runInAction(() => {
        this.targetRegistryExpanded.delete(updatedTarget.id);
        this.fetchTarget(updatedTarget.id);
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
      });
    }
  };

  cancelEditTargetSummary = () => {
    this.selectedTarget = this.targetRegistryExpanded.get(
      this.selectedTarget.id
    );
  };
}
