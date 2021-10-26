import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class AdminStore {
  rootStore;

  displayLoading = false;
  loadingAccount = false;
  userRegistry = new Map();
  user = null;

  loadingRoles = false;
  rolesRegistry = new Map();

  LoadingOrgs = false;
  orgsRegistry = new Map();

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,

      fetchUsersList: action,
      userRegistry: observable,
      updateUser: action,
      Users: computed,
      loadingAccount : observable,

      fetchRoles: action,
      rolesRegistry: observable,
      Roles: computed,
      RoleNames: computed,
      loadingRoles: observable,

      fetchOrgs: action,
      addOrg: action,
      orgsRegistry: observable,
      Orgs: computed,
      OrgNames: computed,
      LoadingOrgs: observable,
    });
  }

  /* Fetch Users list from API */
  fetchUsersList = async () => {
    this.displayLoading = true;
    try {
      var resp = await agent.Accounts.listAccounts();
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
    this.displayLoading = true;
    try {
      var resp = await agent.Accounts.editAccount(user);
      runInAction(() => {
        this.userRegistry.set(user.id, user);
        toast.success("The user has been modified");
        console.log("FROM ADMIN STORE:updateUser");
        console.log(resp);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
      });
    }
  };

  addUser = async (user) => {
    console.log("Admin Store : adding account for :");
    console.log(user);

    this.loadingAccount = true;
    try {
      var resp = await agent.Accounts.createAccount(user);
      runInAction(() => {
        this.fetchUsersList();
        toast.success("New user added : " + user.displayName);
      });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      runInAction(() => {
        this.loadingAccount = false;
      });
    }
    return resp;
  };

  /* Fetch Org list from API */
  fetchOrgs = async () => {
    this.LoadingOrgs = true;
    try {
      var resp = await agent.Accounts.listOrgs();
      runInAction(() => {
        resp.forEach((org) => {
          this.orgsRegistry.set(org.id, org);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        //console.log("AdminStore -> displayLoading = false");
        this.LoadingOrgs = false;
      });
    }
  };

  get Orgs() {
    return Array.from(this.orgsRegistry.values());
  }

  get OrgNames() {
    return this.Orgs.map((org) => org.name);
  }

  addOrg = async () => {

  }

  /* Fetch Roles list from API */
  fetchRoles = async () => {
    this.loadingRoles = true;
    try {
      var resp = await agent.Accounts.listRoles();
      runInAction(() => {
        resp.forEach((role) => {
          this.rolesRegistry.set(role.id, role);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        //console.log("AdminStore -> displayLoading = false");
        this.loadingRoles = false;
      });
    }
  };

  get Roles() {
    return Array.from(this.rolesRegistry.values());
  }

  get RoleNames() {
    return this.Roles.map((role) => role.name);
  }
}
