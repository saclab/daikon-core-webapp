import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import localhost from "../api/localhost";

export default class CommentStore {
  rootStore;

  displayLoading = false;
  commentList = new Array();

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      displayLoading: observable,
      commentList: observable,
      fetchComments: action,
    });
  }

  /* fetch comments for a reference */ s;
  fetchComments = async (reference) => {
    console.log("commentStore: fetchComments() Start");
    this.displayLoading = true;
    try {
      this.commentList = [];
      this.commentList = await localhost.Comment.list(reference);
      console.log(this.commentList);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.displayLoading = false;
        console.log("commentStore: fetchComments() ENd");
      });
    }
  };
}
