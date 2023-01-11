import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

const ScreenEdit = ({ selectedScreenTargetFilter, close }) => {
  const rootStore = useContext(RootStoreContext);
  const { selectedScreen, editScreen } = rootStore.screenStore;
  const { fetchOrgs, Orgs } = rootStore.adminStore;
  const { appVars } = rootStore.generalStore;

  useEffect(() => {
    fetchOrgs();
  }, [fetchOrgs]);

  const formik = useFormik({
    initialValues: {
      org: selectedScreen.org,
      promotionDate: new Date(selectedScreen.promotionDate),
      notes: selectedScreen.notes,
      method: selectedScreen.method,
    },
    validate: (data) => {
      let errors = {};

      if (!data.promotionDate) {
        errors.promotionDate = "Promotion date  is required.";
      }

      if (data.method === "") {
        errors.method = "Method is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      data["id"] = selectedScreen.id;
      data["orgId"] = data.org.id;
      console.log(data);
      editScreen(data).then((res) => {
        if (res !== null) {
          formik.resetForm();
          close();
        }
      });
    },
  });

  const isFormFieldValid = (library) =>
    !!(formik.touched[library] && formik.errors[library]);
  const getFormErrorMessage = (library) => {
    return (
      isFormFieldValid(library) && (
        <small className="p-error">{formik.errors[library]}</small>
      )
    );
  };

  if (
    selectedScreen === null ||
    selectedScreen.targetName !== selectedScreenTargetFilter
  ) {
    return (
      <div>
        <h3>Select a screen to edit.</h3>
      </div>
    );
  }

  return (
    <div>
      <h2>{selectedScreen.screenName}</h2>
      <div className="card w-full">
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="field">
            <label
              htmlFor="promotionDate"
              className={classNames({
                "p-error": isFormFieldValid("promotionDate"),
              })}
            >
              Promotion Date
            </label>

            <Calendar
              id="promotionDate"
              name="promotionDate"
              value={formik.values.promotionDate}
              onChange={formik.handleChange}
              dateFormat="dd/mm/yy"
              mask="99/99/9999"
              showIcon
              className={classNames({
                "p-invalid": isFormFieldValid("promotionDate"),
              })}
            />
            {getFormErrorMessage("promotionDate")}
          </div>
          <div className="field">
            <label
              htmlFor="org"
              className={classNames({
                "p-error": isFormFieldValid("org"),
              })}
            >
              Screening Organization
            </label>

            <Dropdown
              value={formik.values.org}
              options={Orgs}
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
              htmlFor="method"
              className={classNames({
                "p-error": isFormFieldValid("method"),
              })}
            >
              Method
            </label>
            <Dropdown
              id="method"
              answer="method"
              options={appVars?.screeningMethods}
              value={formik.values.method}
              placeholder="Select a method"
              onChange={formik.handleChange}
              className={classNames({
                "p-invalid": isFormFieldValid("method"),
              })}
            />

            {getFormErrorMessage("method")}
          </div>

          <div className="field">
            <label
              htmlFor="notes"
              className={classNames({
                "p-error": isFormFieldValid("comment"),
              })}
            >
              Notes
            </label>
            <InputTextarea
              id="notes"
              answer="notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
              className={classNames({
                "p-invalid": isFormFieldValid("notes"),
              })}
            />
          </div>

          <div className="flex gap-4 align-content-right align-items-right">
            <Button label="Save" className="p-button-success" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default observer(ScreenEdit);
