import { action, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
export default class AppStateStore {
  rootStore;

  /* The version history global dialog box is used to fetch change vectors for any parameters within the application.
     This is placed in the app root so that it can be accessed from anywhere in the application.
  */

  versionHistoryGlobalDialogOpen = false;
  versionData = null;
  loadingVersionData = false;

  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      versionHistoryGlobalDialogOpen: observable,
      versionData: observable,
      loadingVersionData: observable,
      fetchVersionHistory: action,
      closeVersionHistoryGlobalDialog: action,
    });
  }

  fetchVersionHistory = async (conf) => {
    if (conf === undefined || conf.entity === undefined) {
      console.error("fetchVersionHistory: no entity provided");
      return;
    }
    console.log("fetchVersionHistory");
    if (!((conf.keys && conf.keys.length > 0) || conf.key)) {
      console.error("fetchVersionHistory: no keys or key provided");
      return;
    }

    let res = null;
    try {
      this.versionHistoryGlobalDialogOpen = true;
      this.loadingVersionData = true;
      res = await await agent.ChangeLogAPI.details(conf);
      runInAction(() => {
        this.versionData = res;
        console.log(res);
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loadingVersionData = false;
      });
    }

    return res;
  };

  closeVersionHistoryGlobalDialog = () => {
    console.log("closeVersionHistoryGlobalDialog");
    this.versionHistoryGlobalDialogOpen = false;
  };
}
