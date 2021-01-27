import React, { useState } from "react";
import { SplitButton } from "primereact/splitbutton";
import { Dropdown } from "primereact/dropdown";

const GenomePromoteFormImpactOfGeneticInhibit = () => {
  const [formValue, setFormValue] = useState({
    nhp: "",
    c3HeBFeJAcuteInfection: "",
    c3HeFeJChronicInfection: "",
    c57BL6OrBALBcAcuteInfection: "",
    c57BL6OrBALBcChronicInfection: "",
    macrophage: "",
    standardMedia: "",
    gluconeogenicCarbonSource: "",
    otherSection2: "",
    multipleStress: "",
    lowPH: "",
    caseum: "",
    caseumSurrogate: "",
    otherNR: "",
  });

  const setForm = (e) => {
    var newFormValue = { ...formValue };
    newFormValue[e.target.name] = e.value;
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
        <h5>a) During infections</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label htmlFor="nhp" className="p-col-12 p-md-2">
              NHP
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="nhp"
                options={selectItemsAI}
                value={formValue.nhp}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="c3HeBFeJAcuteInfection" className="p-col-12 p-md-2">
              C3HeB/FeJ-Acute infection :
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="c3HeBFeJAcuteInfection"
                options={selectItemsAI}
                value={formValue.c3HeBFeJAcuteInfection}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label
              htmlFor="c3HeFeJChronicInfection"
              className="p-col-12 p-md-2"
            >
              C3He/FeJ-Chronic infection
            </label>
            <div className="p-col-12 p-md-10">
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
              htmlFor="c57BL6OrBALBcAcuteInfection"
              className="p-col-12 p-md-2"
            >
              C57BL/6 or BALB/c-Acute infection
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="c57BL6OrBALBcAcuteInfection"
                options={selectItemsAI}
                value={formValue.c57BL6OrBALBcAcuteInfection}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label
              htmlFor="c57BL6OrBALBcChronicInfection"
              className="p-col-12 p-md-2"
            >
              C57BL/6 or BALB/c-Chronic infection
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="c57BL6OrBALBcChronicInfection"
                options={selectItemsAI}
                value={formValue.c57BL6OrBALBcChronicInfection}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="macrophage" className="p-col-12 p-md-2">
              Macrophage
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="macrophage"
                options={selectItemsAI}
                value={formValue.macrophage}
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
        <h5>b) on replication Mtb in vitro</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label htmlFor="standardMedia" className="p-col-12 p-md-2">
              Standard media
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="standardMedia"
                options={selectItemsAI}
                value={formValue.standardMedia}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label
              htmlFor="gluconeogenicCarbonSource"
              className="p-col-12 p-md-2"
            >
              Gluconeogenic carbon source
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="gluconeogenicCarbonSource"
                options={selectItemsAI}
                value={formValue.gluconeogenicCarbonSource}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="otherSection2" className="p-col-12 p-md-2">
              Other
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="otherSection2"
                options={selectItemsAI}
                value={formValue.otherSection2}
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
        <h5>c) on nonreplicating Mtb in vitro</h5>
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label htmlFor="multipleStress" className="p-col-12 p-md-2">
              Multiple stress
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="multipleStress"
                options={selectItemsAI}
                value={formValue.multipleStress}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="lowPH" className="p-col-12 p-md-2">
              Low pH
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="lowPH"
                options={selectItemsAI}
                value={formValue.lowPH}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="caseum" className="p-col-12 p-md-2">
              Caseum
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="caseum"
                options={selectItemsAI}
                value={formValue.caseum}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="caseumSurrogate" className="p-col-12 p-md-2">
              Caseum surrogate
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="caseumSurrogate"
                options={selectItemsAI}
                value={formValue.caseumSurrogate}
                optionLabel="label"
                onChange={(e) => setForm(e)}
                placeholder="Select a value"
              />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="otherNR" className="p-col-12 p-md-2">
              Other NR
            </label>
            <div className="p-col-12 p-md-10">
              <Dropdown
                name="otherNR"
                options={selectItemsAI}
                value={formValue.otherNR}
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
              ></SplitButton>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenomePromoteFormImpactOfGeneticInhibit;
