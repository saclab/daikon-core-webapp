import { observer } from "mobx-react-lite";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputTextarea } from 'primereact/inputtextarea';

import React from "react";

const DisplayTable = ({ columns, data }) => {
  let onRowEditInit = () => {
    console.log("onRowEditInit():");
  };

  let onRowEditCancel = () => {
    console.log("onRowEditCancel():");
  };

  let rowEditorFunc = (props, element) => {
    console.log("rowEditorFunc");
    
    console.log(element);

    return (
      <InputTextarea
        type="text"
        value={props.rowData[element]}
        onChange={(e) => {
           console.log("onChange");
           console.log(element);
           console.log(props.rowData.id);
           console.log(e.target.value);
        }}
      />
    );
  };

  let generateColumns = columns.map((element) => {
    // console.log(element);

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

  return (
    <div>
      <DataTable
        value={data}
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
