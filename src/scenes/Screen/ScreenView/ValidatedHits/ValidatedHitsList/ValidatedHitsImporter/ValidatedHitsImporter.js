import React, { useState, useRef, useEffect, useContext } from "react";
import { CSVReader } from "react-papaparse";
import { observer } from "mobx-react-lite";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";

import { RootStoreContext } from "../../../../../../app/stores/rootStore";

const ValidatedHitsImporter = ({ screenId }) => {
  const [hits, setHits] = useState([]);
  const [displayCSVImporter, setDisplayCSVImporter] = useState(true);
  const [displayPreview, setDisplayPreview] = useState(false);
  const [displayImportContainer, setDisplayImportContainer] = useState(false);
  const [displaySummary, setdisplaySummary] = useState(false);
  const [importingLogs, setImportingLogs] = useState(null);
  let successList = [];
  let failedList = [];

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { newHit, postingHit } =
    rootStore.hitsStore;

  let handleOnError = (err, file, inputElem, reason) => {
    console.log("---------------------------");
    console.log(err);
    console.log("---------------------------");
  };

  let handleOnDrop = (data) => {
    console.log("---------------------------");
    console.log(data);

    console.log("---------------------------");

    data.forEach((hit) => {
      hits.push({
        ScreenId: screenId,
        Library: hit.data?.Library,
        SaccId: hit.data?.SaccId,
        IC50: hit.data?.IC50,
        Method: hit.data?.Method,
        MIC: hit.data?.MIC,
        ClusterGroup: hit.data?.ClusterGroup,
        Smile: hit.data?.Smile,
        MolWeight: hit.data?.MolWeight,
        MolArea: hit.data?.MolArea,
      });
    });
    console.log("Hits found : " + hits.length);
    setDisplayPreview(true);
    console.log(hits);
  };

  let handleOnRemoveFile = (data) => {
    setHits([]);
    setDisplayPreview(false);
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  let startImport = async () => {
    setDisplayCSVImporter(false);
    setDisplayPreview(false);
    setDisplayImportContainer(true);

    for (let i = 0; i < hits.length; i++) {
      let res = await newHit(hits[i]);
      if(res!== null) {
        setImportingLogs("Imported " + hits[i].SaccId)
        successList.push(hits[i].SaccId);
      }
      else {
        setImportingLogs("Failed  " + hits[i].SaccId)
        failedList.push(hits[i].SaccId);
      }
    }
    setdisplaySummary(true);
  };

  /* UI COmponents */

  let csvImporter = (
    <React.Fragment>
      <h2>Step 1 CSV Import</h2>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        noDrag
        style={{}}
        config={{ header: true }}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Select CSV Data Source for Validated Hits</span>
      </CSVReader>
      <hr />
    </React.Fragment>
  );

  let dataPreview = (
    <React.Fragment>
      <h2>Step 2 : Data Preview</h2>
      <h3>Total hits found in CSV : {hits.length}</h3>{" "}
      <div className="card">
        <DataTable value={hits}>
          <Column field="Library" header="Library"></Column>
          <Column field="SaccId" header="SaccId"></Column>
          <Column field="Method" header="Method"></Column>
          <Column field="MIC" header="MIC"></Column>
          <Column field="ClusterGroup" header="ClusterGroup"></Column>
          <Column field="Smile" header="Smile"></Column>
        </DataTable>
      </div>
      <hr />
    </React.Fragment>
  );

  let importButton = (
    <React.Fragment>
      <h2>Step 3 : Start Import</h2>
      <Button
        type="button"
        icon="icon icon-common icon-plus-circle"
        label="Import to App"
        className="p-button-large"
        style={{ height: "30px", margin: "5px" }}
        onClick={() => startImport()}
      />
    </React.Fragment>
  );

  let importContainer = (
    <React.Fragment>
      <h2>Step 4 : Importing...</h2>
      {postingHit && <ProgressBar mode="indeterminate" style={{ height: "6px" }} />}
      <p>{importingLogs}</p>
      <hr />
    </React.Fragment>
  );

  let summary = (
    <React.Fragment>
      <h2>Step 5 : Summary...</h2>
      <p>Transaction Complete</p>
      <br />
      Total identified in CSV : {hits.length} <br />
      Successfully Imported : {successList.length} <br />
      Failed : {failedList.length} <br />
      Failed for {failedList.toString()} <br />
    </React.Fragment>
  )
  return (
    <div>
      {displayCSVImporter && csvImporter}
      {displayPreview && dataPreview}
      {displayPreview && importButton}
      {displayImportContainer && importContainer}
      {displaySummary && summary}
    </div>
  );
};

export default observer(ValidatedHitsImporter);
