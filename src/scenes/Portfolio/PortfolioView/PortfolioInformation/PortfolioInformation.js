import React from "react";
import { Fieldset } from "primereact/fieldset";
import dateFormat from "dateformat";
import { Card } from "primereact/card";
import KeyValList from "../../../../app/common/KeyValList/KeyValList";

import { ScrollPanel } from "primereact/scrollpanel";
import { ScrollTop } from "primereact/scrolltop";
import SmilesView from "../../../../app/common/SmilesView/SmilesView";
import "./ScrollPanel.css";
import { Timeline } from "primereact/timeline";
import PortfolioInformationGeneralInformation from "./LocalComponents/PortfolioInformationGeneralInformation";
import PortfolioInformationDates from "./LocalComponents/PortfolioInformationDates";
import CompoundEvolutionTimeline from "../../../../app/common/CompoundEvolutionTimeline/CompoundEvolutionTimeline";

const PortfolioInformation = ({ id, project }) => {
  

  return (
    <div>
      {/* First div for general information and dates */}
      <div className="p-d-flex p-flex-column p-flex-md-row">
        <div className="p-mb-2 p-mr-2">
          <Fieldset legend="Project Information">
            <PortfolioInformationGeneralInformation project={project} />
          </Fieldset>
        </div>
        <div className="p-mb-2 p-mr-2">
          <Fieldset legend="Project Dates">
            <PortfolioInformationDates project={project} />
          </Fieldset>
        </div>
      </div>
      {/* Second div for structure evolution */}
      <div className="p-d-flex p-flex-column p-flex-md-row"  >
        <Fieldset legend="Compound Evolution">
          <CompoundEvolutionTimeline project={project} />
        </Fieldset>
      </div>
    </div>
  );
};

export default PortfolioInformation;
