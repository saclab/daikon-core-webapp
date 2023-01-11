import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React from "react";

const UserManagerOrgEditForm = ({ org, editOrg, loadingOrg, closeSideBar }) => {
  const formik = useFormik({
    initialValues: {
      alias: org.alias,
      name: org.name,
      address: org.address,
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
      data["id"] = org.id;
      editOrg(data)
        .then((resp) => {
          closeSideBar();
        })
        .catch((err) => console.error(err));
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
    <div className="card w-full">
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <div className="field">
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

        <div className="field">
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

        <div className="field">
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
          label="Update organization"
          className="p-mt-2"
          loading={loadingOrg}
        />
      </form>
    </div>
  );
};

export default observer(UserManagerOrgEditForm);
