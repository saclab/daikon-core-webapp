import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";

import { Mention } from "primereact/mention";

const StartDiscussion = ({
  section,
  reference,
  newDiscussion,
  postingDiscussion,
  close,
}) => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const [suggestions, setSuggestions] = useState([]);

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

  let people = [
    {
      name: "Siddhant Rath",
      email: "sid@tamu.edu",
    },
    {
      name: "Saswati Panda",
      email: "panda@tamu.edu",
    },
  ];

  const onSearch = (event) => {
    //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
    setTimeout(() => {
      const query = event.query;
      let suggestions;

      if (!query.trim().length) {
        suggestions = [...people];
      } else {
        suggestions = people.filter((person) => {
          return person.name.toLowerCase().startsWith(query.toLowerCase());
        });
      }

      setSuggestions(suggestions);
    }, 250);
  };

  const itemTemplate = (suggestion) => {
    return (
      <div className="p-d-flex p-ai-center">
        <Avatar
          icon="pi pi-user"
          size="small"
          style={{ width: "1rem", height: "1rem" }}
        />
        <span className="p-d-flex p-dir-col p-ml-2">
          {suggestion.name}
          <small
            style={{ fontSize: ".75rem", color: "var(--text-secondary-color)" }}
          >
            @{suggestion.email}
          </small>
        </span>
      </div>
    );
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
