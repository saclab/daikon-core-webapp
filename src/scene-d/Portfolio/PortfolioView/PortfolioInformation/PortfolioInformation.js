import React, { useContext } from "react";
import { Fieldset } from "primereact/fieldset";
import { useNavigate } from 'react-router-dom';

import "./ScrollPanel.css";
import PortfolioInformationGeneralInformation from "./LocalComponents/PortfolioInformationGeneralInformation";
import PortfolioInformationDates from "./LocalComponents/PortfolioInformationDates";
import CompoundEvolutionTimeline from "../../../../app/common/CompoundEvolutionTimeline/CompoundEvolutionTimeline";
import PortfolioInformationPriority from "./PortfolioInformationPriority/PortfolioInformationPriority";
import { BreadCrumb } from 'primereact/breadcrumb';
import SectionHeading from '../../../../app/common/SectionHeading/SectionHeading';
import { appColors } from '../../../../colors';
import { RootStoreContext } from "../../../../app/stores/rootStore";

const PortfolioInformation = ({ id, project }) => {
  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const breadCrumbItems = [
    {
      label: "Portfolio",
      command: () => {
        navigate("/d/portfolio/");
      },
    },
    {
      label: project.projectName,
      command: () => {
        navigate(`/d/portfolio/${project.id}`);
      }
    },
    { label: "Information" },
  ];


  return (
    <React.Fragment>
      {/* First div for general information and dates */}

      <div className="flex flex-column gap-2 w-full">
        <div className="flex w-full pb-2">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-common icon-analyse"
            heading={
              project.projectName +
              " | " +
              project?.currentStage
            }
            targetName={project.targetName || project.screenName || project.projectName}
            displayHorizon={true}
            color={appColors.sectionHeadingBg.portfolio}
          />
        </div>
        <div className="flex w-full">
          <div className="flex">
            <Fieldset legend="Project Information">
              <PortfolioInformationGeneralInformation project={project} />
            </Fieldset>
          </div>
          <div className="flex-column w-full">
            <div className="flex w-full pb-2">
              <Fieldset className="w-full" legend="Project Dates">
                <PortfolioInformationDates project={project} />
              </Fieldset>
            </div>
            <div className="flex w-full">
              <Fieldset legend="Project Team P/P">
                <PortfolioInformationPriority project={project} />
              </Fieldset>
            </div>
          </div>

        </div>

        <div className="flex w-full">
          <Fieldset legend="Compound Evolution">
            <CompoundEvolutionTimeline
              project={project}
              disableAdd={['H2L', 'LO', 'SP'].includes(project.currentStage) ? false : true}
              enableEdit={user.roles.includes("admin")}
            />
          </Fieldset>
        </div>

      </div>
    </React.Fragment>
  );
};

export default PortfolioInformation;
