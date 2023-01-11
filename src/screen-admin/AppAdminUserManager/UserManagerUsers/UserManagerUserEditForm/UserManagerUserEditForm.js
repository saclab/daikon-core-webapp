import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React from "react";

import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { MultiSelect } from "primereact/multiselect";

const UserManagerUserEditForm = ({
  org,
  roles,
  editAccount,
  loadingAddAccount,
  closeSideBar,
  user,
}) => {
  let userRoles = user.roles.map((roleName) =>
    roles.find((r) => r.name === roleName)
  );

  const formik = useFormik({
    initialValues: {
      email: user.email,
      displayName: user.displayName,
      org: org.find((o) => o.id === user.orgId),
      roles: userRoles,
      bio: user.bio,
      lock: user.lock,
    },
    validate: (data) => {
      let errors = {};

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
      data["id"] = user.email;
      data["orgId"] = data.org.id;
      data["roles"] = data.roles.map((role) => role.name);
      editAccount(data)
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
    <div className="card w-full">
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <div className="field">
          <label
            htmlFor="email"
            className={classNames({
              "p-error": isFormFieldValid("email"),
            })}
          >
            Email
          </label>
          <p id="email">
            <b>{user.email}</b>
          </p>
        </div>

        <div className="field">
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

        <div className="field">
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

        <div className="field">
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

        <div className="field">
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

        <div className="field">
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
          label="Update user"
          className="p-mt-2"
          loading={loadingAddAccount}
        />
      </form>
    </div>
  );
};

export default observer(UserManagerUserEditForm);
