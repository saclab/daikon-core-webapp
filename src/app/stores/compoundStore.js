import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { toast } from "react-toastify";

import agent from "../api/agent";

export default class CompoundStore {
  rootStore;

  displayLoading = false;
  compoundRegistry = new Map();
  compoundRegistryExpanded = new Map();
  cacheValid = false;

  selectedCompound = null;

  loadingFetchCompound = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      fetchCompounds: action,
      compounds: computed,
      compoundRegistry: observable,

      selectedCompound: observable,

      loadingFetchCompound: observable,
      fetchCompound: action,
      compoundRegistryExpanded: observable,
    });
  }

  fetchCompounds = async () => {
    this.displayLoading = true;

    if (this.cacheValid) {
      this.displayLoading = false;
      return;
    }

    try {
      let fetchedCompounds = await agent.Compounds.list();
      runInAction(() => {
        fetchedCompounds.forEach((compound) => {
          this.compoundRegistry.set(compound.id, compound);
        });
        this.displayLoading = false;
        this.cacheValid = true;
      });
    } catch (error) {
      runInAction(() => {
        this.displayLoading = false;
      });
      toast.error("Problem loading compounds");
      console.log(error);
    }
  };

  get compounds() {
    return Array.from(this.compoundRegistry.values());
  }

  fetchCompound = async (id, invalidateCache = false) => {
    this.loadingFetchCompound = true;

    // first check cache
    let fetchedCompound = this.compoundRegistryExpanded.get(id);
    if (!invalidateCache && fetchedCompound) {
      this.selectedCompound = fetchedCompound;
      this.loadingFetchCompound = false;
    }
    // if not found fetch from api
    else {
      try {
        fetchedCompound = await agent.Compounds.details(id);
        runInAction(() => {
          this.selectedCompound = fetchedCompound;
          this.compoundRegistryExpanded.set(id, fetchedCompound);
        });
      } catch (error) {
        console.error(error);
      } finally {
        runInAction(() => {
          this.loadingFetchCompound = false;
        });
      }
    }
  };
}
