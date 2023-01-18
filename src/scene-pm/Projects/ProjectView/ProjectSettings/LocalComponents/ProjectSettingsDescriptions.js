import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";

import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace";

import { RootStoreContext } from "../../../../../app/stores/rootStore";

const ProjectSettingsDescriptions = ({ project }) => {
  const rootStore = useContext(RootStoreContext);
  const { editProject, editingProject } = rootStore.projectStore;

  const formik = useFormik({
    initialValues: {
      haDescription: project.haDescription,

      h2LDescription: project.h2LDescription,

      loDescription: project.loDescription,

      spDescription: project.spDescription,

      indDescription: project.indDescription,

      clinicalDescriptiont: project.clinicalDescriptiont,
    },
    validate: (data) => {
      let errors = {};
      return errors;
    },
    onSubmit: (data) => {
      var editedProject = { ...project };
      editedProject.haDescription = data.haDescription;
      editedProject.h2LDescription = data.h2LDescription;
      editedProject.loDescription = data.loDescription;
      editedProject.spDescription = data.spDescription;
      editedProject.indDescription = data.indDescription;
      editedProject.clinicalDescriptiont = data.clinicalDescriptiont;
      editProject(editedProject);
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
    <div className="card w-full">
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        {/* HA Description */}
        {project.haEnabled && (
          <>
            <div className="field grid">
              <label
                htmlFor="haDescription"
                style={{ width: "250px" }}
                className={classNames({
                  "p-error": isFormFieldValid("haDescription"),
                })}
              >
                HA Description :
              </label>
              <Inplace closable>
                <InplaceDisplay>
                  <div style={{ width: "30rem", lineHeight: "100%" }}>
                    {formik.values.haDescription || "Click to Edit"}
                  </div>
                </InplaceDisplay>
                <InplaceContent>
                  <InputTextarea
                    id="haDescription"
                    name="haDescription"
                    value={formik.values.haDescription}
                    onChange={formik.handleChange}
                    style={{ width: "40rem" }}
                    rows={5}
                    cols={30}
                    autoResize
                    className={classNames({
                      "p-invalid": isFormFieldValid("haDescription"),
                    })}
                  />
                </InplaceContent>
              </Inplace>
              {getFormErrorMessage("haDescription")}
            </div>
          </>
        )}

        {/* H2L Description */}
        {project.h2LEnabled && (
          <>
            <div className="field grid">
              <label
                htmlFor="h2LDescription"
                style={{ width: "250px" }}
                className={classNames({
                  "p-error": isFormFieldValid("h2LDescription"),
                })}
              >
                H2L Description :
              </label>
              <Inplace closable>
                <InplaceDisplay>
                  <div style={{ width: "30rem", lineHeight: "100%" }}>
                    {formik.values.h2LDescription || "Click to Edit"}
                  </div>
                </InplaceDisplay>
                <InplaceContent>
                  <InputTextarea
                    id="h2LDescription"
                    name="h2LDescription"
                    value={formik.values.h2LDescription}
                    onChange={formik.handleChange}
                    style={{ width: "40rem" }}
                    rows={5}
                    cols={30}
                    autoResize
                    className={classNames({
                      "p-invalid": isFormFieldValid("h2LDescription"),
                    })}
                  />
                </InplaceContent>
              </Inplace>
              {getFormErrorMessage("h2LDescription")}
            </div>
          </>
        )}

        {/* lo Description */}
        {project.loEnabled && (
          <>
            <div className="field grid">
              <label
                htmlFor="loDescription"
                style={{ width: "250px" }}
                className={classNames({
                  "p-error": isFormFieldValid("loDescription"),
                })}
              >
                lo Description :
              </label>
              <Inplace closable>
                <InplaceDisplay>
                  <div style={{ width: "30rem", lineHeight: "100%" }}>
                    {formik.values.loDescription || "Click to Edit"}
                  </div>
                </InplaceDisplay>
                <InplaceContent>
                  <InputTextarea
                    id="loDescription"
                    name="loDescription"
                    value={formik.values.loDescription}
                    onChange={formik.handleChange}
                    style={{ width: "40rem" }}
                    rows={5}
                    cols={30}
                    autoResize
                    className={classNames({
                      "p-invalid": isFormFieldValid("loDescription"),
                    })}
                  />
                </InplaceContent>
              </Inplace>
              {getFormErrorMessage("loDescription")}
            </div>
          </>
        )}

        {/* sp Description */}
        {project.spEnabled && (
          <>
            <div className="field grid">
              <label
                htmlFor="spDescription"
                style={{ width: "250px" }}
                className={classNames({
                  "p-error": isFormFieldValid("spDescription"),
                })}
              >
                sp Description :
              </label>
              <Inplace closable>
                <InplaceDisplay>
                  <div style={{ width: "30rem", lineHeight: "100%" }}>
                    {formik.values.spDescription || "Click to Edit"}
                  </div>
                </InplaceDisplay>
                <InplaceContent>
                  <InputTextarea
                    id="spDescription"
                    name="spDescription"
                    value={formik.values.spDescription}
                    onChange={formik.handleChange}
                    style={{ width: "40rem" }}
                    rows={5}
                    cols={30}
                    autoResize
                    className={classNames({
                      "p-invalid": isFormFieldValid("spDescription"),
                    })}
                  />
                </InplaceContent>
              </Inplace>
              {getFormErrorMessage("spDescription")}
            </div>
          </>
        )}

        {/* ind Description */}
        {project.indEnabled && (
          <>
            <div className="field grid">
              <label
                htmlFor="indDescription"
                style={{ width: "250px" }}
                className={classNames({
                  "p-error": isFormFieldValid("indDescription"),
                })}
              >
                ind Description :
              </label>
              <Inplace closable>
                <InplaceDisplay>
                  <div style={{ width: "30rem", lineHeight: "100%" }}>
                    {formik.values.indDescription || "Click to Edit"}
                  </div>
                </InplaceDisplay>
                <InplaceContent>
                  <InputTextarea
                    id="indDescription"
                    name="indDescription"
                    value={formik.values.indDescription}
                    onChange={formik.handleChange}
                    style={{ width: "40rem" }}
                    rows={5}
                    cols={30}
                    autoResize
                    className={classNames({
                      "p-invalid": isFormFieldValid("indDescription"),
                    })}
                  />
                </InplaceContent>
              </Inplace>
              {getFormErrorMessage("indDescription")}
            </div>
          </>
        )}

        {/* clinicalP1 Description */}
        {project.clinicalP1Enabled && (
          <>
            <div className="field grid">
              <label
                htmlFor="clinicalP1Description"
                style={{ width: "250px" }}
                className={classNames({
                  "p-error": isFormFieldValid("clinicalP1Description"),
                })}
              >
                clinicalP1 Description :
              </label>
              <Inplace closable>
                <InplaceDisplay>
                  <div style={{ width: "30rem", lineHeight: "100%" }}>
                    {formik.values.clinicalP1Description || "Click to Edit"}
                  </div>
                </InplaceDisplay>
                <InplaceContent>
                  <InputTextarea
                    id="clinicalP1Description"
                    name="clinicalP1Description"
                    value={formik.values.clinicalP1Description}
                    onChange={formik.handleChange}
                    style={{ width: "40rem" }}
                    rows={5}
                    cols={30}
                    autoResize
                    className={classNames({
                      "p-invalid": isFormFieldValid("clinicalP1Description"),
                    })}
                  />
                </InplaceContent>
              </Inplace>
              {getFormErrorMessage("clinicalP1Description")}
            </div>
          </>
        )}

        <div className="field grid">
          <Button
            icon="icon icon-common icon-database-submit"
            type="submit"
            label="Save Description Changes"
            className="p-button-secondary"
            style={{ width: "20rem" }}
            loading={editingProject}
          />
        </div>
      </form>
    </div>
  );
};

export default ProjectSettingsDescriptions;
