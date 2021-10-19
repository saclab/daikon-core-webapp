import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { toast } from "react-toastify";

import agent from "../api/agent";

export default class ScreenStore {
  rootStore;

  loadingFetchScreens = false;
  loadingFilterScreensByGene = false;
  loadingFetchScreen = false;
  loadingScreenSequence = false;

  screenRegistry = new Map();
  screenRegistryCacheValid = false;
  screenRegistryExpanded = new Map();
  selectedScreen = null;
  filteredScreens = new Array();

  validatedHitsIndex = 0;
  screenSequenceIndex = 0;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      loadingFetchScreens: observable,
      loadingFilterScreensByGene: observable,
      loadingFetchScreen: observable,

      fetchScreens: action,
      selectedScreen: observable,
      screens: computed,
      uniqueScreens: computed,
      fetchScreen: action,
      screenRegistry: observable,
      screenRegistryCacheValid: observable,
      screenRegistryExpanded: observable,

      addScreeenSequence: action,
      loadingScreenSequence : observable,

      filterScreensByGene: action,
      filteredScreens: observable,

      validatedHitsIndex: observable,
      setValidatedHitsIndex: action,

      screenSequenceIndex: observable,
      setScreenSequenceIndex: action,
    });
  }

  /* Fetch Screen list from API */
  fetchScreens = async () => {
    console.log("screenStore: fetchScreens() Start");
    this.loadingFetchScreens = true;
    if (this.screenRegistryCacheValid && this.screenRegistry.size !== 0) {
      console.log("screenStore: fetchScreens() cache hit");
      this.loadingFetchScreens = false;
      return;
    }
    try {
      console.log("screenStore: fetchScreens() cache miss");
      var resp = await agent.Screen.list();
      runInAction(() => {
        console.log(resp);
        resp.forEach((fetchedScreen) => {
          this.screenRegistry.set(fetchedScreen.id, fetchedScreen);
        });
        this.screenRegistryCacheValid = true;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingFetchScreens = false;
      });
    }
  };

  get screens() {
    return Array.from(this.screenRegistry.values());
  }

  get uniqueScreens() {
    let targetsScreened = new Map();
    console.log("screenStore: uniqueScreens()");

    this.screenRegistry.forEach((value) => {
      console.log(value);
      targetsScreened.set(value.accessionNumber, value);
    });
    return Array.from(targetsScreened.values());
  }

  filterScreensByGene = (geneName) => {
    this.loadingFilterScreensByGene = true;
    this.filteredScreens = [];
    this.filteredScreens = Array.from(this.screenRegistry.values()).filter(
      (screen) => {
        return screen.geneName === geneName;
      }
    );
    this.loadingFilterScreensByGene = false;

    return this.filteredScreens;
  };

  /* Fetch specific Screen with id from API */

  fetchScreen = async (id) => {
    console.log("screenStore: fetchScreen Start");
    this.loadingFetchScreen = true;

    // first check cache
    let fetchedScreen = this.screenRegistryExpanded.get(id);
    if (fetchedScreen) {
      console.log("screenStore: fetchScreen found in cache");
      this.selectedScreen = fetchedScreen;
      this.loadingFetchScreen = false;
    }
    // if not found fetch from api
    else {
      try {
        fetchedScreen = await agent.Screen.details(id);
        runInAction(() => {
          console.log("screenStore: fetchScreen fetched from api");
          console.log(this.selectedScreen);
          this.selectedScreen = fetchedScreen;
          this.screenRegistryExpanded.set(id, fetchedScreen);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.loadingFetchScreen = false;
          console.log("screenStore: fetchScreen Complete");
        });
      }
    }
  };

  addScreeenSequence = async (newSequence) => {
    console.log("screenStore: addScreeenSequence Start");
    console.log(newSequence);
    this.loadingScreenSequence = true;
    let res = null;

    // send to server
    try {
      res = await agent.Screen.createSequence(
        newSequence.screenId,
        newSequence
      );

      runInAction(() => {
        toast.success("Successfully added screening information");
        this.screenRegistryExpanded.clear();
        this.selectedScreen = null;
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingScreenSequence = false;
        console.log("screenStore: addScreeenSequence Complete");
      });
    }
    return res;
  };

  setValidatedHitsIndex = (index) => (this.validatedHitsIndex = index);
  setScreenSequenceIndex = (index) => (this.screenSequenceIndex = index);
}
