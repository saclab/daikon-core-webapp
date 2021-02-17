import { configure } from "mobx";
import { createContext } from "react";
import CommonStore from "./commonStore";
import GenomeStore from "./genomeStore";
import UserStore from "./userStore";

configure({ enforceActions: "always" });


export class RootStore {
  genomeStore;
  userStore;
  commonStore;

  constructor() {
    this.genomeStore = new GenomeStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
  }
}
export const RootStoreContext = createContext(new RootStore());
