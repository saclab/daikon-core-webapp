import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { toast } from "react-toastify";

import agent from "../api/agent";

export default class DiscussionStore {
  rootStore;

  loadingDiscussions = false;
  discussions = new Array();

  postingDiscussion = false;
  postingReply = false;

  editingDiscussion = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      loadingDiscussions: observable,
      discussions: observable,
      fetchDiscussions: action,

      postingDiscussion: observable,
      newDiscussion: action,

      editingDiscussion: observable,
      editDiscussion: action,

      postingReply: observable,
      newReply: action,
    });
  }

  /* fetch discussions for a reference */ s;
  fetchDiscussions = async (reference) => {
    console.log("commentStore: fetchDiscussions() Start");
    this.loadingDiscussions = true;
    try {
      this.discussions = [];
      this.discussions = await agent.Discussion.list(reference);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingDiscussions = false;
        console.log("commentStore: fetchDiscussions() ENd");
      });
    }
  };

  newDiscussion = async (discussion) => {
    console.log("commentStore: newDiscussion() Start");
    this.postingDiscussion = true;

    let res = null;

    // send to server
    try {
      res = await agent.Discussion.new(discussion);

      runInAction(() => {
        toast.success("Successfully added new topic");
        this.fetchDiscussions(discussion.reference);
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.postingDiscussion = false;
        console.log("commentStore: newDiscussion() End");
      });
    }
    console.log(res);
    return res;
  };


  editDiscussion = async (discussion) => {
    console.log("commentStore: editDiscussion() Start");
    this.editingDiscussion = true;
    console.log(discussion);
    let res = null;

    // send to server
    try {
      res = await agent.Discussion.edit(discussion.id, discussion);

      runInAction(() => {
        toast.success("Saved");
        this.fetchDiscussions(discussion.reference);
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.editingDiscussion = false;
        console.log("commentStore: editDiscussion() End");
      });
    }
    console.log(res);
    return res;
  };



  newReply = async (discussion, reply) => {
    console.log("commentStore: newReply() Start");
    this.postingReply = true;
    console.log(discussion);
    console.log(reply);
    let res = null;

    // send to server
    try {
      res = await agent.Discussion.reply(discussion.id, reply);

      runInAction(() => {
        toast.success("Saved");
        this.fetchDiscussions(discussion.reference);
      });
    } catch (error) {
      console.log("+++++++RES ERROR");
      console.log(error);
    } finally {
      runInAction(() => {
        this.postingReply = false;
        console.log("commentStore: newReply() End");
      });
    }
    console.log(res);
    return res;
  };
}
