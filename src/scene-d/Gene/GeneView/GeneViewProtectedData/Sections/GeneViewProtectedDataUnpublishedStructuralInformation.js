import { observer } from "mobx-react-lite";
import { BlockUI } from "primereact/blockui";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import React, { useContext, useEffect, useState } from "react";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import GeneViewProtectedDataAddUnpublishedStructuralInformationForm from "./GeneViewProtectedDataAddUnpublishedStructuralInformationForm";

const GeneViewProtectedDataUnpublishedStructuralInformation = ({
  data,
  edit,
  editing,
  add,
  adding,
}) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);

  const { fetchOrgs, Orgs } = rootStore.adminStore;

  useEffect(() => {
    fetchOrgs();
  }, [fetchOrgs]);

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

  const dropDownUnpublishedEditor = (options) => {
    return (
      <Dropdown
        id="organization"
        value={options.value}
        options={Orgs}
        onChange={(e) => options.editorCallback(e.target.value)}
        placeholder="Select an org"
        optionLabel="alias"
      />
    );
  };

  let saveEdits = (e) => {
    let { newData } = e;
    newData.organization = newData.organization.alias;
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
              field="organization"
              header="Organization"
              editor={(options) => dropDownUnpublishedEditor(options)}
            />
            <Column
              field="method"
              header="Method"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="resolution"
              header="Resolution"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="ligands"
              header="Ligands"
              editor={(options) => textEditor(options)}
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
        className="p-sidebar-sm"
      >
        <div className="flex flex-column gap-3 pl-3  w-full">
          <div className="flex">
            <h3>
              <i className="icon icon-common icon-plus-circle"></i> Add
              Unpublished Structural Information
            </h3>
          </div>
          <div className="flex w-full">
            <GeneViewProtectedDataAddUnpublishedStructuralInformationForm
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

export default observer(GeneViewProtectedDataUnpublishedStructuralInformation);
