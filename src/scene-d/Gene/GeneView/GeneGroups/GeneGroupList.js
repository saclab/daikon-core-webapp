import { observer } from "mobx-react-lite";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useContext, useEffect } from "react";
import Loading from "../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const GeneGroupList = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadingGeneGroup, listGeneGroups, geneGroups } =
    rootStore.geneStoreAdmin;

  useEffect(() => {
    listGeneGroups();

    return () => { };
  }, [listGeneGroups]);

  if (loadingGeneGroup) {
    return <Loading />;
  }

  const imageBodyTemplate = (rowData) => {
    let accessionNos = [...rowData.genes.map((gene) => gene.accessionNumber)];
    return <p>{accessionNos.join(", ")}</p>;
  };

  return (
    <div className="flex flex-column w-full">
      <div className="card">
        <DataTable value={geneGroups} responsiveLayout="scroll" search>
          <Column field="name" header="Name"></Column>
          <Column body={imageBodyTemplate} header="Genes"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default observer(GeneGroupList);
