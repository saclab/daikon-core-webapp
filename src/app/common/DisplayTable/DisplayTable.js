import { observer } from "mobx-react-lite";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

const DisplayTable = ({ columns, data }) => {

  let generateColumns = columns.map(element => {
     return <Column key={element} field={element} header={element} />
  });

  return (
    <div>
      <DataTable value={data}>
      {generateColumns}
      </DataTable>
    </div>
  );
};

export default observer(DisplayTable);
