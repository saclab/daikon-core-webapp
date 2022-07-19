import React, { useContext } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { RootStoreContext } from "../../../../../../app/stores/rootStore";

const ScreenSequenceAddForm = ({ screenId, onAdd, loading }) => {
  const rootStore = useContext(RootStoreContext);
  const { appVars } = rootStore.generalStore;

  const formik = useFormik({
    initialValues: {
      library: "",
      startDate: "",
      endDate: undefined,

      protocol: "",
      concentration: "",
      noOfCompoundsScreened: "",
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

      if (!data.protocol) {
        errors.protocol = "Protocol is required.";
      }

      if (!data.concentration) {
        errors.concentration = "Concentration is required.";
      }

      if (!data.noOfCompoundsScreened) {
        errors.noOfCompoundsScreened = "No of Compounds screened is required.";
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
      <div className="p-fluid">
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
              htmlFor="concentration"
              className={classNames({
                "p-error": isFormFieldValid("concentration"),
              })}
            >
              Concentration
            </label>
            <InputText
              id="concentration"
              answer="concentration"
              value={formik.values.concentration}
              onChange={formik.handleChange}
              autoFocus
              className={classNames({
                "p-invalid": isFormFieldValid("concentration"),
              })}
            />

            {getFormErrorMessage("concentration")}
          </div>

          <div className="p-field p-col-12 p-md-12">
            <label
              htmlFor="noOfCompoundsScreened"
              className={classNames({
                "p-error": isFormFieldValid("noOfCompoundsScreened"),
              })}
            >
              No of Compounds Screened
            </label>
            <InputText
              id="noOfCompoundsScreened"
              answer="noOfCompoundsScreened"
              value={formik.values.noOfCompoundsScreened}
              onChange={formik.handleChange}
              autoFocus
              className={classNames({
                "p-invalid": isFormFieldValid("noOfCompoundsScreened"),
              })}
            />

            {getFormErrorMessage("noOfCompoundsScreened")}
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
