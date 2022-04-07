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

const PostPortfolioPromotionsPromoteToP1 = ({ closeSidebar }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingProject, fetchProject, selectedProject } =
    rootStore.projectStore;

  const { creatingP1, createP1 } = rootStore.postPortfolioStore;

  const formik = useFormik({
    initialValues: {
      p1Start: "",
      p1Description: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.p1Start) {
        errors.p1Start = "Promotion date is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      data["id"] = selectedProject.id;
      console.log(data);
      createP1(data).then((res) => {
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

  if (!creatingP1 && !loadingProject) {
    return (
      <div className="form-demo">
        <div>
          <div className="card">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className="p-field p-col-12 p-md-12">
                <label
                  htmlFor="p1Start"
                  className={classNames({
                    "p-error": isFormFieldValid("p1Start"),
                  })}
                >
                  IND Start Date
                </label>

                <Calendar
                  id="p1Start"
                  name="p1Start"
                  value={formik.values.p1Start}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                  className={classNames({
                    "p-invalid": isFormFieldValid("p1Start"),
                  })}
                />

                {getFormErrorMessage("p1Start")}
              </div>

              <div className="p-field p-col-12 p-md-12">
                <label
                  htmlFor="p1Description"
                  className={classNames({
                    "p-error": isFormFieldValid("p1Description"),
                  })}
                >
                  IND Description
                </label>
                <InputTextarea
                  id="p1Description"
                  answer="p1Description"
                  value={formik.values.p1Description}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("p1Description"),
                  })}
                />
              </div>

              <Button
                icon="icon icon-common icon-database-submit"
                type="submit"
                label="Promote to IND (PostPorfolio)"
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

export default observer(PostPortfolioPromotionsPromoteToP1);
