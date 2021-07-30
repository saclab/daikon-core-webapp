import { configure } from "mobx";
import { createContext } from "react";
import AdminStore from "./adminStore";
import GeneStore from "./geneStore";
import MsStore from "./msStore";
import UserStore from "./userStore";
import TargetStore from "./targetStore";
import ScreenStore from "./screenStore";
import PortfolioStore from "./portfolioStore";

configure({ enforceActions: "always" });

export class RootStore {
  geneStore;
  userStore;
  commonStore;
  adminStore;
  msStore;
  targetStore;
  portfolioStore;

  constructor() {
    this.msStore = new MsStore(this);
    this.geneStore = new GeneStore(this);
    this.targetStore = new TargetStore(this);
    this.userStore = new UserStore(this);
    this.adminStore = new AdminStore(this);
    this.screenStore = new ScreenStore(this);
    this.portfolioStore = new PortfolioStore(this);
  }
}
export const RootStoreContext = createContext(new RootStore());
