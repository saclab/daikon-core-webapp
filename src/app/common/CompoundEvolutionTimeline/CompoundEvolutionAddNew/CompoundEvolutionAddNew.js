import React, { useContext } from "react";
import { useFormik } from "formik";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../../app/stores/rootStore";
import { InputText } from "primereact/inputtext";

const CompoundEvolutionAddNew = ({ closeSidebar }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    addingCompoundEvolution,
    addCompoundEvolution,
    selectedProject,
    loadingProject,
    fetchCompoundEvolution,
  } = rootStore.projectStore;

  const formik = useFormik({
    initialValues: {
      smile: "",
      molWeight: "",
      molArea: "",
      MIC: "",
      IC50: "",
      notes: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.smile) {
        errors.smile = "Smile string is required.";
      }

      if (!data.notes) {
        errors.notes = "A note is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      data["projectId"] = selectedProject.id;
      console.log(data);
      addCompoundEvolution(data).then((res) => {
        if (res !== null) {
          closeSidebar();
          fetchCompoundEvolution(selectedProject.id);
          formik.resetForm();
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

  if (!addingCompoundEvolution && !loadingProject) {
    return (
      <div className="flex flex-column w-full">
        <div>
          <div className="card w-full">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className="field">
                <label
                  htmlFor="smile"
                  className={classNames({
                    "p-error": isFormFieldValid("smile"),
                  })}
                >
                  Smile String
                </label>
                <InputTextarea
                  id="smile"
                  answer="smile"
                  value={formik.values.smile}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("smile"),
                  })}
                />
                {getFormErrorMessage("smile")}
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
              </div>

              <div className="field">
                <label
                  htmlFor="MIC"
                  className={classNames({
                    "p-error": isFormFieldValid("MIC"),
                  })}
                >
                  MIC
                </label>
                <InputText
                  id="MIC"
                  type="decimal"
                  value={formik.values.MIC}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("MIC"),
                  })}
                />
              </div>

              <div className="field">
                <label
                  htmlFor="IC50"
                  className={classNames({
                    "p-error": isFormFieldValid("IC50"),
                  })}
                >
                  IC50
                </label>
                <InputText
                  id="IC50"
                  type="decimal"
                  value={formik.values.IC50}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("IC50"),
                  })}
                />
              </div>

              <div className="field">
                <label
                  htmlFor="notes"
                  className={classNames({
                    "p-error": isFormFieldValid("notes"),
                  })}
                >
                  Notes
                </label>
                <InputTextarea
                  id="notes"
                  answer="notes"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  autoResize
                  rows={5}
                  className={classNames({
                    "p-invalid": isFormFieldValid("notes"),
                  })}
                />
                {getFormErrorMessage("notes")}
              </div>

              <div className="field">
                <Button
                  icon="icon icon-common icon-database-submit"
                  type="submit"
                  label="Add compound"
                  className="p-mt-2"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <ProgressBar mode="indeterminate" style={{ height: "6px" }} />;
};

export default observer(CompoundEvolutionAddNew);
