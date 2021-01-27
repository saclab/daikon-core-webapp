import React from "react";
import { InputText } from "primereact/inputtext";
import { SplitButton } from "primereact/splitbutton";

const GenomePromoteFormTarget = () => {
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
  return (
    <div className="card">
      {/* <h5>Horizontal and Fluid</h5> */}
      <div className="p-fluid">
        <div className="p-field p-grid">
          <label htmlFor="geneName" className="p-col-12 p-md-2">
            Gene name
          </label>
          <div className="p-col-12 p-md-10">
            <InputText id="geneName" type="text" value="rho" disabled />
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="associatedMoleculeName" className="p-col-12 p-md-2">
            Associated molecule name
          </label>
          <div className="p-col-12 p-md-10">
            <InputText id="associatedMoleculeName" type="text" />
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="accessionNumber" className="p-col-12 p-md-2">
            Accession Number
          </label>
          <div className="p-col-12 p-md-10">
            <InputText
              id="accessionNumber"
              type="text"
              value="Rv1297"
              disabled
            />
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="addedBy" className="p-col-12 p-md-2">
            Added/nominated by
          </label>
          <div className="p-col-12 p-md-10">
            <InputText id="addedBy" type="text" />
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="supportingInformation" className="p-col-12 p-md-2">
            Supporting Information
          </label>
          <div className="p-col-12 p-md-10">
            <InputText id="supportingInformation" type="text" />
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="modifedOn" className="p-col-12 p-md-2">
            Modifed on
          </label>
          <div className="p-col-12 p-md-10">
            <InputText id="modifedOn" type="text" />
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="modifedBy" className="p-col-12 p-md-2">
            Modifed by
          </label>
          <div className="p-col-12 p-md-10">
            <InputText id="modifedBy" type="text" />
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
  );
};

export default GenomePromoteFormTarget;
