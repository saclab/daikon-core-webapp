import { makeObservable, observable } from "mobx";
import AppSettingsService from "../../services/AzureAppSettingsService";
import AuthService from "../../services/AzureAuthService";

export default class MsStore {
  rootStore;
  appSettings;
  authServiceInstance;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.appSettings = new AppSettingsService();
    this.authServiceInstance = new AuthService(this.appSettings);

    makeObservable(this, {
      appSettings: observable,
      authServiceInstance: observable,
    });
  }
}
