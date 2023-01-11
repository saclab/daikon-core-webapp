import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useRef } from "react";
import SmilesView from "../../../../../app/common/SmilesView/SmilesView";

const HABaseHits = ({ project }) => {
  const dt = useRef(null);

  let tableData = [];

  if (project?.baseHits.length !== 0) {
    project.baseHits.forEach((baseHit) => {
      tableData.push({
        id: baseHit.baseHit.compound.id,
        molArea: baseHit.baseHit.compound.molArea,
        molWeight: baseHit.baseHit.compound.molWeight,
        externalCompoundIds: baseHit.baseHit.compound.externalCompoundIds,
        smile: baseHit.baseHit.compound.smile,
        iC50: baseHit.baseHit.iC50,
        mic: baseHit.baseHit.mic,
      });
    });
  }

  const StructureBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div>
          <SmilesView smiles={rowData?.smile} width={300} />
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="flex w-full">
      <DataTable
        ref={dt}
        value={tableData}
        emptyMessage="No data."
        resizableColumns
        columnResizeMode="fit"
        showGridlines
        dataKey="id"
        className="w-full"
      >
        <Column
          header="Structure"
          body={StructureBodyTemplate}
          style={{ width: "330px" }}
        />
        <Column field="externalCompoundIds" header="Ids" />
        <Column field="mic" header="MIC" />
        <Column field="iC50" header="IC50" />
      </DataTable>
    </div>
  );
};

export default HABaseHits;
