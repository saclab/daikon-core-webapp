import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import KeyValList from "../../../../app/common/KeyValList/KeyValList";
import { observer } from "mobx-react-lite";
import { ScrollPanel } from "primereact/scrollpanel";
import { ScrollTop } from "primereact/scrolltop";
import SmilesView from "../../../../app/common/SmilesView/SmilesView";
import "./ScrollPanel.css";
import { Timeline } from "primereact/timeline";
import dateFormat from "dateformat";
import PleaseWait from "../../../../app/common/PleaseWait/PleaseWait";
import FailedLoading from "../../../../app/common/FailedLoading/FailedLoading";

const FHAViewInformation = ({ id, project }) => {
  if (project?.baseHits === undefined) {
    return <PleaseWait />;
  }

  if (project.baseHits !== undefined) {
    let relatedStructures = project.baseHits.map((hit) => {
      return (
        <div style={{ minWidth: "250px", marginTop: "-20px" }}>
          <SmilesView smiles={hit.baseHit.compound.smile} />
        </div>
      );
    });

    let timelineEvents = [];
    timelineEvents.push({ stage: "FHA", date: project.fhaStart });

    return (
      <div>
        <div className="p-d-flex">
          <div className="p-mr-2">
            <Card style={{ width: "25rem", marginBottom: "2em" }}>
              <p className="p-m-0" style={{ lineHeight: "1.5" }}>
                {project.fhaDescription}
              </p>
            </Card>
          </div>
        </div>
        <div className="p-d-flex">
          <div className="p-mr-2">
            <div className="p-d-flex p-flex-column">
              <div className="p-mb-2" style={{ minHeight: "450px" }}>
                <Fieldset legend="General annotation">
                  <KeyValList
                    data={project}
                    filter={[
                      "accessionNo",
                      "geneName",
                      "id",
                      "projectName",
                      "primaryOrg.name",
                      "supportingOrganization",
                      "status",
                      "stage",
                      "priority",
                      "probability",
                    ]}
                  />
                </Fieldset>
              </div>
            </div>
          </div>
          <div className="p-mr-2">
            <div className="p-d-flex p-flex-column">
              <div className="p-mb-2" style={{ minHeight: "350px" }}>
                <Fieldset legend="FHA Start Date">
                  <Timeline
                    value={timelineEvents}
                    opposite={(item) => item.stage}
                    content={(item) => (
                      <small className="p-text-secondary">
                        {dateFormat(item.date, "mmmm dS, yyyy")}
                      </small>
                    )}
                  />
                </Fieldset>
              </div>
            </div>
          </div>
          <div className="p-mr-2">
            <div className="p-d-flex p-flex-column">
              <div className="p-mb-2 scrollpanel-structure">
                <Fieldset legend="Structures">
                  <React.Fragment>
                    <ScrollPanel
                      style={{ minWidth: "250px", height: "350px" }}
                      className="custombar1"
                    >
                      <h3 style={{ marginTop: "0px" }}>Reference</h3>
                      <div style={{ minWidth: "250px", marginTop: "-20px" }}>
                        <SmilesView
                          smiles={project.representationStructure.smile}
                        />
                      </div>
                      <hr />
                      <h3 style={{ marginTop: "0px" }}>Others</h3>
                      {relatedStructures}
                      <ScrollTop
                        target="parent"
                        threshold={100}
                        className="custom-scrolltop"
                        icon="pi pi-arrow-up"
                      />
                    </ScrollPanel>
                  </React.Fragment>
                </Fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <FailedLoading />
};

export default observer(FHAViewInformation);
