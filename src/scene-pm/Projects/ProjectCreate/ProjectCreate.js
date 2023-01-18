import { useFormik } from "formik";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { appColors } from "../../../colors";

const ProjectCreate = () => {
  const navigate = useNavigate();

  const rootStore = useContext(RootStoreContext);
  const { appVars } = rootStore.generalStore;
  const { createUnlinkedProject, creatingUnlinkedProject } =
    rootStore.projectStore;

  const breadCrumbItems = [
    {
      label: "Project Management",
      command: () => {
        navigate("/pm/");
      },
    },
    {
      label: "Projects",
      command: () => {
        navigate("/pm/project/");
      },
    },
    {
      label: "Create Project",
    },
  ];

  const formik = useFormik({
    initialValues: {
      projectName: "",
      representationStructureSMILE: "",
      representationStructureExternalCompoundIds: "",
      primaryOrg: "",
      supportingOrgs: "",
      haStart: "",
      haDescription: "",
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

      if (!data.haStart) {
        errors.haStart = "HA Start Date is required.";
      }

      if (!data.representationStructureExternalCompoundIds) {
        errors.representationStructureExternalCompoundIds =
          "Compound ID is Required";
      }

      if (!data.molWeight) {
        errors.molWeight = "Mol Weight is Required";
      }
      if (!data.molArea) {
        errors.molArea = "Mol Area is Required";
      }
      if (!data.mic) {
        errors.mic = "MIC is Required";
      }
      if (!data.iC50) {
        errors.iC50 = "IC50 is Required";
      }

      return errors;
    },
    onSubmit: (data) => {
      // data["projectId"] = selectedProject.id;
      createUnlinkedProject(data).then((res) => {
        if (res !== null) {
          //
        }
      });
      // history.push()
    },
  });

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
    <div className="flex flex-column w-full">
      <div className="flex w-full pb-2">
        <BreadCrumb model={breadCrumbItems} />
      </div>

      <div className="flex w-full">
        <SectionHeading
          icon="icon icon-common icon-plus"
          heading="New Project"
          color={appColors.sectionHeadingBg.project}
        />
      </div>

      <div className="flex w-full justify-content-center">
        <div className="card">
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="flex gap-4">
              <div className="flex flex-column">
                <h2>Project Details</h2>
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
                      "p-invalid": isFormFieldValid("projectName"),
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
                    htmlFor="representationStructureSMILE"
                    className={classNames({
                      "p-error": isFormFieldValid(
                        "representationStructureSMILE"
                      ),
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
                      "p-invalid": isFormFieldValid(
                        "representationStructureSMILE"
                      ),
                    })}
                  />
                  {getFormErrorMessage("representationStructureSMILE")}
                </div>

                <div className="field">
                  <label
                    htmlFor="representationStructureExternalCompoundIds"
                    className={classNames({
                      "p-error": isFormFieldValid(
                        "representationStructureExternalCompoundIds"
                      ),
                    })}
                  >
                    Representation Structure Compound Id
                  </label>
                  <InputText
                    id="representationStructureExternalCompoundIds"
                    value={
                      formik.values.representationStructureExternalCompoundIds
                    }
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid(
                        "representationStructureExternalCompoundIds"
                      ),
                    })}
                  />
                  {getFormErrorMessage(
                    "representationStructureExternalCompoundIds"
                  )}
                </div>
              </div>
              <div className="flex flex-column">
                <h2>Compund Details</h2>
                <div className="field">
                  <label
                    htmlFor="haStart"
                    className={classNames({
                      "p-error": isFormFieldValid("haStart"),
                    })}
                  >
                    HA Start Date
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
                    HA Description
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

                <div className="field">
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
                  {getFormErrorMessage("molWeight")}
                </div>

                <div className="field">
                  <label
                    htmlFor="molArea"
                    className={classNames({
                      "p-error": isFormFieldValid("molArea"),
                    })}
                  >
                    Mol Area
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
                  {getFormErrorMessage("molArea")}
                </div>

                <div className="field">
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
                  {getFormErrorMessage("mic")}
                </div>

                <div className="field">
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
                  {getFormErrorMessage("iC50")}
                </div>

                <Button
                  icon="icon icon-common icon-database-submit"
                  type="submit"
                  label="Create Project"
                  className="p-mt-2"
                  loading={creatingUnlinkedProject}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreate;
