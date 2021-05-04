import React, { useRef, useState } from "react";
import { ContextMenu } from "primereact/contextmenu";
import { StartCase } from "react-lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Sidebar } from "primereact/sidebar";

import "./KeyValueList.css";

const KeyValList = ({ data, filter, link }) => {
  // console.log("KeyValList");
  // console.log(data);

  const cm = useRef(null);
  const toast = useRef(null);

  const [selectedId, setSelectedId] = useState(null);
  const [displayEditContainer, setDisplayEditContainer] = useState(false);
  const [displayHistorySideBar, setDisplayHistorySideBar] = useState(false);

  const items = [
    {
      label: "Fetch History",
      icon: "pi pi-backward",
      command: () => extractFetchHistoryId(),
    },
    {
      separator: true,
    },
    {
      label: "Edit",
      icon: "pi pi-tablet",
      command: () => editField(),
    },
    {
      label: "Copy",
      icon: "pi pi-copy",
      command: () => copyText(),
    },
  ];

  const openContextMenu = (e) => {
    console.log(e);
    setSelectedId(e.target.id);
    cm.current.show(e);
  };

  const res = Object.keys(data).map((key, value) => {
    let finalValue = data[key];
    if (typeof link !== "undefined") {
      if (key in link) {
        finalValue = <a href={link[key] + data[key]}>{data[key]}</a>;
      }
    }

    if (typeof filter === "undefined") {
      filter = Object.keys(data);
    }

    if (filter.includes(key)) {
      return (
        <tr key={key}>
          <td>
            <b>
              <StartCase string={key} />
            </b>
          </td>

          <td>
            <div id={key} onContextMenu={(e) => openContextMenu(e)}>
              {finalValue}
            </div>
          </td>
        </tr>
      );
    }
    return null;
  });

  const copyText = () => {
    // console.log(document.getSelection());
    // console.log(document.getSelection().anchorNode.data);
    // console.log(
    //   document
    //     .getSelection()
    //     .anchorNode.data.slice(
    //       document.getSelection().anchorOffset,
    //       document.getSelection().focusOffset
    //     )
    // );
    document.execCommand("copy");
  };

  const extractFetchHistoryId = () => {
    // toast.current.show({
    //   severity: "error",
    //   summary: "Read Only",
    //   detail: "The property is marked read only.",
    // });

    setDisplayHistorySideBar(true);
    console.log(selectedId);
    console.log(displayHistorySideBar);
  };

  const editField = () => {
    setDisplayEditContainer(true);
    console.log(selectedId);
  };

  const renderFooter = () => {
    return (
      <div>
        <h3>Save changes to database?</h3>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => console.log("Cancel")}
          className="p-button-text"
          autoFocus
        />
        <Button
          label="Save"
          icon="pi pi-check"
          onClick={() => console.log("Save")}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <Toast ref={toast} />
      <Sidebar
        visible={displayHistorySideBar}
        position="right"
        style={{width:'50%'}}
        onHide={() => setDisplayHistorySideBar(false)}
      >
        <h1>Edit History</h1>
        <h2>
          <StartCase string={selectedId} />
        </h2>
      </Sidebar>

      <Dialog
        header={"Editing Database"}
        visible={displayEditContainer}
        style={{ width: "50vw" }}
        onHide={() => setDisplayEditContainer(false)}
        footer={renderFooter()}
        draggable={true}
      >
        <h2>
          <StartCase string={selectedId} />
        </h2>
        <InputTextarea rows={15} cols={60} value={data[selectedId]} autoFocus />
      </Dialog>

      <ContextMenu model={items} ref={cm}></ContextMenu>
      <table className="KeyValueListTable">
        <tbody>{res}</tbody>
      </table>
    </React.Fragment>
  );
};

export default KeyValList;
