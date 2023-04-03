import { observer } from "mobx-react-lite";
import { AutoComplete } from "primereact/autocomplete";
import { BlockUI } from "primereact/blockui";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Sidebar } from "primereact/sidebar";

import React, { useContext, useState } from "react";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import GeneViewProtectedDataAddResistanceMutationForm from "./GeneViewProtectedDataAddResistanceMutationForm";

const GeneViewProtectedDataResistanceMutation = ({
  data,
  edit,
  editing,
  add,
  adding,
}) => {
  const [tableData, setTableData] = useState([...data]);
  const [displayAddSideBar, setDisplayAddSideBar] = useState(false);

  const rootStore = useContext(RootStoreContext);
  const { appVars } = rootStore.generalStore;
  const [filteredResearchers, setFilteredResearchers] = useState([]);
  const [filteredOrgs, setFilteredOrgs] = useState([]);

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

  const researcherEditor = (options) => {
    return (
      <AutoComplete
        value={options.value}
        delay={1500}
        suggestions={filteredResearchers}
        completeMethod={searchResearcher}
        onChange={(e) => options.editorCallback(e.target.value)}
        dropdown
      />
    );
  };

  const searchResearcher = (event) => {
    const query = event.query;
    const filteredResults = appVars.appUsersFlattened.filter((username) =>
      username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResearchers(filteredResults);
  };

  const dropDownOrgsEditor = (options) => {
    return (
      <AutoComplete
        value={options.value}
        delay={1500}
        suggestions={filteredOrgs}
        completeMethod={searchOrgs}
        onChange={(e) => options.editorCallback(e.target.value)}
        dropdown
        forceSelection={true}
      />
    );
  };

  const searchOrgs = (event) => {
    const query = event.query;
    const filteredResults = appVars.appOrgsAliasFlattened.filter((org) =>
      org.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOrgs(filteredResults);
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
              field="mutation"
              header="Mutation"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="isolate"
              header="Isolate"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="parentStrain"
              header="Parent Strain"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="compound"
              header="Compound"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="shiftInMIC"
              header="Shift In MIC"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="org"
              header="Organization"
              editor={(options) => dropDownOrgsEditor(options)}
            />
            <Column
              field="researcher"
              header="Researcher"
              editor={(options) => researcherEditor(options)}
            />
            <Column
              field="reference"
              header="Reference"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="notes"
              header="Notes"
              editor={(options) => textAreaEditor(options)}
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
              <i className="icon icon-common icon-plus-circle"></i> Add
              Essentiality
            </h3>
          </div>
          <div className="flex w-full">
            <GeneViewProtectedDataAddResistanceMutationForm
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

export default observer(GeneViewProtectedDataResistanceMutation);
