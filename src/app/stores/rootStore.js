import { configure } from "mobx";
import { createContext } from "react";
import AdminStore from "./adminStore";
import GenomeStore from "./genomeStore";
import MsStore from "./msStore";
import UserStore from "./userStore";

configure({ enforceActions: "always" });


export class RootStore {
  genomeStore;
  userStore;
  commonStore;
  adminStore;
  msStore;

  constructor() {
    this.msStore = new MsStore(this);
    this.genomeStore = new GenomeStore(this);
    this.userStore = new UserStore(this);
    this.adminStore = new AdminStore(this);
  }
}
export const RootStoreContext = createContext(new RootStore());
