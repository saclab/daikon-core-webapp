import _ from "lodash";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Fieldset } from "primereact/fieldset";
import { ProgressBar } from "primereact/progressbar";
import React, { useContext, useState } from "react";
import { useCSVReader } from "react-papaparse";

import { RootStoreContext } from "../../../../../../../app/stores/rootStore";

const ValidatedHitsImporter = ({ screenId, existingHits }) => {
  const { CSVReader } = useCSVReader();
  const [hits, setHits] = useState([]);
  const [hitsToUpdate, setHitsToUpdate] = useState([]);
  const [hitsToAdd, setHitsToAdd] = useState([]);
  const [displayCSVImporter, setDisplayCSVImporter] = useState(true);
  const [displayPreview, setDisplayPreview] = useState(false);
  const [displayImportContainer, setDisplayImportContainer] = useState(false);
  const [displaySummary, setDisplaySummary] = useState(false);
  const [importingLogs, setImportingLogs] = useState(null);
  const [successList, setSuccessList] = useState([]);
  const [failedList, setFailedList] = useState([]);

  let existingHitCompoundIds = [
    ...existingHits.map((hit) => hit.compound.externalCompoundIds),
  ];

  const styles = {
    csvReader: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 10,
    },
    browseFile: {
      width: "20%",
    },
    acceptedFile: {
      border: "1px solid #ccc",
      height: 45,
      lineHeight: 2.5,
      paddingLeft: 10,
      width: "80%",
    },
    remove: {
      borderRadius: 0,
      padding: "0 20px",
    },
    progressBarBackgroundColor: {
      backgroundColor: "red",
    },
  };

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { newHit, postingHit, updateHit, updatingHit } = rootStore.hitsStore;

  let handleOnError = (err, file, inputElem, reason) => {
    console.error(err);
  };

  let handleOnDrop = (r) => {
    var index = 1;

    console.log("handleOnDrop");

    r.data.forEach((hit) => {
      console.log(hit);
      // Return if Id is empty
      if (typeof hit.Id === "undefined" || hit.Id === "") return;

      // Mod, no longer the case: IC50 and MIC are defined as double in the backend
      // convert to double and round to 2 decimal places
      // hit.IC50 = _.toNumber(hit?.IC50) ? _.round(hit?.IC50, 2) : 0;
      // hit.MIC = _.toNumber(hit?.MIC) ? _.round(hit?.MIC, 2) : 0;

      // As members are expressing both IC50 and MIC in ranges or using > or <
      // We have to store them as strings
      hit.IC50 = typeof hit.IC50 !== "undefined" ? hit.IC50 : "0";
      hit.MIC = typeof hit.MIC !== "undefined" ? hit.MIC : "0";

      // MolWeight and MolArea are defined as string in the backend
      // convert to double and round to 2 decimal places and convert back to string

      hit.MolWeight = _.toNumber(hit?.molWeight)
        ? parseFloat(hit.molWeight).toFixed(2).toString()
        : "0";

      hit.MolArea = _.toNumber(hit?.molArea)
        ? parseFloat(hit.molArea).toFixed(2).toString()
        : "0";

      // ClusterGroup is defined as int in the backend
      hit.ClusterGroup = _.toNumber(hit?.ClusterGroup)
        ? parseInt(hit.ClusterGroup)
        : 0;

      // separate new hits and hits to update
      if (existingHitCompoundIds.includes(hit.Id)) {
        // check if any params have changed
        let existingHit = existingHits.filter(
          (eh) => eh.compound.externalCompoundIds === hit.Id
        )[0];

        // using != instead of !== as type comparison is not required

        // existingHit.iC50 = _.toNumber(existingHit?.iC50)
        //   ? _.round(existingHit?.iC50, 2)
        //   : 0;
        // existingHit.mic = _.toNumber(existingHit?.mic)
        //   ? _.round(existingHit?.mic, 2)
        //   : 0;

        existingHit.iC50 =
          typeof existingHit.iC50 !== "undefined" ? existingHit.iC50 : "0";
        existingHit.mic =
          typeof existingHit.mic !== "undefined" ? existingHit.mic : "0";

        existingHit.clusterGroup = _.toNumber(existingHit?.clusterGroup)
          ? parseInt(existingHit.clusterGroup)
          : 0;

        console.log("existingHit", existingHit);

        if (
          existingHit.clusterGroup !== hit.ClusterGroup ||
          existingHit.iC50 !== hit.IC50 ||
          existingHit.mic !== hit.MIC
        ) {
          index = index + 1;
          hitsToUpdate.push({
            Id: existingHit.id,
            Index: index,
            ScreenId: screenId,
            Source: hit?.Source,
            Library: hit?.Library,
            ExternalCompoundIds: hit?.Id,
            IC50: hit.IC50,
            Method: hit?.Method,
            MIC: hit.MIC,
            ClusterGroup: hit.ClusterGroup,
            Smile: hit?.Smile,
            MolWeight: hit.MolWeight,
            MolArea: hit.MolArea,
            Status: "Update",
          });
        }
      } else {
        // push to new hits list
        index = index + 1;
        hitsToAdd.push({
          Index: index,
          ScreenId: screenId,
          Source: hit?.Source,
          Library: hit?.Library,
          ExternalCompoundIds: hit?.Id,
          IC50: hit.IC50,
          Method: hit?.Method,
          MIC: hit.MIC,
          ClusterGroup: hit.ClusterGroup,
          Smile: hit?.Smile,
          MolWeight: hit.MolWeight,
          MolArea: hit.MolArea,
          Status: "New",
        });
      }
    });

    setHits([...hitsToAdd, ...hitsToUpdate]);

    setDisplayPreview(true);
  };

  let handleOnRemoveFile = (data) => {
    setHits([]);
    setDisplayPreview(false);
  };

  let startImport = async () => {
    setDisplayCSVImporter(false);
    setDisplayPreview(false);
    setDisplayImportContainer(true);

    // New Hits
    for (let i = 0; i < hitsToAdd.length; i++) {
      let res = await newHit(hitsToAdd[i]);
      if (res !== null) {
        setImportingLogs("Imported " + hitsToAdd[i].ExternalCompoundIds);
        successList.push(hitsToAdd[i].ExternalCompoundIds);
      } else {
        setImportingLogs("Failed  " + hitsToAdd[i].ExternalCompoundIds);
        setFailedList([...failedList, hitsToAdd[i].ExternalCompoundIds]);
        failedList.push(hitsToAdd[i].ExternalCompoundIds);
      }
    }

    // Update Hits
    for (let i = 0; i < hitsToUpdate.length; i++) {
      let res = await updateHit(hitsToUpdate[i]);
      if (res !== null) {
        setImportingLogs("Updated " + hitsToUpdate[i].ExternalCompoundIds);
        successList.push(hitsToUpdate[i].ExternalCompoundIds);
      } else {
        setImportingLogs("Failed  " + hitsToUpdate[i].ExternalCompoundIds);
        setFailedList([...failedList, hitsToUpdate[i].ExternalCompoundIds]);
        failedList.push(hitsToUpdate[i].ExternalCompoundIds);
      }
    }

    setDisplaySummary(true);
  };

  /* UI COmponents */

  let csvImporter = (
    <React.Fragment>
      <Fieldset legend="Step 1 : Import Validated Hits from CSV">
        {/* <h2>Step 1 : Import Validated Hits from CSV</h2> */}
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
                {!acceptedFile ? (
                  <Button
                    className="w-max p-button-secondary pl-5 pr-5"
                    type="button"
                    {...getRootProps()}
                  >
                    Select CSV File to upload
                  </Button>
                ) : (
                  acceptedFile.name
                )}
              </div>
              <div className="flex" style={styles.progressBar}>
                <ProgressBar />
              </div>
              {!acceptedFile && (
                <div className="flex flex-column align-items-center justify-content-center gap-2">
                  <div className="flex">
                    The CSV should contain the following headers:
                  </div>
                  <div className="flex gap-1">
                    <Chip label="SMILES" />
                    <Chip label="Library" />
                    <Chip label="Source" />
                    <Chip label="Id" />
                    <Chip label="MIC" />
                    <Chip label="IC50" />
                    <Chip label="ClusterGroup" />
                    <Chip label="Method" />
                    <Chip label="MolWeight" />
                    <Chip label="MolArea" />
                  </div>
                </div>
              )}
            </div>
          )}
        </CSVReader>
      </Fieldset>
      <br />
    </React.Fragment>
  );

  let dataPreview = (
    <React.Fragment>
      <Fieldset legend="Step 2 : Data Preview">
        {/* <h2>Step 2 : Data Preview</h2> */}
        {/* <h4>Total hits found in CSV : {hits.length}</h4>{" "} */}
        <div className="card">
          <DataTable value={hits}>
            <Column field="Index" header="Index"></Column>
            <Column field="Status" header="Status"></Column>
            <Column field="Source" header="Source"></Column>
            <Column field="Library" header="Library"></Column>
            <Column field="ExternalCompoundIds" header="Id"></Column>
            <Column field="Method" header="Method"></Column>
            <Column field="MIC" header="MIC"></Column>
            <Column field="IC50" header="IC50"></Column>
            <Column field="ClusterGroup" header="ClusterGroup"></Column>
            <Column field="Smile" header="Smiles"></Column>
          </DataTable>
        </div>
      </Fieldset>
      <br />
    </React.Fragment>
  );

  let importButton = (
    <React.Fragment>
      <Fieldset legend="Step 3 : Start Import">
        <Button
          type="button"
          icon="icon icon-common icon-plus-circle"
          label="Import to App"
          className="p-button-large"
          style={{ height: "40px", margin: "5px" }}
          onClick={() => startImport()}
        />
      </Fieldset>
    </React.Fragment>
  );

  let importContainer = (
    <React.Fragment>
      <Fieldset legend="Step 4 : Import Status">
        {(postingHit || updatingHit) && (
          <React.Fragment>
            <h2>Step 4 : Importing...</h2>
            <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
            <p>{importingLogs}</p>
            <hr />
          </React.Fragment>
        )}
      </Fieldset>
      <br />
    </React.Fragment>
  );

  let summary = (
    <React.Fragment>
      <Fieldset legend="Step 5 : Summary">
        <div className="flex flex-column align-items-center justify-content-center gap-2">
          <div className="flex gap-3">
            <h2>
              <i class="icon icon-common icon-compare"></i> Transaction Complete
            </h2>
          </div>
          <div className="flex gap-1">
            <Chip label="Total identified in CSV" />
            <Chip label={hits.length} />
          </div>
          <div className="flex gap-1">
            <Chip label="Successfully Imported" />
            <Chip label={successList.length} />
          </div>
          <div className="flex gap-1">
            <Chip label="Failed" />
            <Chip label={failedList.length ? failedList.length : "0"} />
          </div>
          {failedList.length !== 0 && (
            <div className="flex gap-1">
              <Chip label="Failed for" />
              <Chip label={failedList.toString()} />
            </div>
          )}
        </div>
      </Fieldset>
      <br />
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
