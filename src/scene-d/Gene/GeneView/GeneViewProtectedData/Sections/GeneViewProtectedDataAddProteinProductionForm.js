import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React from "react";

const GeneViewProtectedDataAddProteinProductionForm = ({
  add,
  adding,
  closeSidebar,
}) => {
  const formik = useFormik({
    initialValues: {
      production: "",
      method: "",
      purity: "",
      url: "",
      pmid: "",
      notes: "",
    },

    validate: (data) => {
      let errors = {};

      if (!data.production) {
        errors.production = "Production is required.";
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
            htmlFor="production"
            className={classNames({
              "p-error": isFormFieldValid("production"),
            })}
          >
            Production*
          </label>
          <InputText
            id="production"
            value={formik.values.production}
            onChange={formik.handleChange}
            autoFocus
            className={classNames({
              "p-invalid": isFormFieldValid("production"),
            })}
          />
          {getFormErrorMessage("production")}
        </div>

        <div className="field">
          <label
            htmlFor="method"
            className={classNames({
              "p-error": isFormFieldValid("method"),
            })}
          >
            Method
          </label>
          <InputText
            id="method"
            value={formik.values.method}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("method"),
            })}
          />
          {getFormErrorMessage("method")}
        </div>

        <div className="field">
          <label
            htmlFor="purity"
            className={classNames({
              "p-error": isFormFieldValid("purity"),
            })}
          >
            Purity
          </label>
          <InputText
            id="purity"
            value={formik.values.purity}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("purity"),
            })}
          />
          {getFormErrorMessage("purity")}
        </div>

        <div className="field">
          <label
            htmlFor="pmid"
            className={classNames({
              "p-error": isFormFieldValid("pmid"),
            })}
          >
            PMID
          </label>
          <InputText
            id="pmid"
            value={formik.values.pmid}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("pmid"),
            })}
          />
          {getFormErrorMessage("pmid")}
        </div>

        <div className="field">
          <label
            htmlFor="url"
            className={classNames({
              "p-error": isFormFieldValid("url"),
            })}
          >
            URL
          </label>
          <InputText
            id="url"
            value={formik.values.url}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("url"),
            })}
          />
          {getFormErrorMessage("url")}
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

export default GeneViewProtectedDataAddProteinProductionForm;
