import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Fieldset } from "primereact/fieldset";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import EmbeddedHelp from "../../../../app/common/EmbeddedHelp/EmbeddedHelp";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { appColors } from "../../../../colors";
import GeneViewProtectedDataCrispRiStrainList from "./Sections/GeneViewProtectedDataCrispRiStrainList";
import GeneViewProtectedDataEssentiality from "./Sections/GeneViewProtectedDataEssentiality";
import GeneViewProtectedDataHypomorph from "./Sections/GeneViewProtectedDataHypomorph";
import GeneViewProtectedDataProteinActivityAssayList from "./Sections/GeneViewProtectedDataProteinActivityAssayList";
import GeneViewProtectedDataProteinProductionList from "./Sections/GeneViewProtectedDataProteinProductionList";
import GeneViewProtectedDataResistanceMutation from "./Sections/GeneViewProtectedDataResistanceMutation";
import GeneViewProtectedDataUnpublishedStructuralInformation from "./Sections/GeneViewProtectedDataUnpublishedStructuralInformation";
import GeneViewProtectedDataVulnerability from "./Sections/GeneViewProtectedDataVulnerability";

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
              <EmbeddedHelp>
                A gene is considered essential if it is required for the
                reproductive success of a cell or an organism. Gene essentiality
                is a core concept of genetics, with repercussions in
                evolutionary, systems and synthetic biology and with
                applications in drug development.
              </EmbeddedHelp>
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
              <EmbeddedHelp>
                Protein production is the biotechnological process of generating
                a specific protein. It is typically achieved by the manipulation
                of gene expression in an organism such that it expresses large
                amounts of a recombinant gene.
                <br />
                Data: A short summary describing the entire method. For e.g
                E-coli plasmid full length protein & associated scientist name{" "}
                <br />
                Method (For e.g - HIS , Ecoli Rosetta, Plasmid) | Purity (Range
                or %age For e.g - 95% pure)
              </EmbeddedHelp>
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
              <EmbeddedHelp>
                Protein activity assays are commonly used in drug discovery to
                evaluate the efficacy of potential drug compounds in modulating
                the activity of specific target proteins. <br />
                These assays are designed to measure the activity of a protein
                in the presence of a test compound, and they can provide
                valuable information about the potential therapeutic effects of
                a drug candidate.
                <br />
                Data: | Assay (Describe the assay -For e.g Flouroscent
                polarization assay) | Method (How the assay is run?) |
                Throughput (For e.g - Low /High)
              </EmbeddedHelp>
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
              <EmbeddedHelp>
                In drug discovery, a hypomorph refers to a genetic mutation that
                results in reduced, but not completely absent, expression or
                activity of a protein target. Hypomorphs can provide important
                insights into the function of a protein target and can be used
                to develop drugs that modulate its activity.
              </EmbeddedHelp>
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
              <EmbeddedHelp>
                The CRISPRi Strain List is a collection of bacterial strains
                that have been genetically modified to enable the use of CRISPR
                interference (CRISPRi) for gene expression control. These
                strains can be used in drug discovery to investigate the roles
                of specific genes and pathways in bacterial physiology and
                pathogenesis.
              </EmbeddedHelp>
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
              <EmbeddedHelp>
                Resistance mutation is a genetic mutation that allows an
                organism, such as a bacterium or virus, to resist the effects of
                a particular drug or other environmental stressor. Resistance
                mutations work by altering the structure or function of a
                protein target, making it less susceptible to inhibition by the
                drug.
                <br />
                Data: Mutation (For e.g : L273A) | Isolate (For e.g : Mutant3) |
                Parent Strain (For e.g Mc27000) | Compound (For e.g
                SAC-ID/Compound ID/Source ID) | Shift In Mic (For e.g 4X) |
                Organization (For e.g TAMU | Researcher name)
              </EmbeddedHelp>
              {/* <DisplayTable
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
                ]} */}
              <GeneViewProtectedDataResistanceMutation
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
              <EmbeddedHelp>
                Vulnerability refers to the identification of specific targets
                or characteristics of a disease that can be leveraged for
                therapeutic intervention. This approach allows for the
                development of more effective and targeted drug candidates with
                a higher likelihood of success.
              </EmbeddedHelp>
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

              {/* <DisplayTable
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
              /> */}
              <GeneViewProtectedDataVulnerability
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
              <EmbeddedHelp>
                Structures that are not published yet. <br />
                <br />
                Data: Organization (For e.g TAMU | Researcher name) | Method
                (For e.g - X-ray/Cryo-em/NMR) | Resolution (For e.g - 4A) |
                Ligands (For e.g - SAC-ID\Smile String\Link to the structure)
              </EmbeddedHelp>
              {/* <DisplayTable
                heading={"Add Unpublished Structural Information"}
                columns={["organization", "method", "resolution", "ligands"]}
                mandatory={["ligands"]}
                data={gene.geneUnpublishedStructures}
                add={addUnpublishedStructures}
                edit={editUnpublishedStructures}
                adding={addingUnpublishedStructures}
                editing={editingUnpublishedStructures}
              /> */}
              <GeneViewProtectedDataUnpublishedStructuralInformation
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
