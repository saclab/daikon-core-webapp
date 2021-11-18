import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const StartDiscussion = ({
  section,
  reference,
  newDiscussion,
  postingDiscussion,
  close,
}) => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  let submitNewDiscussion = () => {
    let formatedDiscussion = {
      reference: reference,
      section: section,
      topic: topic,
      description: description,
      mentions: [],
      tags: [],
    };

    newDiscussion(formatedDiscussion).then((res) => {
      console.log("Inside SUBMIT");
      console.log(res);
      if (res !== null) close();
    });
  };

  return (
    <div>
      <div className="card">
        <h3>What is it about?</h3>
        <InputText
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ width: "100%" }}
          readonly={postingDiscussion}
        />

        <h3>Description.</h3>
        <InputTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={10}
          style={{ width: "100%" }}
          autoResize
          readonly={postingDiscussion}
        />

        {/* <h3>Tag Users?</h3>
        <Mention
          suggestions={suggestions}
          onSearch={onSearch}
          field="name"
          placeholder="Please enter @ to mention people if you think they are related. We will send them an email!"
          rows={4}
          style={{ width: "100%" }}
          itemTemplate={itemTemplate}
        /> */}
        <br />
        <br />

        <Button
          label="Post"
          icon="pi pi-comment"
          style={{ background: "#28477f", border: "0px solid #28477f" }}
          loading={postingDiscussion}
          onClick={() => submitNewDiscussion()}
        />
      </div>
    </div>
  );
};

export default StartDiscussion;
