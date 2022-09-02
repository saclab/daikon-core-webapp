import React, { useState, useContext } from "react";
import _ from "lodash";
import { useCSVReader } from 'react-papaparse';
import { observer } from "mobx-react-lite";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Chip } from 'primereact/chip';


import { RootStoreContext } from "../../../../../../../app/stores/rootStore";

const ValidatedHitsImporter = ({ screenId }) => {

  const { CSVReader } = useCSVReader();


  const [hits, setHits] = useState([]);
  const [displayCSVImporter, setDisplayCSVImporter] = useState(true);
  const [displayPreview, setDisplayPreview] = useState(false);
  const [displayImportContainer, setDisplayImportContainer] = useState(false);
  const [displaySummary, setdisplaySummary] = useState(false);
  const [importingLogs, setImportingLogs] = useState(null);
  const [successList, setSuccessList] = useState([]);
  const [failedList, setFailedList] = useState([]);

  const styles = {
    csvReader: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 10,
    },
    browseFile: {
      width: '20%',
    },
    acceptedFile: {
      border: '1px solid #ccc',
      height: 45,
      lineHeight: 2.5,
      paddingLeft: 10,
      width: '80%',
    },
    remove: {
      borderRadius: 0,
      padding: '0 20px',
    },
    progressBarBackgroundColor: {
      backgroundColor: 'red',
    },
  };


  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { newHit, postingHit } = rootStore.hitsStore;

  let handleOnError = (err, file, inputElem, reason) => {
    console.log("---------------------------");
    console.log(err);
    console.log("---------------------------");
  };

  let handleOnDrop = (r) => {
    console.log("---------------------------");
    console.log(r.data);

    console.log("---------------------------");
    var index = 1;

    r.data.forEach((hit) => {
      console.log(hit);
      if (typeof (hit.Id) === 'undefined' || hit.Id === '') return;

      hits.push({
        Index: index,
        ScreenId: screenId,
        Source: hit?.Source,
        Library: hit?.Library,
        ExternalCompoundIds: hit?.Id,
        IC50: _.toNumber(hit?.IC50) ? _.round(hit?.IC50, 2) : 0,
        Method: hit?.Method,
        MIC: _.toNumber(hit?.MIC) ? _.round(hit?.MIC, 2) : 0,
        ClusterGroup: hit?.ClusterGroup,
        Smile: hit?.Smile,
        MolWeight: hit?.MolWeight,
        MolArea: hit?.MolArea,
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
      <h2>Step 1 : Import Validated Hits from CSV</h2>
      <CSVReader
        onUploadAccepted={(r) => handleOnDrop(r)}
        // onError={handleOnError}
        noDrag
        config={{ header: true }}
      // addRemoveButton
      // onRemoveFile={handleOnRemoveFile}
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
        }) => (
          <div className="flex flex-column justify-content-center gap-2 border-400 border-dashed border-round-md  border-1 m-2 p-3">
            <div className="flex align-items-center justify-content-center">
              <h1
                className="size-400 icon icon-fileformats icon-spacer"
                data-icon="c"
              ></h1>
            </div>
            <div className="flex align-items-center justify-content-center">
              {!acceptedFile ? <Button  className="w-max p-button-secondary pl-5 pr-5" type='button' {...getRootProps()}>
                Select CSV File to upload
              </Button> : acceptedFile.name}

            </div>
            <div className="flex" style={styles.progressBar}>
              <ProgressBar />
            </div>
            {!acceptedFile &&
              <div className="flex flex-column align-items-center justify-content-center gap-2">
                <div className="flex">
                  The CSV should contain the following headers:
                </div>
                <div className="flex gap-1">
                <Chip label="Source" />
                <Chip label="Library" />
                <Chip label="Method" />
                <Chip label="Id" />
                <Chip label="MIC" />
                <Chip label="IC50" />
                <Chip label="ClusterGroup" />
                <Chip label="Smile" />
                </div>
              </div>}
          </div>
        )}


      </CSVReader>
    </React.Fragment >
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
          <Column field="ExternalCompoundIds" header="Id"></Column>
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
