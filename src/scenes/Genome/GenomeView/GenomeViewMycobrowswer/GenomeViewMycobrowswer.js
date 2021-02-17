import React, { useState, useEffect, useContext } from "react";
import { Fieldset } from "primereact/fieldset";

import { ProgressSpinner } from "primereact/progressspinner";
import KeyValList from "../../../../app/common/KeyValList/KeyValList";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const GenomeViewMycobrowswer = ({ id }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { getGenome } = rootStore.genomeStore;

  const [genomeData, setGenomeData] = useState({
    GeneralAnnotation: {
      Type: "CDS",
      Function:
        "Facilitates transcription termination by a mechanism that involves rho binding to the nascent RNA, activation of rho'S RNA-dependent ATPase activity, and release of the mRNA from the DNA template",
      Product: "Probable transcription termination factor Rho homolog",
      Comments:
        "Rv1297, (MTCY373.17), len: 602 aa. Probable rho, transcription termination factor homolog, highly similar to many e.g. RHO_MYCLE|P45835 Mycobacterium leprae (610 aa), FASTA scores: (81.5% identity in 612 aa overlap). Contains 1 RNA recognition motif (RRM). Nucleotide position 1453608 in the genome sequence has been corrected, T:C resulting in G135G.",
      FunctionalCategory: "Information pathways",
      Proteomics:
        "Identified by proteomics (see Rosenkrands et al., 2000). Identified in the membrane fraction of M. tuberculosis H37Rv using 1D-SDS-PAGE and uLC-MS/MS (See Gu et al., 2003). Identified in the cell wall and cell membrane fractions of M. tuberculosis H37Rv using 2DLC/MS (See Mawuenyega et al., 2005). Identified by mass spectrometry in Triton X-114 extracts of M. tuberculosis H37Rv (See Malen et al., 2010). Identified by mass spectrometry in the membrane protein fraction and whole cell lysates of M. tuberculosis H37Rv but not the culture filtrate (See de Souza et al., 2011).",
      Transcriptomics:
        "mRNA identified by microarray analysis and down-regulated after 96h of starvation (see Betts et al., 2002).",
      Mutant:
        "Essential gene for in vitro growth of H37Rv, by analysis of saturated Himar1 transposon libraries (see DeJesus et al. 2017). Essential gene by Himar1 transposon mutagenesis in H37Rv strain (see Sassetti et al., 2003). Essential gene for in vitro growth of H37Rv, by Himar1 transposon mutagenesis (See Griffin et al., 2011).",
    },
    Coordinates: {
      Type: "CDS",
      Start: "1453204",
      End: "1455012",
      Orientation: "+",
    },
    GeneSummary: {
      GeneName: "rho",
      GeneLength: "1809 bp",
      Identifier: "Rv1297",
      Location: "1453204 bp",
    },
    ProteinSummary: {
      MolecularMass: "65101.4 Da",
      IsoelectricPoint: "5.4216",
      ProteinLength: "602 amino acids",
    },
    Orthologues: {
      Mbovis: "Mb1329",
      Mleprae: "ML1132",
      Mmarinum: "MMAR_4100",
      Msmegmatis: "MSMEG_4954",
    },
  });

  /* Local State Management */

  useEffect(() => {
    //setGenomeData(genomeStore.getGenome(id));
    getGenome(id);
  }, [getGenome]); // eslint-disable-line react-hooks/exhaustive-deps

  if (genomeData === null) {
    return <ProgressSpinner />;
  }

  // axios.get("data/genomes.json").then((res) => res.data.data)
  return (
    <div>
      <div className="p-d-flex">
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="General annotation">
                <KeyValList data={genomeData.GeneralAnnotation} />
              </Fieldset>
            </div>
            <div className="p-mb-2">
              <Fieldset legend="Coordinates">
                <KeyValList data={genomeData.Coordinates} />
              </Fieldset>
            </div>
          </div>
        </div>
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Gene summary">
                <KeyValList data={genomeData.GeneSummary} />
              </Fieldset>
            </div>
            <div className="p-mb-2">
              {" "}
              <Fieldset legend="Protein summary">
                <KeyValList data={genomeData.ProteinSummary} />
              </Fieldset>
            </div>
            <div className="p-mb-2">
              {" "}
              <Fieldset legend="Orthologues">
                <KeyValList data={genomeData.Orthologues} />
              </Fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenomeViewMycobrowswer;
