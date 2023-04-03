import { action, makeObservable, observable, runInAction } from "mobx";
import history from "../../history";
import agent from "../api/agent";

export default class UserStore {
  rootStore;
  authServiceInstance;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.authServiceInstance = agent.AuthServiceInstance;
    makeObservable(this, {
      user: observable,
      getUser: action,
      logout: action,
      fetching: observable,
      userNotFound: observable,
    });
  }

  // @observable
  user = null;
  fetching = false;
  userNotFound = false;

  // @action
  getUser = async () => {
    this.fetching = true;
    //
    try {
      const user = await agent.User.current();
      runInAction(() => {
        if (!user) {
          this.userNotFound = true;
        } else {
          this.user = user;
          //
          //
        }
        this.fetching = false;
      });
    } catch (error) {
      console.error(error);

      this.fetching = false;
      throw error;
    }
  };

  // @action
  logout = () => {
    this.fetching = true;
    this.user = null;
    try {
      this.authServiceInstance.SignOut();
    } catch (error) {
      console.error(error);
      sessionStorage.clear();
    }

    this.fetching = false;
    history.push("/");
  };
}
