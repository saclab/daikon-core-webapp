import React from "react";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const GeneViewProtectedDataAddUnpublishedStructuralInformationForm = ({
  add,
  adding,
  closeSidebar,
}) => {
  const formik = useFormik({
    initialValues: {
      organization: "",
      method: "",
      resolution: "",
      ligands: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.organization) {
        errors.organization = "Organization is required.";
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
            htmlFor="organization"
            className={classNames({
              "p-error": isFormFieldValid("organization"),
            })}
          >
            Organization*
          </label>
          <InputText
            id="organization"
            value={formik.values.organization}
            onChange={formik.handleChange}
            autoFocus
            className={classNames({
              "p-invalid": isFormFieldValid("organization"),
            })}
          />
          {getFormErrorMessage("organization")}
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
            autoFocus
            className={classNames({
              "p-invalid": isFormFieldValid("method"),
            })}
          />
          {getFormErrorMessage("method")}
        </div>

        <div className="field">
          <label
            htmlFor="resolution"
            className={classNames({
              "p-error": isFormFieldValid("resolution"),
            })}
          >
            Resolution
          </label>
          <InputText
            id="resolution"
            value={formik.values.resolution}
            onChange={formik.handleChange}
            autoFocus
            className={classNames({
              "p-invalid": isFormFieldValid("resolution"),
            })}
          />
          {getFormErrorMessage("resolution")}
        </div>

        <div className="field">
          <label
            htmlFor="ligands"
            className={classNames({
              "p-error": isFormFieldValid("ligands"),
            })}
          >
            Ligands
          </label>
          <InputText
            id="ligands"
            value={formik.values.ligands}
            onChange={formik.handleChange}
            autoFocus
            className={classNames({
              "p-invalid": isFormFieldValid("ligands"),
            })}
          />
          {getFormErrorMessage("ligands")}
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

export default GeneViewProtectedDataAddUnpublishedStructuralInformationForm;
