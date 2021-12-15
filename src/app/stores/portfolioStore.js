import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { toast } from "react-toastify";
import localhost from "../api/localhost";
import agent from "../api/agent";

export default class PortfolioStore {
  rootStore;

  /* OLD */
  displayLoading = false;
  historyDisplayLoading = false;
  portfolioRegistry = new Map();
  portfolioRegistryExpanded = new Map();
  portfolioHistoryRegistry = new Map();
  selectedPortfolio = null;
  selectedPortfolioHistory = null;
  /* END */

  creatingH2L = false;
  creatingLO = false;
  creatingSP = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      historyDisplayLoading: observable,
      portfolios: computed,
      fetchPortfolioList: action,
      portfolioRegistry: observable,
      portfolio: computed,
      fetchPortfolio: action,
      selectedPortfolio: observable,
      fetchPortfolioHistory: action,
      selectedPortfolioHistory: observable,
      portfolioHistory: computed,
      editPortfolio: action,
      cancelEditPortfolio: action,

      creatingH2L: observable,
      createH2L: action,

      creatingLO: observable,
      createLO: action,

      creatingSP: observable,
      createSP: action,

      filterPortfolioProjects: action,
    });
  }
  /* LEGACY */
  /* Fetch Target list from API */
  fetchPortfolioList = async () => {
    console.log("portfolioStore: fetchPortfolioList() Start");
    this.displayLoading = true;
    try {
      var resp = await localhost.Portfolio.list();
      runInAction(() => {
        console.log(resp);
        resp.forEach((fetchedPortfolio) => {
          this.portfolioRegistry.set(fetchedPortfolio.id, fetchedPortfolio);
        });
        console.log(this.portfolioRegistry);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
      });
    }
  };

  get portfolios() {
    console.log("portfolioStore: portfolios() Start");
    return Array.from(this.portfolioRegistry.values());
  }

  /* Fetch specific Target with id from API */

  fetchPortfolio = async (id) => {
    console.log("portfolioStore: fetchPortfolio Start");
    this.displayLoading = true;

    // first check cache
    let fetchedPortfolio = this.portfolioRegistryExpanded.get(id);
    console.log("CACHE");
    console.log(fetchedPortfolio);
    if (
      fetchedPortfolio &&
      fetchedPortfolio.hasOwnProperty("portfolioPromotionForm")
    ) {
      console.log("portfolioStore: fetchPortfolio found in cache");
      this.selectedPortfolio = fetchedPortfolio;
      this.displayLoading = false;
    }
    // if not found fetch from api
    else {
      try {
        fetchedPortfolio = await localhost.Portfolio.view(id);
        runInAction(() => {
          console.log("portfolioStore: fetchPortfolio fetched from api");
          console.log(this.selectedPortfolio);
          this.selectedPortfolio = fetchedPortfolio;
          this.portfolioRegistryExpanded.set(id, fetchedPortfolio);
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.displayLoading = false;
          console.log("portfolioStore: fetchPortfolio Complete");
        });
      }
    }
  };

  get portfolio() {
    console.log("From Target Store");
    console.log(this.selectedPortfolio);
    return this.selectedPortfolio;
  }

  /* Portfolio History */

  fetchPortfolioHistory = async () => {
    console.log("portfolioStore: fetchPortfolioHistory Start");
    this.historyDisplayLoading = true;
    let id = this.selectedPortfolio.id;

    // first check cache
    let fetchedPortfolioHistory = this.portfolioHistoryRegistry.get(id);
    console.log("CACHE");
    console.log(fetchedPortfolioHistory);
    if (fetchedPortfolioHistory) {
      console.log("portfolioStore: fetchedPortfolioHistory found in cache");
      this.historyDisplayLoading = false;
      this.selectedPortfolioHistory = fetchedPortfolioHistory;
    }
    // if not found fetch from api
    else {
      try {
        fetchedPortfolioHistory = await localhost.Portfolio.history(id);
        runInAction(() => {
          console.log("portfolioStore: fetchPortfolioHistory fetched from api");
          console.log(fetchedPortfolioHistory);

          this.portfolioHistoryRegistry.set(id, fetchedPortfolioHistory);
          this.selectedPortfolioHistory = fetchedPortfolioHistory;
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction(() => {
          this.historyDisplayLoading = false;
          console.log("portfolioStore: fetchPortfolioHistory Complete");
        });
      }
    }
  };

  get portfolioHistory() {
    return this.selectedPortfolioHistory;
  }

  /* End Target History */

  editPortfolio = async () => {
    console.log("portfolioStore: editPortfolio Start");
    this.displayLoading = true;
    let updatedTarget = null;
    console.log(this.selectedPortfolio);
    // send to server
    try {
      updatedTarget = await localhost.Portfolio.edit(this.selectedPortfolio);
      runInAction(() => {
        console.log("portfolioStore: fetchPortfolio fetched from api");
        console.log(this.selectedPortfolio);
        this.selectedPortfolio = updatedTarget;
        this.portfolioRegistryExpanded.set(updatedTarget.id, updatedTarget);
        this.portfolioHistoryRegistry.delete(updatedTarget.id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
        console.log("portfolioStore: edit Complete");
      });
    }
  };

  cancelEditPortfolio = () => {
    console.log("portfolioStore: cancelEditPortfolio");
    this.selectedPortfolio = this.portfolioRegistryExpanded.get(
      this.selectedPortfolio.id
    );
  };

  /* END */

  createH2L = async (newH2L) => {
    console.log("PortfolioStore: createH2L Start");
    console.log(newH2L);
    this.creatingH2L = true;
    let res = null;
    // send to server
    try {
      res = await agent.Projects.createH2L(
        this.rootStore.projectStore.selectedProject.id,
        newH2L
      );
      runInAction(() => {
        toast.success("Successfully created new FHA");
        this.rootStore.projectStore.projectRegistryCacheValid = false;
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.creatingH2L = false;
        console.log("PortfolioStore: createH2L Complete");
      });
    }
    return res;
  };

  createLO = async (newLO) => {
    console.log("PortfolioStore: createLO Start");
    console.log(newLO);
    this.creatingLO = true;
    let res = null;
    // send to server
    try {
      res = await agent.Projects.createLO(
        this.rootStore.projectStore.selectedProject.id,
        newLO
      );
      runInAction(() => {
        toast.success("Successfully promoted project to LO");
        this.rootStore.projectStore.projectRegistryCacheValid = false;
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.creatingLO = false;
        console.log("PortfolioStore: createLO Complete");
      });
    }
    return res;
  };

  createSP = async (newSP) => {
    console.log("PortfolioStore: createSP Start");
    console.log(newSP);
    this.creatingSP = true;
    let res = null;
    // send to server
    try {
      res = await agent.Projects.createSP(
        this.rootStore.projectStore.selectedProject.id,
        newSP
      );
      runInAction(() => {
        toast.success("Successfully promoted project to SP");
        this.rootStore.projectStore.projectRegistryCacheValid = false;
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.creatingSP = false;
        console.log("PortfolioStore: createSP Complete");
      });
    }
    return res;
  };

  filterPortfolioProjects = () => {
    return Array.from(
      this.rootStore.projectStore.projectRegistry.values()
    ).filter((project) => {
      return (
        project.currentStage === "H2L" ||
        project.currentStage === "LO" ||
        project.currentStage === "SP"
      );
    });
  };
}
