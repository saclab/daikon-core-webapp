import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

const CompoundOverviewEditProperties = () => {
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
      molWeight: selectedCompound.molWeight,
      molArea: selectedCompound.molArea,
      smiles: selectedCompound.smiles,
    },
    validationSchema: Yup.object({
      molWeight: Yup.number()
        .required("This field is required")
        .typeError("Please enter a valid mol weight"),
      molArea: Yup.number("Please enter a valid mol weight").required(
        "This field is required"
      ),
      smiles: Yup.string().required("This field is required"),
    }),
    onSubmit: (values) => {
      if (
        selectedCompound.molWeight === values.molWeight &&
        selectedCompound.molArea === values.molArea &&
        selectedCompound.smiles === values.smiles
      ) {
        toast.error("No changes made");
        return;
      }
      let formattedCompound = {
        id: selectedCompound.id,
        molWeight: values.molWeight,
        molArea: values.molArea,
        smiles: values.smiles,
      };

      editCompound(formattedCompound).then((res) => {
        if (res !== null) {
          toast.success("Compound properties successfully updated");
        }
      });
    },
  });

  return (
    <div className="flex flex-column w-full " style={{ maxWidth: "30rem" }}>
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <div className="field">
          <label htmlFor="molWeight">Mol Weight</label>
          <InputText
            id="molWeight"
            name="molWeight"
            type="text"
            className={classNames({
              "p-invalid": formik.errors.molWeight,
            })}
            {...formik.getFieldProps("molWeight")}
          />
          {formik.touched.molWeight && formik.errors.molWeight ? (
            <small className="p-error">{formik.errors.molWeight}</small>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="molArea">Mol Area</label>
          <InputText
            id="molArea"
            name="molArea"
            type="text"
            className={classNames({
              "p-invalid": formik.errors.molArea,
            })}
            {...formik.getFieldProps("molArea")}
          />
          {formik.touched.molArea && formik.errors.molArea ? (
            <small className="p-error">{formik.errors.molArea}</small>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="smiles">SMILES</label>
          <InputTextarea
            id="smiles"
            answer="smiles"
            autoResize
            value={formik.values.smiles}
            onChange={formik.handleChange}
            className={classNames({
              "p-invalid": formik.errors.smiles,
            })}
          />
          {formik.touched.smiles && formik.errors.smiles ? (
            <small className="p-error">{formik.errors.smiles}</small>
          ) : null}
        </div>

        <Button
          type="submit"
          loading={editingCompound}
          icon="icon icon-common icon-database-submit"
          className="p-button-secondary"
          style={{ width: "30rem" }}
          label="Save"
        />
      </form>
    </div>
  );
};

export default observer(CompoundOverviewEditProperties);
