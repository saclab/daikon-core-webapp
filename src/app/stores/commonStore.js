import { action, makeObservable, observable, reaction } from "mobx";

export default class CommonStore {
  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      token: observable,
      appLoaded: observable,
      setToken: action,
      setAppLoaded: action,
    });

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  // @observable
  token = window.localStorage.getItem("jwt");
  appLoaded = false;

  // @action
  setToken = (token) => {
    this.token = token;
  };

  // @action
  setAppLoaded = () => {
    this.appLoaded = true;
    console.log("commonStore setAppLoaded -> " + this.appLoaded);
  };
}
