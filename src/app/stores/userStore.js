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
    // console.log("Attempting to get user from bmgf token...");
    try {
      const user = await agent.User.current();
      runInAction(() => {
        if (!user) {
          this.userNotFound = true;
          console.log("Failed getUser() at store");
        } else {
          this.user = user;
          // console.log("Succeed getUser() at store");
          // console.log(this.user);
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
