import React from 'react'
import MenuBar from './MenuBar/MenuBar';
import { InputText } from 'primereact/inputtext';

const AppBeta = () => {
  return (
    <div className='flex flex-column'>
      <div className="block mb-2">
        <MenuBar />
      </div>
      <div className='flex ml-6 mr-6 fadein animation-duration-1000'>
        <div class="card">
          <h5>Vertical</h5>
          <div class="field">
            <label for="firstname1" className="block">Firstname</label>
            <InputText id="firstname1" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
          </div>
          <div class="field">
            <label for="lastname1">Lastname</label>
            <input id="lastname1" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
          </div>
        </div>
      </div>
    </div>

  )
}

export default AppBeta