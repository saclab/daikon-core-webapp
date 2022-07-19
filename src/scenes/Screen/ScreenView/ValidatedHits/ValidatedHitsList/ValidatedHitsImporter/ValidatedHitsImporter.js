import React, { useState, useContext } from "react";
import _ from "lodash";
import { CSVReader } from "react-papaparse";
import { observer } from "mobx-react-lite";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";

import { RootStoreContext } from "../../../../../../app/stores/rootStore";

const ValidatedHitsImporter = ({ screenId }) => {
  const [hits, setHits] = useState([]);
  const [displayCSVImporter, setDisplayCSVImporter] = useState(true);
  const [displayPreview, setDisplayPreview] = useState(false);
  const [displayImportContainer, setDisplayImportContainer] = useState(false);
  const [displaySummary, setdisplaySummary] = useState(false);
  const [importingLogs, setImportingLogs] = useState(null);
  const [successList, setSuccessList] = useState([]);
  const [failedList, setFailedList] = useState([]);


  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { newHit, postingHit } = rootStore.hitsStore;

  let handleOnError = (err, file, inputElem, reason) => {
    console.log("---------------------------");
    console.log(err);
    console.log("---------------------------");
  };

  let handleOnDrop = (data) => {
    console.log("---------------------------");
    console.log(data);

    console.log("---------------------------");
    var index = 1;
    data.forEach((hit) => {
      console.log(hit);



      hits.push({
        Index: index,
        ScreenId: screenId,
        Source: hit.data?.Source,
        Library: hit.data?.Library,
        ExternalCompoundIds: hit.data?.ExternalCompoundIds,
        IC50: _.toNumber(hit.data?.IC50) ? _.round(hit.data?.IC50, 2) : 0,
        Method: hit.data?.Method,
        MIC: _.toNumber(hit.data?.MIC) ? _.round(hit.data?.MIC, 2) : 0,
        ClusterGroup: hit.data?.ClusterGroup,
        Smile: hit.data?.Smile,
        MolWeight: hit.data?.MolWeight,
        MolArea: hit.data?.MolArea,
      });
      index = index + 1;
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

    console.log("Start Import")
    setDisplayCSVImporter(false);
    setDisplayPreview(false);
    setDisplayImportContainer(true);

    for (let i = 0; i < hits.length; i++) {
      let res = await newHit(hits[i]);
      if (res !== null) {
        setImportingLogs("Imported " + hits[i].ExternalCompoundIds);
        successList.push(hits[i].ExternalCompoundIds);
        console.log(successList);
      } else {
        setImportingLogs("Failed  " + hits[i].ExternalCompoundIds);
        setFailedList([...failedList, hits[i].ExternalCompoundIds])
        failedList.push(hits[i].ExternalCompoundIds);
      }
    }
    setdisplaySummary(true);
  };

  /* UI COmponents */

  let csvImporter = (
    <React.Fragment>
      <h2>Step 1 : CSV Import</h2>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        noDrag
        style={{}}
        config={{ header: true }}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <h1
          className="size-400 icon icon-fileformats icon-spacer"
          data-icon="c"
        ></h1>
        <h2>Select CSV Data source for Validated hits.</h2>
        <div className="card">
          The data should have the following headers:
          <br />
          <br />
          <Tag value="Source"></Tag> <Tag value="Library"></Tag>{" "}
          <Tag value="Method"></Tag> <Tag value="Id"></Tag>{" "}
          <Tag value="MIC"></Tag> <Tag value="ClusterGroup"></Tag>{" "}
          <Tag value="Smile"></Tag>{" "}
        </div>
      </CSVReader>
    </React.Fragment>
  );

  let dataPreview = (
    <React.Fragment>
      <h2>Step 2 : Data Preview</h2>
      <h3>Total hits found in CSV : {hits.length}</h3>{" "}
      <div className="card">
        <DataTable value={hits}>
          <Column field="Index" header="Index"></Column>
          <Column field="Source" header="Source"></Column>
          <Column field="Library" header="Library"></Column>
          <Column field="ExternalCompoundIds" header="Ids"></Column>
          <Column field="Method" header="Method"></Column>
          <Column field="MIC" header="MIC"></Column>
          <Column field="IC50" header="IC50"></Column>
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
      {postingHit && (
        <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
      )}
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
      {failedList.length !== 0 ? <p>Failed for {failedList.toString()}</p> : <p></p>} <br />
    </React.Fragment>
  );
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
