import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { SplitButton } from "primereact/splitbutton";
import Question from "../../../../app/common/Question/Question";

const GenomePromoteFormTarget = (props) => {
  const [formValue, setFormValue] = useState({
    geneName: "",
    associatedMoleculeName: "",
    accessionNumber: "",
    addedBy: "",
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
  return (
    <div className="card">
      {/* <h5>Horizontal and Fluid</h5> */}
      <div className="p-fluid">
        <div className="p-field p-grid">
          <label htmlFor="geneName" className="p-col-12 p-md-2">
            Gene name
          </label>
          <div className="p-col-12 p-md-10">
            <InputText
              id="geneName"
              name="geneName"
              type="text"
              value="rho"
              disabled
            />
          </div>
        </div>

        <div className="p-field p-grid">
          <Question
            question={props.promotionQuestionsRegistry.get("2a3a")}
            updateObject={(e) => props.updateTargetPromotionFormValue(e)}
            readObject={props.targetPromotionFormValue}
          />
        </div>

        <div className="p-field p-grid">
          <label htmlFor="accessionNumber" className="p-col-12 p-md-2">
            Accession Number
          </label>
          <div className="p-col-12 p-md-10">
            <InputText
              id="accessionNumber"
              name="accessionNumber"
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
            <InputText
              id="addedBy"
              name="addedBy"
              type="text"
              onChange={(e) => setForm(e)}
            />
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="supportingInformation" className="p-col-12 p-md-2">
            Supporting Information
          </label>
          <div className="p-col-12 p-md-10">
            <InputText
              id="supportingInformation"
              name="supportingInformation"
              type="text"
              onChange={(e) => setForm(e)}
            />
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="modifedOn" className="p-col-12 p-md-2">
            Modifed on
          </label>
          <div className="p-col-12 p-md-10">
            <InputText
              id="modifedOn"
              name="modifedOn"
              type="text"
              onChange={(e) => setForm(e)}
            />
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="modifedBy" className="p-col-12 p-md-2">
            Modifed by
          </label>
          <div className="p-col-12 p-md-10">
            <InputText
              id="modifedBy"
              name="modifedBy"
              type="text"
              onChange={(e) => setForm(e)}
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
  );
};

export default GenomePromoteFormTarget;
