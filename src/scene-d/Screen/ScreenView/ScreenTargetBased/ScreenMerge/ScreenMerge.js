import React from 'react'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import EmbededHelp from '../../../../../app/common/EmbededHelp/EmbededHelp'
import { useState } from 'react';

const ScreenMerge = ({ screens }) => {

  const [screen1, setScreen1] = useState("");
  const [screen2, setScreen2] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div className='card'>
      <EmbededHelp>
        <div>
          Please make sure that both screening efforts :
          <ul>
            <li>belong to the <b>same organization.</b></li>
            <li>have same <b>screening method.</b></li>
          </ul>
        </div>

      </EmbededHelp>



      <div className='flex flex-column'>
        <div className="flex flex-row gap-4 h-2rem align-content-center">
          <div className="flex gap-4 align-content-center align-items-center">
            <h4>Select Screen:</h4>
            <Dropdown
              optionLabel="screenName"
              optionValue="id"
              value={screen1}
              options={screens}
              onChange={(e) => setScreen1(e.value)}
              placeholder="Select Primary Screen" />
          </div>
          <div className="flex gap-4 align-items-center">
            <h4> &lt;- Merge:</h4>
            <Dropdown
              optionLabel="screenName"
              optionValue="id"
              value={screen2}
              options={screens.filter(s => s.id !== screen1)}
              onChange={(e) => setScreen2(e.value)}
              placeholder="Select Screen that will be merged" />
          </div>
        </div>
        <br />
        <div className="flex flex-row gap-4 h-2rem align-content-center">
          <div className="flex gap-4 align-content-center align-items-center">
            Type 'MERGE' to Confirm
            <InputText value={confirm} onChange={(e) => setConfirm(e.target.value)} className='w-max' />
          </div>
          <div className="flex gap-4 align-content-center align-items-center">
            <Button 
              label="Merge Screens" 
              className="p-button-success" 
              disabled={confirm !== "MERGE"}
              loading={false}
              />
          </div>


        </div>
      </div>







    </div>
  )
}

export default ScreenMerge