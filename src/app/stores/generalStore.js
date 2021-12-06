import { action, makeObservable, observable, runInAction } from "mobx";
// import { toast } from "react-toastify";

import agent from "../api/agent";

export default class GeneralStore {
  rootStore;

  generatingHorizion = false;
  horizionRegistry = new Map();
  selectedHorizion = null;

  fetchingAppVars = false;
  appVars = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      generatingHorizion: observable,
      fetchHorizion: action,
      selectedHorizion: observable,

      fetchingAppVars: observable,
      appVars: observable,
      fetchAppVars: action,
    });
  }

  fetchHorizion = async (accessionNo) => {
    console.log("GeneralStore: fetchHorizion Start");
    this.generatingHorizion = true;

    // first check cache
    let fetchedHorizion = this.horizionRegistry.get(accessionNo);
    console.log("CACHE");
    console.log(fetchedHorizion);
    if (fetchedHorizion) {
      console.log("GeneralStore: fetchHorizion found in cache");
      this.selectedHorizion = fetchedHorizion;
      this.generatingHorizion = false;
    }
    // if not found fetch from api
    else {
      try {
        fetchedHorizion = await agent.Horizion.generate(accessionNo);
        runInAction(() => {
          console.log("GeneralStore: fetchHorizion fetched from api");
          this.selectedHorizion = fetchedHorizion;
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.generatingHorizion = false;
          console.log("GeneralStore: fetchHorizion Complete");
        });
      }
    }
  };

  fetchAppVars = async () => {
    try {
      this.fetchingAppVars = true;
      let fetchedAppVars = await agent.General.appVars();
      runInAction(() => {
        console.log("GeneralStore: fetchedAppVars fetched from api");
        this.appVars = fetchedAppVars;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.fetchingAppVars = false;
        console.log("GeneralStore: fetchedAppVars Complete");
      });
    }
  };
}
