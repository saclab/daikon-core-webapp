import React from 'react'
import './StageTag.css'
import { Tag } from 'primereact/tag';

const StageTag = ({stage}) => {
  return (
    <div className="stage-tag">
      <Tag
          className={`stage-${stage}`}
          value={stage}
        />
    </div>
  )
}

export default StageTag
