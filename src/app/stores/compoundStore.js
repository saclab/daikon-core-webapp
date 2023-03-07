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
  cacheValid = false;

  selectedCompound = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      fetchCompounds: action,
      compounds: computed,

      selectedCompound: observable,
    });
  }

  fetchCompounds = async () => {
    this.displayLoading = true;
    try {
      const compounds = await agent.Compounds.list();
      runInAction(() => {
        compounds.forEach((compound) => {
          this.compoundRegistry.set(compound.id, compound);
        });
        this.displayLoading = false;
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
}
