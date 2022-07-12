import React, { useRef, useState, useEffect } from "react";
import _ from "lodash";
import { ContextMenu } from "primereact/contextmenu";
import { StartCase } from "react-lodash";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Sidebar } from "primereact/sidebar";
import "./KeyValueList.css";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";

import {
  _helper_renderHistoryTimeline,
  _helper_renderFooterOfEditDialog,
  _helper_filterHilightChanged,
  _helper_renderHeaderofEditDialog,
  _helper_generateEditForm,
} from "./KeyValList_Helper";
import {
  _command_contextMenuCopyCommand,
  _command_contextMenuFetchHistoryCommand,
  _command_contextMenuHilightAllChangesCommand,
  _command_contextMenuHilightRecentChangesCommand,
  _command_contextMenuClearHilightsCommand,
  _command_contextMenuEditCommand,
} from "./KeyValList_Command";

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
  hideKey
}) => {
  const cm = useRef(null);
  const toast = useRef(null);

  const [selectedId, setSelectedId] = useState(null);
  const [displayEditContainer, setDisplayEditContainer] = useState(false);
  const [displayHistorySideBar, setDisplayHistorySideBar] = useState(false);

  const [hilightAllChanges, setHilightAllChanges] = useState(localStorage.getItem('_local_HilightAllChanges') || false);
  const [hilightRecentChanges, setHilightRecentChanges] = useState(localStorage.getItem('_local_HilightRecentChanges') || false);

  // const [hilightAllChanges, setHilightAllChanges] = useState(false);
  // const [hilightRecentChanges, setHilightRecentChanges] = useState(false);

  const [fetchHistoryCalled, setFetchHistoryCalled] = useState(false)

  let allChangedProperties = [];

  useEffect(() => {
    if (!fetchHistoryCalled &&
      (JSON.parse(localStorage.getItem('_local_HilightAllChanges'))
        || JSON.parse(localStorage.getItem('_local_HilightRecentChanges')))) {
      _.isFunction(fetchHistory) && fetchHistory();
      setFetchHistoryCalled(true)
    }

    return () => {

    }
  }, [fetchHistory, setFetchHistoryCalled])


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
        _command_contextMenuHilightRecentChangesCommand(
          fetchHistory,
          setHilightRecentChanges,
          setHilightAllChanges
        ),
    });
    contextMenuItems.push({
      label: "Highlight All Changes",
      icon: "ri-mark-pen-fill",
      command: () =>
        _command_contextMenuHilightAllChangesCommand(
          fetchHistory,
          setHilightRecentChanges,
          setHilightAllChanges
        ),
    });
    contextMenuItems.push({
      label: "Clear Highlights",
      icon: "ri-eraser-line",
      command: () =>
        _command_contextMenuClearHilightsCommand(
          setHilightAllChanges,
          setHilightRecentChanges
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
    console.log("ID")
    console.log(e)
    setSelectedId(e.target.id);
    cm.current.show(e);
  };

  let filterHilightChanged = (filterRecent = false) => {
    if (history !== null) {
      let changed = _helper_filterHilightChanged(data, history, filterRecent);
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

    if (hilightAllChanges) {
      if (historyDisplayLoading) {
        return <h3>Fetching..</h3>;
      }
      filterHilightChanged();
    }

    if (hilightRecentChanges) {
      if (historyDisplayLoading) {
        return <h3>Fetching..</h3>;
      }
      filterHilightChanged(true);
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
        (hilightAllChanges || hilightRecentChanges) &&
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
                ) : (
                  hideKey === true ? "" : <StartCase string={key} />
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
        blockScroll={true}
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
