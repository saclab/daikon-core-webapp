import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const DisplayTable = ({ columns, data }) => {
  const [tableData, setTableData] = useState(data);
  const [originalRows, setoriginalRows] = useState(null);

  let onRowEditInit = (event) => {
    console.log("onRowEditInit():");
    let t = {};
    t[event.index] = { ...tableData[event.index] };
    setoriginalRows(t);
    console.log(originalRows);
  };

  let onRowEditCancel = (event) => {
    let products = [...tableData];
    products[event.index] = originalRows[event.index];
    console.log(products);
    delete originalRows[event.index];
    setTableData(products);
  };

  let onRowEdit = (rowId, columnName, value) => {
    let temp = [...tableData];
    let objIndex = temp.findIndex((obj) => obj.id == rowId);
    temp[objIndex][columnName] = value;
    setTableData(temp);
  };

  let rowEditorFunc = (props, element) => {
    return (
      <InputTextarea
        type="text"
        value={props.rowData[element]}
        onChange={(e) => {
          console.log("onChange");
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
        header={element}
        editor={(props) => rowEditorFunc(props, props.columnKey)}
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
        //onClick={() => setDisplayHitsImportSidebar(true)}
      />
    </div>
  );

  return (
    <div>
      <DataTable
        value={tableData}
        header={tableHeader}
        editMode="row"
        dataKey="id"
        onRowEditInit={onRowEditInit}
        onRowEditCancel={onRowEditCancel}
      >
        {generateColumns}
        <Column
          rowEditor
          headerStyle={{ width: "7rem" }}
          bodyStyle={{ textAlign: "center" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default observer(DisplayTable);
