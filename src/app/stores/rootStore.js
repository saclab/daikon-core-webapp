import { configure } from "mobx";
import { createContext } from "react";
import AdminStore from "./adminStore";
import AppSettingsStore from "./appSettingsStore";
import DataViewStore from "./dataViewStore";
import DiscussionStore from "./discussionStore";
import GeneralStore from "./generalStore";
import GeneStore from "./geneStore";
import GeneStoreAdmin from "./geneStoreAdmin";
import HAStore from "./haStore";
import HitsStore from "./hitsStore";
import MsStore from "./msStore";
import PortfolioStore from "./portfolioStore";
import PostPortfolioStore from "./postPortfolioStore";
import ProjectStore from "./projectStore";
import ScreenStore from "./screenStore";
import TargetStore from "./targetStore";
import TargetStoreAdmin from "./targetStoreAdmin";
import UserStore from "./userStore";
import VotingStore from "./VotingStore";

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
  hitsStore;
  discussionStore;
  generalStore;
  haStore;
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
    this.haStore = new HAStore(this);
    this.projectStore = new ProjectStore(this);
    this.votingStore = new VotingStore(this);
    this.dataViewStore = new DataViewStore(this);
  }
}
export const RootStoreContext = createContext(new RootStore());
