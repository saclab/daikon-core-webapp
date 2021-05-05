import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { Skeleton } from 'primereact/skeleton';


const GeneViewMycoBrowswerProteindataBank = ({ accessionNumber }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    uniprotDisplayLoading,
    pdbCrossReference,
    fetchPdbCrossReference,
  } = rootStore.geneStore;

  useEffect(() => {
    console.log("EFFECT GeneViewMycoBrowswerProteindataBank");
    console.log(accessionNumber);
    console.log(uniprotDisplayLoading);
    if (
      pdbCrossReference === null ||
      pdbCrossReference.accessionNumber !== accessionNumber
    ) {
      fetchPdbCrossReference(accessionNumber);
    }
  }, [accessionNumber, pdbCrossReference, fetchPdbCrossReference, uniprotDisplayLoading]);

  if (uniprotDisplayLoading) {
    return <Skeleton width="10rem" height="4rem"></Skeleton>;
  } else if (!uniprotDisplayLoading && pdbCrossReference !== null) {
    let generateData = pdbCrossReference.data.map((obj) => {
      return (
        <tr key={obj.id}>
          <td>
            <a
              href={"https://www.ebi.ac.uk/pdbe/entry/pdb/" + obj.id}
              target="_blank"
              rel="noreferrer"
            >
              {obj.id}
            </a>
          </td>
          <td>{obj.method}</td>
          <td>{obj.resolution}</td>
          <td>
            <a
              href={
                "https://www.uniprot.org/blast/?about=" +
                obj.accession +
                "%5B" +
                obj.chains +
                "%5D"
              }
              target="_blank"
              rel="noreferrer"
            >
              {obj.chains}
            </a>
          </td>
        </tr>
      );
    });

    return (
      generateData.length!==0?
      <div>
        <table style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr key="head">
              <th>Crystal</th>
              <th>Method</th>
              <th>Resolution</th>
              <th>Chains</th>
            </tr>
          </thead>
          <tbody>{generateData}</tbody>
        </table>
      </div>:
      <h3>No Entries</h3>
    );
  } else {
    return <Skeleton width="10rem" height="4rem"></Skeleton>;
  }
};

export default observer(GeneViewMycoBrowswerProteindataBank);
