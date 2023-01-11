import { action, makeObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";

import agent from "../api/agent";

export default class DiscussionStore {
  rootStore;

  loadingDiscussions = false;
  discussions = [];

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
    this.loadingDiscussions = true;
    try {
      this.discussions = [];
      this.discussions = await agent.Discussion.list(reference);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingDiscussions = false;
      });
    }
  };

  newDiscussion = async (discussion) => {
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
      console.log(error);
    } finally {
      runInAction(() => {
        this.postingDiscussion = false;
      });
    }
    return res;
  };

  editDiscussion = async (discussion) => {
    this.editingDiscussion = true;
    let res = null;

    // send to server
    try {
      res = await agent.Discussion.edit(discussion.id, discussion);

      runInAction(() => {
        toast.success("Saved");
        this.fetchDiscussions(discussion.reference);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.editingDiscussion = false;
      });
    }
    return res;
  };

  newReply = async (discussion, reply) => {
    this.postingReply = true;
    let res = null;

    // send to server
    try {
      res = await agent.Discussion.reply(discussion.id, reply);

      runInAction(() => {
        toast.success("Saved");
        this.fetchDiscussions(discussion.reference);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.postingReply = false;
      });
    }
    return res;
  };
}
