import React from "react";
import { observer } from "mobx-react-lite";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { InputSwitch } from "primereact/inputswitch";

const UserManagerUserForm = ({
  org,
  roles,
  addAccount,
  loadingAddAccount,
  closeSideBar,
}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      displayName: "",
      org: "",
      roles: "",
      bio: "",
      lock: false,
    },
    validate: (data) => {
      let errors = {};

      if (!data.email) {
        errors.email = "Email is required.";
      }

      if (!data.displayName) {
        errors.displayName = "Full Name is required.";
      }

      if (!data.org) {
        errors.org = "Org is required.";
      }

      if (!data.roles) {
        errors.roles = "Roles are required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      data["orgId"] = data.org.id;
      data["roles"] = data.roles.map((role) => role.name);
      console.log(data);
      addAccount(data)
        .then((resp) => {

          closeSideBar();
        })
        .catch((err) => console.log(err));
      //formik.resetForm();
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
              htmlFor="email"
              className={classNames({
                "p-error": isFormFieldValid("email"),
              })}
            >
              Email
            </label>
            <InputText
              id="email"
              answer="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              autoFocus
              className={classNames({
                "p-invalid": isFormFieldValid("email"),
              })}
            />

            {getFormErrorMessage("email")}
          </div>

          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="displayName"
              className={classNames({
                "p-error": isFormFieldValid("displayName"),
              })}
            >
              Display Name (Full Name)
            </label>
            <InputText
              id="displayName"
              answer="displayName"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              autoFocus
              className={classNames({
                "p-invalid": isFormFieldValid("displayName"),
              })}
            />

            {getFormErrorMessage("displayName")}
          </div>

          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="org"
              className={classNames({
                "p-error": isFormFieldValid("org"),
              })}
            >
              Organization
            </label>

            <Dropdown
              value={formik.values.org}
              options={org}
              onChange={formik.handleChange("org")}
              optionLabel="name"
              placeholder="Select an org"
              filter
              showClear
              filterBy="name"
              className={classNames({
                "p-invalid": isFormFieldValid("org"),
              })}
            />
            {getFormErrorMessage("org")}
          </div>

          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="roles"
              className={classNames({
                "p-error": isFormFieldValid("roles"),
              })}
            >
              Roles
            </label>
            <MultiSelect
              value={formik.values.roles}
              options={roles}
              onChange={formik.handleChange("roles")}
              optionLabel="name"
              placeholder="Select roles"
              filter
              showClear
              filterBy="name"
              className={classNames({
                "p-invalid": isFormFieldValid("roles"),
              })}
            />

            {getFormErrorMessage("roles")}
          </div>

          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="bio"
              className={classNames({
                "p-error": isFormFieldValid("bio"),
              })}
            >
              Bio
            </label>

            <InputTextarea
              rows={5}
              id="bio"
              answer="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              autoFocus
              className={classNames({
                "p-invalid": isFormFieldValid("bio"),
              })}
            />

            {getFormErrorMessage("bio")}
          </div>

          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="lock"
              className={classNames({
                "p-error": isFormFieldValid("lock"),
              })}
            >
              Lock Account ?
            </label>
            <br />
            <InputSwitch
              id="lock"
              checked={formik.values.lock}
              onChange={formik.handleChange}
              className={classNames({
                "p-invalid": isFormFieldValid("lock"),
              })}
            />
          </div>
          <Button
            icon="icon icon-common icon-database-submit"
            type="submit"
            label="Add user to app"
            className="p-mt-2"
            loading={loadingAddAccount}
          />
        </form>
      </div>
    </div>
  );
};

export default observer(UserManagerUserForm);
