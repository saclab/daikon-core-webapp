import React, { useRef } from "react";
import { ContextMenu } from "primereact/contextmenu";
import { StartCase } from "react-lodash";
import "./KeyValueList.css";

const KeyValList = ({ data, filter, link }) => {
  // console.log("KeyValList");
  // console.log(data);

  const cm = useRef(null);
  let selectedId = null;

  const items = [
    {
      label: "Fetch History",
      icon: "pi pi-backward",
      command: () => extractFetchHistoryId()
    },
    {
      separator: true,
    },
    {
      label: "Edit",
      icon: "pi pi-tablet",
    },
    {
      label: "Copy",
      icon: "pi pi-copy",
      command: () => copyText()
    },
  ];

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
            <div id={key}>{finalValue}</div>
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
    console.log(selectedId);
  }

  return (
    <React.Fragment>
      <ContextMenu model={items} ref={cm}></ContextMenu>
      <table
        className="KeyValueListTable"
        onContextMenu={(e) => {
          console.log(e);
          selectedId = e.target.id;
          cm.current.show(e);
        }}
        aria-haspopup
      >
        <tbody>{res}</tbody>
      </table>
    </React.Fragment>
  );
};

export default KeyValList;
