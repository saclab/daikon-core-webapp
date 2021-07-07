import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
  } from "mobx";
  import localhost from "../api/localhost";
  
  
  export default class ScreenStore {
    rootStore;
  
    displayLoading = false;
    
    historyDisplayLoading = false;
  
    /* This is a list of targets beeing screened */
    screenedTargetsRegistry = new Map();
    screenedTargetsRegistryExpanded = new Map();
    selectedScreenedTarget = null;

    /* This is a list of screens for a specific target */
    /* For caching purposes we are maintaining a single map for all screens as guid will be unique anyway */
    screenRegistry = new Map();
    screenHistoryRegistry = new Map();
    selectedScreen = null;
    selectedScreenHistory = null;

    /* This is a list of hits of a specific screen */
    /* For caching purposes we are maintaining a single map for all hits as guid will be unique anyway */
    hitRegistry = new Map();
    hitHistoryRegistry = new Map();
    selectedHit = null;
    selectedHitHistory = null;


    constructor(rootStore) {
      this.rootStore = rootStore;
      makeObservable(this, {
        displayLoading: observable,
        // historyDisplayLoading: observable,

        screenedTargets : computed,
        fetchScreenedTargets : action,
        screenedTargetsRegistry : observable,

        selectedScreenedTarget : observable,
        
        screens: computed,
        fetchScreens: action,
        screenRegistry: observable,
  
        // screen: computed,
        // fetchScreen: action,
        // selectedScreen: observable,
  
        // fetchScreenHistory: action,
        // selectedScreenHistory: observable,
        // screenHistory: computed,


        // hits: computed,
        // fetchHits : action,
        // hitRegistry : observable,  
  
        // editScreen: action,
        // cancelEditScreen: action,
      });
    }
  
    /* Fetch ScreenedTarget list from API */
    fetchScreenedTargets = async () => {
      console.log("screenStore: fetchScreenedTargets() Start");
      this.displayLoading = true;
      try {
        var resp = await localhost.Screen.screenedTargets();
        runInAction(() => {
          console.log(resp);
          resp.forEach((fetchedScreenedTarget) => {
            this.screenedTargetsRegistry.set(fetchedScreenedTarget.id, fetchedScreenedTarget);
          });
          console.log(this.screenedTargetsRegistry);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.displayLoading = false;
        });
      }
    };
  
    get screenedTargets() {
      console.log("screenStore: screenedTargets() Start");
      return Array.from(this.screenedTargetsRegistry.values());
    }
  
    /* Fetch screens for a ScreenedTarget from API */
  
    fetchScreens = async (targetId) => {
      console.log("screenStore: fetchScreens Start");
      this.displayLoading = true;
  
      // first check cache
      let fetchedScreens = this.screenRegistry.get(targetId);
      console.log("CACHE");
      console.log(fetchedScreens);
      if (fetchedScreens) {
        console.log("screenStore: fetchScreens found in cache");
        this.selectedScreenedTarget = fetchedScreens;
        this.displayLoading = false;
      }
      // if not found fetch from api
      else {
        try {
          let resp = await localhost.Screen.screens(targetId);
          runInAction(() => {
            console.log("screenStore: fetchScreens fetched from api");
            this.screenRegistry.set(targetId, resp);
            this.selectedScreenedTarget = resp;
          });
        } catch (error) {
          console.log(error);
        } finally {
          runInAction(() => {
            this.displayLoading = false;
            console.log("screenStore: fetchScreens Complete");
          });
        }
      }
    };
  
    get screens() {
      console.log("From Screen Store");
      console.log(this.screenRegistry.get(this.selectedScreenedTarget));
      return this.screenRegistry.get(this.selectedScreenedTarget);
    }
  
  }
  