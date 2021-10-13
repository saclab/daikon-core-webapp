import React, { useState, useRef, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { RootStoreContext } from "../../../../../app/stores/rootStore";
import Loading from "../../../../../app/layout/Loading/Loading";

const ScreenSequence = ({ screenId }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { displayLoading, fetchScreen, selectedScreen } = rootStore.screenStore;
  useEffect(() => {
    fetchScreen(screenId);
  }, [fetchScreen]);

  if (displayLoading || selectedScreen === null) {
    return <Loading />;
  }

  if (!displayLoading && selectedScreen) {
    console.log(selectedScreen);
  }

  return (
    <div>
      <div className="card">
        <DataTable value={selectedScreen.screenSequences} >
          <Column field="library" header="Library"></Column>
          <Column field="method" header="Method"></Column>
          <Column field="protocol" header="Protocol"></Column>
          <Column field="scientist" header="Scientist"></Column>
          <Column field="startDate" header="Start Date"></Column>
          <Column field="endDate" header="End Date"></Column>
          <Column field="unverifiedHitCount" header="Hit Count"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default observer(ScreenSequence);
