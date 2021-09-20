import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
  } from "mobx";
  import localhost from "../api/localhost";
  
  
  export default class PostPortfolioStore {
    rootStore;
  
    displayLoading = false;
    
    historyDisplayLoading = false;
  
    postPortfolioRegistry = new Map();
    postPortfolioRegistryExpanded = new Map();
    postPortfolioHistoryRegistry = new Map();
    selectedPostPortfolio = null;
    selectedPostPortfolioHistory = null;
  
    constructor(rootStore) {
      this.rootStore = rootStore;
      makeObservable(this, {
        displayLoading: observable,
        historyDisplayLoading: observable,
  
        postPortfolios: computed,
        fetchPostPostPortfolioList: action,
        postPortfolioRegistry: observable,
  
        postPortfolio: computed,
        fetchPostPortfolio: action,
        selectedPostPortfolio: observable,
  
        fetchPostPortfolioHistory: action,
        selectedPostPortfolioHistory: observable,
        postPortfolioHistory: computed,
  
  
        editPostPortfolio: action,
        cancelEditPostPortfolio: action,
      });
    }
  
    /* Fetch Target list from API */
    fetchPostPostPortfolioList = async () => {
      console.log("postPortfolioStore: fetchPostPostPortfolioList() Start");
      this.displayLoading = true;
      try {
        var resp = await localhost.PostPortfolio.list();
        runInAction(() => {
          console.log(resp);
          resp.forEach((fetchedPostPortfolio) => {
            this.postPortfolioRegistry.set(fetchedPostPortfolio.id, fetchedPostPortfolio);
          });
          console.log(this.postPortfolioRegistry);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.displayLoading = false;
        });
      }
    };
  
    get postPortfolios() {
      console.log("postPortfolioStore: postPortfolios() Start");
      return Array.from(this.postPortfolioRegistry.values());
    }
  
    /* Fetch specific Target with id from API */
  
    fetchPostPortfolio = async (id) => {
      console.log("postPortfolioStore: fetchPostPortfolio Start");
      this.displayLoading = true;
  
      // first check cache
      let fetchedPostPortfolio = this.postPortfolioRegistryExpanded.get(id);
      console.log("CACHE");
      console.log(fetchedPostPortfolio);
      if (fetchedPostPortfolio && fetchedPostPortfolio.hasOwnProperty("portfolioPromotionForm")) {
        console.log("postPortfolioStore: fetchPostPortfolio found in cache");
        this.selectedPostPortfolio = fetchedPostPortfolio;
        this.displayLoading = false;
      }
      // if not found fetch from api
      else {
        try {
          fetchedPostPortfolio = await localhost.PostPortfolio.view(id);
          runInAction(() => {
            console.log("postPortfolioStore: fetchPostPortfolio fetched from api");
            console.log(this.selectedPostPortfolio);
            this.selectedPostPortfolio = fetchedPostPortfolio;
            this.postPortfolioRegistryExpanded.set(id, fetchedPostPortfolio);
          });
        } catch (error) {
          console.log(error);
        } finally {
          runInAction(() => {
            this.displayLoading = false;
            console.log("postPortfolioStore: fetchPostPortfolio Complete");
          });
        }
      }
    };
  
    get postPortfolio() {
      console.log("From Post Portfolio Store");
      console.log(this.selectedPostPortfolio);
      return this.selectedPostPortfolio;
    }
  
    /* PostPortfolio History */
  
    fetchPostPortfolioHistory = async () => {
      console.log("postPortfolioStore: fetchPostPortfolioHistory Start");
      this.historyDisplayLoading = true;
      let id = this.selectedPostPortfolio.id;
  
      // first check cache
      let fetchedPostPortfolioHistory = this.postPortfolioHistoryRegistry.get(id);
      console.log("CACHE");
      console.log(fetchedPostPortfolioHistory);
      if (fetchedPostPortfolioHistory) {
        console.log("postPortfolioStore: fetchedPostPortfolioHistory found in cache");
        this.historyDisplayLoading = false;
        this.selectedPostPortfolioHistory = fetchedPostPortfolioHistory;
      }
      // if not found fetch from api
      else {
        try {
          fetchedPostPortfolioHistory = await localhost.PostPortfolio.history(id);
          runInAction(() => {
            console.log("postPortfolioStore: fetchPostPortfolioHistory fetched from api");
            console.log(fetchedPostPortfolioHistory);
  
            this.postPortfolioHistoryRegistry.set(id, fetchedPostPortfolioHistory);
            this.selectedPostPortfolioHistory = fetchedPostPortfolioHistory;
          });
        } catch (error) {
          console.log(error);
        } finally {
          runInAction(() => {
            this.historyDisplayLoading = false;
            console.log("postPortfolioStore: fetchPostPortfolioHistory Complete");
          });
        }
      }
    };
  
    get postPortfolioHistory() {
      return this.selectedPostPortfolioHistory;
    }
  
    /* End Target History */
  
  
    editPostPortfolio = async () => {
      console.log("postPortfolioStore: editPostPortfolio Start");
      this.displayLoading = true;
      let updatedTarget = null;
      console.log(this.selectedPostPortfolio);
      // send to server
      try {
        updatedTarget = await localhost.PostPortfolio.edit(this.selectedPostPortfolio);
        runInAction(() => {
          console.log("postPortfolioStore: fetchPostPortfolio fetched from api");
          console.log(this.selectedPostPortfolio);
          this.selectedPostPortfolio = updatedTarget;
          this.postPortfolioRegistryExpanded.set(updatedTarget.id, updatedTarget);
          this.postPortfolioHistoryRegistry.delete(updatedTarget.id);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.displayLoading = false;
          console.log("postPortfolioStore: edit Complete");
        });
      }
    };
  
    cancelEditPostPortfolio = () => {
      console.log("postPortfolioStore: cancelEditPostPortfolio");
      this.selectedPostPortfolio = this.postPortfolioRegistryExpanded.get(this.selectedPostPortfolio.id);
    };
  }
  