import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import agent from "../api/agent";

export default class ScreenStore {
  rootStore;

  displayLoading = false;
  screenRegistry = new Map();
  screenRegistryExpanded = new Map();
  selectedScreen = null;
  

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      fetchScreens: action,
      selectedScreen: observable,
      screens: computed,
      uniqueScreens: computed,
      fetchScreen: action,
      screenRegistry: observable,
      screenRegistryExpanded: observable,
     
    });
  }

  /* Fetch Screen list from API */
  fetchScreens = async () => {
    console.log("screenStore: fetchScreens() Start");
    this.displayLoading = true;
    if (this.screenRegistry.size !== 0) {
      console.log("screenStore: fetchScreens() cache hit");
      this.displayLoading = false;
      return;
    }
    try {
      var resp = await agent.Screen.list();
      runInAction(() => {
        console.log(resp);
        resp.forEach((fetchedScreen) => {
          this.screenRegistry.set(fetchedScreen.id, fetchedScreen);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
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

  /* Fetch specific Screen with id from API */

  fetchScreen = async (id) => {
    console.log("screenStore: fetchScreen Start");
    this.displayLoading = true;

    // first check cache
    let fetchedScreen = this.screenRegistryExpanded.get(id);
    if (fetchedScreen) {
      console.log("screenStore: fetchScreen found in cache");
      this.selectedScreen = fetchedScreen;
      this.displayLoading = false;
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
          this.displayLoading = false;
          console.log("screenStore: fetchScreen Complete");
        });
      }
    }
  };
}
