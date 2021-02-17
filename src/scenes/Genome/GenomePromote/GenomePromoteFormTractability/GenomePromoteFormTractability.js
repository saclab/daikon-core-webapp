import React, { useState } from "react";
import { SplitButton } from "primereact/splitbutton";
import { Dropdown } from "primereact/dropdown";

const GenomePromoteFormTractability = (props) => {
  const [formValue, setFormValue] = useState({
    activatorsIdentified: "",
    druggableClass: "",
    noWholeCellActivity: "",
    c3HeFeJChronicInfection: "",
    humanSimilarCounterpart: "",
    largeScaleWholesaleActivity: "",
    structureOfMtbProtein: "",
    structureOfHomolog: "",
    mtbStrains: "",
    nonMtbStrains: "",
    assayForMtbProteins: "",
    assayForMtbProteinsFromAnotherSpecies: "",
  });

  const setForm = (e) => {
    var newFormValue = { ...formValue };
    newFormValue[e.target.name] = e.target.value;
    setFormValue(newFormValue);
    console.log(e);
  };

  const nextButtonItems = [
    {
      label: "Save form data in browser",
      icon: "pi pi-cloud-download",
      command: () => {
        console.log("Save form data local");
      },
    },
    {
      label: "Reset",
      icon: "pi pi-refresh",
      command: () => {
        console.log("Reset Section");
      },
    },
  ];


  const selectItemsAI = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Unknown", value: "un" },
  ];

  return (
    <React.Fragment>
      <div className="card">
        <h5>a) Druggability</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label htmlFor="activatorsIdentified" className="p-col-12 p-md-6">
              Have inhibitors/activators of the Mtb protein with on-target whole
              cell activity been identifed?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="activatorsIdentified"
                options={selectItemsAI}
                value={formValue.activatorsIdentified}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="druggableClass" className="p-col-12 p-md-6">
              Does the target belong to a druggable class of proteins?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="druggableClass"
                options={selectItemsAI}
                value={formValue.druggableClass}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="noWholeCellActivity" className="p-col-12 p-md-6">
              Small-scale screens identifed inhibitors/activators of the Mtb
              protein but none have whole-cell activity
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="noWholeCellActivity"
                options={selectItemsAI}
                value={formValue.noWholeCellActivity}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label
              htmlFor="c3HeFeJChronicInfection"
              className="p-col-12 p-md-6"
            >
              C3He/FeJ-Chronic infection
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="c3HeFeJChronicInfection"
                options={selectItemsAI}
                value={formValue.c3HeFeJChronicInfection}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label
              htmlFor="humanSimilarCounterpart"
              className="p-col-12 p-md-6"
            >
              Does the human genome encode a structurally similar counterpart?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="humanSimilarCounterpart"
                options={selectItemsAI}
                value={formValue.humanSimilarCounterpart}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label
              htmlFor="largeScaleWholesaleActivity"
              className="p-col-12 p-md-6"
            >
              Large-scale screens for the MTb enzyme have already been performed
              and did not result in compounds with whole-cell activity.
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="largeScaleWholesaleActivity"
                options={selectItemsAI}
                value={formValue.largeScaleWholesaleActivity}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <br />
        </div>
      </div>

      <div className="card">
        <h5>b) Protein Structure</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label htmlFor="structureOfMtbProtein" className="p-col-12 p-md-6">
              Structure of Mtb protein is available
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="structureOfMtbProtein"
                options={selectItemsAI}
                value={formValue.structureOfMtbProtein}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="structureOfHomolog" className="p-col-12 p-md-6">
              Structure of homolog is available
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="structureOfHomolog"
                options={selectItemsAI}
                value={formValue.structureOfHomolog}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <br />
        </div>
      </div>

      <div className="card">
        <h5>c) Whole-cell assays</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label htmlFor="mtbStrains" className="p-col-12 p-md-6">
              Mtb strain(s) that can confrm on target activity are available;
              strains can be (1) hypomorphs, (2) overexpressors, and/or (3)
              resistant mutants
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="mtbStrains"
                options={selectItemsAI}
                value={formValue.mtbStrains}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="nonMtbStrains" className="p-col-12 p-md-6">
              Non-Mtb strain, which could be used to characterize compounds with
              broad spectrum activity are available.
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="nonMtbStrains"
                options={selectItemsAI}
                value={formValue.nonMtbStrains}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <br />
        </div>
      </div>

      <div className="card">
        <h5>d) Biochemical assays</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label htmlFor="assayForMtbProteins" className="p-col-12 p-md-6">
              Assay for Mtb protein has been established
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="assayForMtbProteins"
                options={selectItemsAI}
                value={formValue.assayForMtbProteins}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label
              htmlFor="assayForMtbProteinsFromAnotherSpecies"
              className="p-col-12 p-md-6"
            >
              Assay has been established for homolog from another species
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="assayForMtbProteinsFromAnotherSpecies"
                options={selectItemsAI}
                value={formValue.assayForMtbProteinsFromAnotherSpecies}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid p-jc-end">
            <div className="p-col-12 p-md-2">
              <SplitButton
                label="Next"
                icon="pi pi-arrow-right"
                model={nextButtonItems}
                className="p-button-success p-button-sm "
                onClick={() => {props.onFormSet(formValue)}}
              ></SplitButton>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenomePromoteFormTractability;
