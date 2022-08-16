import React, { useContext } from "react";
import { useFormik } from "formik";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const PortfolioPromotionsPromoteToSP = ({ closeSidebar }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingProject, selectedProject } =
    rootStore.projectStore;

  const { creatingSP, createSP } = rootStore.portfolioStore;

  const formik = useFormik({
    initialValues: {
      spStart: "",
      spDescription: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.spStart) {
        errors.spStart = "Promotion date  is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      data["id"] = selectedProject.id;
      console.log(data);
      createSP(data).then((res) => {
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

  if (!creatingSP && !loadingProject) {
    return (
      <div className="form-demo">
        <div>
          <div className="card">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className="p-field p-col-12 p-md-12">
                <label
                  htmlFor="spStart"
                  className={classNames({
                    "p-error": isFormFieldValid("spStart"),
                  })}
                >
                  SP Start Date
                </label>

                <Calendar
                  id="spStart"
                  name="spStart"
                  value={formik.values.spStart}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                  className={classNames({
                    "p-invalid": isFormFieldValid("spStart"),
                  })}
                />

                {getFormErrorMessage("spStart")}
              </div>

              <div className="p-field p-col-12 p-md-12">
                <label
                  htmlFor="spDescription"
                  className={classNames({
                    "p-error": isFormFieldValid("spDescription"),
                  })}
                >
                  SP Description
                </label>
                <InputTextarea
                  id="spDescription"
                  answer="spDescription"
                  value={formik.values.spDescription}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("spDescription"),
                  })}
                />
              </div>

              <Button
                icon="icon icon-common icon-database-submit"
                type="submit"
                label="Promote to SP"
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

export default observer(PortfolioPromotionsPromoteToSP);
