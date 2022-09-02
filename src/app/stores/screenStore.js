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


  loadingFilterScreensByTargetName = false;
  loadingFetchScreen = false;
  loadingScreenSequence = false;

  screenRegistry = new Map();
  screenRegistryCacheValid = false;
  screenRegistryExpanded = new Map();
  selectedScreen = null;
  selectedScreenTargetFilter = null;
  filteredScreens = [];

  loadingFetchScreensPhenotypic = false;
  screenPhenotypicRegistry = new Map();
  screenPhenotypicRegistryCacheValid = false;
  selectedPhenotypicScreen = null;
  loadingFilterPhenotypicScreensByBaseScreenName = false
  filteredPhenotypicScreens = []
  selectedPhenotypicScreenFilter = null

  validatedHitsIndex = 0;
  screenSequenceIndex = 0;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      loadingFetchScreens: observable,
      loadingFilterScreensByTargetName: observable,
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
      loadingScreenSequence: observable,

      filterScreensByTarget: action,
      filteredScreens: observable,

      validatedHitsIndex: observable,
      setValidatedHitsIndex: action,

      screenSequenceIndex: observable,
      setScreenSequenceIndex: action,

      selectedScreenTargetFilter: observable,

      loadingFetchScreensPhenotypic: observable,
      screenPhenotypicRegistry: observable,
      screenPhenotypicRegistryCacheValid: observable,
      selectedPhenotypicScreen: observable,
      fetchScreensPhenotypic: action,
      screensPhenotypic: computed,
      groupScreensPhenotypic: computed,

      loadingFilterPhenotypicScreensByBaseScreenName: observable,
      selectedPhenotypicScreenFilter: observable,
      filteredPhenotypicScreens: observable,
      filterPhenotypicScreensByBaseScreenName: action

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

  fetchScreensPhenotypic = async () => {
    console.log("screenStore: fetchScreensPhenotypic() Start");
    this.loadingFetchScreensPhenotypic = true;
    if (this.screenPhenotypicRegistryCacheValid && this.screenPhenotypicRegistry.size !== 0) {
      console.log("screenStore: fetchScreensPhenotypic() cache hit");
      this.loadingFetchScreensPhenotypic = false;
      return;
    }
    try {
      console.log("screenStore: fetchScreensPhenotypic() cache miss");
      var resp = await agent.Screen.listPhenotypic();
      runInAction(() => {
        console.log(resp);
        resp.forEach((fetchedScreen) => {
          this.screenPhenotypicRegistry.set(fetchedScreen.id, fetchedScreen);
        });
        this.screenPhenotypicRegistryCacheValid = true;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingFetchScreensPhenotypic = false;
      });
    }
  };

  get screens() {
    return Array.from(this.screenRegistry.values());
  }

  get screensPhenotypic() {
    return Array.from(this.screenPhenotypicRegistry.values());
  }

  get uniqueScreens() {
    let targetsScreened = new Map();
    console.log("screenStore: uniqueScreens()");

    this.screenRegistry.forEach((value) => {
      console.log(value);
      targetsScreened.set(value.targetName, value);
    });
    return Array.from(targetsScreened.values());
  }

  get groupScreensPhenotypic() {
    let pScreened = new Map();
    console.log("screenStore: uniqueScreens()");

    this.screenPhenotypicRegistry.forEach((value) => {
      console.log(value);
      let lastIndex = value.screenName.lastIndexOf('-');
      let screenName = value.screenName.slice(0, lastIndex)
      pScreened.set(screenName, { screenName: screenName, notes: value.notes });
      console.log(screenName)
    });
    return Array.from(pScreened.values());
  }

  filterScreensByTarget = (targetName) => {
    this.loadingFilterScreensByTargetName = true;
    this.selectedScreenTargetFilter = targetName
    this.filteredScreens = [];
    this.filteredScreens = Array.from(this.screenRegistry.values()).filter(
      (screen) => {
        return screen.targetName === targetName;
      }
    );
    this.loadingFilterScreensByTargetName = false;

    return this.filteredScreens;
  };

  filterPhenotypicScreensByBaseScreenName = (baseScreenName) => {
    this.loadingFilterPhenotypicScreensByBaseScreenName = true;
    this.selectedPhenotypicScreenFilter = baseScreenName
    this.filteredPhenotypicScreens = [];
    this.filteredPhenotypicScreens = Array.from(this.screenPhenotypicRegistry.values()).filter(
      (screen) => {
        let lastIndex = screen.screenName.lastIndexOf('-');
        let extractedscreenName = screen.screenName.slice(0, lastIndex)
        return extractedscreenName === baseScreenName;
      }
    );
    this.loadingFilterPhenotypicScreensByBaseScreenName = false;

    return this.filteredPhenotypicScreens;
  };



  /* Fetch specific Screen with id from API */

  fetchScreen = async (id, invalidateCache = false) => {
    console.log("screenStore: fetchScreen Start");
    this.loadingFetchScreen = true;

    // first check cache
    let fetchedScreen = this.screenRegistryExpanded.get(id);
    if (!invalidateCache && fetchedScreen) {
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
