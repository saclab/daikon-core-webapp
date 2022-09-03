import React from "react";
import { Fieldset } from "primereact/fieldset";
import { useNavigate } from 'react-router-dom';
import "./ScrollPanel.css";
import CompoundEvolutionTimeline from "../../../../app/common/CompoundEvolutionTimeline/CompoundEvolutionTimeline";
import SectionHeading from '../../../../app/common/SectionHeading/SectionHeading';
import { BreadCrumb } from 'primereact/breadcrumb';
import { appColors } from '../../../../colors';
import PostPortfolioInformationGeneralInformation from './LocalComponents/PostPortfolioInformationGeneralInformation';
import PostPortfolioInformationDates from './LocalComponents/PostPortfolioInformationDates';
import PostPortfolioInformationPriority from './PostPortfolioInformationPriority/PostPortfolioInformationPriority';

const PostPortfolioInformation = ({ id, project }) => {

  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "Post Portfolio",
      command: () => {
        navigate("/d/portfolio/");
      },
    },
    {
      label: project.projectName,
      command: () => {
        navigate(`/d/post-portfolio/${project.id}`);
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
            icon="icon icon-common icon-drug"
            heading={
              project.projectName +
              " | " +
              project?.currentStage
            }
            targetName={project.targetName || project.projectName.replaceAll(' ', '-')}
            displayHorizon={true}
            color={appColors.sectionHeadingBg.postPortfolio}
          />
        </div>
        <div className="flex w-full">
          <div className="flex">
            <Fieldset legend="Project Information">
              <PostPortfolioInformationGeneralInformation project={project} />
            </Fieldset>
          </div>
          <div className="flex-column w-full">
            <div className="flex w-full pb-2">
              <Fieldset className="w-full" legend="Project Dates">
                <PostPortfolioInformationDates project={project} />
              </Fieldset>
            </div>
            <div className="flex w-full">
              <Fieldset legend="Project Team P/P">
                <PostPortfolioInformationPriority project={project} />
              </Fieldset>
            </div>
          </div>

        </div>

        <div className="flex w-full">
          <Fieldset legend="Compound Evolution">
            <CompoundEvolutionTimeline project={project} />
          </Fieldset>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostPortfolioInformation;
