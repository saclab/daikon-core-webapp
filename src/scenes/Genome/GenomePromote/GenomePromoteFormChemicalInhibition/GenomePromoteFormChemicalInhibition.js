import React, { useState } from "react";
import { SplitButton } from "primereact/splitbutton";
import { Dropdown } from "primereact/dropdown";

const GenomePromoteFormChemicalInhibition = (props) => {
  const [formValue, setFormValue] = useState({
    mutationInTargetCausesResistance: "",
    overexpressionOfTargetIncreaseMIC: "",
    underexpressionOfTargetIncreaseMIC: "",
    impactOnPathway: "",
    compoundBindsPurifedTarget: "",
    compoundInhibitsPurifedTarget: "",
    supportingInformation: "",
    modifedOn: "",
    modifedBy: "",
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

  const selectItemsAI = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Unknown", value: "un" },
  ];

  return (
    <React.Fragment>
      <div className="card">
        <h5>a) in live Mtb</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label
              htmlFor="mutationInTargetCausesResistance"
              className="p-col-12 p-md-2"
            >
              Mutation in target causes resistance?
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="mutationInTargetCausesResistance"
                options={selectItemsYN}
                value={formValue.mutationInTargetCausesResistance}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label
              htmlFor="overexpressionOfTargetIncreaseMIC"
              className="p-col-12 p-md-2"
            >
              Overexpression of target increase MIC?
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="overexpressionOfTargetIncreaseMIC"
                options={selectItemsYN}
                value={formValue.overexpressionOfTargetIncreaseMIC}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label
              htmlFor="underexpressionOfTargetIncreaseMIC"
              className="p-col-12 p-md-2"
            >
              Underexpression of target increase MIC?
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="underexpressionOfTargetIncreaseMIC"
                options={selectItemsYN}
                value={formValue.underexpressionOfTargetIncreaseMIC}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="impactOnPathway" className="p-col-12 p-md-2">
              Impact on pathway :
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="impactOnPathway"
                options={selectItemsYN}
                value={formValue.impactOnPathway}
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
        <h5>b) in vitro</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label
              htmlFor="compoundBindsPurifedTarget"
              className="p-col-12 p-md-2"
            >
              Compound binds purifed target
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="compoundBindsPurifedTarget"
                options={selectItemsYN}
                value={formValue.compoundBindsPurifedTarget}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label
              htmlFor="compoundInhibitsPurifedTarget"
              className="p-col-12 p-md-2"
            >
              Compound inhibits purifed target
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="compoundInhibitsPurifedTarget"
                options={selectItemsYN}
                value={formValue.compoundInhibitsPurifedTarget}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="supportingInformation" className="p-col-12 p-md-2">
              Supporting information
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="supportingInformation"
                options={selectItemsYN}
                value={formValue.supportingInformation}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="modifedOn" className="p-col-12 p-md-2">
              Modifed on
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="modifedOn"
                options={selectItemsYN}
                value={formValue.modifedOn}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="modifedBy" className="p-col-12 p-md-2">
              Modifed by
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="modifedBy"
                options={selectItemsYN}
                value={formValue.modifedBy}
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

export default GenomePromoteFormChemicalInhibition;
