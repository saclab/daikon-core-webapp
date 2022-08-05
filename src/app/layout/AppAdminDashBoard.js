import React from 'react'
import { observer } from "mobx-react-lite";
import { Route, Switch } from 'react-router'
import MenuBarAdmin from './MenuBarAdmin/MenuBarAdmin'

const AppAdminDashBoard = () => {
  return (
    <div className='flex flex-column'>
      <div className="block mb-2">
        <MenuBarAdmin />
      </div>
    </div>
  )
}

export default observer(AppAdminDashBoard)