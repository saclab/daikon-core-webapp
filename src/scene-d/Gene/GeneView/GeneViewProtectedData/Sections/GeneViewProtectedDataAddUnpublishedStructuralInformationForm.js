import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React, { useContext, useState } from "react";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

const GeneViewProtectedDataAddUnpublishedStructuralInformationForm = ({
  add,
  adding,
  closeSidebar,
}) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);

  const { appVars } = rootStore.generalStore;
  const [filteredResearchers, setFilteredResearchers] = useState([]);
  const [filteredOrgs, setFilteredOrgs] = useState([]);

  const searchResearcher = (event) => {
    const query = event.query;
    const filteredResults = appVars.appUsersFlattened.filter((username) =>
      username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResearchers(filteredResults);
  };

  const searchOrgs = (event) => {
    const query = event.query;
    const filteredResults = appVars.appOrgsAliasFlattened.filter((org) =>
      org.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOrgs(filteredResults);
  };

  const formik = useFormik({
    initialValues: {
      organization: "",
      method: "",
      resolution: "",
      ligands: "",
      url: "",
      notes: "",
      reference: "",
      researcher: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.organization) {
        errors.organization = "Organization is required.";
      }
      return errors;
    },
    onSubmit: (data) => {
      data.organization = data.organization.alias;

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
            Organization
          </label>
          <AutoComplete
            id="organization"
            value={formik.values.organization}
            delay={500}
            suggestions={filteredOrgs}
            completeMethod={searchOrgs}
            onChange={formik.handleChange}
            dropdown
            forceSelection={true}
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
            className={classNames({
              "p-invalid": isFormFieldValid("ligands"),
            })}
          />
          {getFormErrorMessage("ligands")}
        </div>

        <div className="field">
          <label
            htmlFor="researcher"
            className={classNames({
              "p-error": isFormFieldValid("researcher"),
            })}
          >
            Researcher
          </label>
          <AutoComplete
            id="researcher"
            value={formik.values.researcher}
            delay={1500}
            suggestions={filteredResearchers}
            completeMethod={searchResearcher}
            onChange={formik.handleChange}
            dropdown
            forceSelection={false}
            className={classNames({
              "p-invalid": isFormFieldValid("researcher"),
            })}
          />

          {getFormErrorMessage("researcher")}
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

        <div className="field">
          <label
            htmlFor="url"
            className={classNames({
              "p-error": isFormFieldValid("url"),
            })}
          >
            URL
          </label>
          <InputText
            id="url"
            value={formik.values.url}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": isFormFieldValid("url"),
            })}
          />
          {getFormErrorMessage("url")}
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

export default observer(
  GeneViewProtectedDataAddUnpublishedStructuralInformationForm
);
