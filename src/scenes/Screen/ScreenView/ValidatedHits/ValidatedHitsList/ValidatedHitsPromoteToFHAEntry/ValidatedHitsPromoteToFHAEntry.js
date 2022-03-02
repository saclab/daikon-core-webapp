import React, { useState, useRef, useContext } from "react";
import { Steps } from "primereact/steps";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { InputTextarea } from "primereact/inputtextarea";

import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import SmilesView from "../../../../../../app/common/SmilesView/SmilesView";
import { RootStoreContext } from "../../../../../../app/stores/rootStore";
const ValidatedHitsPromoteToFHAEntry = ({ compounds, screen, close }) => {
  const [activeStep, setActiveStep] = useState(0);
  const dt = useRef(null);

  const [selectedPrimaryHit, setSelectedPrimaryHit] = useState(null);
  const [projectInformationFormData, setProjectInformationFormData] = useState(
    {}
  );

  const rootStore = useContext(RootStoreContext);
  const { appVars } = rootStore.generalStore;

  const { creatingFHA, createFHA } = rootStore.fhaStore;

  console.log("From ValidatedHitsPromoteToFHAEntry");
  console.log(compounds);
  const items = [
    {
      label: "Selection",
    },
    {
      label: "Project Information",
    },
  ];

  /*** STEP 1 Selection */

  const StructureBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div style={{ minWidth: "350px", marginRight: "50px" }}>
          <SmilesView smiles={rowData?.compound?.smile} />
        </div>
      </React.Fragment>
    );
  };

  let selection = (
    <div style={{ width: "100%" }}>
      <Card title="Selection" style={{ marginTop: "2em" }}>
        <p className="p-m-0" style={{ lineHeight: "1.5" }}>
          No of compounds selected : <b>{compounds.length}</b> <br />
          From Cluster groups(s) :{" "}
          <b>
            {" "}
            {[...new Set(compounds.map((item) => item.clusterGroup))].join(
              ", "
            )}
          </b>
          <br />
          Accession No : <b>{screen.accessionNumber}</b> <br />
          Screen Name : <b>{screen.screenName}</b> <br />
          Target : <b>{screen.geneName}</b>
        </p>
      </Card>
      <div className="card">
        <h2> Choose the primary structure:</h2>
        <DataTable
          ref={dt}
          value={compounds}
          scrollable
          emptyMessage="No hits selected."
          resizableColumns
          columnResizeMode="fit"
          showGridlines
          responsiveLayout="scroll"
          selectionMode="single"
          selection={selectedPrimaryHit}
          onSelectionChange={(e) => setSelectedPrimaryHit(e.value)}
          dataKey="id"
        >
          <Column field="compound.externalCompundIds" header="Compound Id" />
          <Column field="clusterGroup" header="Cluster Group No" />
          <Column
            field="Structure"
            header="Structure"
            body={StructureBodyTemplate}
            style={{ minWidth: "350px" }}
          />
        </DataTable>

        <Button
          icon="pi pi-arrow-right"
          label="Next"
          className="p-button-success"
          style={{ float: "right", marginTop: "1em" }}
          onClick={() => validateAndMoveToStep2()}
        />
        <br />
        <br />
      </div>
    </div>
  );

  let validateAndMoveToStep2 = () => {
    console.log(selectedPrimaryHit);
    if (selectedPrimaryHit === null) {
      toast.error("A primary compound needs to be selected");
      return;
    }

    setActiveStep(1);
  };

  /*** END STEP 1 Selection */

  /*** STEP 2 Project Information */

  // project details form
  const formik = useFormik({
    initialValues: {
      projectName: "",
      primaryOrg: "",
      supportingOrgs: "",
      fhaStart: "",
      fhaDescription: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.projectName) {
        errors.name = "Name is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setProjectInformationFormData(data);

      console.log("S U B M I T =====");
      data.ScreenId = screen.id;
      data.baseHits = compounds;
      data.representationStructure = selectedPrimaryHit.compound;
      console.log(data);
      createFHA(data).then((res) => {
        console.log("res");
        console.log(res);
        
        if (res !== null) {
          formik.resetForm();
          close();
        }
        
      });
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  // project details info card
  let projectInformation = selectedPrimaryHit && (
    <div style={{ width: "100%" }}>
      <Card title="Project Information" style={{ marginTop: "2em" }}>
        <div className="p-grid">
          <div className="p-col">
            {" "}
            <p className="p-m-0" style={{ lineHeight: "1.5" }}>
              No of compounds selected : <b>{compounds.length}</b> <br />
              From Cluster groups(s) :{" "}
              <b>
                {" "}
                {[...new Set(compounds.map((item) => item.clusterGroup))].join(
                  ", "
                )}
              </b>
              <br />
              Accession No : <b>{screen.accessionNumber}</b> <br />
              Screen Name : <b>{screen.screenName}</b> <br />
              Target : <b>{screen.geneName}</b>
            </p>
          </div>
          <div className="p-col">
            <div style={{ minWidth: "350px", marginTop: "-30px" }}>
              <SmilesView smiles={selectedPrimaryHit.compound.smile} />
            </div>
          </div>
        </div>
        <hr />

        <div className="p-d-flex">
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="p-field">
              <label
                htmlFor="projectName"
                className={classNames({
                  "p-error": isFormFieldValid("projectName"),
                })}
              >
                Project Name
              </label>
              <InputText
                id="projectName"
                name="projectName"
                value={formik.values.projectName}
                onChange={formik.handleChange}
                autoFocus
                className={classNames({
                  "p-invalid": isFormFieldValid("projectName"),
                })}
                style={{ minWidth: "500px" }}
              />
              {getFormErrorMessage("projectName")}
            </div>
            <div className="p-field">
              <label
                htmlFor="primaryOrg"
                className={classNames({
                  "p-error": isFormFieldValid("primaryOrg"),
                })}
              >
                Primary Organization
              </label>

              <Dropdown
                value={formik.values.primaryOrg}
                options={appVars.appOrgs}
                onChange={formik.handleChange("primaryOrg")}
                optionLabel="alias"
                placeholder="Select primary organization"
                filter
                showClear
                filterBy="alias"
                className={classNames({
                  "p-invalid": isFormFieldValid("primaryOrg"),
                })}
              />
              {getFormErrorMessage("primaryOrg")}
            </div>

            <div className="p-field">
              <label
                htmlFor="supportingOrgs"
                className={classNames({
                  "p-error": isFormFieldValid("supportingOrgs"),
                })}
              >
                Supporting Organizations
              </label>

              <MultiSelect
                value={formik.values.supportingOrgs}
                options={appVars.appOrgs}
                onChange={formik.handleChange("supportingOrgs")}
                optionLabel="alias"
                placeholder="Select supporting organizations"
                filter
                showClear
                filterBy="alias"
                className={classNames({
                  "p-invalid": isFormFieldValid("supportingOrgs"),
                })}
              />
              {getFormErrorMessage("supportingOrgs")}
            </div>

            <div className="p-field">
              <label
                htmlFor="fhaStart"
                className={classNames({
                  "p-error": isFormFieldValid("fhaStart"),
                })}
              >
                FHA Start Date
              </label>

              <Calendar
                value={formik.values.fhaStart}
                onChange={formik.handleChange("fhaStart")}
                numberOfMonths={2}
                className={classNames({
                  "p-invalid": isFormFieldValid("fhaStart"),
                })}
              />
              {getFormErrorMessage("fhaStart")}
            </div>

            <div className="p-field">
              <label
                htmlFor="fhaDescription"
                className={classNames({
                  "p-error": isFormFieldValid("fhaDescription"),
                })}
              >
                Description
              </label>

              <InputTextarea
                id="fhaDescription"
                name="fhaDescription"
                value={formik.values.fhaDescription}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isFormFieldValid("fhaDescription"),
                })}
                style={{ minWidth: "500px" }}
              />
              {getFormErrorMessage("fhaDescription")}
            </div>

            <Button
              type="submit"
              icon="pi pi-arrow-right"
              label="Create"
              className="p-button-success"
              style={{ float: "right", marginTop: "1em" }}
            />
          </form>
        </div>
      </Card>
    </div>
  );

  return (
    <div>
      <Steps
        model={items}
        activeIndex={activeStep}
        onSelect={(e) => setActiveStep(e.index)}
        readOnly={false}
      />
      {activeStep === 0 && selection}
      {activeStep === 1 && projectInformation}
    </div>
  );
};

export default ValidatedHitsPromoteToFHAEntry;
