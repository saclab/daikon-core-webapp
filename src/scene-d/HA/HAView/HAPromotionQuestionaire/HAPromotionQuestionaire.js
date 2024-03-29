import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressBar } from "primereact/progressbar";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";

import { RootStoreContext } from "../../../../app/stores/rootStore";

const HAPromotionQuestionaire = ({ closeSidebar }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingProject, selectedProject } = rootStore.projectStore;

  const { creatingH2L, createH2L } = rootStore.portfolioStore;

  const formik = useFormik({
    initialValues: {
      h2LStart: "",
      h2LDescription: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.h2LStart) {
        errors.h2LStart = "Promotion date  is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      data["id"] = selectedProject.id;

      createH2L(data).then((res) => {
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

  if (!creatingH2L && !loadingProject) {
    return (
      <div className="flex flex-column w-full">
        <div>
          <div className="card w-full">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className="field">
                <label
                  htmlFor="h2LStart"
                  className={classNames({
                    "p-error": isFormFieldValid("h2LStart"),
                  })}
                >
                  H2L Start Date
                </label>

                <Calendar
                  id="h2LStart"
                  name="h2LStart"
                  value={formik.values.h2LStart}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                  className={classNames({
                    "p-invalid": isFormFieldValid("h2LStart"),
                  })}
                />

                {getFormErrorMessage("h2LStart")}
              </div>

              <div className="field">
                <label
                  htmlFor="h2LDescription"
                  className={classNames({
                    "p-error": isFormFieldValid("h2LDescription"),
                  })}
                >
                  H2L Description
                </label>
                <InputTextarea
                  id="h2LDescription"
                  answer="h2LDescription"
                  value={formik.values.h2LDescription}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("h2LDescription"),
                  })}
                />
              </div>
              <div className="field">
                <Button
                  icon="icon icon-common icon-database-submit"
                  type="submit"
                  label="Create portfolio and promote to H2L"
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

export default observer(HAPromotionQuestionaire);
