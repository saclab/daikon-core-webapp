import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Fieldset } from "primereact/fieldset";
import { ListBox } from "primereact/listbox";
import { Panel } from "primereact/panel";
import { Tag } from "primereact/tag";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmbeddedHelp from "../../../app/common/EmbeddedHelp/EmbeddedHelp";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { appColors } from "../../../colors";

const GenePoolProviders = () => {
  const rootStore = useContext(RootStoreContext);
  // const { fetchingAppBackgroundTasks, fetchAppBackgroundTasks } =
  //   rootStore.appSettingsStore;
  const navigate = useNavigate();

  const [selectedAdapter, setSelectedAdapter] = useState();
  const [selectedStrain, setSelectedStrain] = useState();
  const [selectedConf, setSelectedConf] = useState();

  const {
    displayLoading,
    fetchStrains,
    strains,
    cacheValidStrain,
    editStrain,
    createStrain,
    creatingStrain,
    organisms,
  } = rootStore.organismStore;

  const {
    appSettingsDisplayLoading,
    fetchAppConfiguration,
    appConfigurationsMap,
    addAppConfiguration,
    addingAppConfiguration,
    editAppConfiguration,
    editingAppConfiguration,
    submitBackgroundTask,
    submittingBackgroundTask,
  } = rootStore.appSettingsStore;

  useEffect(() => {
    if (!cacheValidStrain) {
      fetchStrains();
      fetchAppConfiguration();
    }
  }, [fetchStrains, cacheValidStrain]);

  const breadCrumbItems = [
    {
      label: "App Settings",
      command: () => {
        navigate("/admin/settings/");
      },
    },

    { label: "App Organism" },
    { label: "Sync Gene Pool With Providers" },
  ];

  const submitJob = () => {
    console.log("submitJob");

    if (selectedAdapter === "" || selectedAdapter === undefined) {
      toast.error("Please select a provider");

      return;
    }

    if (selectedStrain === "" || selectedStrain === undefined) {
      toast.error("Please select a strain");
      return;
    }

    if (selectedConf === "" || selectedConf === undefined) {
      toast.error("Please select a configuration");
      return;
    }

    const newJob = {
      adapterName: selectedAdapter,
      strainCanonicalName: selectedStrain,
      adapterConfigurationName: selectedConf,
    };

    console.log(newJob);
    submitBackgroundTask(newJob);
  };

  return (
    <React.Fragment>
      <div className="flex flex-column gap-2 w-full">
        <div className="flex w-full">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-conceptual icon-systems"
            heading={"Sync Gene Pool With Providers"}
            displayHorizon={false}
            color={appColors.blocks.blue}
          />
        </div>
        <div className="flex w-full">
          <SectionHeading
            heading={"1. Select Provider"}
            color={appColors.blocks.gray}
            textColor={appColors.blocks.black}
          />
        </div>

        <div className="flex w-full">
          <div className="flex flex-column gap-2 p-2">
            <Card
              title="Mycobrowser"
              subTitle="https://mycobrowser.epfl.ch/"
              style={{ width: "20em", height: "20em" }}
              footer={
                <Button
                  label="Select"
                  icon="pi pi-check"
                  onClick={() => setSelectedAdapter("Mycobrowser")}
                />
              }
              //header={header}
            >
              Mycobrowser (Mycobacterial browser) is a comprehensive genomic and
              proteomic data repository for pathogenic mycobacteria. It provides
              manually-curated annotations and appropriate tools to facilitate
              genomic and proteomic study of these organisms.
            </Card>
          </div>
          <div className="flex flex-column gap-2 p-2">
            <Card
              title="UniProt"
              subTitle="https://www.uniprot.org/"
              style={{ width: "20em", height: "20em" }}
              footer={
                <Button
                  label="Select"
                  icon="pi pi-check"
                  onClick={() => setSelectedAdapter("UniProt")}
                />
              }
              //header={header}
            >
              UniProt is maintained by the UniProt Consortium, a collaboration
              between the European Bioinformatics Institute (EBI), the Swiss
              Institute of Bioinformatics (SIB), and the Protein Information
              Resource (PIR) at Georgetown University. Import by creating a
              search query.
            </Card>
          </div>
          <div className="flex flex-column gap-2 p-2">
            <Card
              title="Generic"
              subTitle="JSON file"
              style={{ width: "20em", height: "20em" }}
              footer={<Button label="Select" icon="pi pi-check" />}
              //header={header}
            >
              To easily impor a list of genes in JSON format to your app, you
              can use the built-in JSON Tool under the "app Imports" section.
              This tool allows you to synchronize your JSON-formatted gene list
              with the app, making it easy to work with and manipulate the data.
            </Card>
          </div>
        </div>

        <div className="flex w-full">
          <SectionHeading
            heading={"2. Choose Strain & Configuration"}
            color={appColors.blocks.gray}
            textColor={appColors.blocks.black}
          />
        </div>
        <div className="flex">
          <div className="flex flex-column gap-2">
            <Fieldset legend="Strain">
              <ListBox
                style={{ width: "25rem" }}
                listStyle={{ maxHeight: "10rem" }}
                options={strains.map((strain) => {
                  return {
                    label: strain.name,
                    value: strain.canonicalName,
                  };
                })}
                onChange={(e) => setSelectedStrain(e.value)}
                placeholder="Select a Strain"
                filter
                itemTemplate={(option) => (
                  <div className="flex gap-3">
                    <i className="icon icon-species icon-plasmodium" />
                    <div>{option.label}</div>
                  </div>
                )}
              />
            </Fieldset>
          </div>
          <div className="flex flex-column gap-2">
            {/* {value={Array.from(appConfigurationsMap.values())} */}
            <Fieldset legend="Configuration">
              <ListBox
                style={{ width: "25rem" }}
                listStyle={{ maxHeight: "10rem" }}
                options={Array.from(appConfigurationsMap.values()).map((a) => {
                  return {
                    label: a.key,
                    value: a.key,
                  };
                })}
                onChange={(e) => setSelectedConf(e.value)}
                placeholder="Select a Strain"
                filter
                itemTemplate={(option) => (
                  <div className="flex gap-3">
                    <i className="ri-folder-settings-fill" />
                    <div>{option.label}</div>
                  </div>
                )}
              />
            </Fieldset>
          </div>
        </div>

        <div className="flex w-full">
          <SectionHeading
            heading={"3. Sync Pool"}
            color={appColors.blocks.gray}
            textColor={appColors.blocks.black}
          />
        </div>

        <div className="flex w-full">
          <Panel header="Job Configuration">
            <EmbeddedHelp>
              Submitting a job to sync the gene pool with the selected provider
              and strain allows for the import of the latest gene data from the
              chosen source. This ensures that the gene pool is up-to-date and
              accurate for use in downstream analyses. Once the job is
              submitted, the app will handle the data synchronization process,
              and the job can be tracked in the 'Sync History' section.
            </EmbeddedHelp>
            <div className="flex gap-2">
              <div className="flex flex-column gap-2">
                Adapter <Tag className="mr-2" value={selectedAdapter}></Tag>
              </div>
              <div className="flex flex-column gap-2">
                Strain <Tag className="mr-2" value={selectedStrain}></Tag>
              </div>
              <div className="flex flex-column gap-2"></div>
              <div className="flex flex-column gap-2">
                Configuration
                <Tag className="mr-2" value={selectedConf}></Tag>
              </div>
            </div>
            <div className="flex mt-3">
              <Button
                icon="icon icon-conceptual icon-systems"
                label="Start Sync"
                className="p-button-warning"
                onClick={submitJob}
                loading={submittingBackgroundTask}
              />
            </div>
          </Panel>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(GenePoolProviders);
