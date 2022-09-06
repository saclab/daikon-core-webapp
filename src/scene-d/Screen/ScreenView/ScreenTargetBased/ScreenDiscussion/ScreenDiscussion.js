import React from 'react'
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../../../../app/common/SectionHeading/SectionHeading';
import { appColors } from '../../../../../colors';
import { BreadCrumb } from 'primereact/breadcrumb';
import Discussion from '../../../../../app/common/Discussion/Discussion';


const ScreenDiscussion = ({ TargetName }) => {
  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "Screens",
      command: () => {
        navigate("/d/screen/");
      },
    },
    {
      label: TargetName,
      command: () => {
        navigate(`/d/screen/${TargetName}`);
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
          icon="icon icon-common icon-target"
          heading={TargetName}
          targetName={TargetName}
          displayHorizon={true}
          color={appColors.sectionHeadingBg.screen}
        />
      </div>
      <div className='flex w-full'>
        <Discussion reference={TargetName}
          section={"Screen"} />
      </div>
    </div>
  )
}

export default ScreenDiscussion