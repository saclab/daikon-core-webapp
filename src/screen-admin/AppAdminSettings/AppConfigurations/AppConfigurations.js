import { useFormik } from "formik";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Sidebar } from "primereact/sidebar";
import { classNames } from "primereact/utils";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import Loading from "../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { appColors } from "../../../colors";

const AppConfigurations = () => {
  const navigate = useNavigate();

  const [visibleAddComponent, setVisibleAddComponent] = useState(false);
  const [displayExpandedValue, setDisplayExpandedValue] = useState(false);
  const [selectedValue, setSelectedValue] = useState(false);

  const rootStore = useContext(RootStoreContext);
  const {
    appSettingsDisplayLoading,
    fetchAppConfiguration,
    appConfigurationsMap,
    addAppConfiguration,
    addingAppConfiguration,
    editAppConfiguration,
    editingAppConfiguration,
  } = rootStore.appSettingsStore;

  useEffect(() => {
    console.log("AppConfigurations");
    fetchAppConfiguration();
  }, [fetchAppConfiguration]);

  const breadCrumbItems = [
    {
      label: "App Settings",
      command: () => {
        navigate("/admin/settings/");
      },
    },

    { label: "Configurations" },
  ];

  const validationSchema = Yup.object({
    value: Yup.string().required("Value is required"),
    key: Yup.string()
      .required("Key is required")
      .test(
        "is-camel-case",
        "Key must be in camel case and cannot contain spaces",
        (value) =>
          /^[a-z]+(?:[A-Z][a-zA-Z0-9]+)*$/.test(value) &&
          !_.includes(value, " ")
      ),
  });

  const onSubmit = (values) => {
    if (values.isValueInJSON) {
      values.value = JSON.stringify(JSON.parse(values.value));
    }
    addAppConfiguration(values).then((res) => {
      if (res) {
        toast.success("Configuration added successfully");
        formik.resetForm();
        setVisibleAddComponent(false);
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      key: "",
      value: "",
      component: "",
      comments: "",
      isValueInJSON: false,
    },
    validationSchema,
    onSubmit,
  });

  if (appSettingsDisplayLoading) return <Loading />;

  let addForm = () => (
    <form onSubmit={formik.handleSubmit} className="p-fluid w-full">
      <div className="field">
        <label htmlFor="key">Key</label>
        <InputText
          id="key"
          name="key"
          type="text"
          className={classNames({
            "p-invalid": formik.errors.key,
          })}
          {...formik.getFieldProps("key")}
        />
        {formik.touched.key && formik.errors.key ? (
          <small className="p-error">{formik.errors.key}</small>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="value">Value</label>
        <InputTextarea
          id="value"
          name="value"
          type="text"
          className={classNames({
            "p-invalid": formik.errors.value,
          })}
          {...formik.getFieldProps("value")}
        />
        {formik.touched.value && formik.errors.value ? (
          <small className="p-error">{formik.errors.value}</small>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="component">Component</label>
        <InputText
          id="component"
          name="component"
          type="text"
          className={classNames({
            "p-invalid": formik.errors.component,
          })}
          {...formik.getFieldProps("component")}
        />
        {formik.touched.component && formik.errors.component ? (
          <small className="p-error">{formik.errors.component}</small>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="isValueInJSON">Is Value in JSON ?</label>
        <InputSwitch
          id="isValueInJSON"
          name="isValueInJSON"
          checked={formik.values.isValueInJSON}
          style={{ marginLeft: "1rem" }}
          {...formik.getFieldProps("isValueInJSON")}
        />
      </div>

      <Button
        type="submit"
        //loading={creatingOrganism}
        label="Commit"
        className="p-button-warning"
        //disabled={creatingOrganism}
      />
    </form>
  );

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

  const textAreaEditor = (options) => {
    return (
      <InputTextarea
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const handleEdit = (e) => {
    let { newData } = e;
    // let editedOrg = {
    //   id: newData.id,
    //   name: newData.name,
    //   canonicalName: newData.canonicalName,
    //   description: newData.description,
    // };

    editAppConfiguration(newData).then((res) => {
      if (res) {
        toast.success("Configuration updated successfully");
      }
    });
  };

  const valueColumnTemplate = (rowData) => {
    if (rowData.value && rowData.value.length > 20) {
      // Show the first 20 characters and a "Show more" button
      return (
        <>
          {rowData.value.substring(0, 20)}{" "}
          <button
            onClick={() => {
              setSelectedValue(rowData.value);
              setDisplayExpandedValue(true);
            }}
          >
            Show more
          </button>
        </>
      );
    }

    // Show the full value or the first 20 characters if it's shorter
    return rowData.value;
  };

  return (
    <React.Fragment>
      <div className="flex flex-column gap-2 w-full">
        <div className="flex w-full">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="ri-folder-settings-fill"
            heading={"Configurations"}
            displayHorizon={false}
            color={appColors.blocks.blue}
            customButtons={[
              {
                label: "New Configuration",
                icon: "pi pi-plus",
                className: "p-button-warning",
                action: () => setVisibleAddComponent(true),
              },
            ]}
          />
        </div>

        <div className="flex w-full">
          <DataTable
            value={Array.from(appConfigurationsMap.values())}
            className="p-datatable w-full"
            resizableColumns
            columnResizeMode="expand"
            editMode="row"
            dataKey="id"
            onRowEditComplete={(e) => handleEdit(e)}
          >
            <Column field="key" header="Key" />
            <Column
              field="value"
              header="Value"
              editor={(options) => textAreaEditor(options)}
              body={valueColumnTemplate}
            />
            <Column
              field="component"
              header="Component"
              editor={(options) => textEditor(options)}
            />
            <Column field="version" header="Version" />
            <Column
              field="comments"
              header="Comments"
              editor={(options) => textEditor(options)}
            />
            <Column
              rowEditor
              headerStyle={{ width: "10%", minWidth: "8rem" }}
              bodyStyle={{ textAlign: "center" }}
            />
          </DataTable>
        </div>
      </div>

      <Sidebar
        visible={visibleAddComponent}
        onHide={() => setVisibleAddComponent(false)}
        position="right"
        className="p-sidebar-md"
        dismissable={false}
      >
        <div className="flex flex-column gap-3 pl-3  w-full">
          <div className="flex">
            <h3>
              <i className="icon icon-common icon-plus-circle"></i> Add New
              Configuration
            </h3>
          </div>
          <div className="flex w-full">{addForm()}</div>
        </div>
      </Sidebar>

      <Dialog
        header="Value"
        visible={displayExpandedValue}
        onHide={() => setDisplayExpandedValue(false)}
      >
        <p>{selectedValue}</p>
      </Dialog>
    </React.Fragment>
  );
};

export default observer(AppConfigurations);
