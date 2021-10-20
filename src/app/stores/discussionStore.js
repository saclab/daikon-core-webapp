import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import localhost from "../api/localhost";

export default class DiscussionStore {
  rootStore;

  loadingDiscussions = false;
  discussions = new Array();

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      loadingDiscussions: observable,
      discussions: observable,
      fetchDiscussions: action,
    });
  }

  /* fetch comments for a reference */ s;
  fetchDiscussions = async (reference) => {
    console.log("commentStore: fetchDiscussions() Start");
    this.loadingDiscussions = true;
    try {
      this.discussions = [];
      this.discussions = await localhost.Comment.list(reference);
      console.log(this.commentList);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingDiscussions = false;
        console.log("commentStore: fetchDiscussions() ENd");
      });
    }
  };
}
