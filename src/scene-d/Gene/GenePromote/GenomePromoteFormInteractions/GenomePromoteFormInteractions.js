import { Dropdown } from "primereact/dropdown";
import { SplitButton } from "primereact/splitbutton";
import React, { useState } from "react";

const GenomePromoteFormInteractions = (props) => {
  const [formValue, setFormValue] = useState({
    cIGrowthActivationOfTheTargetSynergize: "",
    cIGrowthActivationOfTheTargetAntagonize: "",
    cIInfectionActivationOfTheTargetSynergize: "",
    cIInfectionActivationOfTheTargetAntagonize: "",
    gIInfectionActivationOfTheTargetSynergize: "",
    gIInfectionActivationOfTheTargetAntagonize: "",
    gIGrowthActivationOfTheTargetSynergize: "",
    gIGrowthActivationOfTheTargetAntagonize: "",
  });

  const setForm = (e) => {
    var newFormValue = { ...formValue };
    newFormValue[e.target.name] = e.target.value;
    setFormValue(newFormValue);
    console.log(e);
  };

  const nextButtonItems = [
    {
      label: "Back",
      icon: "pi pi-arrow-left",
      command: () => {
        props.onFormSet(4);
      },
    },
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
        <h5>a) Chemical inhibition during growth in vitro</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label htmlFor="cIGrowthActivationOfTheTargetSynergize" className="p-col-12 p-md-6">
              Does inhibition/activation of the target synergize with current TB
              drugs or other drugs under development?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="cIGrowthActivationOfTheTargetSynergize"
                options={selectItemsYN}
                value={formValue.cIGrowthActivationOfTheTargetSynergize}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="cIGrowthActivationOfTheTargetAntagonize" className="p-col-12 p-md-6">
              Does inhibition/activation of the target antagonize with current
              TB drugs or other drugs under development?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="cIGrowthActivationOfTheTargetAntagonize"
                options={selectItemsYN}
                value={formValue.cIGrowthActivationOfTheTargetAntagonize}
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
        <h5>b) Chemical inhibition during infection</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label htmlFor="cIInfectionActivationOfTheTargetSynergize" className="p-col-12 p-md-6">
              Does inhibition/activation of the targt synergize wtih current TB
              drugs or other drugs under development?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="cIInfectionActivationOfTheTargetSynergize"
                options={selectItemsYN}
                value={formValue.cIInfectionActivationOfTheTargetSynergize}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="cIInfectionActivationOfTheTargetAntagonize" className="p-col-12 p-md-6">
              Does inhibition/activation of the target antagonize with current
              TB drugs or other drugs under development?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="cIInfectionActivationOfTheTargetAntagonize"
                options={selectItemsYN}
                value={formValue.cIInfectionActivationOfTheTargetAntagonize}
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
        <h5>c) Genetic inhibition during infection</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label htmlFor="gIInfectionActivationOfTheTargetSynergize" className="p-col-12 p-md-6">
              Does inhibition/activation of the targt synergize wtih current TB
              drugs or other drugs under development?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="gIInfectionActivationOfTheTargetSynergize"
                options={selectItemsYN}
                value={formValue.gIInfectionActivationOfTheTargetSynergize}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="gIInfectionActivationOfTheTargetAntagonize" className="p-col-12 p-md-6">
              Does inhibition/activation of the target antagonize with current
              TB drugs or other drugs under development?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="gIInfectionActivationOfTheTargetAntagonize"
                options={selectItemsYN}
                value={formValue.gIInfectionActivationOfTheTargetAntagonize}
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
        <h5>d) Genetic inhibition during growth in vitro</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label htmlFor="gIGrowthActivationOfTheTargetSynergize" className="p-col-12 p-md-6">
              Does inhibition/activation of the targt synergize wtih current TB
              drugs or other drugs under development?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="gIGrowthActivationOfTheTargetSynergize"
                options={selectItemsYN}
                value={formValue.gIGrowthActivationOfTheTargetSynergize}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label
              htmlFor="gIGrowthActivationOfTheTargetAntagonize"
              className="p-col-12 p-md-6"
            >
              Does inhibition/activation of the target antagonize with current
              TB drugs or other drugs under development?
            </label>
            <div className="p-col-12 p-md-6">
              <Dropdown
                name="gIGrowthActivationOfTheTargetAntagonize"
                options={selectItemsYN}
                value={formValue.gIGrowthActivationOfTheTargetAntagonize}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid p-jc-end">
            <div className="p-col-12 p-md-2">
              <SplitButton
                label="Finish"
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

export default GenomePromoteFormInteractions;
