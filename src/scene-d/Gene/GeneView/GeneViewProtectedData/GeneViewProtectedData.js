import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Fieldset } from "primereact/fieldset";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import { appColors } from "../../../../colors";
import DisplayTable from "../../../../app/common/DisplayTable/DisplayTable";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { BreadCrumb } from "primereact/breadcrumb";
import EmbededHelp from "../../../../app/common/EmbededHelp/EmbededHelp";
import GeneViewProtectedDataEssentiality from "./Sections/GeneViewProtectedDataEssentiality";
import GeneViewProtectedDataProteinProductionList from "./Sections/GeneViewProtectedDataProteinProductionList";
import GeneViewProtectedDataProteinActivityAssayList from "./Sections/GeneViewProtectedDataProteinActivityAssayList";
import GeneViewProtectedDataHypomorph from "./Sections/GeneViewProtectedDataHypomorph";
import GeneViewProtectedDataCrispRiStrainList from "./Sections/GeneViewProtectedDataCrispRiStrainList";

const GeneViewProtectedData = ({
  gene,
  edit,
  cancelEdit,
  fetchGeneHistory,
  historyDisplayLoading,
  geneHistory,
}) => {
  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "Genes",
      command: () => {
        navigate("/d/gene/");
      },
    },
    {
      label: gene.accessionNumber,
      command: () => {
        navigate(`/d/gene/${gene.id}`);
      },
    },
    { label: "TBDA Data" },
  ];

  // const [genomeNonPublicData, setGenomeNonPublicData] = useState(null);

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

  return (
    <div className="flex flex-column w-full">
      <div className="flex w-full pb-2">
        <BreadCrumb model={breadCrumbItems} />
      </div>
      <div className="flex w-full">
        <SectionHeading
          icon="icon icon-conceptual icon-dna"
          heading={gene.accessionNumber}
          accessionNumber={gene.accessionNumber}
          displayHorizon={true}
          color={appColors.sectionHeadingBg.gene}
        />
      </div>
      <div className="flex w-full">
        <div className="flex flex-column gap-3 w-full">
          <div className="flex w-full">
            <Fieldset className="w-full" legend="Essentiality">
              <EmbededHelp>
                A gene is considered essential if it is required for the
                reproductive success of a cell or an organism. Gene essentiality
                is a core concept of genetics, with repercussions in
                evolutionary, systems and synthetic biology and with
                applications in drug development.
              </EmbededHelp>
              {/* <DisplayTable
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
              /> */}
              <GeneViewProtectedDataEssentiality
                data={gene.geneEssentiality}
                edit={editEssentiality}
                editing={editingEssentiality}
                add={addEssentiality}
                adding={addingEssentiality}
              />
            </Fieldset>
          </div>

          <div className="flex w-full">
            <Fieldset className="w-full" legend="Protein Production List">
              <EmbededHelp>
                Protein production is the biotechnological process of generating
                a specific protein. It is typically achieved by the manipulation
                of gene expression in an organism such that it expresses large
                amounts of a recombinant gene.
              </EmbededHelp>
              {/* <DisplayTable
                heading={"Add Protein Production"}
                columns={["production", "method", "purity", "date"]}
                mandatory={["production"]}
                data={gene.geneProteinProduction}
                add={addProteinProduction}
                edit={editProteinProduction}
                adding={addingProteinProduction}
                editing={editingProteinProduction}
              /> */}
              <GeneViewProtectedDataProteinProductionList
                data={gene.geneProteinProduction}
                edit={editProteinProduction}
                editing={editingProteinProduction}
                add={addProteinProduction}
                adding={addingProteinProduction}
              />
            </Fieldset>
          </div>
          <div className="flex w-full">
            <Fieldset className="w-full" legend="Protein Activity Assay List">
              {/* <DisplayTable
                heading={"Add Protein Activity Assay"}
                columns={["activity", "type", "throughput"]}
                mandatory={["activity", "type", "throughput"]}
                data={gene.geneProteinActivityAssay}
                add={addProteinActivityAssay}
                edit={editProteinActivityAssay}
                adding={addingProteinActivityAssay}
                editing={editingProteinActivityAssay}
              /> */}
              <GeneViewProtectedDataProteinActivityAssayList
                data={gene.geneProteinActivityAssay}
                edit={editProteinActivityAssay}
                editing={editingProteinActivityAssay}
                add={addProteinActivityAssay}
                adding={addingProteinActivityAssay}
              />
            </Fieldset>
          </div>
          <div className="flex w-full">
            <Fieldset className="w-full" legend="Hypomorph">
              {/* <DisplayTable
                heading={"Add Hypomorph Strain"}
                columns={["knockdownStrain", "phenotype"]}
                mandatory={["knockdownStrain", "phenotype"]}
                data={gene.geneHypomorphs}
                add={addHypomorph}
                edit={editHypomorph}
                adding={addingHypomorph}
                editing={editingHypomorph}
              /> */}
              <GeneViewProtectedDataHypomorph
                data={gene.geneHypomorphs}
                edit={editHypomorph}
                editing={editingHypomorph}
                add={addHypomorph}
                adding={addingHypomorph}
              />
            </Fieldset>
          </div>
          <div className="flex w-full">
            <Fieldset className="w-full" legend="CRISPRi Strain List">
              {/* <DisplayTable
                heading={"Add CRISPRi Strain"}
                columns={["crispRiStrain"]}
                mandatory={["crispRiStrain"]}
                data={gene.geneCRISPRiStrain}
                add={addCRISPRiStrain}
                edit={editCRISPRiStrain}
                adding={addingCRISPRiStrain}
                editing={editingCRISPRiStrain}
              /> */}
              <GeneViewProtectedDataCrispRiStrainList
                data={gene.geneCRISPRiStrain}
                edit={editCRISPRiStrain}
                editing={editingCRISPRiStrain}
                add={addCRISPRiStrain}
                adding={addingCRISPRiStrain}
              />
            </Fieldset>
          </div>
          <div className="flex w-full">
            <Fieldset className="w-full" legend="Resistance Mutations">
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
          <div className="flex w-full">
            <Fieldset className="w-full" legend="Vulnerability">
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
          <div className="flex w-full">
            <Fieldset
              className="w-full"
              legend="Unpublished Structural Information"
            >
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
  );
};

export default observer(GeneViewProtectedData);
