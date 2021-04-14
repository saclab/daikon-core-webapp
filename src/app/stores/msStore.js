import {  makeObservable, observable } from "mobx";
import AuthService from "../../services/AuthService";
import AppSettingsService from "../../services/AppSettingsService";


export default class MsStore {
  rootStore;
  appSettings;
  authServiceInstance
  

  constructor(rootStore) {
    console.log("Ms Store Initialized");
    this.rootStore = rootStore;
    this.appSettings = new AppSettingsService();
    this.authServiceInstance = new AuthService(this.appSettings);

    makeObservable(this, {
      appSettings: observable,
      authServiceInstance : observable
    });
  }

  // @observable
  appSettings = this.appSettings;
  authServiceInstance = this.authServiceInstance;
}
