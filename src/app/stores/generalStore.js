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
    this.generatingHorizon = true;

    // first check cache
    let fetchedHorizon = this.horizonRegistry.get(targetName);
    if (fetchedHorizon) {
      this.selectedHorizon = fetchedHorizon;
      this.horizonLength =
        JSON.stringify(fetchedHorizon).match(/[^\\]":/g).length * 0.6 + "rem";
      this.generatingHorizon = false;
    }
    // if not found fetch from api
    else {
      try {
        fetchedHorizon = await agent.Horizon.generate(targetName);
        runInAction(() => {
          this.horizonRegistry.set(targetName, fetchedHorizon);
          this.selectedHorizon = fetchedHorizon;
          this.horizonLength =
            JSON.stringify(fetchedHorizon).match(/[^\\]":/g).length * 0.6 +
            "rem";
        });
      } catch (error) {
        console.error(error);
      } finally {
        runInAction(() => {
          this.generatingHorizon = false;
        });
      }
    }
  };

  fetchHorizonByAccession = async (accessionNumber) => {
    this.generatingHorizon = true;

    // first check cache
    let fetchedHorizon = this.horizonRegistry.get(accessionNumber);
    if (fetchedHorizon) {
      this.selectedHorizon = fetchedHorizon;
      this.horizonLength =
        JSON.stringify(fetchedHorizon).match(/[^\\]":/g).length * 0.75 + "rem";
      this.generatingHorizon = false;
    }
    // if not found fetch from api
    else {
      try {
        fetchedHorizon = await agent.Horizon.generateByAccession(
          accessionNumber
        );
        runInAction(() => {
          this.horizonRegistry.set(accessionNumber, fetchedHorizon);
          this.selectedHorizon = fetchedHorizon;
          this.horizonLength =
            JSON.stringify(fetchedHorizon).match(/[^\\]":/g).length * 0.75 +
            "rem";
        });
      } catch (error) {
        console.error(error);
      } finally {
        runInAction(() => {
          this.generatingHorizon = false;
        });
      }
    }
  };

  fetchAppVars = async () => {
    try {
      this.fetchingAppVars = true;
      let fetchedAppVars = await agent.General.appVars();
      runInAction(() => {
        this.appVars = fetchedAppVars;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.fetchingAppVars = false;
      });
    }
  };
}
