import { action, makeObservable, observable } from "mobx";


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
