import React from 'react'
import { observer } from "mobx-react-lite";
import { Route, Routes } from 'react-router-dom'
import GeneSearch from '../../scenes/Gene/GeneSearch/GeneSearch'
import GeneView from '../../scenes/Gene/GeneView/GeneView';
import GenomePromote from "../../scenes/Gene/GenomePromote/GenomePromote";
import MenuBar from './MenuBar/MenuBar'
import Home from '../../scenes/Home/Home';

const AppDefault = () => {


  return (
    <div className='flex flex-column'>
      <div className="block mb-2">
        <MenuBar />
      </div>
      <div className='flex ml-6 mr-6'>
        <Routes>
          <Route index element={<Home />} />

          <Route path={"gene/"} element={<GeneSearch />} />
          {/* <Route path=":id/promote" component={GenomePromote} />*/}
          <Route path={"gene/:id"} element={<GeneView />} /> 
        </Routes>

      </div>
    </div>
  )
}

export default observer(AppDefault)