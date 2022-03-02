import React, { useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SmilesView from "../../../../app/common/SmilesView/SmilesView";

const PortfolioBaseHits = ({ project }) => {
  const dt = useRef(null);

  let tableData = [];

  if (project?.baseHits.length !== 0) {
    project.baseHits.forEach((baseHit) => {
      console.log(baseHit.baseHit);
      tableData.push({
        id: baseHit.baseHit.compound.id,
        molArea: baseHit.baseHit.compound.molArea,
        molWeight: baseHit.baseHit.compound.molWeight,
        externalCompundIds: baseHit.baseHit.compound.externalCompundIds,
        smile: baseHit.baseHit.compound.smile,
        ic50: baseHit.baseHit.ic50,
        mic: baseHit.baseHit.mic,
      });
    });
  }

  const StructureBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div style={{ minWidth: "350px", marginRight: "50px" }}>
          <SmilesView smiles={rowData?.smile} />
        </div>
      </React.Fragment>
    );
  };

  console.log("PortfolioTableData :::");
  console.log(tableData);

  return (
    <div>
      <DataTable
        ref={dt}
        value={tableData}
        emptyMessage="No data."
        resizableColumns
        columnResizeMode="fit"
        showGridlines
        dataKey="id"
      >
        <Column field="externalCompundIds" header="Id" />
        <Column field="mic" header="mic" />
        <Column field="ic50," header="ic50" />
        <Column
          field="smile"
          header="Structure"
          body={StructureBodyTemplate}
          style={{ minWidth: "450px" }}
        />
      </DataTable>
    </div>
  );
};

export default PortfolioBaseHits;
