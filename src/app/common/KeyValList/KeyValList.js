import React, { useRef, useState, useEffect } from "react";
import _ from "lodash";
import { ContextMenu } from "primereact/contextmenu";
import { StartCase } from "react-lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Sidebar } from "primereact/sidebar";
import { ProgressSpinner } from "primereact/progressspinner";
import { Timeline } from "primereact/timeline";
import { Skeleton } from "primereact/skeleton";
import "./KeyValueList.css";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import JsonQuery from "json-query";
import Loading from "../../layout/Loading/Loading";

const KeyValList = ({
  data,
  filter,
  link,
  editFunc,
  cancelEdit,
  fetchHistory,
  historyDisplayLoading,
  history,
}) => {
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
      label: "Highlight Recent Changes",
      icon: "ri-mark-pen-line",
      command: () => extractFetchHistoryId(),
    },
    {
      label: "Highlight All Changes",
      icon: "ri-mark-pen-fill",
      command: () => extractFetchHistoryId(),
    },
    {
      label: "Clear Highlights",
      icon: "ri-eraser-line",
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

    fetchHistory();
    console.log("setDisplayHistorySideBar TRUE");
    setDisplayHistorySideBar(true);
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
          onClick={() => {
            cancelEdit();
            setDisplayEditContainer(false);
          }}
          className="p-button-text"
          autoFocus
        />
        <Button
          label="Save"
          icon="pi pi-check"
          onClick={() => {
            editFunc();
            setDisplayEditContainer(false);
          }}
        />
      </div>
    );
  };

  let generateHistory = () => {
    //fetchHistory()
    if (historyDisplayLoading) {
      return (
        <React.Fragment>
          <Loading />
        </React.Fragment>
      );
    } else {
      if (history !== null) {
        console.log("H I S T O R Y");
        let id = _.upperFirst(_.camelCase(selectedId));
        console.log(id);
        let query = "[*propertyName=" + id + "]";

        var result = JsonQuery(query, { data: history }).value;
        console.log(result);

        return (
          <div style={{ overflow: "auto", height: "90%" }}>
            <Timeline
              value={result}
              opposite={(result) => (
                <React.Fragment>
                  {result.newValue}
                  <hr style={{ borderTop: "1px LightGray" }} />
                </React.Fragment>
              )}
              content={(result) => (
                <React.Fragment>
                  <small className="p-text-secondary">
                    {new Date(result.dateChanged).toDateString()}
                  </small>
                  <br />
                  <small className="p-text-secondary">
                    {result.modifiedBy}
                  </small>
                </React.Fragment>
              )}
            />
          </div>
        );
      }
    }
  };

  return (
    <React.Fragment>
      <Toast ref={toast} />
      <Sidebar
        visible={displayHistorySideBar}
        position="right"
        style={{ width: "50%", overflowX: "auto" }}
        blockScroll={true}
        onHide={() => setDisplayHistorySideBar(false)}
      >
        <h1>History</h1>
        <h2>
          <StartCase string={selectedId} />
        </h2>
        {displayHistorySideBar && generateHistory()}
      </Sidebar>

      <Dialog
        header={"Editing Database"}
        visible={displayEditContainer}
        closable={false}
        draggable={true}
        style={{ width: "50vw" }}
        onHide={() => setDisplayEditContainer(false)}
        footer={renderFooter()}
      >
        <h2>
          <StartCase string={selectedId} />
        </h2>
        <InputTextarea
          rows={15}
          cols={60}
          value={data[selectedId]}
          autoFocus
          onChange={(e) =>
            runInAction(() => (data[selectedId] = e.target.value))
          }
        />
      </Dialog>

      <ContextMenu model={items} ref={cm}></ContextMenu>
      <table className="KeyValueListTable">
        <tbody>{res}</tbody>
      </table>
    </React.Fragment>
  );
};

export default observer(KeyValList);
