import React from "react";
import { observer } from "mobx-react-lite";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";


const UserManagerOrgForm = ({
  addOrg,
  loadingOrg,
  closeSideBar,
}) => {
  const formik = useFormik({
    initialValues: {
      alias: "",
      name: "",
      address: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.alias) {
        errors.alias = "Alias is required.";
      }

      if (!data.name) {
        errors.name = "Org's name is required";
      }

      return errors;
    },
    onSubmit: (data) => {
      
      console.log(data);
      addOrg(data)
        .then((resp) => {

          closeSideBar();
        })
        .catch((err) => console.log(err));
      formik.resetForm();
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div>
      <div className="p-fluid p-formgrid p-grid">
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="name"
              className={classNames({
                "p-error": isFormFieldValid("name"),
              })}
            >
              Org Name
            </label>
            <InputText
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              autoFocus
              className={classNames({
                "p-invalid": isFormFieldValid("name"),
              })}
            />

            {getFormErrorMessage("name")}
          </div>

          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="alias"
              className={classNames({
                "p-error": isFormFieldValid("alias"),
              })}
            >
              Alias
            </label>
            <InputText
              id="alias"
              answer="alias"
              value={formik.values.alias}
              onChange={formik.handleChange}
              autoFocus
              className={classNames({
                "p-invalid": isFormFieldValid("alias"),
              })}
            />

            {getFormErrorMessage("alias")}
          </div>

          

          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="address"
              className={classNames({
                "p-error": isFormFieldValid("address"),
              })}
            >
              Address
            </label>

            <InputTextarea
              rows={5}
              id="address"
              answer="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              autoFocus
              className={classNames({
                "p-invalid": isFormFieldValid("address"),
              })}
            />

            {getFormErrorMessage("address")}
          </div>
          <Button
            icon="icon icon-common icon-database-submit"
            type="submit"
            label="Add organization"
            className="p-mt-2"
            loading={loadingOrg}
          />
        </form>
      </div>
    </div>
  );
};

export default observer(UserManagerOrgForm);
