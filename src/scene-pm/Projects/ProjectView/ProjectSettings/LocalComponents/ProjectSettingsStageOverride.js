import React from 'react'
import EmbededHelp from '../../../../../app/common/EmbededHelp/EmbededHelp'
import StageTag from '../../../../../app/common/StageTag/StageTag';
import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const ProjectSettingsStageOverride = ({ project }) => {

  const stages = ["HA", "H2L", "LO", "SP", "IND", "P1"];
  const [stageOverride, setStageOverride] = useState("")

  const stageItemTemplate = (option) => {
    return <StageTag stage={option} />;
  };


  return (
    <div>
      <div style={{
        borderRadius: '5px',
        borderColor: '#B7950B',
        borderStyle: 'solid',
        padding: '20px',
        borderWidth: '1px'
      }}>
        <EmbededHelp>
          Overriding stages might have undesirable effect. Procede with caution.
        </EmbededHelp>
        <div className='flex gap-2 pt-2 align-content-center align-items-center'>
          Current Stage :<StageTag stage={project.currentStage} />
          <Dropdown
            value={stageOverride}
            options={stages.filter(s => s !== project.currentStage)}
            onChange={(e) => setStageOverride(e.value)}
            itemTemplate={stageItemTemplate}
            placeholder="Select a Stage"
          />
        </div>
        <div className="flex pt-2 align-content-right align-items-right">
          <Button
            label="Override Stage"
            className="p-button-warning"
            // disabled={confirm !== "MERGE"}
            // loading={mergingScreen}
            // onClick={() => dataOnSubmitValidate()}
          />
        </div>

      </div>
    </div>
  )
}

export default ProjectSettingsStageOverride