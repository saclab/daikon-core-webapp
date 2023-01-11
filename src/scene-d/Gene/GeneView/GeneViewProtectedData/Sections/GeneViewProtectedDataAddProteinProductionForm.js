import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
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
      date: "",
    },

    validate: (data) => {
      let errors = {};

      if (!data.production) {
        errors.production = "Production is required.";
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
            htmlFor="date"
            className={classNames({
              "p-error": isFormFieldValid("date"),
            })}
          >
            Date
          </label>
          <Calendar
            id="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            dateFormat="dd/mm/yy"
            mask="99/99/9999"
            showIcon
            className={classNames({
              "p-invalid": isFormFieldValid("date"),
            })}
          />
          {getFormErrorMessage("date")}
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
