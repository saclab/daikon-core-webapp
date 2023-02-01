import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import React, { useContext } from "react";
import { RootStoreContext } from "../../stores/rootStore";
import FDate from "../FDate/FDate";

const PredictedDateEditor = ({ project, postSave, onCancel }) => {
  const rootStore = useContext(RootStoreContext);
  const { editPredictedDates, editingPredictedDates } = rootStore.projectStore;

  let modDate = new Date(project.h2LPredictedStart);

  if (project.currentStage === "HA") {
    modDate = new Date(project.h2LPredictedStart);
  }
  if (project.currentStage === "H2L") {
    modDate = new Date(project.loPredictedStart);
  }
  if (project.currentStage === "LO") {
    modDate = new Date(project.spPredictedStart);
  }
  if (project.currentStage === "SP") {
    modDate = new Date(project.indPredictedStart);
  }
  if (project.currentStage === "IND") {
    modDate = new Date(project.clinicalP1PredictedStart);
  }

  const formik = useFormik({
    initialValues: {
      newDate: modDate,
    },
    validate: (data) => {
      let errors = {};
      return errors;
    },
    onSubmit: (data) => {
      let DTO = {
        id: project.id,
      };

      if (project.currentStage === "HA") {
        DTO = {
          ...DTO,
          h2LPredictedStart: data.newDate,
        };
      }
      if (project.currentStage === "H2L") {
        DTO = {
          ...DTO,
          loPredictedStart: data.newDate,
        };
      }
      if (project.currentStage === "LO") {
        DTO = {
          ...DTO,
          spPredictedStart: data.newDate,
        };
      }
      if (project.currentStage === "SP") {
        DTO = {
          ...DTO,
          indPredictedStart: data.newDate,
        };
      }
      if (project.currentStage === "IND") {
        DTO = {
          ...DTO,
          clinicalP1PredictedStart: data.newDate,
        };
      }

      editPredictedDates(DTO).then(() => postSave());
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

  let today = new Date();
  // let day = today.getDate();
  // let month = today.getMonth();
  // let year = today.getFullYear();
  // let prevMonth = month === 0 ? 11 : month - 1;
  // let prevYear = prevMonth === 11 ? year - 1 : year;
  let minDate = new Date();
  minDate.setDate(today.getDate() - 1);
  // minDate.setDate(day);
  // minDate.setMonth(prevMonth);
  // minDate.setFullYear(prevYear);
  console.log(minDate);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-column gap-2 p-2 m-2 mr-4">
        <div className="flex gap-4 pb-4">
          <div className="flex w-2">Current :</div>
          <div className="flex">
            <FDate timestamp={modDate} hideTime={true} />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex w-2">New :</div>
          <div className="flex">
            <Calendar
              id="newDate"
              name="newDate"
              value={formik.values.newDate}
              viewDate={formik.values.newDate}
              onChange={formik.handleChange}
              //style={{ maxWidth: "200px" }}
              inline
              minDate={minDate}
            />
          </div>
        </div>
        <div className="flex flex-column gap-2 p-2 m-2 justify-content-end flex-wrap card-container">
          <div className="flex justify-content-end">
            <h3>Save changes to database?</h3>
          </div>
          <div className="flex flex-row gap-2 justify-content-end">
            <div className="flex">
              <Button
                label="Save"
                icon="icon icon-common icon-database-submit"
                type="submit"
                loading={editingPredictedDates}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default observer(PredictedDateEditor);
