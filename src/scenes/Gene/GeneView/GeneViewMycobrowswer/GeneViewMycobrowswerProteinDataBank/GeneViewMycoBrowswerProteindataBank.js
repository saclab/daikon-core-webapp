import React, { useContext, useEffect } from 'react'
import { RootStoreContext } from '../../../../../app/stores/rootStore';

const GeneViewMycoBrowswerProteindataBank = ({accessionNumber}) => {

    /* MobX Store */
    const rootStore = useContext (RootStoreContext);
    const { uniprotDisplayLoading, pdbCrossReference, fetchPdbCrossReference } = rootStore.geneStore;

    useEffect(() => {
      console.log("EFFECT GeneViewMycoBrowswerProteindataBank");
      console.log(accessionNumber);
      if (pdbCrossReference.length === 0) {
        fetchPdbCrossReference(accessionNumber);
      }
    }, [accessionNumber, pdbCrossReference, fetchPdbCrossReference]);



  return (
    <div>
      <h1>Data Here</h1>
    </div>
  )
}

export default GeneViewMycoBrowswerProteindataBank
