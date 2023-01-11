import { BreadCrumb } from 'primereact/breadcrumb';
import { Fieldset } from "primereact/fieldset";
import { useNavigate } from 'react-router-dom';
import KeyValList from "../../../../app/common/KeyValList/KeyValList";
import SectionHeading from '../../../../app/common/SectionHeading/SectionHeading';
import { appColors } from "../../../../colors";
import GeneViewPublicDataProteindataBank from "./GeneViewPublicDataProteinDataBank/GeneViewPublicDataProteindataBank";

const GeneViewPublicData = ({
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
      }
    },
    { label: "Public Data" },
  ];

  return (
    <div>
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

        <div className="flex gap-2">
          <div className="flex flex-column gap-2">
            <div className="flex">
              <Fieldset legend="General annotation">
                <KeyValList
                  data={gene}
                  filter={[
                    "geneName",
                    "function",
                    "product",
                    "functionalCategory",
                    "type",
                  ]}
                  fetchHistory={() => fetchGeneHistory()}
                  historyDisplayLoading={historyDisplayLoading}
                  history={geneHistory}
                />
                <hr style={{ borderTop: "1px solid #CCCCCC" }} />
                <KeyValList
                  data={gene.genePublicData}
                  filter={["comments"]}
                  editFunc={() => edit()}
                  cancelEdit={() => cancelEdit()}
                  fetchHistory={() => fetchGeneHistory()}
                  historyDisplayLoading={historyDisplayLoading}
                  history={geneHistory}
                />
              </Fieldset>
            </div>
            <div className="flex gap-2">
              <div className="flex">
                <Fieldset legend="Protein summary">
                  <KeyValList
                    data={gene.genePublicData}
                    filter={[
                      "molecularMass",
                      "isoelectricPoint",
                      "proteinLength",
                    ]}
                    editFunc={() => edit()}
                    cancelEdit={() => cancelEdit()}
                    fetchHistory={() => fetchGeneHistory()}
                    historyDisplayLoading={historyDisplayLoading}
                    history={geneHistory}
                  />
                </Fieldset>
              </div>

              <div className="flex">
                <Fieldset legend="Gene summary">
                  <KeyValList
                    data={gene.genePublicData}
                    filter={["geneLength", "location"]}
                    editFunc={() => edit()}
                    cancelEdit={() => cancelEdit()}
                  />
                </Fieldset>
              </div>

            </div>

            <div className="flex flex-grow-1">
              <Fieldset legend="Protein databank">
                <GeneViewPublicDataProteindataBank
                  accessionNumber={gene.accessionNumber}
                />
              </Fieldset>
            </div>
            <div className="flex">
              <Fieldset legend="Genomic sequence" toggleable collapsed={true}>
                <div
                  className="p-text-lowercase"
                  style={{
                    maxWidth: "50vw",
                    wordWrap: "break-word",
                    fontFamily: "monospace",
                  }}
                >
                  {gene.genePublicData?.geneSequence}
                </div>
              </Fieldset>
            </div>
            <div className="flex">
              <Fieldset legend="Protein sequence" toggleable collapsed={true}>
                <div
                  style={{
                    maxWidth: "50vw",
                    wordWrap: "break-word",
                    fontFamily: "monospace",
                  }}
                >
                  {gene.genePublicData?.proteinSequence}
                </div>
              </Fieldset>
            </div>
          </div>


          <div className="flex flex-column gap-2">
            <div className="flex">
              <Fieldset legend="Coordinates">
                <KeyValList
                  data={gene.genePublicData}
                  filter={["start", "end", "orientation"]}
                  editFunc={() => edit()}
                  cancelEdit={() => cancelEdit()}
                />
              </Fieldset>
            </div>

            <div className="flex">
              <Fieldset legend="Orthologs">
                <KeyValList
                  data={gene.genePublicData}
                  filter={["m_Leprae", "m_Marinum", "m_Smegmatis"]}
                  labels={{ m_Leprae: "M. leprae", m_Marinum: "M. marinum", m_Smegmatis: "M. smegmatis" }}

                  // link={{ m_Leprae: "https://mycobrowser.epfl.ch/genes/" }}
                  editFunc={() => edit()}
                  cancelEdit={() => cancelEdit()}
                  fetchHistory={() => fetchGeneHistory()}
                  historyDisplayLoading={historyDisplayLoading}
                  history={geneHistory}
                />
              </Fieldset>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default GeneViewPublicData;
