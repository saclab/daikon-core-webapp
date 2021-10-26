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
  selectedAccount = null;

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
      loadingAccount: observable,
      fetchAccount: action,
      selectedAccount: observable,

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
      updateOrg: action
    });
  }

  /* Fetch Users list from API */
  fetchUsersList = async () => {
    this.displayLoading = true;
    try {
      var resp = await agent.Accounts.listAccounts();
      runInAction(() => {
        this.userRegistry.clear();
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
        
        toast.success("The user has been modified");
        console.log("FROM ADMIN STORE:updateUser");
        this.fetchUsersList();
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

  fetchAccount = async (email) => {
    console.log("Admin Store : fetching account for :");
    console.log(email);
    this.loadingAccount = true;
    try {
      var resp = await agent.Accounts.details(email);
      runInAction(() => {
        console.log(resp);
        this.selectedAccount = resp;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        //console.log("AdminStore -> displayLoading = false");
        this.loadingAccount = false;
      });
    }
  };

  /* Fetch Org list from API */
  fetchOrgs = async () => {
    this.LoadingOrgs = true;
    try {
      var resp = await agent.Accounts.listOrgs();
      runInAction(() => {
        this.orgsRegistry.clear();
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

  addOrg = async (newOrg) => {
    console.log("Admin Store : adding addOrg :");
    console.log(newOrg);

    this.LoadingOrgs = true;
    try {
      var resp = await agent.Accounts.createOrg(newOrg);
      runInAction(() => {
        this.fetchOrgs();
        toast.success("New organization added : " + newOrg.name);
      });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      runInAction(() => {
        this.LoadingOrgs = false;
      });
    }
    return resp;
  };

  updateOrg = async (org) => {
    console.log("Admin Store : updating addOrg :");
    console.log(org);
    this.LoadingOrgs = true;
    try {
      var resp = await agent.Accounts.editOrg(org.id, org);
      runInAction(() => {
        this.fetchOrgs();
        toast.success("The org has been modified");
        console.log("FROM ADMIN STORE:updateOrg");
        console.log(resp);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.LoadingOrgs = false;
      });
    }
  };

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
