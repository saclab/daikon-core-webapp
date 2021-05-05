import { Fieldset } from "primereact/fieldset";
import KeyValList from "../../../../app/common/KeyValList/KeyValList";
import GeneViewMycoBrowswerProteindataBank from "./GeneViewMycobrowswerProteinDataBank/GeneViewMycoBrowswerProteindataBank";

const GeneViewMycobrowswer = ({ gene }) => {
  console.log("From Gene View");

  return (
    <div>
      <div className="p-d-flex">
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="General annotation">
                <KeyValList
                  data={gene.genePublicData}
                  filter={["type", "comments", "proteomics", "mutant"]}
                />
              </Fieldset>
            </div>
            <div className="p-mb-2">
              <Fieldset legend="Protein summary">
                <KeyValList
                  data={gene.genePublicData}
                  filter={[
                    "molecularMass",
                    "isoelectricPoint",
                    "proteinLength",
                  ]}
                />
              </Fieldset>
            </div>
            <div className="p-mb-2">
              <Fieldset legend="Protein Databank">
                <GeneViewMycoBrowswerProteindataBank
                  accessionNumber={gene.accessionNumber}
                />
              </Fieldset>
            </div>
          </div>
        </div>
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Coordinates">
                <KeyValList
                  data={gene.genePublicData}
                  filter={["start", "end", "orientation"]}
                />
              </Fieldset>
            </div>
            <div className="p-mb-2">
              <Fieldset legend="Gene summary">
                <KeyValList
                  data={gene.genePublicData}
                  filter={["geneLength", "location"]}
                />
              </Fieldset>
            </div>
            <div className="p-mb-2">
              <Fieldset legend="Orthologues">
                <KeyValList
                  data={gene.genePublicData}
                  filter={["m_Leprae", "m_Marinum", "m_Smegmatis"]}
                  link={{ m_Leprae: "https://mycobrowser.epfl.ch/genes/" }}
                />
              </Fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneViewMycobrowswer;
