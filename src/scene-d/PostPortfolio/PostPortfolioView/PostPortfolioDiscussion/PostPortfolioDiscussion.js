import React from 'react'
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../../../app/common/SectionHeading/SectionHeading';
import { appColors } from '../../../../colors';
import { BreadCrumb } from 'primereact/breadcrumb';
import Discussion from '../../../../app/common/Discussion/Discussion';


const PostPortfolioDiscussion = ({ project }) => {
  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "Post Portfolio",
      command: () => {
        navigate("/d/post-portfolio/");
      },
    },
    {
      label: project.projectName,
      command: () => {
        navigate(`/d/post-portfolio/${project.id}`);
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
          icon="icon icon-common icon-drug"
          heading={
            project.projectName +
            " | " +
            project?.currentStage
          }
          targetName={project.targetName || project.screenName || project.projectName}
          displayHorizon={true}
          color={appColors.sectionHeadingBg.postPortfolio}
        />
      </div>
      <div className='flex w-full'>
        <Discussion reference={project.targetName || project.projectName}
          section={project?.currentStage || "Post-Portfolio"} />
      </div>
    </div>
  )
}

export default PostPortfolioDiscussion