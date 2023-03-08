import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import SmilesView from "../../SmilesView/SmilesView";
import StageSelectDropdown from "../../StageSelectDropdown/StageSelectDropdown";

const CompoundEvolutionEdit = ({ evolution, onHide }) => {
  let ce = evolution();

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { editCompoundEvolution, selectedProject, fetchCompoundEvolution } =
    rootStore.projectStore;

  const formik = useFormik({
    initialValues: {
      smile: ce.compound.smile,
      molWeight: ce.compound.molWeight,
      molArea: ce.compound.molArea,
      MIC: ce.mic,
      IC50: ce.iC50,
      notes: ce.notes,
      addedOnStage: ce.addedOnStage,
      addedOnDate: new Date(ce.addedOnDate),
    },
    validate: (data) => {
      let errors = {};

      if (!data.smile) {
        errors.smile = "Smiles string is required.";
      }

      if (!data.molWeight) {
        errors.molWeight = "Mol Weight is required.";
      }

      if (!data.molArea) {
        errors.molArea = "Mol Area is required.";
      }

      if (!data.MIC) {
        errors.MIC = "MIC is required.";
      }

      if (!data.IC50) {
        errors.IC50 = "IC50 is required.";
      }

      if (!data.notes) {
        errors.notes = "A note required.";
      }

      if (!data.addedOnStage) {
        errors.addedOnStage = "Stage is required.";
      }

      if (!data.addedOnDate) {
        errors.addedOnDate = "A note is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      // Format Data
      data = {
        ...data,
        id: ce.id,
        projectId: ce.projectId,
        compoundId: ce.compoundId,
      };

      editCompoundEvolution(data).then((res) => {
        if (res !== null) {
          fetchCompoundEvolution(selectedProject.id);
          formik.resetForm();
          onHide();
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

  return (
    <div className="flex flex-column w-full">
      <div>
        <div className="card w-full">
          <div className="card">
            <SmilesView smiles={ce.compound.smile} />
          </div>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="field">
              <label
                htmlFor="smile"
                className={classNames({
                  "p-error": isFormFieldValid("smile"),
                })}
              >
                SMILES{" "}
                <NavLink to={"/tools/compounds/" + ce.compound.id}>
                  [Edit in Compound Tools]
                </NavLink>
              </label>
              <InputTextarea
                disabled={true}
                id="smile"
                answer="smile"
                value={formik.values.smile}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isFormFieldValid("smile"),
                })}
              />
              {getFormErrorMessage("smile")}
            </div>

            <div className="flex gap-4">
              <div className="flex flex-column">
                <div className="field">
                  <label
                    htmlFor="molWeight"
                    className={classNames({
                      "p-error": isFormFieldValid("molWeight"),
                    })}
                  >
                    Mol Weight <br />
                    <sup>(*Modifies property globally)</sup>
                  </label>
                  <InputText
                    id="molWeight"
                    type="decimal"
                    value={formik.values.molWeight}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("molWeight"),
                    })}
                  />
                  {getFormErrorMessage("molWeight")}
                </div>

                <div className="field">
                  <label
                    htmlFor="molArea"
                    className={classNames({
                      "p-error": isFormFieldValid("molArea"),
                    })}
                  >
                    Mol Area
                    <br />
                    <sup>(*Modifies property globally)</sup>
                  </label>
                  <InputText
                    id="molArea"
                    type="decimal"
                    value={formik.values.molArea}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("molArea"),
                    })}
                  />
                  {getFormErrorMessage("molArea")}
                </div>
              </div>

              <div className="flex flex-column">
                <div className="field">
                  <label
                    htmlFor="MIC"
                    className={classNames({
                      "p-error": isFormFieldValid("MIC"),
                    })}
                  >
                    MIC
                  </label>
                  <InputText
                    id="MIC"
                    type="decimal"
                    value={formik.values.MIC}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("MIC"),
                    })}
                  />
                  {getFormErrorMessage("MIC")}
                </div>

                <div className="field">
                  <label
                    htmlFor="IC50"
                    className={classNames({
                      "p-error": isFormFieldValid("IC50"),
                    })}
                  >
                    IC50
                  </label>
                  <InputText
                    id="IC50"
                    type="decimal"
                    value={formik.values.IC50}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("IC50"),
                    })}
                  />
                  {getFormErrorMessage("IC50")}
                </div>
                <div className="field">
                  <label
                    htmlFor="addedOnStage"
                    className={classNames({
                      "p-error": isFormFieldValid("addedOnStage"),
                    })}
                  >
                    Stage
                  </label>
                  <StageSelectDropdown
                    id="addedOnStage"
                    value={formik.values.addedOnStage}
                    onChange={formik.handleChange}
                  />

                  {getFormErrorMessage("addedOnStage")}
                </div>

                <div className="field">
                  <label
                    htmlFor="date"
                    className={classNames({
                      "p-error": isFormFieldValid("date"),
                    })}
                  >
                    Date
                  </label>
                  <Calendar
                    id="addedOnDate"
                    name="addedOnDate"
                    value={formik.values.addedOnDate}
                    viewDate={formik.values.addedOnDate}
                    onChange={formik.handleChange}
                    style={{ width: "400px" }}
                    className={classNames({
                      "p-invalid": isFormFieldValid("addedOnDate"),
                    })}
                  />

                  {getFormErrorMessage("addedOnDate")}
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
                    autoResize
                    rows={4}
                    className={classNames({
                      "p-invalid": isFormFieldValid("notes"),
                    })}
                  />
                  {getFormErrorMessage("notes")}
                </div>
              </div>
            </div>

            <div className="field">
              <Button
                icon="icon icon-common icon-database-submit"
                type="submit"
                label="Save Changes"
                className="p-mt-2"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompoundEvolutionEdit;
