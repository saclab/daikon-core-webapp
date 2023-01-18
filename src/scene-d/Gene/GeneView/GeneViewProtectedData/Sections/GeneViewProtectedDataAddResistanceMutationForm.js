import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";

const GeneViewProtectedDataAddResistanceMutationForm = ({
  add,
  adding,
  closeSidebar,
}) => {
  const formik = useFormik({
    initialValues: {
      mutation: "",
      isolate: "",
      parentStrain: "",
      compound: "",
      shiftInMic: "",
      org: "",
    },

    validate: (data) => {
      let errors = {};

      if (!data.mutation) {
        errors.mutation = "Mutation is required.";
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
            htmlFor="mutation"
            className={classNames({
              "p-error": isFormFieldValid("mutation"),
            })}
          >
            Mutation*
          </label>

          <InputText
            id="mutation"
            value={formik.values.mutation}
            onChange={formik.handleChange}
            autoFocus
            className={classNames({
              "p-invalid": isFormFieldValid("mutation"),
            })}
          />
          {getFormErrorMessage("mutation")}
        </div>

        <div className="field">
          <label
            htmlFor="isolate"
            className={classNames({
              "p-error": isFormFieldValid("isolate"),
            })}
          >
            Isolate
          </label>
          <InputText
            id="isolate"
            value={formik.values.isolate}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("isolate"),
            })}
          />
          {getFormErrorMessage("isolate")}
        </div>

        <div className="field">
          <label
            htmlFor="parentStrain"
            className={classNames({
              "p-error": isFormFieldValid("parentStrain"),
            })}
          >
            Parent Strain
          </label>
          <InputText
            id="parentStrain"
            value={formik.values.parentStrain}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("parentStrain"),
            })}
          />
          {getFormErrorMessage("parentStrain")}
        </div>

        <div className="field">
          <label
            htmlFor="compound"
            className={classNames({
              "p-error": isFormFieldValid("compound"),
            })}
          >
            Compound
          </label>
          <InputText
            id="compound"
            value={formik.values.compound}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("compound"),
            })}
          />
          {getFormErrorMessage("compound")}
        </div>

        <div className="field">
          <label
            htmlFor="shiftInMic"
            className={classNames({
              "p-error": isFormFieldValid("shiftInMic"),
            })}
          >
            Shift In Mic
          </label>
          <InputText
            id="shiftInMic"
            value={formik.values.shiftInMic}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("shiftInMic"),
            })}
          />
          {getFormErrorMessage("shiftInMic")}
        </div>

        <div className="field">
          <label
            htmlFor="org"
            className={classNames({
              "p-error": isFormFieldValid("org"),
            })}
          >
            Org
          </label>
          <InputText
            id="org"
            value={formik.values.org}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("org"),
            })}
          />
          {getFormErrorMessage("org")}
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

export default GeneViewProtectedDataAddResistanceMutationForm;
