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
  
    screenRegistry = new Map();
    screenRegistryExpanded = new Map();
    screenHistoryRegistry = new Map();
    selectedScreen = null;
    selectedScreenHistory = null;
  
    constructor(rootStore) {
      this.rootStore = rootStore;
      makeObservable(this, {
        displayLoading: observable,
        historyDisplayLoading: observable,
  
        screens: computed,
        fetchScreenList: action,
        screenRegistry: observable,
  
        screen: computed,
        fetchScreen: action,
        selectedScreen: observable,
  
        fetchScreenHistory: action,
        selectedScreenHistory: observable,
        screenHistory: computed,
  
  
        editScreen: action,
        cancelEditScreen: action,
      });
    }
  
    /* Fetch Screen list from API */
    fetchScreenList = async () => {
      console.log("screenStore: fetchScreenList() Start");
      this.displayLoading = true;
      try {
        var resp = await localhost.Screen.list();
        runInAction(() => {
          console.log(resp);
          resp.forEach((fetchedScreen) => {
            this.screenRegistry.set(fetchedScreen.id, fetchedScreen);
          });
          console.log(this.screenRegistry);
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
      console.log("screenStore: screens() Start");
      return Array.from(this.screenRegistry.values());
    }
  
    /* Fetch specific Screen with id from API */
  
    fetchScreen = async (id) => {
      console.log("screenStore: fetchScreen Start");
      this.displayLoading = true;
  
      // first check cache
      let fetchedScreen = this.screenRegistryExpanded.get(id);
      console.log("CACHE");
      console.log(fetchedScreen);
      if (fetchedScreen && fetchedScreen.hasOwnProperty("screenPromotionForm")) {
        console.log("screenStore: fetchScreen found in cache");
        this.selectedScreen = fetchedScreen;
        this.displayLoading = false;
      }
      // if not found fetch from api
      else {
        try {
          fetchedScreen = await localhost.Screen.view(id);
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
  
    get screen() {
      console.log("From Screen Store");
      console.log(this.selectedScreen);
      return this.selectedScreen;
    }
  
    /* Screen History */
  
    fetchScreenHistory = async () => {
      console.log("screenStore: fetchScreenHistory Start");
      this.historyDisplayLoading = true;
      let id = this.selectedScreen.id;
  
      // first check cache
      let fetchedScreenHistory = this.screenHistoryRegistry.get(id);
      console.log("CACHE");
      console.log(fetchedScreenHistory);
      if (fetchedScreenHistory) {
        console.log("screenStore: fetchedScreenHistory found in cache");
        this.historyDisplayLoading = false;
        this.selectedScreenHistory = fetchedScreenHistory;
      }
      // if not found fetch from api
      else {
        try {
          fetchedScreenHistory = await localhost.Screen.history(id);
          runInAction(() => {
            console.log("screenStore: fetchScreenHistory fetched from api");
            console.log(fetchedScreenHistory);
  
            this.screenHistoryRegistry.set(id, fetchedScreenHistory);
            this.selectedScreenHistory = fetchedScreenHistory;
          });
        } catch (error) {
          console.log(error);
        } finally {
          runInAction(() => {
            this.historyDisplayLoading = false;
            console.log("screenStore: fetchScreenHistory Complete");
          });
        }
      }
    };
  
    get screenHistory() {
      return this.selectedScreenHistory;
    }
  
    /* End Screen History */
  
  
    editScreen = async () => {
      console.log("screenStore: editScreen Start");
      this.displayLoading = true;
      let updatedScreen = null;
      console.log(this.selectedScreen);
      // send to server
      try {
        updatedScreen = await localhost.Screen.edit(this.selectedScreen);
        runInAction(() => {
          console.log("screenStore: fetchScreen fetched from api");
          console.log(this.selectedScreen);
          this.selectedScreen = updatedScreen;
          this.screenRegistryExpanded.set(updatedScreen.id, updatedScreen);
          this.screenHistoryRegistry.delete(updatedScreen.id);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.displayLoading = false;
          console.log("screenStore: edit Complete");
        });
      }
    };
  
    cancelEditScreen = () => {
      console.log("screenStore: cancelEditScreen");
      this.selectedScreen = this.screenRegistryExpanded.get(this.selectedScreen.id);
    };
  }
  