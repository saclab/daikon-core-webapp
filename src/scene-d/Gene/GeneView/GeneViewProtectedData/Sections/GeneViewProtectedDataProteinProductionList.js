import { observer } from "mobx-react-lite";
import { BlockUI } from "primereact/blockui";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Sidebar } from "primereact/sidebar";
import React, { useState } from "react";
import FDate from "../../../../../app/common/FDate/FDate";
import GeneViewProtectedDataAddProteinProductionForm from "./GeneViewProtectedDataAddProteinProductionForm";

const GeneViewProtectedDataProteinProductionList = ({
  data,
  edit,
  editing,
  add,
  adding,
}) => {
  const [tableData, setTableData] = useState([...data]);
  const [displayAddSideBar, setDisplayAddSideBar] = useState(false);

  /* Add functions */

  const tableHeader = (
    <div className="table-header">
      <div className="flex justify-content-end">
        <div className="flex">
          <Button
            type="button"
            icon="icon icon-common icon-plus-circle"
            label="Add"
            className="p-button-text p-button-sm"
            style={{ height: "30px", marginRight: "5px" }}
            onClick={() => setDisplayAddSideBar(true)}
          />
        </div>
      </div>
    </div>
  );

  /* ---- */

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
        autoResize
        rows={4}
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const dateEditor = (options) => {
    return (
      <div className="p-float-label">
        <Calendar
          inputId="edit_date"
          value={options.value}
          onChange={(e) => options.editorCallback(e.target.value)}
        />
        <label htmlFor="edit_date">
          <FDate timestamp={options.value} hideTime={true} />
        </label>
      </div>
    );
  };

  let saveEdits = (e) => {
    let { newData } = e;
    edit(newData);
  };
  /* ---*/

  return (
    <React.Fragment>
      <div className="card p-fluid">
        <BlockUI blocked={editing}>
          <DataTable
            value={tableData}
            header={tableHeader}
            responsiveLayout="scroll"
            editMode="row"
            dataKey="id"
            onRowEditComplete={saveEdits}
          >
            <Column
              field="production"
              header="Production"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="method"
              header="Method"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="purity"
              header="Purity"
              editor={(options) => textEditor(options)}
            />

            <Column
              field="dateProduced"
              header="Date Produced"
              editor={(options) => dateEditor(options)}
              body={(rowData) =>
                rowData.dateProduced && (
                  <FDate timestamp={rowData.dateProduced} hideTime={true} />
                )
              }
            />
            <Column
              field="pmid"
              header="PMID"
              editor={(options) => textEditor(options)}
            />

            <Column
              field="notes"
              header="Notes"
              editor={(options) => textAreaEditor(options)}
            />
            <Column
              field="url"
              header="URL"
              editor={(options) => textEditor(options)}
              body={(rowData) =>
                rowData.url && (
                  <a href={rowData.url} target="_BLANK">
                    <i className="icon icon-common icon-external-link-alt"></i>
                  </a>
                )
              }
            />
            <Column
              rowEditor
              headerStyle={{ width: "10%", minWidth: "8rem" }}
              bodyStyle={{ textAlign: "center" }}
            />
          </DataTable>
        </BlockUI>
      </div>
      <Sidebar
        visible={displayAddSideBar}
        onHide={() => setDisplayAddSideBar(false)}
        position="right"
        className="p-sidebar-md"
        dismissable={false}
      >
        <div className="flex flex-column gap-3 pl-3  w-full">
          <div className="flex">
            <h3>
              {" "}
              <i className="icon icon-common icon-plus-circle"></i> Add Protein
              Production
            </h3>
          </div>
          <div className="flex w-full">
            <GeneViewProtectedDataAddProteinProductionForm
              add={add}
              adding={adding}
              closeSidebar={() => setDisplayAddSideBar(false)}
            />
          </div>
        </div>
      </Sidebar>
    </React.Fragment>
  );
};

export default observer(GeneViewProtectedDataProteinProductionList);
