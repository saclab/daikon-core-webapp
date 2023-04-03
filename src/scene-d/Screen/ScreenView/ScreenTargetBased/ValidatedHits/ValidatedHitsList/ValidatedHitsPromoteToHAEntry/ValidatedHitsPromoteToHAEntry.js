import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { Steps } from "primereact/steps";
import { classNames } from "primereact/utils";
import React, { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import SmilesView from "../../../../../../../app/common/SmilesView/SmilesView";
import { RootStoreContext } from "../../../../../../../app/stores/rootStore";
const ValidatedHitsPromoteToHAEntry = ({ compounds, screen, close }) => {
  const [activeStep, setActiveStep] = useState(0);
  const dt = useRef(null);

  const [selectedPrimaryHit, setSelectedPrimaryHit] = useState(null);
  const [projectInformationFormData, setProjectInformationFormData] = useState(
    {}
  );

  const rootStore = useContext(RootStoreContext);
  const { appVars } = rootStore.generalStore;

  const { creatingHA, createHA } = rootStore.haStore;

  const items = [
    {
      label: "Primary Structure Selection",
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
    <div className="flex w-full gap-4 p-7">
      <div className="flex min-w-max">
        <div className="flex flex-column border-1 p-4 max-w-max">
          <div className="flex">
            <h2>Project Information</h2>
          </div>
          <div className="flex">
            <p className="p-m-0" style={{ lineHeight: "1.5" }}>
              No of compounds selected : <b>{compounds.length}</b> <br />
              Cluster groups(s) :{" "}
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
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex flex-column w-full">
          <div className="flex">
            <h2> Choose the primary structure:</h2>
          </div>
          <div className="flex w-full">
            <DataTable
              className="w-full"
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
              <Column
                field="compound.externalCompoundIds"
                header="Compound Id"
              />
              <Column field="clusterGroup" header="Cluster Group No" />
              <Column
                field="Structure"
                header="Structure"
                body={StructureBodyTemplate}
                style={{ minWidth: "350px" }}
              />
            </DataTable>
          </div>
          <div className="flex justify-content-end">
            <div className="flex max-w-max">
              <Button
                icon="pi pi-arrow-right"
                label="Next"
                className="p-button-success"
                style={{ float: "right", marginTop: "1em" }}
                onClick={() => validateAndMoveToStep2()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  let validateAndMoveToStep2 = () => {
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
      haStart: "",
      haDescription: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.projectName) {
        errors.projectName = "Project name is required.";
      }
      if (!data.primaryOrg) {
        errors.primaryOrg = "Primary org is required.";
      }
      if (!data.supportingOrgs) {
        errors.supportingOrgs = "Supporting org is required.";
      }
      if (!data.haStart) {
        errors.haStart = "Start date is required.";
      }
      if (!data.haDescription) {
        errors.haDescription = "Hit Assessment Description is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setProjectInformationFormData(data);

      data.ScreenId = screen.id;
      data.baseHits = compounds;
      data.representationStructure = selectedPrimaryHit.compound;

      createHA(data).then((res) => {
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
    <div className="flex w-full gap-4 p-7">
      <div className="flex">
        <div className="flex flex-column border-1 p-4">
          <div className="flex">
            <h2>Project Information</h2>
          </div>
          <div className="flex">
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
          <div className="flex">
            <div style={{ minWidth: "300px", marginTop: "-30px" }}>
              <SmilesView smiles={selectedPrimaryHit.compound.smile} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex flex-column w-full">
          <div className="card w-full">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className="field">
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
                    "p-error": isFormFieldValid("projectName"),
                  })}
                  style={{ minWidth: "500px" }}
                />
                {getFormErrorMessage("projectName")}
              </div>
              <div className="field">
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

              <div className="field">
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

              <div className="field">
                <label
                  htmlFor="haStart"
                  className={classNames({
                    "p-error": isFormFieldValid("haStart"),
                  })}
                >
                  Hit Assessment Start Date
                </label>

                <Calendar
                  value={formik.values.haStart}
                  onChange={formik.handleChange("haStart")}
                  numberOfMonths={2}
                  className={classNames({
                    "p-invalid": isFormFieldValid("haStart"),
                  })}
                />
                {getFormErrorMessage("haStart")}
              </div>

              <div className="field">
                <label
                  htmlFor="haDescription"
                  className={classNames({
                    "p-error": isFormFieldValid("haDescription"),
                  })}
                >
                  Description
                </label>

                <InputTextarea
                  id="haDescription"
                  name="haDescription"
                  value={formik.values.haDescription}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("haDescription"),
                  })}
                  style={{ minWidth: "500px" }}
                />
                {getFormErrorMessage("haDescription")}
              </div>
              <div className="flex justify-content-end">
                <div className="flex max-w-max">
                  <Button
                    type="submit"
                    icon="pi pi-arrow-right"
                    label="Create"
                    className="p-button-success"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-column w-full p-3">
      <div className="flex w-full">
        <Steps
          model={items}
          activeIndex={activeStep}
          onSelect={(e) => setActiveStep(e.index)}
          readOnly={false}
          className="w-full"
        />
      </div>
      <div className="flex w-full">
        {activeStep === 0 && selection}
        {activeStep === 1 && projectInformation}
      </div>
    </div>
  );
};

export default ValidatedHitsPromoteToHAEntry;
