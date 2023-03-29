import { observer } from "mobx-react-lite";
import { BlockUI } from "primereact/blockui";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import React, { useState } from "react";
import GeneViewProtectedDataAddProteinActivityAssayForm from "./GeneViewProtectedDataAddProteinActivityAssayForm";

const GeneViewProtectedDataProteinActivityAssayList = ({
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
              field="assay"
              header="Assay"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="method"
              header="Method"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="throughput"
              header="Throughput"
              editor={(options) => textEditor(options)}
            />

            <Column
              field="pmid"
              header="PMID"
              editor={(options) => textEditor(options)}
            />

            <Column
              field="reference"
              header="Reference"
              editor={(options) => textEditor(options)}
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
              <i className="icon icon-common icon-plus-circle"></i> Add Protein
              Activity Assay List
            </h3>
          </div>
          <div className="flex w-full">
            <GeneViewProtectedDataAddProteinActivityAssayForm
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

export default observer(GeneViewProtectedDataProteinActivityAssayList);
