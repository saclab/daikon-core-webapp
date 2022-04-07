import React, { useContext } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

import { RootStoreContext } from "../../../../app/stores/rootStore";



const ProjectSettingsPriority = ({ project }) => {



  const rootStore = useContext(RootStoreContext);

  console.log("===PROJECT DATES ===");
  console.log(project);

  console.log(project.fhaStart);
  console.log(new Date(project.fhaStart + "Z").toLocaleString())


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
      console.log(data)
      // data["screenId"] = screenId;
      // console.log(data);
      // onAdd(data);
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
        //loading={loading}
        />
      </form>
    </div>

  );
};

export default ProjectSettingsPriority;
