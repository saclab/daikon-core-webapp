import React, { useState, useEffect, useRef, useContext } from "react";
import _ from "lodash";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Loading from "../../../../app/layout/Loading/Loading";

const GeneGroupList = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadingGeneGroup, listGeneGroups, geneGroups } =
    rootStore.geneStoreAdmin;

  useEffect(() => {
    listGeneGroups();

    return () => {};
  }, [listGeneGroups]);

  if (loadingGeneGroup) {
    return <Loading />;
  }

  const imageBodyTemplate = (rowData) => {
    let accessionNos = [...rowData.genes.map((gene) => gene.accessionNumber)];
    return <p>{accessionNos.join(", ")}</p>;
  };

  return (
    <div>
      <div className="card">
        <DataTable value={geneGroups} responsiveLayout="scroll">
          <Column field="name" header="Name"></Column>
          <Column body={imageBodyTemplate} header="Genes"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default observer(GeneGroupList);
