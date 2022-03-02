import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Fieldset } from "primereact/fieldset";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import DisplayTable from "../../../../app/common/DisplayTable/DisplayTable";
import KeyValList from "../../../../app/common/KeyValList/KeyValList";
import { RootStoreContext } from "../../../../app/stores/rootStore";
const GenomeViewNonPublicData = ({
  gene,
  edit,
  cancelEdit,
  fetchGeneHistory,
  historyDisplayLoading,
  geneHistory,
}) => {
  const [genomeNonPublicData, setGenomeNonPublicData] = useState(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    addEssentiality,
    editEssentiality,
    addingEssentiality,
    editingEssentiality,
    addProteinProduction,
    editProteinProduction,
    addingProteinProduction,
    editingProteinProduction,
    editingUnpublishedStructures,
    addingUnpublishedStructures,
    addUnpublishedStructures,
    editUnpublishedStructures,
    editingResistanceMutation,
    addingResistanceMutation,
    addResistanceMutation,
    editResistanceMutation,
    editingProteinActivityAssay,
    addingProteinActivityAssay,
    addProteinActivityAssay,
    editProteinActivityAssay,
    editingCRISPRiStrain,
    addingCRISPRiStrain,
    addCRISPRiStrain,
    editCRISPRiStrain,
    editVulnerability,
    addVulnerability,
    editingVulnerability,
    addingVulnerability,
    addHypomorph,
    editHypomorph,
    addingHypomorph,
    editingHypomorph,
  } = rootStore.geneStore;

  // useEffect(() => {
  //   axios.get("/data/genomes/nonPublicData/rv1297.json").then((resp) => {
  //     setGenomeNonPublicData(resp.data);
  //   });
  // }, []);

  // if (genomeNonPublicData === null) {
  //   return <ProgressSpinner />;
  // }

  // axios.get("data/genomes.json").then((res) => res.data.data)
  return (
    <div>
      <div className="p-d-flex">
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Essentiality">
                <DisplayTable
                  heading={"Add Essentiality Data"}
                  columns={[
                    "classification",
                    "condition",
                    "strain",
                    "method",
                    "reference",
                    "notes",
                  ]}
                  mandatory={["classification"]}
                  data={gene.geneEssentiality}
                  add={addEssentiality}
                  edit={editEssentiality}
                  adding={addingEssentiality}
                  editing={editingEssentiality}
                />
              </Fieldset>
            </div>
          </div>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Protein Production List">
                <DisplayTable
                  heading={"Add Protein Production"}
                  columns={["production", "method", "purity", "date"]}
                  mandatory={["production"]}
                  data={gene.geneProteinProduction}
                  add={addProteinProduction}
                  edit={editProteinProduction}
                  adding={addingProteinProduction}
                  editing={editingProteinProduction}
                />
              </Fieldset>
            </div>
          </div>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Protein Activity Assay List">
                <DisplayTable
                  heading={"Add Protein Activity Assay"}
                  columns={["activity", "type", "throughput"]}
                  mandatory={["activity", "type", "throughput"]}
                  data={gene.geneProteinActivityAssay}
                  add={addProteinActivityAssay}
                  edit={editProteinActivityAssay}
                  adding={addingProteinActivityAssay}
                  editing={editingProteinActivityAssay}
                />
              </Fieldset>
            </div>
          </div>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Hypomorph">
                <DisplayTable
                  heading={"Add Hypomorph Strain"}
                  columns={["knockdownStrain", "phenotype"]}
                  mandatory={["knockdownStrain", "phenotype"]}
                  data={gene.geneHypomorphs}
                  add={addHypomorph}
                  edit={editHypomorph}
                  adding={addingHypomorph}
                  editing={editingHypomorph}
                />
              </Fieldset>
            </div>
          </div>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="CRISPRi Strain List">
                <DisplayTable
                  heading={"Add CRISPRi Strain"}
                  columns={["crispRiStrain"]}
                  mandatory={["crispRiStrain"]}
                  data={gene.geneCRISPRiStrain}
                  add={addCRISPRiStrain}
                  edit={editCRISPRiStrain}
                  adding={addingCRISPRiStrain}
                  editing={editingCRISPRiStrain}
                />
              </Fieldset>
            </div>
          </div>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Resistance Mutations">
                <DisplayTable
                  heading={"Add Resistance Mutation"}
                  columns={[
                    "mutation",
                    "isolate",
                    "parentStrain",
                    "compound",
                    "shiftInMIC",
                    "org",
                  ]}
                  mandatory={[
                    "mutation",
                    "isolate",
                    "parentStrain",
                    "compound",
                    "shiftInMIC",
                    "org",
                  ]}
                  data={gene.geneResistanceMutation}
                  add={addResistanceMutation}
                  edit={editResistanceMutation}
                  adding={addingResistanceMutation}
                  editing={editingResistanceMutation}
                />
              </Fieldset>
            </div>
          </div>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Vulnerability">
                {/* <KeyValList
                  data={gene.geneVulnerability}
                  filter={[
                    "rank",
                    "uVi",
                    "iVi",
                    "viRatio",
                    "vulnerabilityCondition",
                    "operon",
                    "confounded",
                    "shell2015Operon",
                  ]}
                  editFunc={() => editVulnerability()}
                  cancelEdit={() => cancelEdit()}
                  fetchHistory={() => fetchGeneHistory()}
                  historyDisplayLoading={historyDisplayLoading}
                  history={geneHistory}
                /> */}

                <DisplayTable
                  heading={"Add Vulnerability"}
                  columns={[
                    "rank",
                    "uVi",
                    "iVi",
                    "viRatio",
                    "vulnerabilityCondition",
                    "operon",
                    "confounded",
                    "shell2015Operon",
                  ]}
                  mandatory={["rank"]}
                  data={gene.geneVulnerability}
                  add={addVulnerability}
                  edit={editVulnerability}
                  adding={addingVulnerability}
                  editing={editingVulnerability}
                />
              </Fieldset>
            </div>
          </div>
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Unpublished Structural Information">
                <DisplayTable
                  heading={"Add Unpublished Structural Information"}
                  columns={["organization", "method", "resolution", "ligands"]}
                  mandatory={["ligands"]}
                  data={gene.geneUnpublishedStructures}
                  add={addUnpublishedStructures}
                  edit={editUnpublishedStructures}
                  adding={addingUnpublishedStructures}
                  editing={editingUnpublishedStructures}
                />
              </Fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(GenomeViewNonPublicData);
