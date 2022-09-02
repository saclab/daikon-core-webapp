import React from 'react'
import { useFormik } from 'formik';
import { classNames } from "primereact/utils";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from "primereact/dropdown";

const GeneViewProtectedDataAddEssentialityForm = ({ add, adding, closeSidebar }) => {


  const formik = useFormik({
    initialValues: {
      classification: "",
      condition: "",
      strain: "",
      method: "",
      reference: "",
      notes: "",
    },

    validate: (data) => {
      let errors = {};

      if (!data.classification) {
        errors.classification = "Classification  is required.";
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
            htmlFor="classification"
            className={classNames({
              "p-error": isFormFieldValid("classification"),
            })}
          >
            Classification *
          </label>
          <Dropdown
            id="classification"
            value={formik.values.classification}
            options={[{name: 'Essential', value: 'Essential'},{name: 'Non-essential', value: 'Non-essential'}]}
            onChange={formik.handleChange}
            placeholder="Select a classification"
            optionLabel="name"
            autoFocus
            className={classNames({
              "p-invalid": isFormFieldValid("classification"),
            })}
          />
          {getFormErrorMessage("classification")}
        </div>

        <div className="field">
          <label
            htmlFor="condition"
            className={classNames({
              "p-error": isFormFieldValid("condition"),
            })}
          >
            Condition
          </label>
          <InputText
            id="condition"
            value={formik.values.condition}
            onChange={formik.handleChange}
            
            className={classNames({
              "p-invalid": isFormFieldValid("condition"),
            })}
          />
          {getFormErrorMessage("condition")}
        </div>

        <div className="field">
          <label
            htmlFor="strain"
            className={classNames({
              "p-error": isFormFieldValid("strain"),
            })}
          >
            Strain
          </label>
          <InputText
            id="strain"
            value={formik.values.strain}
            onChange={formik.handleChange}
            
            className={classNames({
              "p-invalid": isFormFieldValid("strain"),
            })}
          />
          {getFormErrorMessage("strain")}
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
            htmlFor="reference"
            className={classNames({
              "p-error": isFormFieldValid("reference"),
            })}
          >
            Reference
          </label>
          <InputText
            id="reference"
            value={formik.values.reference}
            onChange={formik.handleChange}
            
            className={classNames({
              "p-invalid": isFormFieldValid("reference"),
            })}
          />
          {getFormErrorMessage("reference")}
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
  )
}

export default GeneViewProtectedDataAddEssentialityForm