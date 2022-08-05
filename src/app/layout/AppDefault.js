import React from 'react'
import { observer } from "mobx-react-lite";
import { Route, Routes } from 'react-router-dom'
import GeneSearch from '../../scenes/Gene/GeneSearch/GeneSearch'
import GeneView from '../../scenes/Gene/GeneView/GeneView';
import GenomePromote from "../../scenes/Gene/GenomePromote/GenomePromote";
import MenuBar from './MenuBar/MenuBar'
import Home from '../../scenes/Home/Home';
import TargetDash from '../../scenes/Target/TargetDash/TargetDash';
import TargetView from '../../scenes/Target/TargetView/TargetView';

const AppDefault = () => {


  return (
    <div className='flex flex-column'>
      <div className="block mb-2">
        <MenuBar />
      </div>
      <div className='flex ml-6 mr-6 fadein animation-duration-1000'>
        <Routes>
          <Route index element={<Home />} />
          {/* Gene Routes */}
          <Route path={"gene/"} element={<GeneSearch />} />
          {/* <Route path=":id/promote" component={GenomePromote} />*/}
          <Route path={"gene/:id/*"} element={<GeneView />} />

          {/*Target Routes*/}
          <Route path="target/" element={<TargetDash />} />
          <Route path="target/:id/*" element={<TargetView />} />
        </Routes>

      </div>
    </div>
  )
}

export default observer(AppDefault)