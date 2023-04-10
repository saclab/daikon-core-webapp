import { action, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
export default class AppSettingsStore {
  rootStore;

  appSettingsDisplayLoading = false;
  adminMode = false;
  appView = "default";

  fetchingAppConfiguration = false;
  appConfigurationsMap = new Map();

  addingAppConfiguration = false;
  editingAppConfiguration = false;

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
}
