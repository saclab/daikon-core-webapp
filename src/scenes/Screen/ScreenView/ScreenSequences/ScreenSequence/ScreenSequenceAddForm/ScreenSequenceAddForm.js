import React from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";

const ScreenSequenceAddForm = ({screenId, onAdd, loading}) => {
  const formik = useFormik({
    initialValues: {
      library: "",
      startDate: "",
      endDate: "",
      method: "",
      protocol: "",
      comment: "",
      unverifiedHitCount: "",
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
      if (!data.unverifiedHitCount) {
        errors.unverifiedHitCount = "Hit Count is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      data["screenId"] = screenId;
      console.log(data);
      onAdd(data);
      formik.resetForm();
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
    <div>
      <div className="p-fluid p-formgrid p-grid">
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="library"
              className={classNames({
                "p-error": isFormFieldValid("library"),
              })}
            >
              Library
            </label>
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

            {getFormErrorMessage("library")}
          </div>

          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="startDate"
              className={classNames({
                "p-error": isFormFieldValid("startDate"),
              })}
            >
              Start Date
            </label>
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

            {getFormErrorMessage("startDate")}
          </div>

          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="endDate"
              className={classNames({
                "p-error": isFormFieldValid("endDate"),
              })}
            >
              End Date
            </label>

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

            {getFormErrorMessage("endDate")}
          </div>

          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="method"
              className={classNames({
                "p-error": isFormFieldValid("method"),
              })}
            >
              Method
            </label>
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

            {getFormErrorMessage("method")}
          </div>

          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="protocol"
              className={classNames({
                "p-error": isFormFieldValid("protocol"),
              })}
            >
              Protocol
            </label>

            <InputTextarea
              rows={5}
              id="protocol"
              answer="protocol"
              value={formik.values.protocol}
              onChange={formik.handleChange}
              autoFocus
              className={classNames({
                "p-invalid": isFormFieldValid("protocol"),
              })}
            />

            {getFormErrorMessage("protocol")}
          </div>

          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="unverifiedHitCount"
              className={classNames({
                "p-error": isFormFieldValid("unverifiedHitCount"),
              })}
            >
              Hit Count
            </label>
            <InputText
              id="unverifiedHitCount"
              answer="unverifiedHitCount"
              value={formik.values.unverifiedHitCount}
              onChange={formik.handleChange}
              autoFocus
              className={classNames({
                "p-invalid": isFormFieldValid("unverifiedHitCount"),
              })}
            />

            {getFormErrorMessage("unverifiedHitCount")}
          </div>


          
          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="comment"
              className={classNames({
                "p-error": isFormFieldValid("comment"),
              })}
            >
              Comments
            </label>
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
          </div>
          <Button
            icon="icon icon-common icon-database-submit"
            type="submit"
            label="Add to database"
            className="p-mt-2"
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default ScreenSequenceAddForm;
