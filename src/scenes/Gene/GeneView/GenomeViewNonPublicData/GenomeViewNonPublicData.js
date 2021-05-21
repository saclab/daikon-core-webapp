import React, { useState, useEffect } from "react";
import { Fieldset } from "primereact/fieldset";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
const GenomeViewNonPublicData = () => {
  const [genomeNonPublicData, setGenomeNonPublicData] = useState(null);

  useEffect(() => {
    axios.get("/data/genomes/nonPublicData/rv1297.json").then((resp) => {
      setGenomeNonPublicData(resp.data);
      console.log(resp.data);
    });
  }, []);

  if (genomeNonPublicData === null) {
    return <ProgressSpinner />;
  }

  // axios.get("data/genomes.json").then((res) => res.data.data)
  return (
    <div>
      <div className="p-d-flex">
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Essentiality">
                <DataTable value={genomeNonPublicData.Essentiality}>
                  <Column field="Classification" header="Classification"></Column>
                  <Column field="Condition" header="Condition"></Column>
                  <Column field="Strain" header="Strain"></Column>
                  <Column field="Method" header="Method"></Column>
                  <Column field="Reference" header="Reference"></Column>
                  <Column field="Notes" header="Notes"></Column>
                </DataTable>
              </Fieldset>
            </div>
          </div>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Protein Production List">
              <DataTable value={genomeNonPublicData.ProteinProduction} >
                  <Column field="Protein Production" header="Protein Production"></Column>
                  <Column field="Quantity" header="Quantity"></Column>
                  <Column field="Purity" header="Purity"></Column>
                  <Column field="Date" header="Date"></Column>
               </DataTable>
              </Fieldset>
            </div>
          </div>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Protein Activity Assay List">
              <DataTable value={genomeNonPublicData.ProteinActivityAssay}>
                  <Column field="Protein Activity Assay" header="Protein Activity Assay"></Column>
                  <Column field="Assay Type" header="Assay Type"></Column>
                  <Column field="Assay Throughput" header="Assay Throughput"></Column>
             </DataTable>
              </Fieldset>
            </div>
          </div>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Hypomorph, Knockdown strain, Phenotype List">
              <DataTable value={genomeNonPublicData.HypomorphKnockdownStrain} >
                  <Column field="Knockdown strain" header="Knockdown strain"></Column>
                  <Column field="Phenotype" header="Phenotype"></Column>
              </DataTable>
              </Fieldset>
            </div>
          </div>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="CRISPRi Strain List">
              <DataTable >
                  <Column field="CRISPRi Strain" header="CRISPRi Strain"></Column>
              </DataTable>
              </Fieldset>
            </div>
          </div>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Resistance Mutations">
              <DataTable >
                  <Column field="Mutation" header="Mutation"></Column>
                  <Column field="Isolate" header="Isolate"></Column>
                  <Column field="Parent Strain" header="Parent Strain"></Column>
                  <Column field="Compound (SMILES)" header="Compound (SMILES)"></Column>
                  <Column field="Shift in MIC" header="Shift in MIC"></Column>
                  <Column field="Lab" header="Lab"></Column>
              </DataTable>
              </Fieldset>
            </div>
          </div>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Vulnerability">
              <DataTable >
                  <Column field="Rank" header="Rank"></Column>
                  <Column field="u_vi" header="u_vi"></Column>
                  <Column field="I_vi" header="I_vi"></Column>
                  <Column field="vi_ratio" header="vi_ratio"></Column>
                  <Column field="Condition(s)" header="Condition(s)"></Column>
                  <Column field="Operon" header="Operon"></Column>
                  <Column field="Confounded" header="Confounded"></Column>
                  <Column field="Shell_2015 operon" header="Shell_2015 operon"></Column>
              </DataTable>
              </Fieldset>
            </div>
          </div>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Unpublished Structural Information">
              <DataTable >
                  <Column field="Organization" header="Organization"></Column>
                  <Column field="Method" header="Method"></Column>
                  <Column field="Resolution" header="Resolution"></Column>
                  <Column field="Condition(s)" header="Condition(s)"></Column>
                  <Column field="Ligand" header="Ligand"></Column>
              </DataTable>
              </Fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenomeViewNonPublicData;
