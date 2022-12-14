import React, { useContext } from "react";
import { useFormik } from "formik";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import SectionHeading from '../../../app/common/SectionHeading/SectionHeading';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useNavigate } from 'react-router-dom';
import { appColors } from '../../../colors';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ProjectCreate = () => {
  const navigate = useNavigate();

  const rootStore = useContext(RootStoreContext);
  const { appVars } = rootStore.generalStore;
  const { createUnlinkedProject, creatingUnlinkedProject } = rootStore.projectStore;

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
      label: "Create Project"
    },
  ];

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

      if (!data.representationStructureExternalCompoundIds) {
        errors.representationStructureExternalCompoundIds = "Compound ID is Required"
      }

      if (!data.molWeight) {
        errors.molWeight = "Mol Weight is Required"
      }
      if (!data.molArea) {
        errors.molArea = "Mol Area is Required"
      }
      if (!data.mic) {
        errors.mic = "MIC is Required"
      }
      if (!data.iC50) {
        errors.iC50 = "IC50 is Required"
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

                <div className="field">
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
                  {getFormErrorMessage("representationStructureExternalCompoundIds")}
                </div>
              </div>
              <div className="flex flex-column">
                <h2>Compund Details</h2>
                <div className="field">
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

                <div className="field">
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
  )
}

export default ProjectCreate