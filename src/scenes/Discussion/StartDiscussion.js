import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
const StartDiscussion = () => {
  const [value1, setValue1] = useState("");

  return (
    <div>
      <div className="card">
        <InputTextarea
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
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
