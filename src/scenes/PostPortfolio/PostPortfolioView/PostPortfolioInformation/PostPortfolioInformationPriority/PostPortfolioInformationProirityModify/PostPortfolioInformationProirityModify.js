import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../../../app/stores/rootStore";
import { Dropdown } from "primereact/dropdown";

const PostPortfolioInformationProirityModify = ({ closeSidebar }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    setPriorityProbability,
    settingPriorityProbability,
    selectedProject,
    loadingProject,
    fetchProject,
  } = rootStore.projectStore;

  const formik = useFormik({
    initialValues: {
      priority: selectedProject.priority,
      probability: selectedProject.probability,
    },
    validate: (data) => {
      let errors = {};

      if (!data.priority) {
        errors.priority = "Priority is required.";
      }

      if (!data.probability) {
        errors.probability = "Probability is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      var submitData = {
        id: selectedProject.id,
        priority: data.priority,
        probability: data.probability,
      };

      console.log(data);
      setPriorityProbability(submitData).then((res) => {
        if (res !== null) {
          closeSidebar();
          formik.resetForm();
          //fetchProject(selectedProject.id);
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

  if (!settingPriorityProbability && !loadingProject) {
    return (
      <div className="form-demo">
        <div>
          <div className="card">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className="p-field p-col-12 p-md-12">
                <label
                  htmlFor="priority"
                  className={classNames({
                    "p-error": isFormFieldValid("priority"),
                  })}
                >
                  Project Priority
                </label>

                <Dropdown
                  id="prority"
                  name="prority"
                  options={["High", "Medium", "Low"]}
                  value={formik.values.priority}
                  onChange={formik.handleChange("priority")}
                  placeholder="Select Priority"
                />

                {getFormErrorMessage("priority")}
              </div>

              <div className="p-field p-col-12 p-md-12">
                <label
                  htmlFor="probability"
                  className={classNames({
                    "p-error": isFormFieldValid("probability"),
                  })}
                >
                  Project Probability
                </label>

                <Dropdown
                  id="probability"
                  name="probability"
                  options={["High", "Medium", "Low"]}
                  value={formik.values.probability}
                  onChange={formik.handleChange("probability")}
                  placeholder="Select Probability"
                />

                {getFormErrorMessage("probability")}
              </div>

              <Button
                icon="icon icon-common icon-database-submit"
                type="submit"
                label="Save"
                className="p-mt-2"
                loading={settingPriorityProbability}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <ProgressBar mode="indeterminate" style={{ height: "6px" }} />;
};

export default observer(PostPortfolioInformationProirityModify);
