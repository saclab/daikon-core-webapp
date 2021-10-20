import React, { useState, useEffect, useContext, useRef } from "react";
import dateFormat, { masks } from "dateformat";

import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import { observer } from "mobx-react-lite";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import { InputTextarea } from "primereact/inputtextarea";
import { RootStoreContext } from "../../stores/rootStore";
import Loading from "../../layout/Loading/Loading";
import StartDiscussion from "./StartDiscussion";

const Discussion = ({ reference }) => {
  const rootStore = useContext(RootStoreContext);
  const { fetchDiscussions, loadingDiscussions, discussions } =
    rootStore.discussionStore;

  useEffect(() => {
    fetchDiscussions(reference);
  }, [fetchDiscussions]);

  /* local variables */

  const dt = useRef(null);

  const [displayDiscussionDialog, setDisplayDiscussionDialog] = useState(false);
  const [userReplyValue, setuserReplyValue] = useState({});
  const [displayReplyBox, setDisplayReplyBox] = useState({});

  const displayAllDiscussions = () => {
    setDisplayDiscussionDialog(true);
  };

  if (loadingDiscussions) {
    return <Loading />;
  }

  let startNewDiscussion = () => {
    return (
      <React.Fragment>
        <i className="pi pi-comments"></i> &nbsp; Start a new discussion
      </React.Fragment>
    );
  };

  let mapReplyValues = (id, value) => {
    let tempValue = { ...userReplyValue };
    tempValue[id] = value;
    setuserReplyValue(tempValue);
  };

  let mapDisplayReplyBox = (id) => {
    let tempValue = { ...displayReplyBox };
    tempValue[id] = true;
    setDisplayReplyBox(tempValue);
  };

  let subtitleTemplate = (discussion) => {
    return (
      <div style={{ fontSize: "smaller", color: "#999999" }}>
        <Avatar
          icon="pi pi-user"
          size="small"
          style={{ width: "1rem", height: "1rem" }}
        />{" "}
        {discussion.postedBy} on{" "}
        {dateFormat(discussion.timestamp, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
      </div>
    );
  };

  let titleTemplate = (discussion) => {
    return (
      <div>
        {discussion.topic}{" "}
        <sup>
          <Tag
            style={{ background: "#CCCCCC", padding: "0.1rem 0.2rem" }}
            value={discussion.section}
          ></Tag>
        </sup>
      </div>
    );
  };

  let formatteddiscussions = discussions.map((discussion) => {
    let formattedReplies = <React.Fragment />;
    if (discussion.replies.length > 0) {
      formattedReplies = discussion.replies.map((reply) => {
        return (
          <div key={reply.id}>
            <Divider align="left">
              <div className="p-d-inline-flex p-ai-center">
                {subtitleTemplate(reply)}
              </div>
            </Divider>
            <p>{reply.body}</p>
          </div>
        );
      });
    }

    return (
      <Card
        title={titleTemplate(discussion)}
        subTitle={subtitleTemplate(discussion)}
        key={discussion.id}
        style={{ marginTop: "10px" }}
      >
        <p>
          {discussion.body}{" "}
          <Button
            label="Reply"
            className="p-button-link"
            icon="ri-arrow-left-up-line"
            style={{ padding: "0rem 0rem" }}
            onClick={() => mapDisplayReplyBox(discussion.id)}
          />
        </p>
        <Divider align="left" type="dashed">
          <b>Replies</b>
        </Divider>
        <div style={{ marginLeft: "50px" }}>
          {displayReplyBox[discussion.id] && (
            <React.Fragment>
              <InputTextarea
                value={userReplyValue[discussion.id]}
                onChange={(e) => mapReplyValues(discussion.id, e.target.value)}
                rows={2}
                style={{ width: "100%" }}
                autoResize
                autoFocus
      
              />
              <Button
              className="p-button-rounded"
                style={{
                  background: "#28477f",
                  border: "0px solid #28477f",
                  padding: "0.4rem 0.6rem",
                  float: "right",
                  marginTop : "0.2rem",
                  fontSize: "small"
                }}
                label="Reply"
                icon="pi pi-reply"
              />
            </React.Fragment>
          )}

          {formattedReplies}
        </div>

        <br />
      </Card>
    );
  });

  return (
    <React.Fragment>
      <Dialog
        header={startNewDiscussion()}
        visible={displayDiscussionDialog}
        style={{ width: "50vw" }}
        maximizable
        onHide={() => setDisplayDiscussionDialog(false)}
      >
        <StartDiscussion />
      </Dialog>

      <Fieldset legend="Discussion board">
        <Button
          className="p-button-rounded p-button-info"
          icon="pi pi-plus"
          label="New Topic"
          onClick={displayAllDiscussions}
          style={{ background: "#28477f", border: "0px solid #28477f" }}
        />
        {formatteddiscussions}
      </Fieldset>

      <br />
    </React.Fragment>
  );
};

export default observer(Discussion);
