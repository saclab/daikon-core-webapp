import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { BlockUI } from 'primereact/blockui';

const GeneViewProtectedDataEssentiality = ({ data, edit, editing }) => {

  const [tableData, setTableData] = useState([...data]);

  const textEditor = (options) => {
    return <InputText
      type="text"
      value={options.value}
      onChange={(e) => options.editorCallback(e.target.value)} />;
  }

  let saveEdits = (e) => {
    let { newData } = e;
    edit(newData)
  }


  return (
    <div className='card p-fluid'>
      <BlockUI blocked={editing}>
        <DataTable
          value={tableData}
          responsiveLayout="scroll"
          editMode="row"
          dataKey="id"
          onRowEditComplete={saveEdits}
        >
          <Column field="classification" header="Classification" editor={(options) => textEditor(options)} />
          <Column field="condition" header="Condition" editor={(options) => textEditor(options)} />
          <Column field="strain" header="Strain" editor={(options) => textEditor(options)} />
          <Column field="method" header="Method" editor={(options) => textEditor(options)} />
          <Column field="reference" header="Reference" editor={(options) => textEditor(options)} />
          <Column field="notes" header="Notes" editor={(options) => textEditor(options)} />
          <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
        </DataTable>
      </BlockUI>
    </div>

  )
}
export default observer(GeneViewProtectedDataEssentiality);
