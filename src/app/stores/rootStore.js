import { configure } from "mobx";
import { createContext } from "react";
import AdminStore from "./adminStore";
import GeneStore from "./geneStore";
import MsStore from "./msStore";
import UserStore from "./userStore";
import TargetStore from "./targetStore";
import ScreenStore from "./screenStore";
import PortfolioStore from "./portfolioStore";
import AppSettingsStore from "./appSettingsStore";
import GeneStoreAdmin from "./geneStoreAdmin";
import TargetStoreAdmin from "./targetStoreAdmin";
import PostPortfolioStore from "./postPortfolioStore";
import HitsStore from "./hitsStore";
import DiscussionStore from "./discussionStore";
import GeneralStore from "./generalStore";
import FHAStore from "./fhaStore";
import ProjectStore from "./projectStore";
import VotingStore from "./VotingStore";
import DataViewStore from './dataViewStore';

configure({ enforceActions: "always" });

export class RootStore {
  geneStore;
  userStore;
  commonStore;
  adminStore;
  msStore;
  targetStore;
  portfolioStore;
  appSettingsStore;
  geneStoreAdmin;
  targetStoreAdmin;
  portfolioStore;
  hitsStore;
  discussionStore;
  generalStore;
  fhaStore;
  projectStore;
  votingStore;

  constructor() {
    this.appSettingsStore = new AppSettingsStore(this);
    this.msStore = new MsStore(this);
    this.geneStore = new GeneStore(this);
    this.targetStore = new TargetStore(this);
    this.userStore = new UserStore(this);
    this.adminStore = new AdminStore(this);
    this.screenStore = new ScreenStore(this);
    this.hitsStore = new HitsStore(this);
    this.portfolioStore = new PortfolioStore(this);
    this.geneStoreAdmin = new GeneStoreAdmin(this);
    this.targetStoreAdmin = new TargetStoreAdmin(this);
    this.postPortfolioStore = new PostPortfolioStore(this);
    this.discussionStore = new DiscussionStore(this);
    this.generalStore = new GeneralStore(this);
    this.fhaStore = new FHAStore(this);
    this.projectStore = new ProjectStore(this);
    this.votingStore = new VotingStore(this);
    this.dataViewStore = new DataViewStore(this);
  }
}
export const RootStoreContext = createContext(new RootStore());
