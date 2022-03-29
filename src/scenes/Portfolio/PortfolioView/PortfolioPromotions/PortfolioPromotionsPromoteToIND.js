import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const PortfolioPromotionsPromoteToIND = ({ closeSidebar }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingProject, fetchProject, selectedProject } =
    rootStore.projectStore;

  const { creatingLO, createLO } = rootStore.portfolioStore;

  const formik = useFormik({
    initialValues: {
      loStart: "",
      loDescription: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.loStart) {
        errors.loStart = "Promotion date  is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      data["id"] = selectedProject.id;
      console.log(data);
      createLO(data).then((res) => {
        if (res !== null) {
          closeSidebar();
          formik.resetForm();
        }
      });

      // history.push()
    },
  });

  const isFormFieldValid = (field) =>
    !!(formik.touched[field] && formik.errors[field]);
  const getFormErrorMessage = (field) => {
    return (
      isFormFieldValid(field) && (
        <small className="p-error">{formik.errors[field]}</small>
      )
    );
  };

  if (!creatingLO && !loadingProject) {
    return (
      <div className="form-demo">
        <div>
          <div className="card">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className="p-field p-col-12 p-md-12">
                <label
                  htmlFor="loStart"
                  className={classNames({
                    "p-error": isFormFieldValid("loStart"),
                  })}
                >
                  LO Start Date
                </label>

                <Calendar
                  id="loStart"
                  name="loStart"
                  value={formik.values.loStart}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                  className={classNames({
                    "p-invalid": isFormFieldValid("loStart"),
                  })}
                />

                {getFormErrorMessage("loStart")}
              </div>

              <div className="p-field p-col-12 p-md-12">
                <label
                  htmlFor="loDescription"
                  className={classNames({
                    "p-error": isFormFieldValid("loDescription"),
                  })}
                >
                  LO Description
                </label>
                <InputTextarea
                  id="loDescription"
                  answer="loDescription"
                  value={formik.values.loDescription}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("loDescription"),
                  })}
                />
              </div>

              <Button
                icon="icon icon-common icon-database-submit"
                type="submit"
                label="Promote to LO"
                className="p-mt-2"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <ProgressBar mode="indeterminate" style={{ height: "6px" }} />;
};

export default observer(PortfolioPromotionsPromoteToIND);
