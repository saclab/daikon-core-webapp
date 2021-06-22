import React, { useRef, useState } from "react";
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
import JsonQuery from "json-query";
import {
  _helper_renderHistoryTimeline,
  _helper_renderFooterOfEditDialog,
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
  filter,
  link,
  editFunc,
  cancelEdit,
  fetchHistory,
  historyDisplayLoading,
  history,
}) => {
  const cm = useRef(null);
  const toast = useRef(null);

  const [selectedId, setSelectedId] = useState(null);
  const [displayEditContainer, setDisplayEditContainer] = useState(false);
  const [displayHistorySideBar, setDisplayHistorySideBar] = useState(false);

  const [hilightAllChanges, setHilightAllChanges] = useState(false);
  const [hilightRecentChanges, setHilightRecentChanges] = useState(false);

  let allChangedProperties = [];

  /* * * * * * *
  /* * * Begin construction context menu
  */
  const contextMenuItems = [];

  if (_.isFunction(fetchHistory)) {
    contextMenuItems.push({
      label: "Fetch History",
      icon: "pi pi-backward",
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
    setSelectedId(e.target.id);
    cm.current.show(e);
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
          <h2> History</h2>
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
        header={"Editing Database"}
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
