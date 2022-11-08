import React from 'react'
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../../../app/common/SectionHeading/SectionHeading';
import { appColors } from '../../../../colors';
import { BreadCrumb } from 'primereact/breadcrumb';
import Discussion from '../../../../app/common/Discussion/Discussion';


const ScreenDiscussion = ({ project }) => {
  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "Hit Assessment",
      command: () => {
        navigate("/d/ha/");
      },
    },
    {
      label: project.projectName,
      command: () => {
        navigate(`/d/ha/${project.id}`);
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
          icon="icon icon-conceptual icon-chemical"
          heading={project.projectName}
          targetName={project.targetName || project.screenName || project.projectName}
          projectName={project.projectName}
          displayHorizon={true}
          color={appColors.sectionHeadingBg.ha}
        />
      </div>
      <div className='flex w-full'>
        <Discussion reference={project.targetName || project.projectName}
          section={"HA"} />
      </div>
    </div>
  )
}

export default ScreenDiscussion