import React, { useState, useEffect, useContext, useRef } from "react";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import { observer } from "mobx-react-lite";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { RootStoreContext } from "../../stores/rootStore";
import Loading from "../../layout/Loading/Loading";
import StartDiscussion from "./StartDiscussion";

const Discussion = ({ reference }) => {
  const rootStore = useContext(RootStoreContext);
  const { fetchComments, displayLoading, commentList } = rootStore.commentStore;

  console.log("Will fetch comments for:" + reference);

  useEffect(() => {
    fetchComments(reference);
  }, [fetchComments]);

  console.log(commentList);

  /* local variables */

  const dt = useRef(null);

  const [displayDiscussionDialog, setDisplayDiscussionDialog] = useState(false);

  const displayAllDiscussions = () => {
    setDisplayDiscussionDialog(true);
  };

  let startNewDiscussion = () => {
    return (
      <React.Fragment>
        <i className="pi pi-comments"></i> &nbsp; Start a new discussion
      </React.Fragment>
    );
  };

  if (displayLoading) {
    return <Loading />;
  }

  let formattedComments = commentList.map((comment) => {
    let additionalComments = <React.Fragment />;
    if (comment.additionalcomment.length > 0) {
      additionalComments = comment.additionalcomment.map(
        (additionalComment) => {
          return (
            <div id={additionalComment.id} style={{ marginLeft: "100px" }}>
              <Tag
                className="p-mr-2"
                severity="success"
                value={additionalComment.postedBy}
              ></Tag>
              <Tag
                className="p-mr-2"
                severity="warning"
                value={additionalComment.date}
              ></Tag>
              <p style={{ backgroundColor: "#EDEDED" }}>
                {additionalComment.commentBody}
              </p>
            </div>
          );
        }
      );
    }

    return (
      <div id={comment.id}>
        <Tag
          className="p-mr-2"
          severity="success"
          value={comment.postedBy}
        ></Tag>
        <Tag className="p-mr-2" severity="warning" value={comment.date}></Tag>
        <Tag className="p-mr-2" severity="warning" value={comment.domain}></Tag>
        <Button
          icon="pi pi-reply"
          className="p-button-rounded p-button-secondary p-button-text"
          label="Reply"
          style={{ marginLeft: "1000px" }}
        />
        <p style={{ backgroundColor: "#EDEDED" }}> {comment.commentBody}</p>
        {additionalComments}
        <br />
      </div>
    );
  });

  return (
    <React.Fragment>
      <div style={{ float: "right" }}>
        <Button
          className="p-button-rounded p-button-info"
          icon="pi pi-plus"
          onClick={displayAllDiscussions}
        />
      </div>
      <br />
      <Dialog
        header={startNewDiscussion()}
        visible={displayDiscussionDialog}
        style={{ width: "50vw" }}
        maximizable
        onHide={() => setDisplayDiscussionDialog(false)}
      >
        <StartDiscussion />
      </Dialog>

      <div className="card">
        <Fieldset legend="Discussion board">{formattedComments}</Fieldset>

        <br />
      </div>
    </React.Fragment>
  );
};

export default observer(Discussion);
