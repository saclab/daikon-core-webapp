import { action, makeObservable, observable } from "mobx";


export default class AppSettingsStore {
  rootStore;

  appSettingsDisplayLoading = false;
  adminMode = false;
  appView = "default"

  constructor(rootStore) {
    this.rootStore = rootStore;


    makeObservable(this, {
      appSettingsDisplayLoading: observable,
      adminMode: observable,
      appView: observable,
      setAppView: action,
      setAdminMode: action,
    });
  }

  setAdminMode = (mode) => {
    this.adminMode = mode;
  }

  setAppView = (view) => {
    this.appView = view;
  }

}
