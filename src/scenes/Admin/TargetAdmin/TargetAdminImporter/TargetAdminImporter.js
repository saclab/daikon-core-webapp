import React, { useState, useRef, useEffect, useContext } from "react";
import { CSVReader } from "react-papaparse";
import Loading from "../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";

const TargetAdminImporter = () => {
  const rootStore = useContext(RootStoreContext);

  const [loading, setLoading] = useState(false);
  const [statusText, setsSatusText] = useState("");
  const [dataFormatingStatus, setDataFormatingStatus] = useState(false);
  const [consolidatedDTO, setConsolidatedDTO] = useState([]);

  //fetchGeneByAccessionNo
  const { fetchGeneByAccessionNo, getPromotionQuestions, promotionQuestionsRegistry } = rootStore.geneStore;
  const { importTarget, displayLoading } = rootStore.targetStoreAdmin;


  
  useEffect(() => {
    if (promotionQuestionsRegistry.size === 0) {
      getPromotionQuestions();
    }
  }, [
    promotionQuestionsRegistry,
    getPromotionQuestions,
  ]);

  let handleOnError = (err, file, inputElem, reason) => {
    console.log("---------------------------");
    console.log(err);
    console.log("---------------------------");
  };

  let handleOnDrop = (data) => {
    setLoading(true);

    console.log("---------------------------");
    console.log(data);
    dto(data);

    console.log("---------------------------");
  };

  let handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
    setDataFormatingStatus(false);
  };

  let dto = async (data) => {
    console.log("---------------------------");
    console.log("DTO START");
    setLoading(true);

    for (let i = 0; i < data.length; i++) {
      let row = data[i].data;
      console.log(row);
      console.log("Fetching for " + row["1b"]);

      setsSatusText("Preparing " + row["1b"]);
      if (row["1b"] === "") {
        continue;
      }

      let gene = await fetchGeneByAccessionNo(row["1b"]).catch((e) => {
        console.log("Cannot find gene", e);
      });

      console.log("gene");
      console.log(gene);

      if (typeof gene === "undefined") continue;

      let geneID = gene.id;

      let targetPromotionFormValue = {
        "2a1": { answer: row["2a1_r"], description: row["2a1_t"] },
        "2a1b": {
          answer: row["2a1b_r"],
          description: row["2a1b_t"],
        },
        "2a2": { answer: row["2a2_r"], description: row["2a2_t"] },
        "2a3a": {
          answer: row["2a3a_r"],
          description: row["2a3a_t"],
        },
        "2a3b": {
          answer: row["2a3b_r"],
          description: row["2a3b_t"],
        },
        "2a4a": {
          answer: row["2a4a_r"],
          description: row["2a4a_t"],
        },
        "2a5": { answer: row["2a5_r"], description: row["2a5_t"] },
        "2b1": { answer: row["2b1_r"], description: row["2b1_t"] },
        "2b2": { answer: row["2b2_r"], description: row["2b2_t"] },
        "2b4": { answer: row["2b4_r"], description: row["2b4_t"] },
        "2c1": { answer: row["2c1_r"], description: row["2c1_t"] },
        "2c2": { answer: row["2c2_r"], description: row["2c2_t"] },
        "2c3": { answer: row["2c3_r"], description: row["2c3_t"] },
        "2c4": { answer: row["2c4_r"], description: row["2c4_t"] },
        "2c5": { answer: row["2c5_r"], description: row["2c5_t"] },
        "3a1": { answer: row["3a1_r"], description: row["3a1_t"] },
        "3a2": { answer: row["3a2_r"], description: row["3a2_t"] },
        "3a3": { answer: row["3a3_r"], description: row["3a3_t"] },
        "3a4": { answer: row["3a4_r"], description: row["3a4_t"] },
        "3b1": { answer: row["3b1_r"], description: row["3b1_t"] },
        "3b2": { answer: row["3b2_r"], description: row["3b2_t"] },
        "4a1": { answer: row["4a1_r"], description: row["4a1_t"] },
        "4a2a": {
          answer: row["4a2a_r"],
          description: row["4a2a_t"],
        },
        "4a2b": {
          answer: row["4a2b_r"],
          description: row["4a2b_t"],
        },
        "4a3a": {
          answer: row["4a3a_r"],
          description: row["4a3a_t"],
        },
        "4a3b": {
          answer: row["4a3b_r"],
          description: row["4a3b_t"],
        },
        "4a4": { answer: row["4a4_r"], description: row["4a4_t"] },
        "4b1": { answer: row["4b1_r"], description: row["4b1_t"] },
        "4b2": { answer: row["4b2_r"], description: row["4b2_t"] },
        "4b3": { answer: row["4b3_r"], description: row["4b3_t"] },
        "4c1": { answer: row["4c1_r"], description: row["4c1_t"] },
        "4c2": { answer: row["4c2_r"], description: row["4c2_t"] },
        "4c3": { answer: row["4c3_r"], description: row["4c3_t"] },
        "4c4": { answer: row["4c4_r"], description: row["4c4_t"] },
        "4c5": { answer: row["4c5_r"], description: row["4c5_t"] },
        "5a1": { answer: row["5a1_r"], description: row["5a1_t"] },
        "5a2": { answer: row["5a2_r"], description: row["5a2_t"] },
        "5a3": { answer: row["5a3_r"], description: row["5a3_t"] },
        "5b1": { answer: row["5b1_r"], description: row["5b1_t"] },
      };

      var dataObject = {
        geneID: geneID,
        geneName: row["1b"],
        status: "imported",
        bucket: row["Bucket"],
        genePromotionRequestValues: []
      };

      Object.keys(targetPromotionFormValue).map((key) => {
        dataObject.genePromotionRequestValues.push({
          questionId: promotionQuestionsRegistry.get(key).id,
          answer: targetPromotionFormValue[key].answer,
          description: targetPromotionFormValue[key].description,
        });
      });

      consolidatedDTO.push(dataObject);
    }

    setLoading(false);
    setDataFormatingStatus(true);
    setsSatusText(consolidatedDTO.length + " targets found");
    console.log("---------------------------");
    console.log("DTO END");
  };

  let importToServer = async () => {
    console.log("Starting import");
    console.log(consolidatedDTO);

    for (let i = 0; i < consolidatedDTO.length; i++) {
      let targetToImport = consolidatedDTO[i];
      setsSatusText("Importing " + targetToImport.geneName);
      console.log(targetToImport);
      await importTarget(targetToImport).catch((e) => {
        console.log("Cannot import", e);
      });
    }
    setsSatusText("Complete");
  };

  if (loading) {
    <Loading message="Preparing data transfer object" />;
  }

  return (
    <div>
      <h2>Importer</h2>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        noDrag
        style={{}}
        config={{ header: true }}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Select CSV Data Source for Targets</span>
      </CSVReader>
      <br />
      {statusText} <br />
      <br />
      {dataFormatingStatus ? (
        <Button label="Import" onClick={() => importToServer()} />
      ) : (
        ""
      )}
    </div>
  );
};

export default observer(TargetAdminImporter);
