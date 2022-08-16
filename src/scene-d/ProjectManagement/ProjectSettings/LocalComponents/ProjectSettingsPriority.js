import React, { useContext } from "react";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

import { RootStoreContext } from "../../../../app/stores/rootStore";



const ProjectSettingsPriority = ({ project }) => {



  const rootStore = useContext(RootStoreContext);
  const {
    editProject,
    editingProject,
  } = rootStore.projectStore;


  const formik = useFormik({
    initialValues: {
      priority: project.priority,
      probability: project.probability,

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
      var editedProject = { ...project }
      editedProject.priority = data.priority;
      editedProject.probability = data.probability;
      console.log(data)
      editProject(editedProject)
      // formik.resetForm();
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
    <div className="p-fluid p-formgrid p-grid">
      <form onSubmit={formik.handleSubmit} style={{ paddingLeft: "50px" }}>

        <div className="p-field p-grid">
          <label
            htmlFor="priority"
            style={{ width: '250px' }}
            className={classNames({
              "p-error": isFormFieldValid("priority"),
            })}
          >
            Project Priority :
          </label>
          <Inplace closable>
            <InplaceDisplay>
              {formik.values.priority}
            </InplaceDisplay>
            <InplaceContent>
              <Dropdown
                id="prority"
                name="prority"
                options={["High", "Medium", "Low"]}
                value={formik.values.priority}
                onChange={formik.handleChange("priority")}
                placeholder="Select Priority"

              />
              {getFormErrorMessage("priority")}
            </InplaceContent>
          </Inplace>
          {getFormErrorMessage("priority")}
        </div>

        <div className="p-field p-grid">
          <label
            htmlFor="probability"
            style={{ width: '250px' }}
            className={classNames({
              "p-error": isFormFieldValid("probability"),
            })}
          >
            Project Priority :
          </label>
          <Inplace closable>
            <InplaceDisplay>
              {formik.values.probability}
            </InplaceDisplay>
            <InplaceContent>
              <Dropdown
                id="probability"
                name="probability"
                options={["High", "Medium", "Low"]}
                value={formik.values.priority}
                onChange={formik.handleChange("probability")}
                placeholder="Select probability"

              />
              {getFormErrorMessage("probability")}
            </InplaceContent>
          </Inplace>
          {getFormErrorMessage("probability")}
        </div>




        <Button
          icon="icon icon-common icon-database-submit"
          type="submit"
          label="Save Priority & Probability Changes"
          className="p-mt-2"
          style={{ width: "400px" }}
          loading={editingProject}
        />
      </form>
    </div>

  );
};

export default ProjectSettingsPriority;
