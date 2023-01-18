import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressBar } from "primereact/progressbar";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const PortfolioPromotionsPromoteToIND = ({ closeSidebar }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingProject, selectedProject } = rootStore.projectStore;

  const { creatingIND, createIND } = rootStore.postPortfolioStore;

  const formik = useFormik({
    initialValues: {
      iNDStart: "",
      iNDDescription: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.iNDStart) {
        errors.iNDStart = "Promotion date is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      data["id"] = selectedProject.id;

      createIND(data).then((res) => {
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

  if (!creatingIND && !loadingProject) {
    return (
      <div className="flex flex-column w-full">
        <div>
          <div className="card w-full">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className="field">
                <label
                  htmlFor="iNDStart"
                  className={classNames({
                    "p-error": isFormFieldValid("iNDStart"),
                  })}
                >
                  IND Start Date
                </label>

                <Calendar
                  id="iNDStart"
                  name="iNDStart"
                  value={formik.values.iNDStart}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                  className={classNames({
                    "p-invalid": isFormFieldValid("iNDStart"),
                  })}
                />

                {getFormErrorMessage("iNDStart")}
              </div>

              <div className="field">
                <label
                  htmlFor="iNDDescription"
                  className={classNames({
                    "p-error": isFormFieldValid("iNDDescription"),
                  })}
                >
                  IND Description
                </label>
                <InputTextarea
                  id="iNDDescription"
                  answer="iNDDescription"
                  value={formik.values.iNDDescription}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("iNDDescription"),
                  })}
                />
              </div>
              <div className="field">
                <Button
                  icon="icon icon-common icon-database-submit"
                  type="submit"
                  label="Promote to IND (PostPorfolio)"
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

export default observer(PortfolioPromotionsPromoteToIND);
