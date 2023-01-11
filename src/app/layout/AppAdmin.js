import { observer } from "mobx-react-lite";
import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppAdminSettings from '../../screen-admin/AppAdminSettings/AppAdminSettings';
import AppAdminUserManager from '../../screen-admin/AppAdminUserManager/AppAdminUserManager';
import AppImports from '../../screen-admin/AppImports/AppImports';
import Unauthorized from '../common/Unauthorized/Unauthorized';
import { RootStoreContext } from '../stores/rootStore';
import MenuBarAdmin from './MenuBarAdmin/MenuBarAdmin';

const AppAdmin = () => {

  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  if (user.roles.includes("admin")) {
    return (
      <div className='flex flex-column'>
        <div className="block mb-2">
          <MenuBarAdmin />
        </div>
        <div className='flex ml-3 mr-3 fadein animation-duration-1000'>
          <Routes>
            <Route index element={<Navigate replace to="user-manager/" />} />
            <Route path={"user-manager/*"} element={<AppAdminUserManager />} />
            <Route path={"app-imports/*"} element={<AppImports />} />
            <Route path={"settings/*"} element={<AppAdminSettings />} />
          </Routes>
        </div>
      </div>
    )
  }

  return <div className='flex m-7 p-7'><Unauthorized /></div>



}

export default observer(AppAdmin)