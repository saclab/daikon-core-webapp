import { useState } from "react";
import { observer } from "mobx-react-lite";
import { StartCase } from "react-lodash";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { BlockUI } from "primereact/blockui";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { confirmDialog } from "primereact/confirmdialog";
import { toast } from "react-toastify";
import _ from "lodash";
import "./DisplayTable.css";

const DisplayTable = ({
  heading,
  columns,
  data,
  edit,
  adding,
  editing,
  add,
  mandatory,
}) => {

  /* Check if data property is missing, if yes create a blank array to prevent nulls */
  data = (typeof data === 'undefined' || data === null) ? [] : data;

  const [tableData, setTableData] = useState([...data]);
  const [originalRows, setoriginalRows] = useState(null);

  const [displayAddDialog, setDisplayAddDialog] = useState(false);

  let onRowEditInit = (event) => {
    //console.log("onRowEditInit():");
    //console.log(event)
    let t = {};
    t[event.index] = { ...tableData[event.index] };
    setoriginalRows(t);
    //console.log(originalRows);
  };

  let onRowEditCancel = (event) => {
    let products = [...tableData];
    products[event.index] = originalRows[event.index];
    ////console.log(products);
    delete originalRows[event.index];
    setTableData(products);
  };

  let onRowEdit = (rowId, columnName, value) => {
    let temp = [...tableData];
    let objIndex = temp.findIndex((obj) => obj.id === rowId);
    temp[objIndex][columnName] = value;
    setTableData(temp);
  };

  let onRowEditSave = (e) => {
    ////console.log("onRowEditSave");
    ////console.log(e.data);
    confirmDialog({
      header: "Modifying Database",
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => edit(e.data),
      reject: () =>
        toast.info(
          "Cancelled. Local data might be invalid. Please resync the app."
        ),
    });
  };

  let rowEditorFunc = (props, element) => {
    //console.log("rowEditorFunc")
    //console.log(props)
    
    return (
      <InputTextarea
        type="text"
        value={props.rowData[element]}
        onChange={(e) => {
          ////console.log("onChange");
          onRowEdit(props.rowData.id, element, e.target.value);
        }}
      />
    );
  };

  let generateColumns = columns.map((element) => {
    return (
      <Column
        key={element}
        columnKey={element}
        field={element}
        header={<StartCase string={element} />}
        editor={(options) => rowEditorFunc(options, options.columnKey)}
      />
    );
  });

  const tableHeader = (
    <div className="p-d-flex p-ai-center float-right">
      <Button
        type="button"
        icon="icon icon-common icon-plus-circle"
        label="Add"
        className="p-button-text p-button-sm"
        style={{ height: "30px", marginRight: "5px" }}
        onClick={() => setDisplayAddDialog(true)}
      />
    </div>
  );

  /* Add Form Section */

  let addForminitialValues = {};
  columns.forEach((key) => (addForminitialValues[key] = ""));

  const formik = useFormik({
    initialValues: { ...addForminitialValues },
    validate: (data) => {
      let errors = {};
      //console.log("Validation");
      for (var key of Object.keys(data)) {
        if (mandatory && mandatory.includes(key) && !data[key]) {
          errors[key] = _.startCase(key) + " is required.";
        }
      }
      return errors;
    },
    onSubmit: (data) => {
      //console.log("Formik Submitting");
      //console.log(data);
      add(data);

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

  let generateAddFormFields = columns.map((element) => {
    return (
      <div className="field" key={element}>
        <label
          htmlFor={element}
          className={classNames({
            "p-error": isFormFieldValid(element),
          })}
        >
          <StartCase string={element} />{" "}
          {mandatory && mandatory.includes(element) ? "*" : ""}
        </label>
        <InputText
          id={element}
          value={formik.values[element]}
          onChange={formik.handleChange}
          className={classNames({
            "p-invalid": isFormFieldValid(element),
          })}
        />

        {getFormErrorMessage(element)}
      </div>
    );
  });

  /* End Add Form Section */

  return (
    <div>
      {editing && (
        <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
      )}
      <BlockUI blocked={editing}>
        <DataTable
          value={tableData}
          header={tableHeader}
          editMode="row"
          dataKey="id"
          onRowEditInit={onRowEditInit}
          onRowEditCancel={onRowEditCancel}
          onRowEditSave={onRowEditSave}
          size="small"
          className="p-datatable-displaytable"
        >
          {generateColumns}
          <Column
            rowEditor
            headerStyle={{ width: "7rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      </BlockUI>
      <Sidebar
        visible={displayAddDialog}
        position="right"

        onHide={() => {
          formik.resetForm();
          setDisplayAddDialog(false);
        }}
        className="p-sidebar-md"
      >
        <div className="card">
          <h3>
            <i className="icon icon-common icon-plus-circle" />{" "}
            {heading ? heading : "Add"}
          </h3>

          <hr />
          <br />
          {adding ? (
            <ProgressBar
              mode="indeterminate"
              style={{ height: "6px" }}
            ></ProgressBar>
          ) : (
            <form className="p-fluid" onSubmit={formik.handleSubmit}>
              {generateAddFormFields}
              <Button
                icon="icon icon-common icon-database-submit"
                type="submit"
                label="Add to database"
                className="p-mt-2"
                loading={adding}
              />
            </form>
          )}
        </div>
      </Sidebar>
    </div>
  );
};

export default observer(DisplayTable);
