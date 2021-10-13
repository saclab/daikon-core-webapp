import React, { useState } from "react";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import StartDiscussion from "./StartDiscussion";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";

const Discussion = () => {
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
        <Fieldset legend="Discussion board">
          <p style={{backgroundColor:'#D3D3D3'}}>&nbsp; 
            The likelihood and impact scores for this gene is probably going to
            be low. Can we use these scores to populate the map in the target
            area. If it can be stored, but not display, the other columns which
            represent sub scores that would be great. 
          </p>

          <Tag className="p-mr-2" icon="pi pi-user" value="Posted by "></Tag>
          <Tag
            className="p-mr-2"
            severity="success"
            value="panda@tamu.edu"
          ></Tag>
          <Tag className="p-mr-2" severity="warning" value="06 Oct 2021, 13:27"></Tag>
        </Fieldset>

        <br />
      </div>
    </React.Fragment>
  );
};

export default Discussion;
