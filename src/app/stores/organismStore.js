import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { toast } from "react-toastify";

import agent from "../api/agent";

export default class OrganismStore {
  rootStore;

  displayLoading = false;

  OrganismRegistry = new Map();
  StrainRegistry = new Map();

  cacheValidOrganism = false;
  cacheValidStrain = false;

  selectedStrain = null;

  loadingFetchOrganism = false;
  loadingFetchStrain = false;

  editingOrganism = false;
  editingStrain = false;

  creatingOrganism = false;
  creatingStrain = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      cacheValidOrganism: observable,
      cacheValidStrain: observable,

      loadingFetchOrganism: observable,
      loadingFetchStrain: observable,

      editingOrganism: observable,
      editingStrain: observable,

      creatingOrganism: observable,
      creatingStrain: observable,

      fetchOrganisms: action,
      organisms: computed,
      OrganismRegistry: observable,

      fetchStrains: action,
      strains: computed,
      StrainRegistry: observable,

      editOrganism: action,

      editStrain: action,

      createOrganism: action,

      createStrain: action,
    });
  }

  fetchOrganisms = async () => {
    this.displayLoading = true;

    if (this.cacheValidOrganism) {
      this.displayLoading = false;
      return;
    }

    try {
      let fetchedOrganisms = await agent.Organisms.list();
      runInAction(() => {
        fetchedOrganisms.forEach((organism) => {
          this.OrganismRegistry.set(organism.id, organism);
        });
        this.displayLoading = false;
        this.cacheValidOrganism = true;
      });
    } catch (error) {
      runInAction(() => {
        this.displayLoading = false;
      });
      toast.error("Problem loading organisms");
      console.log(error);
    }
  };

  get organisms() {
    return Array.from(this.OrganismRegistry.values());
  }

  createOrganism = async (organism) => {
    this.creatingOrganism = true;
    let res = null;
    // send to server
    try {
      res = await agent.Organisms.create(organism);
      runInAction(() => {
        this.cacheValidOrganism = false;
        this.fetchOrganisms();
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.creatingOrganism = false;
      });
    }
    return res;
  };

  editOrganism = async (organism) => {
    console.log("editOrganism");
    console.log(organism);
    this.editingOrganism = true;
    let res = null;
    // send to server
    try {
      res = await agent.Organisms.edit(organism.id, organism);
      runInAction(() => {
        this.cacheValidOrganism = false;
        this.fetchOrganisms();
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.editingOrganism = false;
      });
    }
    return res;
  };

  fetchStrains = async () => {
    this.displayLoading = true;

    if (this.cacheValidStrain) {
      this.displayLoading = false;
      return;
    }

    try {
      let fetchedStrains = await agent.Strains.list();
      runInAction(() => {
        fetchedStrains.forEach((strain) => {
          this.StrainRegistry.set(strain.id, strain);
        });
        this.displayLoading = false;
        this.cacheValidStrain = true;
      });
    } catch (error) {
      runInAction(() => {
        this.displayLoading = false;
      });
      toast.error("Problem loading strains");
      console.log(error);
    }
  };

  get strains() {
    return Array.from(this.StrainRegistry.values());
  }

  createStrain = async (strain) => {
    this.creatingStrain = true;
    let res = null;
    // send to server
    try {
      res = await agent.Strains.create(strain);
      runInAction(() => {
        this.cacheValidStrain = false;
        this.fetchStrains();
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.creatingStrain = false;
      });
    }
    return res;
  };

  editStrain = async (strain) => {
    this.editingStrain = true;
    let res = null;
    // send to server
    try {
      res = await agent.Strains.edit(strain.id, strain);
      runInAction(() => {
        this.cacheValidStrain = false;
        this.fetchStrains();
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.editingStrain = false;
      });
    }
    return res;
  };
}
