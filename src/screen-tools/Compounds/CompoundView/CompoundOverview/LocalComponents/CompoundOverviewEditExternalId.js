import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import EmbeddedHelp from "../../../../../app/common/EmbeddedHelp/EmbeddedHelp";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

const CompoundOverviewEditExternalId = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  const {
    editCompound,
    selectedCompound,
    editCompoundExternalId,
    editingCompound,
  } = rootStore.compoundStore;

  const formik = useFormik({
    initialValues: {
      externalCompoundIds: selectedCompound.externalCompoundIds,
      typeConfirmation: "",
    },
    validationSchema: Yup.object({
      externalCompoundIds: Yup.string()
        .required("This field is required")
        .typeError("Please enter a valid mol weight"),
      typeConfirmation: Yup.string()
        .equals(["override"], "Must type OVERRIDE to confirm")
        .required("This field is required"),
    }),

    onSubmit: (values) => {
      if (selectedCompound.externalCompoundIds === values.externalCompoundIds) {
        toast.error("No changes made");
        return;
      }
      let formattedCompound = {
        id: selectedCompound.id,
        externalCompoundIds: values.externalCompoundIds,
      };

      console.log(formattedCompound);

      editCompoundExternalId(formattedCompound).then((res) => {
        if (res !== null) {
          toast.success("Compound properties successfully updated");
        }
      });
    },
  });

  return (
    <div
      className="flex flex-column w-full "
      style={{
        maxWidth: "400px",
      }}
    >
      <EmbeddedHelp>
        Overriding Ids might have undesirable effect. Proceed with caution.
      </EmbeddedHelp>
      <br />

      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <div className="field">
          <label htmlFor="molWeight">External Id</label>
          <InputText
            id="externalCompoundIds"
            name="externalCompoundIds"
            type="text"
            className={classNames({
              "p-invalid": formik.errors.molWeight,
            })}
            {...formik.getFieldProps("externalCompoundIds")}
          />
          {formik.touched.externalCompoundIds &&
          formik.errors.externalCompoundIds ? (
            <small className="p-error">
              {formik.errors.externalCompoundIds}
            </small>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="typeConfirmation">
            Please type <b>'override'</b> to confirm external ID change.
          </label>
          <InputText
            id="typeConfirmation"
            name="typeConfirmation"
            type="text"
            className={classNames({
              "p-invalid": formik.errors.typeConfirmation,
            })}
            {...formik.getFieldProps("typeConfirmation")}
          />
          {formik.touched.typeConfirmation && formik.errors.typeConfirmation ? (
            <small className="p-error">{formik.errors.typeConfirmation}</small>
          ) : null}
        </div>

        <Button
          type="submit"
          loading={editingCompound}
          label="Commit Changes"
          className="p-button-warning"
          disabled={formik.values.typeConfirmation !== "override"}
        />
      </form>
    </div>
  );
};

export default observer(CompoundOverviewEditExternalId);
