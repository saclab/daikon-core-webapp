import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import history from "../../history";
import agent from "../api/agent";

export default class UserStore {
  rootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      user: observable,
      isLoggedIn: computed,
      login: action,
      getUser: action,
      logout: action,
    });
  }

  // @observable
  user = null;

  // @computed
  get isLoggedIn() {
    return !!this.user;
  }

  // @action
  login = async (values) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
        console.log(user);
        this.rootStore.commonStore.setToken(user.token);
        history.push("/home");
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // @action
  getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        console.log("userStore getUser() ->");
        console.log(user);
        this.user = user;
        //history.push("/home");
      });
    } catch (error) {
      console.log(error);
    }
  };

  // @action
  logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/");
  };
}
