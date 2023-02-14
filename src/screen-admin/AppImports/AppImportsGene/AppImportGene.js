import { observer } from "mobx-react-lite";
import React, { useContext, useRef, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { ScrollPanel } from "primereact/scrollpanel";
import { Toast } from "primereact/toast";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading/Loading";
import { BreadCrumb } from "primereact/breadcrumb";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import { appColors } from "../../../colors";
import { Card } from "primereact/card";
import EmbededHelp from "../../../app/common/EmbededHelp/EmbededHelp";
import PleaseWait from "../../../app/common/PleaseWait/PleaseWait";

const AppImportGene = () => {
  const rootStore = useContext(RootStoreContext);
  const { createGene, creatingGene } = rootStore.geneStore;

  const navigate = useNavigate();
  const [dislayText, setDisplayText] = useState("");
  const [genesToUpload, setGenesToUpload] = useState([]);

  const toast = useRef(null);
  const onUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      try {
        const jsonContent = JSON.parse(e.target.result);
        parseData(jsonContent);
      } catch (e) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Invalid JSON file",
          life: 3000,
        });
        return;
      }
    };
  };

  const parseData = (geneData) => {
    console.log(geneData.length);
    setDisplayText(dislayText + "Found " + geneData.length + " genes in the file");
    setGenesToUpload(geneData);



  };

  const uploadToServer = () => {
    if (genesToUpload.length === 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No genes to upload. Please select a JSON file first.",
        life: 3000,
      });
      return;
    }

    genesToUpload.forEach((gene) => {
      console.log(gene);
      setDisplayText("Uploading " + gene.geneName + " to server");
      createGene(gene).then(() => {
        setDisplayText("Complete...");
      })
    });
  }

  const breadCrumbItems = [
    {
      label: "App Imports",
      command: () => {
        navigate("/admin/app-imports/");
      },
    },
    {
      label: "Gene",
      command: () => {
        navigate(`/admin/app-imports/genes/`);
      },
    },
  ];

  return (
    <React.Fragment>
      <Toast ref={toast}></Toast>

      <div className="flex flex-column gap-2 w-full">
        <div className="flex w-full pb-2">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-common icon-snowflake"
            heading={"GENE IMPORTER"}
          />
        </div>

        <div className="flex w-full">
          <Card title="Upload Genes from JSON File">
            <EmbededHelp>
              {" "}
              Please refer documentation for supported structure of json.
            </EmbededHelp>
            <ScrollPanel style={{ width: "500px", height: "50px" }}>
              {dislayText}
            </ScrollPanel>
            <hr />
            <h4>Step 1</h4>
            <input type="file" onChange={onUpload} />
            <hr />
            <h4>Step 2</h4>
            <button onClick={uploadToServer}>Upload to Server</button>
            {creatingGene && <PleaseWait />}
            
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(AppImportGene);
