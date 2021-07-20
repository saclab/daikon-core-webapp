import { Fieldset } from "primereact/fieldset";
import KeyValList from "../../../../app/common/KeyValList/KeyValList";
import React from "react";

const PortfolioInformation = ({ edit, cancelEdit, portfolioData }) => {
  return (
    <div>
      <div className="p-d-flex">
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="General annotation">
                <KeyValList
                  data={portfolioData}
                  filter={[
                    "target",
                    "projectNo",
                    "projectName",
                    "primaryOrg",
                    "supportingOrg",
                    "status",
                    
                  ]}
                  editFunc={() => edit()}
                  cancelEdit={() => cancelEdit()}
                />
              </Fieldset>
            </div>
            <div className="p-mb-2">
              <Fieldset legend="Coordinates">
              <KeyValList
                  data={portfolioData}
                  filter={[
                    "stage",
                    "priority",
                    "probability",
                    
                  ]}
                  editFunc={() => edit()}
                  cancelEdit={() => cancelEdit()}
                />
              </Fieldset>
            </div>
          </div>
        </div>
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Gene summary">
              <KeyValList
                  data={portfolioData}
                  filter={[
                    "structure",
                    
                    
                  ]}
                  editFunc={() => edit()}
                  cancelEdit={() => cancelEdit()}
                />
              </Fieldset>
            </div>
            <div className="p-mb-2">
              {" "}
              <Fieldset legend="Protein summary">
              <KeyValList
                  data={portfolioData}
                  filter={[
                    "fhaStartDate",
                    "h2lStartDate",
                    "loStartDate",
                    "spStartDate",
                    "pcdDate",
                    "indStartDate",
                    "clinicalStartDate",
                    
                  ]}
                  />
              </Fieldset>
            </div>
            {/* <div className="p-mb-2">
              {" "}
              <Fieldset legend="Orthologues">5</Fieldset>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioInformation;
