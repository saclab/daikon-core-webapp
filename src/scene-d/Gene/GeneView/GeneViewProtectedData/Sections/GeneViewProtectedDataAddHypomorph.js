import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";

const GeneViewProtectedDataAddHypomorph = ({ add, adding, closeSidebar }) => {
  const formik = useFormik({
    initialValues: {
      knockdownStrain: "",
      phenotype: "",
    },

    validate: (data) => {
      let errors = {};

      if (!data.knockdownStrain) {
        errors.knockdownStrain = "Knockdown Strain is required.";
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
            htmlFor="knockdownStrain"
            className={classNames({
              "p-error": isFormFieldValid("knockdownStrain"),
            })}
          >
            Knockdown Strain*
          </label>
          <InputText
            id="knockdownStrain"
            value={formik.values.knockdownStrain}
            onChange={formik.handleChange}
            autoFocus
            className={classNames({
              "p-invalid": isFormFieldValid("knockdownStrain"),
            })}
          />
          {getFormErrorMessage("knockdownStrain")}
        </div>

        <div className="field">
          <label
            htmlFor="phenotype"
            className={classNames({
              "p-error": isFormFieldValid("phenotype"),
            })}
          >
            Phenotype
          </label>
          <InputText
            id="phenotype"
            value={formik.values.phenotype}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("phenotype"),
            })}
          />
          {getFormErrorMessage("phenotype")}
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

export default GeneViewProtectedDataAddHypomorph;
