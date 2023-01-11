import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";

import { Inplace, InplaceContent, InplaceDisplay } from 'primereact/inplace';

import { RootStoreContext } from "../../../../../app/stores/rootStore";



const ProjectSettingsDates = ({ project }) => {

  const rootStore = useContext(RootStoreContext);
  const {
    editProject,
    editingProject,

  } = rootStore.projectStore;


  const formik = useFormik({
    initialValues: {
      haStart: new Date(project.haStart),
      haPredictedStart: new Date(project.haPredictedStart),

      h2LStart: new Date(project.h2LStart),
      h2LPredictedStart: new Date(project.h2LPredictedStart),

      loStart: new Date(project.loStart),
      loPredictedStart: new Date(project.loPredictedStart),

      spStart: new Date(project.spStart),
      spPredictedStart: new Date(project.spPredictedStart),

      indStart: new Date(project.indStart),
      indPredictedStart: new Date(project.indPredictedStart),

      clinicalP1Start: new Date(project.clinicalP1Start),
      clinicalP1PredictedStart: new Date(project.clinicalP1PredictedStart),



    },
    validate: (data) => {
      let errors = {};

      if (project.haEnabled && !data.haStart) {
        errors.haStart = "This field is required";
      }

      if (project.haEnabled && !data.haPredictedStart) {
        errors.haPredictedStart = "This field is required";
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

      if (project.indEnabled && !data.indStart) {
        errors.indStart = "This field is required";
      }

      if (project.indEnabled && !data.indPredictedStart) {
        errors.indPredictedStart = "This field is required";
      }

      if (project.clinicalP1Enabled && !data.clinicalP1Start) {
        errors.clinicalP1Start = "This field is required";
      }

      if (project.clinicalP1Enabled && !data.clinicalP1PredictedStart) {
        errors.clinicalP1PredictedStart = "This field is required";
      }

      return errors;
    },
    onSubmit: (data) => {
      var editedProject = { ...project }
      editedProject.haStart = data.haStart;
      editedProject.haPredictedStart = data.haPredictedStart;

      editedProject.h2LStart = data.h2LStart;
      editedProject.h2LPredictedStart = data.h2LPredictedStart;

      editedProject.loStart = data.loStart;
      editedProject.loPredictedStart = data.loPredictedStart;

      editedProject.spStart = data.spStart;
      editedProject.spPredictedStart = data.spPredictedStart;

      editedProject.indStart = data.indStart;
      editedProject.indPredictedStart = data.indPredictedStart;

      editedProject.clinicalP1Start = data.clinicalP1Start;
      editedProject.clinicalP1PredictedStart = data.clinicalP1PredictedStart;

      console.log(data)
      editProject(editedProject)
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
    <React.Fragment>
      <div className="card w-full">
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          {/* HA DATES */}
          {project.haEnabled &&
            <><div className="field grid">
              <label
                htmlFor="haStart"
                style={{ width: '250px' }}
                className={classNames({
                  "p-error": isFormFieldValid("haStart"),
                })}
              >
                HA Start Date :
              </label>
              <Inplace closable>
                <InplaceDisplay>
                  {formik.values.haStart != null ? (formik.values.haStart).toLocaleDateString() : 'Click to Edit'}
                </InplaceDisplay>
                <InplaceContent>
                  <Calendar
                    id="haStart"
                    name="haStart"
                    value={formik.values.haStart}
                    viewDate={formik.values.haStart}
                    onChange={formik.handleChange}
                    style={{ width: '400px' }}
                    className={classNames({
                      "p-invalid": isFormFieldValid("haStart"),
                    })} />
                </InplaceContent>
              </Inplace>
              {getFormErrorMessage("haStart")}
            </div>

              <div className="field grid">
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
              </div></>
          }


          {/* h2L DATES */}
          {project.h2LEnabled &&
            <><div className="field grid">
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
            </div>
            </>}

          {/* lo DATES */}
          {project.loEnabled &&
            <>
              <div className="field grid">
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
              </div>
              <div className="field grid">
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
              </div>
            </>}

          {/* sp DATES */}
          {project.spEnabled &&
            <><div className="field grid">
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
            </div>
              <div className="field grid">
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
              </div></>}

          {/* ind DATES */}
          {project.indEnabled &&
            <><div className="field grid">
              <label
                htmlFor="indPredictedStart"
                style={{ width: '250px' }}
                className={classNames({
                  "p-error": isFormFieldValid("indPredictedStart"),
                })}
              >
                IND Predicted Start Date :
              </label>
              <Inplace closable>
                <InplaceDisplay>
                  {formik.values.indPredictedStart != null ? (formik.values.indPredictedStart).toLocaleDateString() : 'Click to Edit'}
                </InplaceDisplay>
                <InplaceContent>
                  <Calendar
                    id="indPredictedStart"
                    name="indPredictedStart"
                    value={formik.values.indPredictedStart}
                    viewDate={formik.values.indPredictedStart}
                    onChange={formik.handleChange}
                    style={{ width: '400px' }}
                    className={classNames({
                      "p-invalid": isFormFieldValid("indPredictedStart"),
                    })} />
                </InplaceContent>
              </Inplace>
              {getFormErrorMessage("indPredictedStart")}
            </div>
              <div className="field grid">
                <label
                  htmlFor="indStart"
                  style={{ width: '250px' }}
                  className={classNames({
                    "p-error": isFormFieldValid("indStart"),
                  })}
                >
                  IND Start Date :
                </label>
                <Inplace closable>
                  <InplaceDisplay>
                    {formik.values.indStart != null ? (formik.values.indStart).toLocaleDateString() : 'Click to Edit'}
                  </InplaceDisplay>
                  <InplaceContent>
                    <Calendar
                      id="indStart"
                      name="indStart"
                      value={formik.values.indStart}
                      viewDate={formik.values.indStart}
                      onChange={formik.handleChange}
                      style={{ width: '400px' }}
                      className={classNames({
                        "p-invalid": isFormFieldValid("indStart"),
                      })} />
                  </InplaceContent>
                </Inplace>
                {getFormErrorMessage("indStart")}
              </div>
            </>}

          {/* clinicalP1 DATES */}
          {project.clinicalP1Enabled &&
            <><div className="field grid">
              <label
                htmlFor="clinicalP1PredictedStart"
                style={{ width: '250px' }}
                className={classNames({
                  "p-error": isFormFieldValid("clinicalP1PredictedStart"),
                })}
              >
                P1 Predicted Start Date :
              </label>
              <Inplace closable>
                <InplaceDisplay>
                  {formik.values.clinicalP1PredictedStart != null ? (formik.values.clinicalP1PredictedStart).toLocaleDateString() : 'Click to Edit'}
                </InplaceDisplay>
                <InplaceContent>
                  <Calendar
                    id="clinicalP1PredictedStart"
                    name="clinicalP1PredictedStart"
                    value={formik.values.clinicalP1PredictedStart}
                    viewDate={formik.values.clinicalP1PredictedStart}
                    onChange={formik.handleChange}
                    style={{ width: '400px' }}
                    className={classNames({
                      "p-invalid": isFormFieldValid("clinicalP1PredictedStart"),
                    })} />
                </InplaceContent>
              </Inplace>
              {getFormErrorMessage("clinicalP1PredictedStart")}
            </div>
              <div className="field grid">
                <label
                  htmlFor="clinicalP1Start"
                  style={{ width: '250px' }}
                  className={classNames({
                    "p-error": isFormFieldValid("clinicalP1Start"),
                  })}
                >
                  P1 Start Date :
                </label>
                <Inplace closable>
                  <InplaceDisplay>
                    {formik.values.clinicalP1Start != null ? (formik.values.clinicalP1Start).toLocaleDateString() : 'Click to Edit'}
                  </InplaceDisplay>
                  <InplaceContent>
                    <Calendar
                      id="clinicalP1Start"
                      name="clinicalP1Start"
                      value={formik.values.clinicalP1Start}
                      viewDate={formik.values.clinicalP1Start}
                      onChange={formik.handleChange}
                      style={{ width: '400px' }}
                      className={classNames({
                        "p-invalid": isFormFieldValid("clinicalP1Start"),
                      })} />
                  </InplaceContent>
                </Inplace>
                {getFormErrorMessage("clinicalP1Start")}
              </div>
            </>}
          <div className="field grid">
            <Button
              icon="icon icon-common icon-database-submit"
              type="submit"
              label="Save Date Changes"
              className="p-button-secondary"
              style={{ width: "20rem" }}
              loading={editingProject}
            />
          </div>
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
          "haStart",
          "haPredictedStart",
          "haDescription",
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

    </React.Fragment>
  );
};

export default ProjectSettingsDates;
