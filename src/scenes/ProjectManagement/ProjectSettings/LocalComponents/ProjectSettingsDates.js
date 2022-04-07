import React, { useContext } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

import { RootStoreContext } from "../../../../app/stores/rootStore";



const ProjectSettingsDates = ({ project }) => {



  const rootStore = useContext(RootStoreContext);

  console.log("===PROJECT DATES ===");
  console.log(project);

  console.log(project.fhaStart);
  console.log(new Date(project.fhaStart + "Z").toLocaleString())


  const formik = useFormik({
    initialValues: {
      fhaStart: new Date(project.fhaStart),
      fhaPredictedStart: new Date(project.fhaPredictedStart),

      h2LStart: new Date(project.h2LStart),
      h2LPredictedStart: new Date(project.h2LPredictedStart),

      loStart: new Date(project.loStart),
      loPredictedStart: new Date(project.loPredictedStart),

      spStart: new Date(project.spStart),
      spPredictedStart: new Date(project.spPredictedStart),



    },
    validate: (data) => {
      let errors = {};

      if (project.fhaEnabled && !data.fhaStart) {
        errors.fhaStart = "This field is required";
      }

      if (project.fhaEnabled && !data.fhaPredictedStart) {
        errors.fhaPredictedStart = "This field is required";
      }

      if (project.h2LEnabled && !data.h2LStart) {
        errors.h2LStart = "This field is required";
      }

      if (project.h2LEnabled && !data.h2LPredictedStart) {
        errors.h2LPredictedStart = "This field is required";
      }

      if (project.loEnabled && !data.loStart) {
        errors.loStart = "This field is required";
      }

      if (project.loEnabled && !data.loPredictedStart) {
        errors.loPredictedStart = "This field is required";
      }

      if (project.spEnabled && !data.spStart) {
        errors.spStart = "This field is required";
      }

      if (project.spEnabled && !data.spPredictedStart) {
        errors.spPredictedStart = "This field is required";
      }

      return errors;
    },
    onSubmit: (data) => {
      console.log(data)
      // data["screenId"] = screenId;
      // console.log(data);
      // onAdd(data);
      // formik.resetForm();
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

  return (
    <div>
      <div className="p-fluid p-formgrid p-grid">
        <form onSubmit={formik.handleSubmit} style={{ paddingLeft: "50px" }}>
          {/* FHA DATES */}
          {project.fhaEnabled &&
            <><div className="p-field p-grid">
              <label
                htmlFor="fhaStart"
                style={{ width: '250px' }}
                className={classNames({
                  "p-error": isFormFieldValid("fhaStart"),
                })}
              >
                FHA Start Date :
              </label>
              <Inplace closable>
                <InplaceDisplay>
                  {formik.values.fhaStart != null ? (formik.values.fhaStart).toLocaleDateString() : 'Click to Edit'}
                </InplaceDisplay>
                <InplaceContent>
                  <Calendar
                    id="fhaStart"
                    name="fhaStart"
                    value={formik.values.fhaStart}
                    viewDate={formik.values.fhaStart}
                    onChange={formik.handleChange}
                    style={{ width: '400px' }}
                    className={classNames({
                      "p-invalid": isFormFieldValid("fhaStart"),
                    })} />
                </InplaceContent>
              </Inplace>


              {getFormErrorMessage("fhaStart")}
            </div>
              <div className="p-field p-grid">
                <label
                  htmlFor="fhaPredictedStart"
                  style={{ width: '250px' }}
                  className={classNames({
                    "p-error": isFormFieldValid("fhaPredictedStart"),
                  })}
                >
                  FHA Predicted Start Date :
                </label>
                <Inplace closable>
                  <InplaceDisplay>
                    {formik.values.fhaPredictedStart != null ? (formik.values.fhaPredictedStart).toLocaleDateString() : 'Click to Edit'}
                  </InplaceDisplay>
                  <InplaceContent>
                    <Calendar
                      id="fhaPredictedStart"
                      name="fhaPredictedStart"
                      value={formik.values.fhaPredictedStart}
                      viewDate={formik.values.fhaPredictedStart}
                      onChange={formik.handleChange}
                      style={{ width: '400px' }}
                      className={classNames({
                        "p-invalid": isFormFieldValid("fhaPredictedStart"),
                      })} />
                  </InplaceContent>
                </Inplace>
                {getFormErrorMessage("fhaPredictedStart")}
              </div></>
          }


          {/* h2L DATES */}
          {project.h2LEnabled &&
            <><div className="p-field p-grid">
              <label
                htmlFor="h2LStart"
                style={{ width: '250px' }}
                className={classNames({
                  "p-error": isFormFieldValid("h2LStart"),
                })}
              >
                H2L Start Date :
              </label>
              <Inplace closable>
                <InplaceDisplay>
                  {formik.values.h2LStart != null ? (formik.values.h2LStart).toLocaleDateString() : 'Click to Edit'}
                </InplaceDisplay>
                <InplaceContent>
                  <Calendar
                    id="h2LStart"
                    name="h2LStart"
                    value={formik.values.h2LStart}
                    viewDate={formik.values.h2LStart}
                    onChange={formik.handleChange}
                    style={{ width: '400px' }}
                    className={classNames({
                      "p-invalid": isFormFieldValid("h2LStart"),
                    })} />
                </InplaceContent>
              </Inplace>


              {getFormErrorMessage("h2LStart")}
            </div><div className="p-field p-grid">
                <label
                  htmlFor="h2LPredictedStart"
                  style={{ width: '250px' }}
                  className={classNames({
                    "p-error": isFormFieldValid("h2LPredictedStart"),
                  })}
                >
                  H2L Predicted Start Date :
                </label>
                <Inplace closable>
                  <InplaceDisplay>
                    {formik.values.h2LPredictedStart != null ? (formik.values.h2LPredictedStart).toLocaleDateString() : 'Click to Edit'}
                  </InplaceDisplay>
                  <InplaceContent>
                    <Calendar
                      id="h2LPredictedStart"
                      name="h2LPredictedStart"
                      value={formik.values.h2LPredictedStart}
                      viewDate={formik.values.h2LPredictedStart}
                      onChange={formik.handleChange}
                      style={{ width: '400px' }}
                      className={classNames({
                        "p-invalid": isFormFieldValid("h2LPredictedStart"),
                      })} />
                  </InplaceContent>
                </Inplace>
                {getFormErrorMessage("h2LPredictedStart")}
              </div></>}

          {/* lo DATES */}
          {project.loEnabled &&
            <><div className="p-field p-grid">
              <label
                htmlFor="loStart"
                style={{ width: '250px' }}
                className={classNames({
                  "p-error": isFormFieldValid("loStart"),
                })}
              >
                LO Start Date :
              </label>
              <Inplace closable>
                <InplaceDisplay>
                  {formik.values.loStart != null ? (formik.values.loStart).toLocaleDateString() : 'Click to Edit'}
                </InplaceDisplay>
                <InplaceContent>
                  <Calendar
                    id="loStart"
                    name="loStart"
                    value={formik.values.loStart}
                    viewDate={formik.values.loStart}
                    onChange={formik.handleChange}
                    style={{ width: '400px' }}
                    className={classNames({
                      "p-invalid": isFormFieldValid("loStart"),
                    })} />
                </InplaceContent>
              </Inplace>


              {getFormErrorMessage("loStart")}
            </div><div className="p-field p-grid">
                <label
                  htmlFor="loPredictedStart"
                  style={{ width: '250px' }}
                  className={classNames({
                    "p-error": isFormFieldValid("loPredictedStart"),
                  })}
                >
                  LO Predicted Start Date :
                </label>
                <Inplace closable>
                  <InplaceDisplay>
                    {formik.values.loPredictedStart != null ? (formik.values.loPredictedStart).toLocaleDateString() : 'Click to Edit'}
                  </InplaceDisplay>
                  <InplaceContent>
                    <Calendar
                      id="loPredictedStart"
                      name="loPredictedStart"
                      value={formik.values.loPredictedStart}
                      viewDate={formik.values.loPredictedStart}
                      onChange={formik.handleChange}
                      style={{ width: '400px' }}
                      className={classNames({
                        "p-invalid": isFormFieldValid("loPredictedStart"),
                      })} />
                  </InplaceContent>
                </Inplace>
                {getFormErrorMessage("loPredictedStart")}
              </div></>}

          {/* sp DATES */}
          {project.spEnabled &&
            <><div className="p-field p-grid">
              <label
                htmlFor="spStart"
                style={{ width: '250px' }}
                className={classNames({
                  "p-error": isFormFieldValid("spStart"),
                })}
              >
                SP Start Date :
              </label>
              <Inplace closable>
                <InplaceDisplay>
                  {formik.values.spStart != null ? (formik.values.spStart).toLocaleDateString() : 'Click to Edit'}
                </InplaceDisplay>
                <InplaceContent>
                  <Calendar
                    id="spStart"
                    name="spStart"
                    value={formik.values.spStart}
                    viewDate={formik.values.spStart}
                    onChange={formik.handleChange}
                    style={{ width: '400px' }}
                    className={classNames({
                      "p-invalid": isFormFieldValid("spStart"),
                    })} />
                </InplaceContent>
              </Inplace>


              {getFormErrorMessage("spStart")}
            </div><div className="p-field p-grid">
                <label
                  htmlFor="spPredictedStart"
                  style={{ width: '250px' }}
                  className={classNames({
                    "p-error": isFormFieldValid("spPredictedStart"),
                  })}
                >
                  SP Predicted Start Date :
                </label>
                <Inplace closable>
                  <InplaceDisplay>
                    {formik.values.spPredictedStart != null ? (formik.values.spPredictedStart).toLocaleDateString() : 'Click to Edit'}
                  </InplaceDisplay>
                  <InplaceContent>
                    <Calendar
                      id="spPredictedStart"
                      name="spPredictedStart"
                      value={formik.values.spPredictedStart}
                      viewDate={formik.values.spPredictedStart}
                      onChange={formik.handleChange}
                      style={{ width: '400px' }}
                      className={classNames({
                        "p-invalid": isFormFieldValid("spPredictedStart"),
                      })} />
                  </InplaceContent>
                </Inplace>
                {getFormErrorMessage("spPredictedStart")}
              </div></>}

          <Button
            icon="icon icon-common icon-database-submit"
            type="submit"
            label="Save Date Changes"
            className="p-mt-2"
          //loading={loading}
          />
        </form>
      </div>

      {/* <KeyValList data={project} filter={
        ["id",
          "projectName",
          "createdAt",
          "createdBy",
          "targetName",
          "status",
          "currentStage",
          "currentStageDescription",
          "projectDisclosure",
          "disclosureDate",
          "priority",
          "priorityDescription",
          "probability",
          "probabilityDescription",
          "resource",
          "resourceDescription",
          "fhaStart",
          "fhaPredictedStart",
          "fhaDescription",
          "h2LStart",
          "h2LPredictedStart",
          "h2LDescription",
          "loStart",
          "loPredictedStart",
          "loDescription",
          "spStart",
          "spPredictedStart",
          "spDescription",
          "pcdDate",
          "pcdDescription",
          "indStart",
          "indPredictedStart",
          "indDescription",
          "clinicalP1Start",
          "clinicalP1PredictedStart",
          "clinicalP1Description",
        ]} /> */}

    </div>
  );
};

export default ProjectSettingsDates;
