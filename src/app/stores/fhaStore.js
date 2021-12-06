import { action, makeObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";

import agent from "../api/agent";

export default class FHAStore {
  rootStore;

  creatingFHA = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      creatingFHA: observable,
      createFHA: action,
    });
  }

  createFHA = async (newFha) => {
    console.log("FHAStore: createFHA Start");
    console.log(newFha);
    this.creatingFHA = true;
    let res = null;

    // send to server
    try {
      res = await agent.Projects.createFHA(newFha);

      runInAction(() => {
        toast.success("Successfully added screening information");
        // this.screenRegistryExpanded.clear();
        // this.selectedScreen = null;
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.creatingFHA = false;
        console.log("FHAStore: createFHA Complete");
      });
    }
    return res;
  };
}
