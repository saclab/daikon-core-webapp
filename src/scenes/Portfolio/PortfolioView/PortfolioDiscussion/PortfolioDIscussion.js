import React from 'react'
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../../../app/common/SectionHeading/SectionHeading';
import { appColors } from '../../../../colors';
import { BreadCrumb } from 'primereact/breadcrumb';
import Discussion from '../../../../app/common/Discussion/Discussion';


const PortfolioDiscussion = ({ project }) => {
  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "Portfolio",
      command: () => {
        navigate("/d/screen/");
      },
    },
    {
      label: project.projectName,
      command: () => {
        navigate(`/d/portfolio/${project.id}`);
      }
    },
    { label: "Discussion" },
  ];

  return (
    <div className="flex flex-column w-full">
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
          targetName={project.targetName}
          displayHorizon={true}
          color={appColors.sectionHeadingBg.portfolio}
        />
      </div>
      <div className='flex w-full'>
        <Discussion reference={project.targetName}
          section={project?.currentStage || "Portfolio"} />
      </div>
    </div>
  )
}

export default PortfolioDiscussion