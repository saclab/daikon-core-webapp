import { Fieldset } from "primereact/fieldset";
import KeyValList from "../../../../app/common/KeyValList/KeyValList";
import React from "react";
import SmilesView from "../../../../app/common/SmilesView/SmilesView";

const PortfolioInformation = ({ edit, cancelEdit, portfolioData }) => {
  return (
    <div>
      <div className="p-d-flex">
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2"  style={{ minHeight: "450px"}}>
              <Fieldset legend="General annotation">
                <KeyValList
                  data={portfolioData}
                  filter={[
                    "target",
                    "projectNo",
                    "projectName",
                    "primaryOrganization",
                    "supportingOrganization",
                    "status",
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
            <div className="p-mb-2" style={{ minHeight: "350px"}}>
              <Fieldset legend="Project Start Dates">
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
          </div>
        </div>
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Structure">
                <React.Fragment>
                  <div style={{ minWidth: "250px", marginLeft: "50px"  }}>
                    <SmilesView smiles={portfolioData.structure} />
                  </div>
                </React.Fragment>
              </Fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioInformation;
