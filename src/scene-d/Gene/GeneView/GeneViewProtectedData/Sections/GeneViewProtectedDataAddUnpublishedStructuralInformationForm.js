import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

const GeneViewProtectedDataAddUnpublishedStructuralInformationForm = ({
  add,
  adding,
  closeSidebar,
}) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);

  const { fetchOrgs, Orgs } = rootStore.adminStore;

  useEffect(() => {
    fetchOrgs();
  }, [fetchOrgs]);

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
      data.organization = data.organization.alias
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
          <Dropdown
            value={formik.values.organization}
            options={Orgs}
            onChange={formik.handleChange("organization")}
            placeholder="Select an org"
            optionLabel="name"
            filter
            showClear
            filterBy="name"
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

export default observer(GeneViewProtectedDataAddUnpublishedStructuralInformationForm);
