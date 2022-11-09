import React from 'react'
import StageTag from '../StageTag/StageTag';
import { Dropdown } from 'primereact/dropdown';

const StageSelectDropdown = ({ id, onChange, value, stages }) => {

  stages = stages !== undefined ? stages : ["HA", "H2L", "LO", "SP", "IND", "P1"];

  const stageItemTemplate = (option) => {
    return <StageTag stage={option} />;
  };


  return (
    <Dropdown
      id={id}
      value={value}
      options={stages}
      onChange={onChange}
      itemTemplate={stageItemTemplate}
      placeholder="Select a Stage"
    />
  )
}

export default StageSelectDropdown