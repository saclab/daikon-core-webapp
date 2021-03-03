import { action, makeObservable, observable, runInAction } from "mobx";
import history from "../../history";
import agent from "../api/agent";
import { authContext } from "../../index";

export default class UserStore {
  rootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      user: observable,
      getUser: action,
      logout: action,
      fetching: observable,
      userNotFound: observable
    });
  }

  // @observable
  user = null;
  fetching = false;
  userNotFound = false;

  // @action
  getUser = async (token) => {
    this.fetching = true;
    console.log("Attempting to get user from bmgf token...");
    try {
      this.rootStore.commonStore.setToken(token);
      const user = await agent.User.current();
      runInAction(() => {
  
        if (!user) {
          this.userNotFound = true;
        }
        else {
          this.user = user;
        }
        this.fetching = false;
      });
    } catch (error) {
      console.log(error);
      this.fetching = false;
      throw error;
    }
  };

  // @action
  logout = () => {
    this.fetching = true;
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    authContext.logOut();
    this.fetching = false;
    history.push("/");
  };
}
