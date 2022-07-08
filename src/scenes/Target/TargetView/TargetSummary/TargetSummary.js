import React from 'react'
import cssClass from './TargetSummary.module.css'

const TargetSummary = () => {
  return (
    <div className={[cssClass.QuadMain].join(" ")}>
      <div className={[cssClass.QuadRow].join(" ")}>
        <div className={[cssClass.QuadColumn].join(" ")} style={{ backgroundColor: "#C0C0C0" }}>
          <h2>Background</h2>
          <p>Some text..</p>
        </div>
        <div className={[cssClass.QuadColumn].join(" ")} style={{ backgroundColor: "#D3D3D3" }}>
          <h2>Enablement</h2>
          <p>Some text..</p>
        </div>
      </div>
      <div className={[cssClass.QuadRow].join(" ")}>
        <div className={[cssClass.QuadColumn].join(" ")} style={{ backgroundColor: "#DCDCDC" }}>
          <h2>Strategy</h2>
          <p>Some text..</p>
        </div>
        <div className={[cssClass.QuadColumn].join(" ")} style={{ backgroundColor: "#F5F5F5" }}>
          <h2>Challenges</h2>
          <p>Some text..</p>
        </div>
      </div>
    </div>
  )
}

export default TargetSummary