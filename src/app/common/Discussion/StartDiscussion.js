import { Button } from "primereact/button";
import { Editor } from 'primereact/editor';
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

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

  const headerOfTextEditor = <span className="ql-formats">
    <button className="ql-bold" aria-label="Bold"></button>
    <button className="ql-italic" aria-label="Italic"></button>
    <button className="ql-underline" aria-label="Underline"></button>
    <button className="ql-strike" aria-label="Strike"></button>
    <button className="ql-link" aria-label="Link"></button>
    <button className="ql-list" value="bullet" aria-label="Bullet"></button>
  </span>

  return (
    <div className="flex flex-column w-full">
      <div className="card">
        <h3>(Topic) What is it about?</h3>
        <p>A one line summary of the question or the discussion.</p>
        <InputText
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ width: "100%" }}
          readOnly={postingDiscussion}
        />

        <h3>Description</h3>
        <p>Include detailed information that is relevant to the topic</p>
        {/* <InputTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={10}
          style={{ width: "100%" }}
          autoResize
          readonly={postingDiscussion}
        /> */}
        <Editor
          style={{ height: '320px' }}
          headerTemplate={headerOfTextEditor}
          value={description}
          onTextChange={(e) => { console.log(e.htmlValue); setDescription(e.htmlValue) }}
          readOnly={postingDiscussion} />

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
