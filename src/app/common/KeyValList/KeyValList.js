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
import { Chip } from "primereact/chip";

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
  // //console.log("KeyValList");
  // //console.log(data);

  const cm = useRef(null);
  const toast = useRef(null);

  const [selectedId, setSelectedId] = useState(null);
  const [displayEditContainer, setDisplayEditContainer] = useState(false);
  const [displayHistorySideBar, setDisplayHistorySideBar] = useState(false);

  const [hilightAllChanges, setHilightAllChanges] = useState(false);
  const [hilightRecentChanges, setHilightRecentChanges] = useState(false);

  let allChangedProperties = [];

  /* Begin construction context menu */
  const contextMenuItems = [];

  if (_.isFunction(fetchHistory)) {
    contextMenuItems.push({
      label: "Fetch History",
      icon: "pi pi-backward",
      command: () => contextMenuFetchHistoryCommand(),
    });
    contextMenuItems.push({
      separator: true,
    });
  }

  if (_.isFunction(fetchHistory)) {
    contextMenuItems.push({
      label: "Highlight Recent Changes",
      icon: "ri-mark-pen-line",
      command: () => contextMenuHilightRecentChangesCommand(),
    });
    contextMenuItems.push({
      label: "Highlight All Changes",
      icon: "ri-mark-pen-fill",
      command: () => contextMenuHilightAllChangesCommand(),
    });
    contextMenuItems.push({
      label: "Clear Highlights",
      icon: "ri-eraser-line",
      command: () => contextMenuClearHilightsCommand(),
    });
    contextMenuItems.push({
      separator: true,
    });
  }

  if (_.isFunction(editFunc)) {
    contextMenuItems.push({
      label: "Edit",
      icon: "pi pi-tablet",
      command: () => contextMenuEditCommand(),
    });
    contextMenuItems.push({
      separator: true,
    });
  }

  contextMenuItems.push({
    label: "Copy",
    icon: "pi pi-copy",
    command: () => contextMenuCopyCommand(),
  });

  /* End construction context menu */

  const openContextMenu = (e) => {
    ////console.log(e);
    setSelectedId(e.target.id);
    //console.log("Context Menu setSelectedId to " + e.target.id);
    cm.current.show(e);
  };

  const generateKeyValueTableBody = () => {
    if (!data) {
      return <h3>No Entries</h3>;
    }

    if (hilightAllChanges) {
      if (historyDisplayLoading) {
        return <h3>Fetching..</h3>;
      }
      filterHilightAllChanged();
    }

    if (hilightRecentChanges) {
      if (historyDisplayLoading) {
        return <h3>Fetching..</h3>;
      }
      filterHilightAllChanged(true);
    }

    let tBody = Object.keys(data).map((key, value) => {
      let finalValue = data[key];
      if (typeof link !== "undefined") {
        if (key in link) {
          finalValue = (
            <React.Fragment>
              {data[key]}
              <a href={link[key] + data[key]} target="_blank" rel="noreferrer">
                {" "}
                [<i className="ri-link"></i>]
              </a>
              ;
            </React.Fragment>
          );
        }
      }

      if ((hilightAllChanges || hilightRecentChanges) && allChangedProperties.includes(key)) {
        finalValue = <mark id={key}>{finalValue}</mark>;
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

    return (
      <table className="KeyValueListTable">
        <tbody>{tBody}</tbody>
      </table>
    );
  };

  const contextMenuCopyCommand = () => {
    // Check if selection is empty, then copy whole block
    // else copy default browser selection
    if (
      document
        .getSelection()
        .anchorNode.data.slice(
          document.getSelection().anchorOffset,
          document.getSelection().focusOffset
        ) === ""
    ) {
      var range = document.createRange();
      try {
        range.selectNode(document.getElementById(selectedId));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges(); // to deselect
        toast.current.show({
          severity: "success",
          summary: "Copied to clipboard",
          life: 3000,
        });
      } catch {
        //console.log("cannot copy object");
        toast.current.show({
          severity: "error",
          summary: "Cannot copy objects without underlying text.",
          life: 3000,
        });
      }
    } else {
      document.execCommand("copy");
      toast.current.show({
        severity: "success",
        summary: "Copied to clipboard",
        life: 3000,
      });
    }
  };

  const contextMenuFetchHistoryCommand = () => {
    // toast.current.show({
    //   severity: "error",
    //   summary: "Read Only",
    //   detail: "The property is marked read only.",
    // });
    fetchHistory();
    //console.log("setDisplayHistorySideBar TRUE");
    setDisplayHistorySideBar(true);
  };

  const contextMenuHilightAllChangesCommand = () => {
    //console.log("contextMenuHilightAllChangesCommand() Start");
    fetchHistory();
    setHilightRecentChanges(false);
    setHilightAllChanges(true);
  };

  const contextMenuHilightRecentChangesCommand = () => {
    //console.log("contextMenuHilightAllChangesCommand() Start");
    fetchHistory();
    setHilightAllChanges(false);
    setHilightRecentChanges(true);
  };

  let filterHilightAllChanged = (filterRecent = false) => {
    console.log("filterHilightAllChanged() Start");
    if (history !== null) {
      //console.log("filterHilightAllChanged() Processing");
      let query = "[*primaryKeyValue=" + data.id + "]";
      let result = JsonQuery(query, { data: history }).value;

      query = "[*oldValue > 1]";
      result = JsonQuery(query, { data: result }).value;

      if (filterRecent) {
        query = "[*:recentlyUpdated]";
        result = JsonQuery(query, {
          data: result,
          locals: {
            recentlyUpdated: (item) => {
              let dateChanged = new Date(Date.parse(item.dateChanged));

              return (
                dateChanged.getTime() > Date.now() - 1 * 24 * 60 * 60 * 1000
              );
            },
          },
        }).value;
      }

      var changed = [];
      result.forEach((element) => {
        changed.push(_.camelCase(element.propertyName));
      });
      allChangedProperties = [];
      allChangedProperties = [...changed];

      console.log(result);
    }
    //console.log(allChangedProperties);
    //console.log("filterHilightAllChanged() End");
  };

  const contextMenuClearHilightsCommand = () => {
    //console.log("contextMenuClearHilightsCommand() Start");
    setHilightAllChanges(false);
    setHilightRecentChanges(false);
  };

  const contextMenuEditCommand = () => {
    setDisplayEditContainer(true);
    //console.log(selectedId);
  };

  const renderFooterOfEditDialog = () => {
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

  let renderHistoryTimeline = () => {
    if (historyDisplayLoading) {
      return (
        <React.Fragment>
          <Loading />
        </React.Fragment>
      );
    } else {
      if (history !== null) {
        //console.log("Selected iD :" + selectedId);
        let historyId = _.upperFirst(_.camelCase(selectedId));
        //console.log("historyID :" + historyId);
        let historyQuery = "[*propertyName=" + historyId + "]";
        let historyResult = JsonQuery(historyQuery, { data: history }).value;

        //console.log(historyResult);

        if (_.isEmpty(historyResult)) {
          return (
            <React.Fragment>
              <p>No records found</p>
            </React.Fragment>
          );
        }

        return (
          <div style={{ overflow: "auto", height: "90%" }}>
            <Timeline
              value={historyResult}
              opposite={(historyResult) => (
                <React.Fragment>
                  {historyResult.newValue}
                  <hr style={{ borderTop: "1px LightGray" }} />
                </React.Fragment>
              )}
              content={(historyResult) => (
                <React.Fragment>
                  <small className="p-text-secondary">
                    {new Date(historyResult.dateChanged).toDateString()}
                  </small>
                  <br />
                  <small className="p-text-secondary">
                    {historyResult.modifiedBy}
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
        <div style={{ margin: "15px" }}>
          <h2> History</h2>
          <h1>
            <StartCase string={selectedId} />
          </h1>
          {displayHistorySideBar && renderHistoryTimeline()}
        </div>
      </Sidebar>

      <Dialog
        header={"Editing Database"}
        visible={displayEditContainer}
        closable={false}
        draggable={true}
        style={{ width: "50vw" }}
        onHide={() => setDisplayEditContainer(false)}
        footer={renderFooterOfEditDialog()}
      >
        <h2>
          <StartCase string={selectedId} />
        </h2>
        <InputTextarea
          rows={15}
          cols={60}
          value={data ? data[selectedId] : null}
          autoFocus
          onChange={(e) =>
            runInAction(() => (data[selectedId] = e.target.value))
          }
        />
      </Dialog>

      <ContextMenu model={contextMenuItems} ref={cm}></ContextMenu>

      {generateKeyValueTableBody()}
    </React.Fragment>
  );
};

export default observer(KeyValList);
