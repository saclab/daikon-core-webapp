import React, { useState, useEffect, useContext } from "react";
import { CSVReader } from "react-papaparse";
import Loading from "../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const TargetAdminImporter = () => {
  const rootStore = useContext(RootStoreContext);

  const [loading, setLoading] = useState(false);
  const [statusText, setsSatusText] = useState("");
  const [dataFormatingStatus, setDataFormatingStatus] = useState(false);
  const [consolidatedDTO, setConsolidatedDTO] = useState([]);
  const [statusProps, setStatusProps] = useState({
    csvLength: 0,
    importTargetLength: 0,
    failedDTOs: [],
    succeedImport: 0,
    failedImpotrs: [],
  });

  //fetchGeneByAccessionNo
  const {
    fetchGeneByAccessionNo,
    getPromotionQuestions,
    promotionQuestionsRegistry,
  } = rootStore.geneStore;
  const { importTarget } = rootStore.targetStoreAdmin;

  useEffect(() => {
    if (promotionQuestionsRegistry.size === 0) {
      getPromotionQuestions();
    }
  }, [promotionQuestionsRegistry, getPromotionQuestions]);

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
    let failedForDTOs = [];
    console.log("---------------------------");
    console.log("DTO START");
    setLoading(true);

    for (let i = 0; i < data.length; i++) {
      let row = data[i].data;
      console.log(row);
      console.log("Fetching for " + row["Protein"]);

      setsSatusText("Preparing " + row["Protein"]);
      if (row["Protein"] === "") {
        continue;
      }

      let gene = await fetchGeneByAccessionNo(row["AccessionNo"]).catch((e) => {
        console.log("Cannot find gene", e);
      });

      console.log("gene");
      console.log(gene);

      if (typeof gene === "undefined") {
        failedForDTOs.push(row["AccessionNo"] + " in row " + i);
        continue;
      }

      let targetName = row["Protein"];

      let targetPromotionFormValue = {
        "2a1": { answer: row["2a1_r"], description: row["2a1_t"] },
        "2a1b": { answer: row["2a1b_r"], description: row["2a1b_t"] },
        "2a2": { answer: row["2a2_r"], description: row["2a2_t"] },
        "2a3a": { answer: row["2a3a_r"], description: row["2a3a_t"] },
        "2a3b": { answer: row["2a3b_r"], description: row["2a3b_t"] },
        "2a4a": { answer: row["2a4a_r"], description: row["2a4a_t"] },
        "2a4b": { answer: row["2a4b_r"], description: row["2a4b_t"] },
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
        "4a2a": { answer: row["4a2a_r"], description: row["4a2a_t"] },
        "4a2b": { answer: row["4a2b_r"], description: row["4a2b_t"] },
        "4a3a": { answer: row["4a3a_r"], description: row["4a3a_t"] },
        "4a3b": { answer: row["4a3b_r"], description: row["4a3b_t"] },
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
        "6a1": { answer: row["6a1_r"], description: row["6a1_t"] },
        "6a2": { answer: row["6a2_r"], description: row["6a2_t"] },
        "6a3": { answer: row["6a3_r"], description: row["6a3_t"] },
        "6a4": { answer: row["6a4_r"], description: row["6a4_t"] },
        "6a5": { answer: row["6a5_r"], description: row["6a5_t"] },
        "6a6": { answer: row["6a6_r"], description: row["6a6_t"] },
        "6a7": { answer: row["6a7_r"], description: row["6a7_t"] },
        "6b1": { answer: row["6b1_r"], description: row["6b1_t"] },
        "6b2": { answer: row["6b2_r"], description: row["6b2_t"] },
        "6b3": { answer: row["6b3_r"], description: row["6b3_t"] },
        "6b4": { answer: row["6b4_r"], description: row["6b4_t"] },
        "6b5": { answer: row["6b5_r"], description: row["6b5_t"] },
        "6c1": { answer: row["6c1_r"], description: row["6c1_t"] },
        "6c2": { answer: row["6c2_r"], description: row["6c2_t"] },
        "6c3": { answer: row["6c3_r"], description: row["6c3_t"] },
        "6c4": { answer: row["6c4_r"], description: row["6c4_t"] },
        "6c5": { answer: row["6c5_r"], description: row["6c5_t"] },
        "6d1": { answer: row["6d1_r"], description: row["6d1_t"] },
        "6d2": { answer: row["6d2_r"], description: row["6d2_t"] },
        "6d3": { answer: row["6d3_r"], description: row["6d3_t"] },
        "6d4": { answer: row["6d4_r"], description: row["6d4_t"] },
        "7a1": { answer: row["7a1_r"], description: row["7a1_t"] },
        "7a2": { answer: row["7a2_r"], description: row["7a2_t"] },
        "7b1": { answer: row["7b1_r"], description: row["7b1_t"] },
        "7b2": { answer: row["7b2_r"], description: row["7b2_t"] },
        "7c1": { answer: row["7c1_r"], description: row["7c1_t"] },
        "7c2": { answer: row["7c2_r"], description: row["7c2_t"] },
        "7d1": { answer: row["7d1_r"], description: row["7d1_t"] },
        "7d2": { answer: row["7d2_r"], description: row["7d2_t"] },
      };

      var dataObject = {
        targetName: row["Protein"],
        simpleProteinAccessionNumber: row["AccessionNo"],
        status: "imported",
        bucket: row["Bucket"] !== "" ? row["Bucket"] : "NA",
        impactScore: row["ImpactScore"] !== "" ? row["ImpactScore"] : "0.00",
        impactComplete:
          row["ImpactComplete"] !== "" ? row["ImpactComplete"] : "0.00",
        likeScore: row["LikeScore"] !== "" ? row["LikeScore"] : "0.00",
        likeComplete: row["LikeComplete"] !== "" ? row["LikeComplete"] : "0.00",
        screeningScore:
          row["ScreeningScore"] !== "" ? row["ScreeningScore"] : "0.00",
        screeningComplete:
          row["ScreeningComplete"] !== "" ? row["ScreeningComplete"] : "0.00",
        structureScore:
          row["StructureScore"] !== "" ? row["StructureScore"] : "0.00",
        structureComplete:
          row["StructureComplete"] !== "" ? row["StructureComplete"] : "0.00",
        vulnerabilityRatio:
          row["VulnerabilityRatio"] !== "" ? row["VulnerabilityRatio"] : "0.00",
        vulnerabilityRank:
          row["VulnerabilityRank"] !== "" ? row["VulnerabilityRank"] : "0.00",
        genePromotionRequestValues: [],
      };

      Object.keys(targetPromotionFormValue).map((key) => {
        dataObject.genePromotionRequestValues.push({
          questionId: promotionQuestionsRegistry.get(key).id,
          answer:
            targetPromotionFormValue[key].answer !== ""
              ? targetPromotionFormValue[key].answer
              : "NA",
          description: targetPromotionFormValue[key].description,
        });
      });

      consolidatedDTO.push(dataObject);
    }

    setStatusProps({
      ...statusProps,
      csvLength: data.length,
      importTargetLength: consolidatedDTO.length,
      failedDTOs: [...failedForDTOs],
    });

    setLoading(false);
    setDataFormatingStatus(true);
    setsSatusText(consolidatedDTO.length + " targets found");
    console.log("---------------------------");
    console.log("Failed DTOs");
    console.log(failedForDTOs);
    console.log("DTO END");

    console.log(statusProps.importTargetLength);
  };

  let importToServer = async () => {
    let failedDTOImports = [];
    console.log("Starting import");

    for (let i = 0; i < consolidatedDTO.length; i++) {
      let targetToImport = consolidatedDTO[i];
      setsSatusText("Importing " + targetToImport.geneName);
      console.log(targetToImport);
      await importTarget(targetToImport).catch((e) => {
        console.log("Cannot import", e);
        failedDTOImports.push(targetToImport.geneName);
      });
    }

    setStatusProps({
      ...statusProps,
      succeedImport: consolidatedDTO.length - failedDTOImports.length,
      failedImpotrs: failedDTOImports,
    });

    setsSatusText("Complete");
  };

  if (loading) {
    <Loading message="Preparing data transfer object" />;
  }

  let dataFormattingResults = (
    <Card title="Console" style={{ width: "70em" }}>
      No of targets in CSV = {statusProps.csvLength - 1} <br />
      No of targets that matched a gene in db = {statusProps.importTargetLength}
      <br />
      <div style={{ width: "60rem", overflowWrap: "anywhere" }}>
        Match not found for : {statusProps.failedDTOs.join()}
      </div>
      <br />
      <hr />
      <Button label="Import" onClick={() => importToServer()} />
      <br />
      <hr />
      No of targets imported to server = {statusProps.succeedImport} <br />
      <div style={{ width: "60rem", overflowWrap: "anywhere" }}>
        Failed for : {statusProps.failedImpotrs.join()}
      </div>
    </Card>
  );

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
      {dataFormatingStatus ? dataFormattingResults : ""}
    </div>
  );
};

export default observer(TargetAdminImporter);
