import React, { useState } from "react";
import { SplitButton } from "primereact/splitbutton";
import { Dropdown } from "primereact/dropdown";

const GenomePromoteFormLiabilities = (props) => {
  const [formValue, setFormValue] = useState({
    targetInhibitionActivation: "",
    concentrationOfSupplement: "",
    functionallyRedundantGenes: "",
    withLowCellularToxicity: "",
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

  const selectItemsYN = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
    { label: "Unknown", value: "un" },
  ];


  return (
    <React.Fragment>
      <div className="card">
        <h5>a) Metabolic liabilities</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label
              htmlFor="targetInhibitionActivation"
              className="p-col-12 p-md-6"
            >
              Target inhibition/activation can be neutralized by a suppliment
              (eg: a metabolite) or in specifc media?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="targetInhibitionActivation"
                options={selectItemsYN}
                value={formValue.targetInhibitionActivation}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label
              htmlFor="concentrationOfSupplement"
              className="p-col-12 p-md-6"
            >
              Concentration of supplement in human tissue is too low to
              neutralize inactivation?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="concentrationOfSupplement"
                options={selectItemsYN}
                value={formValue.concentrationOfSupplement}
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
        <h5>b) Genetic</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label
              htmlFor="functionallyRedundantGenes"
              className="p-col-12 p-md-6"
            >
              Does the Mtb genome contain functionally redundant genes?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="functionallyRedundantGenes"
                options={selectItemsYN}
                value={formValue.functionallyRedundantGenes}
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
        <h5>c) Other</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label
              htmlFor="withLowCellularToxicity"
              className="p-col-12 p-md-6"
            >
              Have inhibitors with low cellular toxicity been isolated or does
              the protein contain an active or allosteric site that is diferent
              from the human counterpart?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="withLowCellularToxicity"
                options={selectItemsYN}
                value={formValue.withLowCellularToxicity}
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
                className="p-button-success p-button-sm"
                onClick={() => {
                  props.onFormSet(formValue);
                }}
              ></SplitButton>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenomePromoteFormLiabilities;
