import JsonQuery from "json-query";
import _ from "lodash";
import { runInAction } from "mobx";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Timeline } from "primereact/timeline";
import React from "react";
import Loading from "../../layout/Loading/Loading";

export function _helper_renderHistoryTimeline(
  historyDisplayLoading,
  history,
  selectedId
) {
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
}

export function _helper_renderHeaderofEditDialog() {
  return (
    <React.Fragment>
      <i className="icon icon-common icon-database"></i> &nbsp; Editing Database
    </React.Fragment>
  );
}

export function _helper_renderFooterOfEditDialog(
  editFunc,
  cancelEdit,
  setDisplayEditContainer
) {
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
        icon="icon icon-common icon-database-submit"
        onClick={() => {
          editFunc();
          setDisplayEditContainer(false);
        }}
      />
    </div>
  );
}

export function _helper_filterHilightChanged(data, history, filterRecent) {
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

          return dateChanged.getTime() > Date.now() - 1 * 24 * 60 * 60 * 1000;
        },
      },
    }).value;
  }

  var changed = [];

  if (result === null) return changed;
  result.forEach((element) => {
    changed.push(_.camelCase(element.propertyName));
  });

  return changed;
}

export function _helper_generateEditForm(data, selectedId) {
  return (
    <React.Fragment>
      <InputTextarea
        rows={15}
        cols={60}
        value={data ? data[selectedId] : null}
        autoFocus
        onChange={(e) => {
          console.log(data[selectedId]);
          console.log(e.target.value);
          runInAction(() => (data[selectedId] = e.target.value));
        }}
      />
    </React.Fragment>
  );
}
