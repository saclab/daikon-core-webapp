import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const ProjectAdminNewProject = () => {

  const rootStore = useContext(RootStoreContext);
  const { appVars } = rootStore.generalStore;
  const { createUnlinkedProject, creatingUnlinkedProject } = rootStore.projectStore;

  const formik = useFormik({
    initialValues: {
      projectName: "",
      representationStructureSMILE: "",
      representationStructureExternalCompoundIds: "",
      primaryOrg: "",
      supportingOrgs: "",
      fhaStart: "",
      fhaDescription: "",
      molWeight: "",
      molArea: "",
      mic: "",
      iC50: "",

    },
    validate: (data) => {
      let errors = {};

      if (!data.projectName) {
        errors.projectName = "A project name is required.";
      }

      if (!data.representationStructureSMILE) {
        errors.representationStructureSMILE = "SMILE is required.";
      }

      if (!data.primaryOrg) {
        errors.primaryOrg = "Primary Org is required.";
      }

      if (!data.supportingOrgs) {
        errors.supportingOrgs = "Supporting Org is required.";
      }

      if (!data.fhaStart) {
        errors.fhaStart = "FHA Start Date is required.";
      }



      return errors;
    },
    onSubmit: (data) => {
      // data["projectId"] = selectedProject.id;
      console.log(data);
      createUnlinkedProject(data).then((res) => {
        if (res !== null) {
          console.log(res)
        }
      });
      // history.push()
    },
  }
  );

  const isFormFieldValid = (field) =>
    !!(formik.touched[field] && formik.errors[field]);
  const getFormErrorMessage = (field) => {
    return (
      isFormFieldValid(field) && (
        <small className="p-error">{formik.errors[field]}</small>
      )
    );
  };


  return (
    <div className="form-demo">
      <div>
        <div className="card">
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
                htmlFor="representationStructureSMILE"
                className={classNames({
                  "p-error": isFormFieldValid("representationStructureSMILE"),
                })}
              >
                Representation Structure SMILE
              </label>
              <InputTextarea
                id="representationStructureSMILE"
                answer="representationStructureSMILE"
                value={formik.values.representationStructureSMILE}
                onChange={formik.handleChange}
                autoResize
                rows={5}
                className={classNames({
                  "p-invalid": isFormFieldValid("representationStructureSMILE"),
                })}
              />
              {getFormErrorMessage("representationStructureSMILE")}
            </div>

            <div className="p-field">
              <label
                htmlFor="representationStructureExternalCompoundIds"
                className={classNames({
                  "p-error": isFormFieldValid("representationStructureExternalCompoundIds"),
                })}
              >
                Representation Structure Compound Id
              </label>
              <InputText
                id="representationStructureExternalCompoundIds"

                value={formik.values.representationStructureExternalCompoundIds}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isFormFieldValid("representationStructureExternalCompoundIds"),
                })}
              />
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
                FHA Description
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

            <div className="p-field">
              <label
                htmlFor="molWeight"
                className={classNames({
                  "p-error": isFormFieldValid("molWeight"),
                })}
              >
                Mol Weight
              </label>
              <InputText
                id="molWeight"
                type="decimal"
                value={formik.values.molWeight}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isFormFieldValid("molWeight"),
                })}
              />
            </div>

            <div className="p-field">
              <label
                htmlFor="molArea"
                className={classNames({
                  "p-error": isFormFieldValid("molArea"),
                })}
              >
                MIC
              </label>
              <InputText
                id="molArea"
                type="decimal"
                value={formik.values.molArea}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isFormFieldValid("molArea"),
                })}
              />
            </div>



            <div className="p-field">
              <label
                htmlFor="mic"
                className={classNames({
                  "p-error": isFormFieldValid("mic"),
                })}
              >
                MIC
              </label>
              <InputText
                id="mic"
                type="decimal"
                value={formik.values.mic}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isFormFieldValid("mic"),
                })}
              />
            </div>

            <div className="p-field">
              <label
                htmlFor="iC50"
                className={classNames({
                  "p-error": isFormFieldValid("iC50"),
                })}
              >
                IC50
              </label>
              <InputText
                id="iC50"
                type="decimal"
                value={formik.values.iC50}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isFormFieldValid("iC50"),
                })}
              />
            </div>



            <Button
              icon="icon icon-common icon-database-submit"
              type="submit"
              label="Create Project"
              className="p-mt-2"
              loading={creatingUnlinkedProject}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProjectAdminNewProject