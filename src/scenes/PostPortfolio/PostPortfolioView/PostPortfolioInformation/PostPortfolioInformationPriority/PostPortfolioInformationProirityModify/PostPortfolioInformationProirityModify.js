import React, { useContext } from "react";
import { useFormik } from "formik";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
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
  } = rootStore.projectStore;

  const formik = useFormik({
    initialValues: {
      teamPriority: selectedProject.teamPriority,
      teamProbability: selectedProject.teamProbability,
    },
    validate: (data) => {
      let errors = {};

      if (!data.teamPriority) {
        errors.teamPriority = "Priority is required.";
      }

      if (!data.teamProbability) {
        errors.teamProbability = "Probability is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      var submitData = {
        id: selectedProject.id,
        teamPriority: data.teamPriority,
        teamProbability: data.teamProbability,
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
        <h2>Team Settings</h2>
        <div>
          <div className="card">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className="p-field p-col-12 p-md-12">
                <label
                  htmlFor="teamPriority"
                  className={classNames({
                    "p-error": isFormFieldValid("teamPriority"),
                  })}
                >
                  Project Priority
                </label>

                <Dropdown
                  id="prority"
                  name="prority"
                  options={["High", "Medium", "Low"]}
                  value={formik.values.teamPriority}
                  onChange={formik.handleChange("teamPriority")}
                  placeholder="Select Priority"
                />

                {getFormErrorMessage("teamPriority")}
              </div>

              <div className="p-field p-col-12 p-md-12">
                <label
                  htmlFor="teamProbability"
                  className={classNames({
                    "p-error": isFormFieldValid("teamProbability"),
                  })}
                >
                  Project Probability
                </label>

                <Dropdown
                  id="teamProbability"
                  name="teamProbability"
                  options={["High", "Medium", "Low"]}
                  value={formik.values.teamProbability}
                  onChange={formik.handleChange("teamProbability")}
                  placeholder="Select Probability"
                />

                {getFormErrorMessage("teamProbability")}
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
