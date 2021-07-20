import { Fieldset } from 'primereact/fieldset'
import React from 'react'

const PortfolioInformation = () => {
  return (
    <div>
    <div className="p-d-flex">
      <div className="p-mr-2">
        <div className="p-d-flex p-flex-column">
          <div className="p-mb-2">
            <Fieldset legend="General annotation">
             1
            </Fieldset>
          </div>
          <div className="p-mb-2">
            <Fieldset legend="Coordinates">
             2
            </Fieldset>
          </div>
        </div>
      </div>
      <div className="p-mr-2">
        <div className="p-d-flex p-flex-column">
          <div className="p-mb-2">
            <Fieldset legend="Gene summary">
              3
            </Fieldset>
          </div>
          <div className="p-mb-2">
            {" "}
            <Fieldset legend="Protein summary">
             4
            </Fieldset>
          </div>
          <div className="p-mb-2">
            {" "}
            <Fieldset legend="Orthologues">
              5
            </Fieldset>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PortfolioInformation
