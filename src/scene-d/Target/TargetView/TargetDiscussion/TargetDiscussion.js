import React from 'react'
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../../../app/common/SectionHeading/SectionHeading';
import { appColors } from '../../../../colors';
import { BreadCrumb } from 'primereact/breadcrumb';
import Discussion from '../../../../app/common/Discussion/Discussion';


const TargetDiscussion = ({ selectedTarget }) => {
  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "Targets",
      command: () => {
        navigate("/d/target/");
      },
    },
    {
      label: selectedTarget.name,
      command: () => {
        navigate(`/d/target/${selectedTarget.id}`);
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
          heading={selectedTarget.name}
          targetName={selectedTarget.name}
          displayHorizon={true}
          color={appColors.sectionHeadingBg.target}
        />
      </div>
      <div className='flex w-full'>
        <Discussion reference={selectedTarget.name}
          section={"Target"} />
      </div>
    </div>
  )
}

export default TargetDiscussion