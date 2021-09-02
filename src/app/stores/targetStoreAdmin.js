import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import localhost from "../api/localhost";

export default class TargetStoreAdmin {
  rootStore;
  displayLoading = false;
  targetRegistry = new Map();

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      fetchTargetList: action,
      targetRegistry: observable,
    });
  }
  }
