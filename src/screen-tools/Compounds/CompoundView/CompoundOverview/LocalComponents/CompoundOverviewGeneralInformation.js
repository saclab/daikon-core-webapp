import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

const CompoundOverviewGeneralInformation = ({ selectedCompound }) => {
  let data = [
    {
      name: "Id",
      value: selectedCompound.id,
    },
    {
      name: "Compound Id",
      value: selectedCompound.externalCompoundIds,
    },
    {
      name: "Mol Weight",
      value: selectedCompound.molWeight,
    },
    {
      name: "Mol Area",
      value: selectedCompound.molArea,
    },
    {
      name: "SMILES",
      value: (
        <p style={{ wordWrap: "break-word", maxWidth: "15rem" }}>
          {selectedCompound.smiles}
        </p>
      ),
    },
  ];

  return (
    <div className="flex flex-column flex-wrap ">
      <DataTable className="noDataTableHeader" value={data}>
        <Column field="name"></Column>
        <Column field="value"></Column>
      </DataTable>
    </div>
  );
};

export default CompoundOverviewGeneralInformation;
