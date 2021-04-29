import React, { useState, useEffect } from "react";
import { Fieldset } from "primereact/fieldset";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import KeyValList from "../../../../app/common/KeyValList/KeyValList";
const GenomeViewBackgroundInformation = () => {
  const [genomeData, setGenomeData] = useState(null);

  useEffect(() => {
    axios.get("/data/genomes/mycobrowser/rv1297.json").then((data) => {
      setGenomeData(data.data);
    });
  }, []);

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

export default GenomeViewBackgroundInformation;
