import { configure } from "mobx";
import { createContext } from "react";
import AdminStore from "./adminStore";
import GeneStore from "./geneStore";
import MsStore from "./msStore";
import UserStore from "./userStore";
import TargetStore from "./targetStore";

configure({ enforceActions: "always" });


export class RootStore {
  geneStore;
  userStore;
  commonStore;
  adminStore;
  msStore;

  constructor() {
    this.msStore = new MsStore(this);
    this.geneStore = new GeneStore(this);
    this.targetStore = new TargetStore(this);
    this.userStore = new UserStore(this);
    this.adminStore = new AdminStore(this);
  }
}
export const RootStoreContext = createContext(new RootStore());
