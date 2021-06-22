import React from "react";
import Loading from "../../layout/Loading/Loading";
import JsonQuery from "json-query";
import { Timeline } from "primereact/timeline";
import { Button } from "primereact/button";
import _ from "lodash";

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




export function _helper_renderFooterOfEditDialog (editFunc, cancelEdit, setDisplayEditContainer) {
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