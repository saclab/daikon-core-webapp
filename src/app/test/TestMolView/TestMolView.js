import React, { useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";

const TestMolView = () => {
  const [showMessage, setShowMessage] = useState(false);

  const formik = useFormik({
    initialValues: {
      answer: "",
      description: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.answer) {
        errors.answer = "Answer is required.";
      }

      if (!data.description) {
        errors.description = "Description is required.";
      }
      return errors;
    },
    onSubmit: (data) => {
      setShowMessage(true);
      formik.resetForm();
    },
  });

  const isFormFieldValid = (answer) =>
    !!(formik.touched[answer] && formik.errors[answer]);
  const getFormErrorMessage = (answer) => {
    return (
      isFormFieldValid(answer) && (
        <small className="p-error">{formik.errors[answer]}</small>
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
                  id="answer"
                  answer="answer"
                  value={formik.values.answer}
                  onChange={formik.handleChange}
                  autoFocus
                  className={classNames({
                    "p-invalid": isFormFieldValid("answer"),
                  })}
                />
                <label
                  htmlFor="answer"
                  className={classNames({
                    "p-error": isFormFieldValid("answer"),
                  })}
                >
                  Answer*
                </label>
              </span>
              {getFormErrorMessage("answer")}
            </div>

            <div className="p-field">
              <span className="p-float-label">
                <InputText
                  id="description"
                  answer="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  autoFocus
                  className={classNames({
                    "p-invalid": isFormFieldValid("description"),
                  })}
                />
                <label
                  htmlFor="description"
                  className={classNames({
                    "p-error": isFormFieldValid("description"),
                  })}
                >
                  Description*
                </label>
              </span>
              {getFormErrorMessage("description")}
            </div>

            <Button type="submit" label="Submit" className="p-mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestMolView;
