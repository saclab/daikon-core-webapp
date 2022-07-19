import React from "react";
import { Fieldset } from "primereact/fieldset";
import "./ScrollPanel.css";
import PortfolioInformationGeneralInformation from "./LocalComponents/PostPortfolioInformationGeneralInformation";
import PortfolioInformationDates from "./LocalComponents/PostPortfolioInformationDates";
import CompoundEvolutionTimeline from "../../../../app/common/CompoundEvolutionTimeline/CompoundEvolutionTimeline";
import PortfolioInformationPriority from "./PostPortfolioInformationPriority/PostPortfolioInformationPriority";

const PostPortfolioInformation = ({ id, project }) => {


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
          <br />
          <Fieldset>
            <PortfolioInformationPriority project={project} />
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

export default PostPortfolioInformation;
