import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const StartDiscussion = () => {
  const [addComment, setAddComment] = useState("");

  return (
    <div>
      <div className="card">
        <InputTextarea
          value={addComment}
          onChange={(e) => setAddComment(e.target.value)}
          rows={5}
          cols={30}
          autoResize
          style={{ width: "45vw" }}
        />
        <br />
        <br />

        <Button
          label="Post"
          className="p-button-raised p-button-success"
          icon="pi pi-comment"
        />
      </div>
    </div>
  );
};

export default StartDiscussion;
