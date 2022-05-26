import { action, makeObservable, observable, runInAction } from "mobx";
// import { toast } from "react-toastify";

import agent from "../api/agent";

export default class GeneralStore {
  rootStore;

  generatingHorizon = false;
  horizonRegistry = new Map();
  selectedHorizon = null;
  horizonLength = "20rem";

  fetchingAppVars = false;
  appVars = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      generatingHorizon: observable,
      fetchHorizon: action,
      fetchHorizonByAccession: action,
      selectedHorizon: observable,

      fetchingAppVars: observable,
      appVars: observable,
      fetchAppVars: action,
      horizonLength: observable,
    });
  }

  fetchHorizon = async (targetName) => {
    console.log("GeneralStore: fetchHorizon Start");
    this.generatingHorizon = true;

    // first check cache
    let fetchedHorizon = this.horizonRegistry.get(targetName);
    console.log("CACHE");
    console.log(fetchedHorizon);
    if (fetchedHorizon) {
      console.log("GeneralStore: fetchHorizon found in cache");
      this.selectedHorizon = fetchedHorizon;
      this.horizonLength =
            (JSON.stringify(fetchedHorizon).match(/[^\\]":/g).length * 0.6) + "rem";
      this.generatingHorizon = false;
      console.log(this.selectedHorizon);
    }
    // if not found fetch from api
    else {
      try {
        fetchedHorizon = await agent.Horizon.generate(targetName);
        runInAction(() => {
          console.log("GeneralStore: fetchHorizon fetched from api");
          this.horizonRegistry.set(targetName, fetchedHorizon);
          this.selectedHorizon = fetchedHorizon;
          this.horizonLength =
          (JSON.stringify(fetchedHorizon).match(/[^\\]":/g).length * 0.6) + "rem";
          console.log(this.selectedHorizon);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.generatingHorizon = false;
          console.log("GeneralStore: fetchHorizon Complete");
        });
      }
    }
  };

  fetchHorizonByAccession = async (accessionNumber) => {
    console.log("GeneralStore: fetchHorizonByAccessionNumber Start");
    this.generatingHorizon = true;

    // first check cache
    let fetchedHorizon = this.horizonRegistry.get(accessionNumber);
    console.log("CACHE");
    console.log(fetchedHorizon);
    if (fetchedHorizon) {
      console.log("GeneralStore: fetchHorizonByAccessionNumber found in cache");
      this.selectedHorizon = fetchedHorizon;
      this.horizonLength =
            (JSON.stringify(fetchedHorizon).match(/[^\\]":/g).length * 0.75) + "rem";
      this.generatingHorizon = false;
      console.log(this.selectedHorizon);
    }
    // if not found fetch from api
    else {
      try {
        fetchedHorizon = await agent.Horizon.generateByAccession(accessionNumber);
        runInAction(() => {
          console.log("GeneralStore: fetchHorizonByAccessionNumber fetched from api");
          this.horizonRegistry.set(accessionNumber, fetchedHorizon);
          this.selectedHorizon = fetchedHorizon;
          this.horizonLength =
          (JSON.stringify(fetchedHorizon).match(/[^\\]":/g).length * 0.75) + "rem";
          console.log(this.selectedHorizon);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.generatingHorizon = false;
          console.log("GeneralStore: fetchHorizonByAccessionNumber Complete");
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
