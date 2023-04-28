import { observer } from "mobx-react-lite";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import React, { useContext } from "react";
import { RootStoreContext } from "../../stores/rootStore";
import FDate from "../FDate/FDate";

const ChangeVectors = () => {
  const rootStore = useContext(RootStoreContext);
  const { versionData, loadingVersionData } = rootStore.appStateStore;

  const PropertyNameFilterItemTemplate = (option) => {
    return <span>{option}</span>;
  };

  const PropertyNameFilter = (options) => {
    if (!loadingVersionData && versionData && versionData.length > 0) {
      return (
        <Dropdown
          value={options.value}
          options={[...new Set(versionData.map((v) => v.propertyName))]}
          onChange={(e) => options.filterApplyCallback(e.value)}
          //onChange={onFunctionalCategoryChange}
          itemTemplate={PropertyNameFilterItemTemplate}
          placeholder="Select a Property"
          className="p-column-filter"
          showClear
        />
      );
    }
  };

  const DateBodyTemplate = (rowData) => (
    <FDate timestamp={rowData.dateChanged} hideTime={false} />
  );

  const IdTemplate = (rowData) => {
    return (
      <React.Fragment>{rowData.primaryKeyValue.substring(0, 8)}</React.Fragment>
    );
  };

  return (
    <div>
      <DataTable
        value={versionData}
        loading={loadingVersionData}
        paginator={true}
        rows={50}
        filterDisplay="row"
        className="p-datatable-gridlines p-datatable-sm"
      >
        {/* <Column field="entityName" header="Entity Name" sortable={true} /> */}
        <Column field="primaryKeyValue" header="Key" body={IdTemplate} />
        <Column
          field="propertyName"
          header="Property Name"
          filter
          filterElement={PropertyNameFilter}
          showFilterMenu={false}
        />
        <Column field="oldValue" header="Old Value" sortable={true} />
        <Column field="newValue" header="New Value" sortable={true} />
        <Column field="type" header="Change Type" sortable={true} />
        <Column field="modifiedBy" header="Modified By" sortable={true} />
        <Column
          field="dateChanged"
          header="TimeStamp"
          sortable={true}
          body={DateBodyTemplate}
        />
      </DataTable>
    </div>
  );
};

export default observer(ChangeVectors);
