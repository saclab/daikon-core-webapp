import { action, makeObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
export default class AppSettingsStore {
  rootStore;

  appSettingsDisplayLoading = false;
  adminMode = false;
  appView = "default";

  fetchingAppConfiguration = false;
  appConfigurationsMap = new Map();

  submittingBackgroundTask = false;

  addingAppConfiguration = false;
  editingAppConfiguration = false;

  fetchingAppBackgroundTasks = false;
  tasks = [];

  activeStrainFilter = "Global";
  activeStrainFilterObj = {
    name: "Global",
    canonicalName: "global",
    id: "global",
  };

  constructor(rootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      appSettingsDisplayLoading: observable,
      adminMode: observable,
      appView: observable,
      setAppView: action,
      setAdminMode: action,

      fetchAppConfiguration: action,
      fetchingAppConfiguration: observable,
      appConfigurationsMap: observable,

      addAppConfiguration: action,
      addingAppConfiguration: observable,

      editAppConfiguration: action,
      editingAppConfiguration: observable,

      fetchingAppBackgroundTasks: observable,
      fetchAppBackgroundTasks: action,
      tasks: observable,

      activeStrainFilter: observable,
      activeStrainFilterObj: observable,
      setActiveStrainFilter: action,

      submittingBackgroundTask: observable,
      submitBackgroundTask: action,
    });
  }

  setAdminMode = (mode) => {
    this.adminMode = mode;
  };

  setAppView = (view) => {
    this.appView = view;
  };

  fetchAppConfiguration = async () => {
    this.fetchingAppConfiguration = true;
    try {
      let configurations = await agent.AppConfigurationsAPI.list();
      runInAction(() => {
        configurations.forEach((conf) => {
          this.appConfigurationsMap.set(conf.key, conf);
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.fetchingAppConfiguration = false;
      });
    }
  };

  addAppConfiguration = async (configuration) => {
    this.addingAppConfiguration = true;
    let res = null;
    try {
      res = await agent.AppConfigurationsAPI.create(configuration);
      runInAction(() => {
        this.appConfigurationsMap.set(res.key, res);
        console.log(res);
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.addingAppConfiguration = false;
      });
    }
    console.log(res);
    return res;
  };

  editAppConfiguration = async (configuration) => {
    this.editingAppConfiguration = true;
    let res = null;
    try {
      res = await agent.AppConfigurationsAPI.edit(
        configuration.key,
        configuration
      );
      runInAction(() => {
        this.appConfigurationsMap.set(res.key, res);
        console.log(res);
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.editingAppConfiguration = false;
      });
    }
    console.log(res);
    return res;
  };

  fetchAppBackgroundTasks = async () => {
    this.fetchingAppBackgroundTasks = true;
    try {
      let res = await agent.AppBackgroundTaskAPI.list();
      runInAction(() => {
        this.tasks = [];
        res.forEach((task) => {
          this.tasks.push(task);
        });
        return this.tasks;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.fetchingAppBackgroundTasks = false;
      });
    }
  };

  setActiveStrainFilter = (strain, strainObj) => {
    this.activeStrainFilter = strain;
    this.activeStrainFilterObj = strainObj;
  };

  submitBackgroundTask = async (task) => {
    this.submittingBackgroundTask = true;
    let res = null;
    try {
      res = await agent.Batch.genePoolSync(task);
      runInAction(() => {
        toast.success("Background task submitted");
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.submittingBackgroundTask = false;
      });
    }
    console.log(res);
    return res;
  };
}
