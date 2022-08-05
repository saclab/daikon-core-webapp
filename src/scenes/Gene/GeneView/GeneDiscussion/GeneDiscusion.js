import React from 'react'
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../../../app/common/SectionHeading/SectionHeading';
import { appColors } from '../../../../colors';
import { BreadCrumb } from 'primereact/breadcrumb';
import Discussion from '../../../../app/common/Discussion/Discussion';

const GeneDiscusion = ({ gene }) => {

  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "Genes",
      command: () => {
        navigate("/d/gene/");
      },
    },
    {
      label: gene.accessionNumber,
      command: () => {
        navigate(`/d/gene/${gene.id}`);
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
          icon="icon icon-conceptual icon-dna"
          heading={gene.accessionNumber}
          accessionNumber={gene.accessionNumber}
          displayHorizon={true}
          color={appColors.sectionHeadingBg.gene}
        />
      </div>
      <div className='flex w-full'>
        <Discussion reference={gene.accessionNumber}
          section={"Gene"} />
      </div>
    </div>
  )
}

export default GeneDiscusion