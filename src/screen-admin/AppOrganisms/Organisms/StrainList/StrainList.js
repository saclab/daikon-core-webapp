import { useFormik } from "formik";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { classNames } from "primereact/utils";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FDate from "../../../../app/common/FDate/FDate";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { appColors } from "../../../../colors";

const StrainList = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const rootStore = useContext(RootStoreContext);
  const {
    displayLoading,
    fetchStrains,
    strains,
    cacheValidStrain,
    editStrain,
    createStrain,
    creatingStrain,
    organisms,
  } = rootStore.organismStore;

  useEffect(() => {
    if (!cacheValidStrain) {
      fetchStrains();
    }
  }, [fetchStrains, cacheValidStrain]);

  /* Row edit functions */
  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const organismEditor = (options) => {
    const dropdownOptions = organisms.map((o) => ({
      label: o.canonicalName,
      value: o.id,
    }));

    return (
      <Dropdown
        value={options.value}
        options={dropdownOptions}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select an organism"
      />
    );
  };

  const handleEdit = (e) => {
    let { newData } = e;

    let editedStrain = {
      id: newData.id,
      organismId: newData.organismId,
      name: newData.name,
      canonicalName: newData.canonicalName,
      description: newData.description,
    };

    editStrain(editedStrain).then((res) => {
      if (res) {
        toast.success("Strain updated successfully");
      }
    });
  };

  // Create a validation schema using Yup. This will define the shape and validation rules for the form fields.

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    organismId: Yup.string().required("Strain is required"),
    canonicalName: Yup.string()
      .required("Canonical name is required")
      .test(
        "is-snake-case",
        "Canonical name must be in snake case and cannot contain spaces",
        (value) => _.snakeCase(value) === value && !_.includes(value, " ")
      ),
    organismId: Yup.string().required("Organism is required"),
  });

  //  Create a function to handle the form submission. This function will be called when the user clicks the submit button.
  const onSubmit = (values) => {
    console.log(values);
    createStrain(values).then((res) => {
      if (res) {
        toast.success("Strain added successfully");
        formik.resetForm();
        setVisible(false);
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      canonicalName: "",
      description: "",
      organismId: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <React.Fragment>
      <div className="flex flex-column w-full">
        <div className="flex w-full">
          <SectionHeading
            heading={"Strains"}
            color={appColors.blocks.gray}
            textColor={appColors.blocks.black}
            customButtons={[
              {
                label: "New Strain",
                icon: "pi pi-plus",
                action: () => setVisible(true),
              },
            ]}
          />
        </div>

        <div className="flex w-full">
          <DataTable
            value={strains}
            loading={displayLoading}
            editMode="row"
            dataKey="id"
            onRowEditComplete={(e) => handleEdit(e)}
            className="w-full"
          >
            <Column
              field="name"
              header="Name"
              editor={(options) => textEditor(options)}
            />

            <Column
              field="canonicalName"
              header="Canonical Name"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="organismId"
              header="Organism"
              body={(rowData) => {
                console.log(rowData);
                return (
                  <span>
                    {organisms.find((o) => o.id === rowData.organismId)?.name}
                  </span>
                );
              }}
              editor={(options) => organismEditor(options)}
            />

            <Column
              field="description"
              header="Description"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="createdAt"
              header="Created At"
              body={(rowData) =>
                rowData.createdAt && (
                  <FDate timestamp={rowData.createdAt} hideTime={true} />
                )
              }
            />
            <Column field="createdBy" header="Created By" />
            <Column
              rowEditor
              headerStyle={{ width: "10%", minWidth: "8rem" }}
              bodyStyle={{ textAlign: "center" }}
            />
          </DataTable>
        </div>

        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          position="right"
          className="p-sidebar-md"
          dismissable={false}
        >
          <div className="flex flex-column gap-3 pl-3  w-full">
            <div className="flex">
              <h3>
                <i className="icon icon-common icon-plus-circle"></i> Add New
                Strain
              </h3>
            </div>
            <div className="flex w-full">
              <form onSubmit={formik.handleSubmit} className="p-fluid w-full">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <InputText
                    id="name"
                    name="name"
                    type="text"
                    className={classNames({
                      "p-invalid": formik.errors.name,
                    })}
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <small className="p-error">{formik.errors.name}</small>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="canonicalName">Canonical Name</label>
                  <InputText
                    id="canonicalName"
                    name="canonicalName"
                    type="text"
                    className={classNames({
                      "p-invalid": formik.errors.canonicalName,
                    })}
                    {...formik.getFieldProps("canonicalName")}
                  />
                  {formik.touched.canonicalName &&
                  formik.errors.canonicalName ? (
                    <small className="p-error">
                      {formik.errors.canonicalName}
                    </small>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="organismId">Organism</label>
                  <Dropdown
                    id="organismId"
                    name="organismId"
                    value={formik.values.organismId}
                    options={organisms.map((o) => ({
                      label: o.canonicalName,
                      value: o.id,
                    }))}
                    placeholder="Select an organism"
                    onChange={(e) => {
                      formik.setFieldValue("organismId", e.value);
                    }}
                  />
                  {formik.touched.organismId && formik.errors.organismId ? (
                    <small className="p-error">
                      {formik.errors.organismId}
                    </small>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="description">Description</label>
                  <InputText
                    id="description"
                    name="description"
                    type="text"
                    className={classNames({
                      "p-invalid": formik.errors.description,
                    })}
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <small className="p-error">
                      {formik.errors.description}
                    </small>
                  ) : null}
                </div>

                <Button
                  type="submit"
                  loading={creatingStrain}
                  label="Commit"
                  className="p-button-warning"
                  disabled={creatingStrain}
                />
              </form>
            </div>
          </div>
        </Sidebar>
      </div>
    </React.Fragment>
  );
};

export default observer(StrainList);
