import { action, computed, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class AdminStore {
  rootStore;

  displayLoading = false;
  userRegistry = new Map();
  user = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      fetchUsersList: action,
      userRegistry: observable,
      updateUser: action,
      Users: computed,
    });
  }


  /* Fetch Users list from API */
  fetchUsersList = async () => {
    this.displayLoading = true;
    try {
      var resp = await agent.Admin.userList();
      runInAction(() => {
        resp.forEach((user) => {
          this.userRegistry.set(user.id, user);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        //console.log("AdminStore -> displayLoading = false");
        this.displayLoading = false;
      });
    }
  };


  get Users() {
    return Array.from(this.userRegistry.values());
  }

  updateUser = async (user) => {
    this.displayLoading= true;
    try {
      var resp = await agent.Admin.modifyUser(user);
      runInAction(() => {
        this.userRegistry.set(user.id, user);
        toast.success("The user has been modified");
        console.log("FROM ADMIN STORE:updateUser")
        console.log(resp);
      });

    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading =false;
      });
    }
  }


}
