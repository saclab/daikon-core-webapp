import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { classNames } from "primereact/utils";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { appColors } from "../../../../colors";
import { Button } from "primereact/button";
import _ from "lodash";

const OrganismList = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const rootStore = useContext(RootStoreContext);
  const {
    displayLoading,
    fetchOrganisms,
    organisms,
    cacheValid,
    editOrganism,
    createOrganism,
    creatingOrganism,
  } = rootStore.organismStore;

  useEffect(() => {
    if (!cacheValid) {
      console.log("fetchOrganisms");
      fetchOrganisms();
    }
  }, [fetchOrganisms, cacheValid]);

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

  const handleEdit = (e) => {
    let { newData } = e;

    let editedOrg = {
      id: newData.id,
      name: newData.name,
      canonicalName: newData.canonicalName,
      description: newData.description,
    };

    editOrganism(editedOrg).then((res) => {
      if (res) {
        toast.success("Organism updated successfully");
      }
    });
  };

  // Create a validation schema using Yup. This will define the shape and validation rules for the form fields.

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    canonicalName: Yup.string()
      .required("Canonical name is required")
      .test(
        "is-snake-case",
        "Canonical name must be in snake case and cannot contain spaces",
        (value) => _.snakeCase(value) === value && !_.includes(value, " ")
      ),
  });

  //  Create a function to handle the form submission. This function will be called when the user clicks the submit button.
  const onSubmit = (values) => {
    createOrganism(values).then((res) => {
      if (res) {
        toast.success("Organism added successfully");
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
    },
    validationSchema,
    onSubmit,
  });

  return (
    <React.Fragment>
      <div className="flex flex-column w-full">
        <div className="flex w-full">
          <SectionHeading
            heading={"Organisms"}
            color={appColors.blocks.gray}
            textColor={appColors.blocks.black}
            customButtons={[
              {
                label: "New Organism",
                icon: "pi pi-plus",
                action: () => setVisible(true),
              },
            ]}
          />
        </div>

        <div className="flex w-full">
          <DataTable
            value={organisms}
            loading={displayLoading}
            editMode="row"
            dataKey="id"
            onRowEditComplete={(e) => handleEdit(e)}
          >
            <Column field="id" header="GUID" />
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
              field="description"
              header="Description"
              editor={(options) => textEditor(options)}
            />
            <Column field="createdAt" header="Created At" />
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
                Organism
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
                  loading={creatingOrganism}
                  label="Commit"
                  className="p-button-warning"
                  disabled={creatingOrganism}
                />
              </form>
            </div>
          </div>
        </Sidebar>
      </div>
    </React.Fragment>
  );
};

export default observer(OrganismList);
