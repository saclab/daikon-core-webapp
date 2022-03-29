import React, { useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SmilesView from "../../../../app/common/SmilesView/SmilesView";

const PostPortfolioBaseHits = ({ project }) => {
  const dt = useRef(null);

  let tableData = [];

  if (project?.baseHits.length !== 0) {
    project.baseHits.forEach((baseHit) => {
      console.log(baseHit.baseHit);
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

  const CompoundIdBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData?.externalCompoundIds}</React.Fragment>;
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
        <Column
          header="Structure"
          body={StructureBodyTemplate}
          style={{ width: "330px" }}
        />
        <Column
          field="CompoundId"
          header="Compound Id"
          body={CompoundIdBodyTemplate}
          style={{ width: "200px" }}
        />
        <Column field="mic" header="MIC" />
        <Column field="iC50" header="IC50" />
      </DataTable>
    </div>
  );
};

export default PostPortfolioBaseHits;
