import React from 'react'
import { observer } from "mobx-react-lite";
import { Route, Routes } from 'react-router-dom'
import MenuBar from './MenuBar/MenuBar'
import Home from '../../scenes/Home/Home';

import GeneSearch from '../../scenes/Gene/GeneSearch/GeneSearch'
import GeneView from '../../scenes/Gene/GeneView/GeneView';
import GenomePromote from "../../scenes/Gene/GenomePromote/GenomePromote";

import TargetDash from '../../scenes/Target/TargetDash/TargetDash';
import TargetView from '../../scenes/Target/TargetView/TargetView';

import ScreenDash from "../../scenes/Screen/ScreenDash/ScreenDash";
import ScreenView from "../../scenes/Screen/ScreenView/ScreenView";

import FHADash from '../../scenes/FHA/FHADash/FHADash';
import FHAView from "../../scenes/FHA/FHAView/FHAView";

import PortfolioDash from "../../scenes/Portfolio/PortfolioDash/PortfolioDash";
import PortfolioView from "../../scenes/Portfolio/PortfolioView/PortfolioView";

const AppDefault = () => {


  return (
    <div className='flex flex-column'>
      <div className="block mb-2">
        <MenuBar />
      </div>
      <div className='flex ml-3 mr-3 fadein animation-duration-1000'>
        <Routes>
          <Route index element={<Home />} />
          {/* Gene Routes */}
          <Route path={"gene/"} element={<GeneSearch />} />
          {/* <Route path=":id/promote" component={GenomePromote} />*/}
          <Route path={"gene/:id/*"} element={<GeneView />} />

          {/*Target Routes*/}
          <Route path="target/" element={<TargetDash />} />
          <Route path="target/:id/*" element={<TargetView />} />

          {/*Screen Routes */}
          <Route path="screen/" element={<ScreenDash />} />
          <Route path="screen/:id/*" element={<ScreenView />} />

          {/* Hit Assessment Routes */}
          <Route path="ha" element={<FHADash />} />
          <Route path="ha/:id/*" element={<FHAView />} />

          {/* Portfolio Routes */}
          <Route path="portfolio" element={<PortfolioDash />} />
          <Route path="portfolio/:id/*" element={<PortfolioView />} />

        </Routes>

      </div>
    </div>
  )
}

export default observer(AppDefault)