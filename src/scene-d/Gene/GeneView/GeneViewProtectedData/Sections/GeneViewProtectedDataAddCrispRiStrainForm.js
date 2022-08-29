import React from "react";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

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
        errors.crispRiStrain = "";
      }
      return errors;
    },
    onSubmit: (data) => {
      console.log(data);
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
