import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Loading from "../../../../app/layout/Loading/Loading";

const TargetScreenPromotionQuestionaire = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    selectedTarget,
    promoteTargetToScreen,
    promoteTargetToScreenDisplayLoading,
  } = rootStore.targetStore;

  const [showMessage, setShowMessage] = useState(false);

  const formik = useFormik({
    initialValues: {
      library: "",
      startDate: "",
      endDate: "",
      method: "",
      protocol: "",
      comment: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.library) {
        errors.library = "Library is required.";
      }

      if (!data.startDate) {
        errors.startDate = "Start Date is required.";
      }

      if (!data.endDate) {
        errors.endDate = "End Date is required.";
      }

      if (!data.method) {
        errors.method = "Method is required.";
      }

      if (!data.protocol) {
        errors.protocol = "Protocol is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      console.log(data);
      data["targetID"] = selectedTarget.id;
      console.log(data);
      promoteTargetToScreen(data);
      setShowMessage(true);
      //formik.resetForm();
    },
  });

  const isFormFieldValid = (library) =>
    !!(formik.touched[library] && formik.errors[library]);
  const getFormErrorMessage = (library) => {
    return (
      isFormFieldValid(library) && (
        <small className="p-error">{formik.errors[library]}</small>
      )
    );
  };

  const dialogFooter = (
    <div className="p-d-flex p-jc-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );

  if (!promoteTargetToScreenDisplayLoading) {
    return (
      <div className="form-demo">
        <Dialog
          visible={showMessage}
          onHide={() => setShowMessage(false)}
          position="top"
          footer={dialogFooter}
          showHeader={false}
          breakpoints={{ "960px": "80vw" }}
          style={{ width: "30vw" }}
        >
          <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
            <i
              className="pi pi-check-circle"
              style={{ fontSize: "5rem", color: "var(--green-500)" }}
            ></i>
            <h5>Form Submitted!</h5>
          </div>
        </Dialog>

        <div className="p-d-flex p-jc-center">
          <div className="card">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className="p-field">
                <span className="p-float-label">
                  <InputText
                    id="library"
                    answer="library"
                    value={formik.values.library}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("library"),
                    })}
                  />
                  <label
                    htmlFor="library"
                    className={classNames({
                      "p-error": isFormFieldValid("library"),
                    })}
                  >
                    Library
                  </label>
                </span>
                {getFormErrorMessage("library")}
              </div>

              <div className="p-field">
                <span className="p-float-label">
                  {/* <InputText
                    id="startDate"
                    answer="startDate"
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("startDate"),
                    })}
                  /> */}
                  <Calendar
                    id="startDate"
                    name="startDate"
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    dateFormat="dd/mm/yy"
                    mask="99/99/9999"
                    showIcon
                    className={classNames({
                      "p-invalid": isFormFieldValid("startDate"),
                    })}
                  />
                  <label
                    htmlFor="startDate"
                    className={classNames({
                      "p-error": isFormFieldValid("startDate"),
                    })}
                  >
                    Start Date
                  </label>
                </span>
                {getFormErrorMessage("startDate")}
              </div>

              <div className="p-field">
                <span className="p-float-label">
                  {/* <InputText
                    id="endDate"
                    answer="endDate"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("endDate"),
                    })}
                  /> */}

                  <Calendar
                    id="endDate"
                    name="endDate"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    dateFormat="dd/mm/yy"
                    mask="99/99/9999"
                    showIcon
                    className={classNames({
                      "p-invalid": isFormFieldValid("endDate"),
                    })}
                  />
                  <label
                    htmlFor="endDate"
                    className={classNames({
                      "p-error": isFormFieldValid("endDate"),
                    })}
                  >
                    End Date
                  </label>
                </span>
                {getFormErrorMessage("endDate")}
              </div>

              <div className="p-field">
                <span className="p-float-label">
                  <InputText
                    id="method"
                    answer="method"
                    value={formik.values.method}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("method"),
                    })}
                  />
                  <label
                    htmlFor="method"
                    className={classNames({
                      "p-error": isFormFieldValid("method"),
                    })}
                  >
                    Method
                  </label>
                </span>
                {getFormErrorMessage("method")}
              </div>

              <div className="p-field">
                <span className="p-float-label">
                  <InputText
                    id="protocol"
                    answer="protocol"
                    value={formik.values.protocol}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("protocol"),
                    })}
                  />
                  <label
                    htmlFor="protocol"
                    className={classNames({
                      "p-error": isFormFieldValid("protocol"),
                    })}
                  >
                    Protocol
                  </label>
                </span>
                {getFormErrorMessage("protocol")}
              </div>
              <div className="p-field">
                <span className="p-float-label">
                  <InputText
                    id="comment"
                    answer="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("comment"),
                    })}
                  />
                  <label
                    htmlFor="comment"
                    className={classNames({
                      "p-error": isFormFieldValid("comment"),
                    })}
                  >
                    Enter your comments
                  </label>
                </span>
              </div>

              <Button type="submit" label="Submit" className="p-mt-2" />
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <Loading />;
};

export default observer(TargetScreenPromotionQuestionaire);
