import { useFormik } from 'formik';
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../../../app/common/SectionHeading/SectionHeading';
import { RootStoreContext } from '../../../../app/stores/rootStore';

const ScreenDashAddPhenotypic = () => {
  const rootStore = useContext(RootStoreContext);
  const { appVars } = rootStore.generalStore;
  const { addScreeenPhenotypic, loadingPhenotypicAdd } = rootStore.screenStore;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      screenName: "",
      org: "",
      promotionDate: "",
      notes: ""

    },
    validate: (data) => {
      let errors = {};

      if (!data.screenName) {
        errors.screenName = "Phenotypic Screen Name is required.";
      }
      if (!data.org) {
        errors.org = "Org is required.";
      }

      if (!data.promotionDate) {
        errors.promotionDate = "Date is required";
      }
      return errors;
    },
    onSubmit: (data) => {
      // data["projectId"] = selectedProject.id;
      console.log(data);
      data["orgId"] = data.org.id;
      data["Method"] = "Phenotypic"
      addScreeenPhenotypic(data).then((res) => {
        if (res !== null) {
          formik.resetForm();
          navigate("phenotypic/" + data.screenName)
        }
      });
    },
  }
  );
  const isFormFieldValid = (field) =>
    !!(formik.touched[field] && formik.errors[field]);
  const getFormErrorMessage = (field) => {
    return (
      isFormFieldValid(field) && (
        <small className="p-error">{formik.errors[field]}</small>
      )
    );
  };



  return (
    <div className="flex flex-column w-full">
      <div className="flex w-full">
        <SectionHeading
          icon="icon icon-common icon-circle-notch"
          heading={"Create Phenotypic Screen"}
          color={"#f4f4f4"}
          textColor={"#000000"} />
      </div>

      <div className="flex w-full gap-5">
        <div className="flex w-3"
          style={
            {
              "--b": "4px",
              borderColor: "#fff",
              width: "100%",
              aspectRatio: "1",
              border: "10px solid #fff",
              background:
                "conic-gradient(from 90deg at var(--b) var(--b),#fff 90deg,#f4f4f4 0) calc(100% + var(--b)/2) calc(100% + var(--b)/2)/calc(50%  + var(--b))   calc(50%  + var(--b))",
              display: "inline-block"
            }
          }>
        </div>
        <div className="flex">
          <div className="card">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className="field">
                <label
                  htmlFor="screenName"
                  className={classNames({
                    "p-error": isFormFieldValid("screenName"),
                  })}
                >
                  Phenotypic Screen Name
                </label>
                <InputText
                  id="screenName"
                  name="screenName"
                  value={formik.values.screenName}
                  onChange={formik.handleChange}
                  autoFocus
                  className={classNames({
                    "p-invalid": isFormFieldValid("screenName"),
                  })}
                  style={{ minWidth: "500px" }}
                />
                {getFormErrorMessage("screenName")}
              </div>
              <div className="field">
                <label
                  htmlFor="org"
                  className={classNames({
                    "p-error": isFormFieldValid("org"),
                  })}
                >
                  Screening Organization
                </label>

                <Dropdown
                  value={formik.values.org}
                  options={appVars.appOrgs}
                  onChange={formik.handleChange("org")}
                  optionLabel="name"
                  placeholder="Select an org"
                  filter
                  showClear
                  filterBy="name"
                  className={classNames({
                    "p-invalid": isFormFieldValid("org"),
                  })}
                />
                {getFormErrorMessage("org")}
              </div>
              <div className="field">
                <label
                  htmlFor="promotionDate"
                  className={classNames({
                    "p-error": isFormFieldValid("promotionDate"),
                  })}
                >
                  Promotion Date
                </label>

                <Calendar
                  id="promotionDate"
                  name="promotionDate"
                  value={formik.values.promotionDate}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                  className={classNames({
                    "p-invalid": isFormFieldValid("promotionDate"),
                  })}
                />
                {getFormErrorMessage("promotionDate")}

              </div>
              <div className="field">
                <label
                  htmlFor="notes"
                  className={classNames({
                    "p-error": isFormFieldValid("notes"),
                  })}
                >
                  Notes
                </label>
                <InputTextarea
                  id="notes"
                  answer="notes"
                  value={formik.values.notes}
                  onChange={formik.handleChange}

                  className={classNames({
                    "p-invalid": isFormFieldValid("notes"),
                  })}
                />
              </div>

              <Button
                icon="icon icon-common icon-database-submit"
                type="submit"
                label="Add Phenotypic Screen"
                className="p-mt-2 p-button-secondary"
                loading={loadingPhenotypicAdd}
                readOnly={loadingPhenotypicAdd}
              />
            </form>
          </div>
        </div>


      </div>

    </div>

  )
}

export default ScreenDashAddPhenotypic