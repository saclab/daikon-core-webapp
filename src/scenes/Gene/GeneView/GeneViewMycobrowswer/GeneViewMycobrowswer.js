import React, { useState, useEffect, useContext } from "react";
import { Fieldset } from "primereact/fieldset";

import { ProgressSpinner } from "primereact/progressspinner";
import KeyValList from "../../../../app/common/KeyValList/KeyValList";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const GeneViewMycobrowswer = ({ data }) => {
  console.log("From Gene View");
  console.log(data);

  // return <h1>Break</h1>;

  return (
    <div>
      <div className="p-d-flex">
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="General annotation">
                <KeyValList
                  data={data}
                  filter={["type", "comments", "proteomics", "mutant"]}
                />
              </Fieldset>
            </div>
            <div className="p-mb-2">
              <Fieldset legend="Protein summary">
                <KeyValList
                  data={data}
                  filter={[
                    "molecularMass",
                    "isoelectricPoint",
                    "proteinLength",
                  ]}
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
                  data={data}
                  filter={["start", "end", "orientation"]}
                />
              </Fieldset>
            </div>
            <div className="p-mb-2">
              <Fieldset legend="Gene summary">
                <KeyValList data={data} filter={["geneLength", "location"]} />
              </Fieldset>
            </div>
            <div className="p-mb-2">
              <Fieldset legend="Orthologues">
                <KeyValList
                  data={data}
                  filter={["m_Leprae", "m_Marinum", "m_Smegmatis"]}
                  link={{"m_Leprae" : "https://mycobrowser.epfl.ch/genes/"}}
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
