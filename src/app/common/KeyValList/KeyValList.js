import _ from "lodash";
import { observer } from "mobx-react-lite";
import { ContextMenu } from "primereact/contextmenu";
import { Dialog } from "primereact/dialog";
import { Sidebar } from "primereact/sidebar";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { StartCase } from "react-lodash";
import "./KeyValueList.css";

import {
  _command_contextMenuClearHighlightsCommand,
  _command_contextMenuCopyCommand,
  _command_contextMenuEditCommand,
  _command_contextMenuFetchHistoryCommand,
  _command_contextMenuHighlightAllChangesCommand,
  _command_contextMenuHighlightRecentChangesCommand,
} from "./KeyValList_Command";
import {
  _helper_filterHighlightChanged,
  _helper_generateEditForm,
  _helper_renderFooterOfEditDialog,
  _helper_renderHeaderofEditDialog,
  _helper_renderHistoryTimeline,
} from "./KeyValList_Helper";

const KeyValList = ({
  data,
  labels,
  filter,
  link,
  editFunc,
  cancelEdit,
  fetchHistory,
  historyDisplayLoading,
  history,
  formData,
  hideKey,
}) => {
  const cm = useRef(null);
  const toast = useRef(null);

  const [selectedId, setSelectedId] = useState(null);
  const [displayEditContainer, setDisplayEditContainer] = useState(false);
  const [displayHistorySideBar, setDisplayHistorySideBar] = useState(false);

  const [highlightAllChanges, setHighlightAllChanges] = useState(
    localStorage.getItem("_local_HighlightAllChanges") || false
  );
  const [highlightRecentChanges, setHighlightRecentChanges] = useState(
    localStorage.getItem("_local_HighlightRecentChanges") || false
  );

  // const [highlightAllChanges, setHighlightAllChanges] = useState(false);
  // const [highlightRecentChanges, setHighlightRecentChanges] = useState(false);

  const [fetchHistoryCalled, setFetchHistoryCalled] = useState(false);

  let allChangedProperties = [];

  useEffect(() => {
    if (
      !fetchHistoryCalled &&
      (JSON.parse(localStorage.getItem("_local_HighlightAllChanges")) ||
        JSON.parse(localStorage.getItem("_local_HighlightRecentChanges")))
    ) {
      _.isFunction(fetchHistory) && fetchHistory();
      setFetchHistoryCalled(true);
    }

    return () => {};
  }, [fetchHistory, setFetchHistoryCalled, fetchHistoryCalled]);

  /* * * * * * *
  /* * * Begin construction context menu
  */
  const contextMenuItems = [];

  if (_.isFunction(fetchHistory)) {
    contextMenuItems.push({
      label: "Fetch History",
      icon: "icon icon-common icon-history",
      command: () =>
        _command_contextMenuFetchHistoryCommand(
          fetchHistory,
          setDisplayHistorySideBar
        ),
    });
    contextMenuItems.push({
      separator: true,
    });
  }

  if (_.isFunction(fetchHistory)) {
    contextMenuItems.push({
      label: "Highlight Recent Changes",
      icon: "ri-mark-pen-line",
      command: () =>
        _command_contextMenuHighlightRecentChangesCommand(
          fetchHistory,
          setHighlightRecentChanges,
          setHighlightAllChanges
        ),
    });
    contextMenuItems.push({
      label: "Highlight All Changes",
      icon: "ri-mark-pen-fill",
      command: () =>
        _command_contextMenuHighlightAllChangesCommand(
          fetchHistory,
          setHighlightRecentChanges,
          setHighlightAllChanges
        ),
    });
    contextMenuItems.push({
      label: "Clear Highlights",
      icon: "ri-eraser-line",
      command: () =>
        _command_contextMenuClearHighlightsCommand(
          setHighlightAllChanges,
          setHighlightRecentChanges
        ),
    });
    contextMenuItems.push({
      separator: true,
    });
  }

  if (_.isFunction(editFunc)) {
    contextMenuItems.push({
      label: "Edit",
      icon: "pi pi-tablet",
      command: () => _command_contextMenuEditCommand(setDisplayEditContainer),
    });
    contextMenuItems.push({
      separator: true,
    });
  }

  contextMenuItems.push({
    label: "Copy",
    icon: "pi pi-copy",
    command: () => _command_contextMenuCopyCommand(selectedId, toast),
  });

  /*
  /* * * End construction context menu
  /* * * * * * */

  const openContextMenu = (e) => {
    setSelectedId(e.target.id);
    cm.current.show(e);
  };

  let filterHighlightChanged = (filterRecent = false) => {
    if (history !== null) {
      let changed = _helper_filterHighlightChanged(data, history, filterRecent);
      allChangedProperties = [];
      allChangedProperties = [...changed];
    }
  };

  /* * * * * * *
  /* * * Begin construction Key Value Main Body
  */

  const generateKeyValueTableBody = () => {
    if (!data) {
      return <h3>No Entries</h3>;
    }

    if (highlightAllChanges) {
      if (historyDisplayLoading) {
        return <h3>Fetching..</h3>;
      }
      filterHighlightChanged();
    }

    if (highlightRecentChanges) {
      if (historyDisplayLoading) {
        return <h3>Fetching..</h3>;
      }
      filterHighlightChanged(true);
    }

    let tBody = Object.keys(data).map((key, value) => {
      let finalValue = data[key] ? data[key] : "Not Available";
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

      if (
        (highlightAllChanges || highlightRecentChanges) &&
        allChangedProperties.includes(key)
      ) {
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
                {typeof labels !== "undefined" && labels[key] ? (
                  labels[key]
                ) : hideKey === true ? (
                  ""
                ) : (
                  <StartCase string={key} />
                )}
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

  /*
  /* * * End generate Key Value Main Body
  /* * * * * * */

  return (
    <React.Fragment>
      <Toast ref={toast} />
      <Sidebar
        visible={displayHistorySideBar}
        position="right"
        style={{ width: "50%", overflowX: "auto" }}
        onHide={() => setDisplayHistorySideBar(false)}
      >
        <div style={{ margin: "15px" }}>
          <h2>
            <i className="icon icon-common icon-history"></i> History
          </h2>
          <h1>
            <StartCase string={selectedId} />
          </h1>
          {displayHistorySideBar &&
            _helper_renderHistoryTimeline(
              historyDisplayLoading,
              history,
              selectedId
            )}
        </div>
      </Sidebar>

      <Dialog
        header={_helper_renderHeaderofEditDialog()}
        visible={displayEditContainer}
        closable={false}
        draggable={true}
        style={{ width: "50vw" }}
        onHide={() => setDisplayEditContainer(false)}
        footer={_helper_renderFooterOfEditDialog(
          editFunc,
          cancelEdit,
          setDisplayEditContainer
        )}
      >
        <h2>
          {typeof labels !== "undefined" && labels[selectedId] ? (
            labels[selectedId]
          ) : (
            <StartCase string={selectedId} />
          )}
        </h2>
        {_helper_generateEditForm(data, selectedId, formData)}
      </Dialog>

      <ContextMenu model={contextMenuItems} ref={cm}></ContextMenu>

      {generateKeyValueTableBody()}
    </React.Fragment>
  );
};

export default observer(KeyValList);
