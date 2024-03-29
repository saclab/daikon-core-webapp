import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React from "react";

const GeneViewProtectedDataAddCrispRiStrainForm = ({
  add,
  adding,
  closeSidebar,
}) => {
  const formik = useFormik({
    initialValues: {
      crispRiStrain: "",
    },

    validate: (data) => {
      let errors = {};

      if (!data.crispRiStrain) {
        errors.crispRiStrain = "CrispRi Strain is required";
      }
      return errors;
    },
    onSubmit: (data) => {
      add(data).then((res) => {
        if (res !== null) {
          closeSidebar();
          formik.resetForm();
        }
      });
    },
  });

  const isFormFieldValid = (element) =>
    !!(formik.touched[element] && formik.errors[element]);
  const getFormErrorMessage = (element) => {
    return (
      isFormFieldValid(element) && (
        <small className="p-error">{formik.errors[element]}</small>
      )
    );
  };

  return (
    <div className="card w-full">
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <div className="field">
          <label
            htmlFor="crispRiStrain"
            className={classNames({
              "p-error": isFormFieldValid("crispRiStrain"),
            })}
          >
            CRISPRi Strain*
          </label>
          <InputText
            id="crispRiStrain"
            value={formik.values.crispRiStrain}
            onChange={formik.handleChange}
            autoFocus
            className={classNames({
              "p-invalid": isFormFieldValid("crispRiStrain"),
            })}
          />
          {getFormErrorMessage("crispRiStrain")}
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
            autoResize
            rows={4}
            value={formik.values.notes}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("notes"),
            })}
          />
          {getFormErrorMessage("notes")}
        </div>
        <div className="flex justify-content-center">
          <div className="flex">
            <Button
              icon="icon icon-common icon-database-submit"
              type="submit"
              label="Add to database"
              className="p-button-secondary p-button-sm"
              loading={adding}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeneViewProtectedDataAddCrispRiStrainForm;
