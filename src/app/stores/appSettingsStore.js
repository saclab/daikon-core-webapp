import { action, computed, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class AppSettingsStore {
  rootStore;

  appSettingsDisplayLoading = false;
  adminMode = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      appSettingsDisplayLoading: observable,
      adminMode: observable,
      setAdminMode: action,
    });
  }

  setAdminMode = (mode) => {
    this.adminMode = mode;
  }

}
