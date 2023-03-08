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
  editingCompound = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      cacheValid: observable,

      fetchCompounds: action,
      compounds: computed,
      compoundRegistry: observable,

      selectedCompound: observable,

      loadingFetchCompound: observable,
      fetchCompound: action,
      compoundRegistryExpanded: observable,

      editingCompound: observable,
      editCompound: action,
      editCompoundExternalId: action,
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

  fetchCompound = async (id) => {
    this.loadingFetchCompound = true;

    // first check cache
    let fetchedCompound = this.compoundRegistryExpanded.get(id);
    if (this.cacheValid && fetchedCompound) {
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

  editCompound = async (compound) => {
    this.editingCompound = true;
    let res = null;
    // send to server
    try {
      res = await agent.Compounds.edit(this.selectedCompound.id, compound);
      runInAction(() => {
        this.cacheValid = false;
        this.fetchCompound(this.selectedCompound.id);
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.editingCompound = false;
      });
    }
    return res;
  };

  editCompoundExternalId = async (compound) => {
    this.editingCompound = true;
    let res = null;
    // send to server
    try {
      res = await agent.Compounds.editExternalId(
        this.selectedCompound.id,
        compound
      );
      runInAction(() => {
        this.cacheValid = false;
        this.fetchCompound(this.selectedCompound.id);
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.editingCompound = false;
      });
    }
    return res;
  };
}
