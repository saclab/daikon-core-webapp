import React from "react";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const GeneViewProtectedDataAddProteinActivityAssayForm = ({
  add,
  adding,
  closeSidebar,
}) => {
  const formik = useFormik({
    initialValues: {
      activity: "",
      type: "",
      throughput: "",
    },

    validate: (data) => {
      let errors = {};

      if (!data.activity) {
        errors.activity = "Activity is required.";
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
            htmlFor="activity"
            className={classNames({
              "p-error": isFormFieldValid("activity"),
            })}
          >
            Activity*
          </label>
          <InputText
            id="activity"
            value={formik.values.activity}
            onChange={formik.handleChange}
            autoFocus
            className={classNames({
              "p-invalid": isFormFieldValid("activity"),
            })}
          />
          {getFormErrorMessage("activity")}
        </div>

        <div className="field">
          <label
            htmlFor="type"
            className={classNames({
              "p-error": isFormFieldValid("type"),
            })}
          >
            Type
          </label>
          <InputText
            id="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("type"),
            })}
          />
          {getFormErrorMessage("type")}
        </div>

        <div className="field">
          <label
            htmlFor="throughput"
            className={classNames({
              "p-error": isFormFieldValid("throughput"),
            })}
          >
            Throughput
          </label>
          <InputText
            id="throughput"
            value={formik.values.throughput}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("throughput"),
            })}
          />
          {getFormErrorMessage("throughput")}
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

export default GeneViewProtectedDataAddProteinActivityAssayForm;
