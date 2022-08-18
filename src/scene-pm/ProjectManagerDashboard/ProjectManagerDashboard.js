import React from 'react'
import SectionHeading from '../../app/common/SectionHeading/SectionHeading';
import { appColors } from '../../colors';

const ProjectManagerDashboard = () => {
  return (
    <div className="flex flex-column w-full fadein animation-duration-500">
      <div className="flex w-full">
        <SectionHeading
          icon="icon icon-common icon-briefcase"
          heading="Project Dashboard"
          color={appColors.sectionHeadingBg.project}
        />
      </div>
    </div>
  )
}

export default ProjectManagerDashboard