import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressBar } from "primereact/progressbar";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";

import { RootStoreContext } from "../../../../app/stores/rootStore";

const PortfolioPromotionsPromoteToLO = ({ closeSidebar }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingProject, selectedProject } = rootStore.projectStore;

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
      <div className="flex flex-column w-full">
        <div>
          <div className="card w-full">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className="field">
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

              <div className="field">
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
              <div className="field">
                <Button
                  icon="icon icon-common icon-database-submit"
                  type="submit"
                  label="Promote to LO"
                  className="p-mt-2"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <ProgressBar mode="indeterminate" style={{ height: "6px" }} />;
};

export default observer(PortfolioPromotionsPromoteToLO);
