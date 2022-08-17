import React from 'react'
import { observer } from "mobx-react-lite";
import { Route, Routes } from 'react-router-dom'
import MenuBarPM from './MenuBar-PM/MenuBarPM';
import ProjectManagerDashboard from '../../scene-pm/ProjectManagerDashboard/ProjectManagerDashboard';
import Projects from '../../scene-pm/Projects/ProjectsList/Projects';
import ProjectView from '../../scene-pm/Projects/ProjectView/ProjectView';

const AppDefault = () => {


  return (
    <div className='flex flex-column'>
      <div className="block mb-2">
        <MenuBarPM />
      </div>
      <div className='flex ml-3 mr-3 fadein animation-duration-1000'>
        <Routes>
          <Route index element={<ProjectManagerDashboard />} />
          {/* Projects Route */}
          <Route path={"project/"} element={<Projects />} />
          {/* <Route path=":id/promote" component={GenomePromote} />*/}
          <Route path={"project/:id/*"} element={<ProjectView />} />
        </Routes>

      </div>
    </div>
  )
}

export default observer(AppDefault)