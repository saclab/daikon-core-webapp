import React, { useState } from "react";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import StartDiscussion from "./StartDiscussion";

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
      <Button
        label="Start a discussion"
        className="p-button-outlined p-button-secondary p-button-text"
        icon="pi pi-plus"
        onClick={displayAllDiscussions}
      />

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
          <p></p>
        </Fieldset>

        <br />
      </div>
    </React.Fragment>
  );
};

export default Discussion;
