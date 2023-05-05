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
  loadingFilterPhenotypicScreensByBaseScreenName = false;
  filteredPhenotypicScreens = [];
  selectedPhenotypicScreenFilter = null;

  validatedHitsIndex = 0;
  screenSequenceIndex = 0;
  loadingPhenotypicAdd = false;

  mergingScreen = false;

  editingScreen = false;

  editingScreenRow = false;

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
      filterPhenotypicScreensByBaseScreenName: action,

      addScreeenPhenotypic: action,
      loadingPhenotypicAdd: observable,

      mergeScreen: action,
      mergingScreen: observable,

      editScreen: action,
      editingScreen: observable,

      fetchScreenSilent: action,

      editScreenRow: action,
      editingScreenRow: observable,
    });
  }

  /* Fetch Screen list from API */
  fetchScreens = async () => {
    this.loadingFetchScreens = true;
    if (this.screenRegistryCacheValid && this.screenRegistry.size !== 0) {
      this.loadingFetchScreens = false;
      return;
    }
    try {
      var resp = await agent.Screen.list();
      runInAction(() => {
        resp.forEach((fetchedScreen) => {
          this.screenRegistry.set(fetchedScreen.id, fetchedScreen);
        });
        this.screenRegistryCacheValid = true;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loadingFetchScreens = false;
      });
    }
  };

  fetchScreensPhenotypic = async () => {
    this.loadingFetchScreensPhenotypic = true;
    if (
      this.screenPhenotypicRegistryCacheValid &&
      this.screenPhenotypicRegistry.size !== 0
    ) {
      this.loadingFetchScreensPhenotypic = false;
      return;
    }
    try {
      var resp = await agent.Screen.listPhenotypic();
      runInAction(() => {
        resp.forEach((fetchedScreen) => {
          this.screenPhenotypicRegistry.set(fetchedScreen.id, fetchedScreen);
        });
        this.screenPhenotypicRegistryCacheValid = true;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loadingFetchScreensPhenotypic = false;
      });
    }
  };

  get screens() {
    if (this.rootStore.appSettingsStore.activeStrainFilter === "global") {
      return Array.from(this.screenRegistry.values());
    }
    return Array.from(this.screenRegistry.values()).filter(
      (screen) =>
        screen.strainId === this.rootStore.appSettingsStore.activeStrainFilter
    );
  }

  get screensPhenotypic() {
    if (this.rootStore.appSettingsStore.activeStrainFilter === "global") {
      return Array.from(this.screenPhenotypicRegistry.values());
    }
    return Array.from(this.screenPhenotypicRegistry.values()).filter(
      (screen) =>
        screen.strainId === this.rootStore.appSettingsStore.activeStrainFilter
    );
  }

  get uniqueScreens() {
    let targetsScreened = new Map();

    this.screenRegistry.forEach((value) => {
      targetsScreened.set(
        value.targetName + "_" + value.strain.canonicalName,
        value
      );
    });

    if (this.rootStore.appSettingsStore.activeStrainFilter === "global") {
      return Array.from(targetsScreened.values());
    }
    return Array.from(targetsScreened.values()).filter(
      (screen) =>
        screen.strainId === this.rootStore.appSettingsStore.activeStrainFilter
    );
  }

  get groupScreensPhenotypic() {
    let pScreened = new Map();

    this.screenPhenotypicRegistry.forEach((value) => {
      let lastIndex = value.screenName.lastIndexOf("-");
      let screenName = value.screenName.slice(0, lastIndex);
      pScreened.set(screenName, { screenName: screenName, notes: value.notes });
    });
    return Array.from(pScreened.values());
  }

  filterScreensByTarget = (targetName) => {
    this.loadingFilterScreensByTargetName = true;
    this.selectedScreenTargetFilter = targetName;
    this.filteredScreens = [];

    this.filteredScreens = Array.from(this.screenRegistry.values()).filter(
      (screen) => {
        //console.log(screen);
        if (this.rootStore.appSettingsStore.activeStrainFilter === "global") {
          return screen.targetName === targetName;
        } else {
          return (
            screen.targetName === targetName &&
            screen.strainId ===
              this.rootStore.appSettingsStore.activeStrainFilter
          );
        }
      }
    );

    this.loadingFilterScreensByTargetName = false;

    return this.filteredScreens;
  };

  filterPhenotypicScreensByBaseScreenName = (baseScreenName) => {
    this.loadingFilterPhenotypicScreensByBaseScreenName = true;
    this.selectedPhenotypicScreenFilter = baseScreenName;
    this.filteredPhenotypicScreens = [];
    this.filteredPhenotypicScreens = Array.from(
      this.screenPhenotypicRegistry.values()
    ).filter((screen) => {
      let lastIndex = screen.screenName.lastIndexOf("-");
      let extractedscreenName = screen.screenName.slice(0, lastIndex);
      return extractedscreenName === baseScreenName;
    });
    this.loadingFilterPhenotypicScreensByBaseScreenName = false;

    return this.filteredPhenotypicScreens;
  };

  /* Fetch specific Screen with id from API */

  fetchScreen = async (id, invalidateCache = false) => {
    this.loadingFetchScreen = true;

    // first check cache
    let fetchedScreen = this.screenRegistryExpanded.get(id);
    if (!invalidateCache && fetchedScreen) {
      this.selectedScreen = fetchedScreen;
      this.loadingFetchScreen = false;
    }
    // if not found fetch from api
    else {
      try {
        fetchedScreen = await agent.Screen.details(id);
        runInAction(() => {
          this.selectedScreen = fetchedScreen;
          this.screenRegistryExpanded.set(id, fetchedScreen);
        });
      } catch (error) {
        console.error(error);
      } finally {
        runInAction(() => {
          this.loadingFetchScreen = false;
        });
      }
    }
  };

  fetchScreenSilent = async (id, invalidateCache = false) => {
    // first check cache
    let fetchedScreen = this.screenRegistryExpanded.get(id);
    if (!invalidateCache && fetchedScreen) {
      this.selectedScreen = fetchedScreen;
    }
    // if not found fetch from api
    else {
      try {
        fetchedScreen = await agent.Screen.details(id);
        runInAction(() => {
          this.selectedScreen = fetchedScreen;
          this.screenRegistryExpanded.set(id, fetchedScreen);
        });
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
  };

  addScreeenSequence = async (newSequence) => {
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
      console.error(error);
    } finally {
      runInAction(() => {
        this.loadingScreenSequence = false;
      });
    }
    return res;
  };

  addScreeenPhenotypic = async (newScreen) => {
    this.loadingPhenotypicAdd = true;
    let res = null;
    // send to server
    try {
      res = await agent.Screen.createPhenotypic(newScreen);
      runInAction(() => {
        toast.success("Successfully added screening information");
        this.screenPhenotypicRegistryCacheValid = false;
        this.selectedPhenotypicScreen = null;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loadingPhenotypicAdd = false;
      });
    }
    return res;
  };

  setValidatedHitsIndex = (index) => (this.validatedHitsIndex = index);
  setScreenSequenceIndex = (index) => (this.screenSequenceIndex = index);

  mergeScreen = async (mergeIDs) => {
    this.mergingScreen = true;
    let res = null;
    // send to server
    try {
      res = await agent.Screen.merge(mergeIDs);
      runInAction(() => {
        toast.success("Successfully merged screening information");
        this.screenPhenotypicRegistryCacheValid = false;
        this.screenRegistryExpanded.clear();
        this.selectedPhenotypicScreen = null;
        this.screenRegistryCacheValid = false;
        this.selectedScreen = null;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.mergingScreen = false;
      });
    }
    return res;
  };

  editScreen = async (edittedScreen) => {
    this.editingScreen = true;
    let res = null;
    // send to server
    try {
      res = await agent.Screen.edit(edittedScreen.id, edittedScreen);
      runInAction(() => {
        toast.success("Saved");
        this.fetchScreen(edittedScreen.id, true);
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.editingScreen = false;
      });
    }
    return res;
  };

  editScreenRow = async (editedScreenRow) => {
    this.editingScreenRow = true;
    let res = null;
    // send to server
    try {
      res = await agent.Screen.editRow(editedScreenRow.id, editedScreenRow);
      runInAction(() => {
        toast.success("Saved");
        this.fetchScreen(editedScreenRow.screenId, true);
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.editingScreenRow = false;
      });
    }
    return res;
  };
}
