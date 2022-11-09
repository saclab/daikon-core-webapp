import React from 'react'
import { observer } from "mobx-react-lite";
import { Route, Routes } from 'react-router-dom'
import MenuBar from './MenuBar/MenuBar'
import Home from '../../scene-d/Home/Home';

import GeneSearch from '../../scene-d/Gene/GeneSearch/GeneSearch'
import GeneView from '../../scene-d/Gene/GeneView/GeneView';


import TargetDash from '../../scene-d/Target/TargetDash/TargetDash';
import TargetView from '../../scene-d/Target/TargetView/TargetView';

import ScreenDash from "../../scene-d/Screen/ScreenDash/ScreenDash";
import ScreenView from "../../scene-d/Screen/ScreenView/ScreenTargetBased/ScreenView";

import HADash from '../../scene-d/HA/HADash/HADash';
import HAView from "../../scene-d/HA/HAView/HAView";

import PortfolioDash from "../../scene-d/Portfolio/PortfolioDash/PortfolioDash";
import PortfolioView from "../../scene-d/Portfolio/PortfolioView/PortfolioView";
import PostPortfolioDash from '../../scene-d/PostPortfolio/PostPortfolioDash/PostPortfolioDash';
import PostPortfolioView from '../../scene-d/PostPortfolio/PostPortfolioView/PostPortfolioView';
import GeneGroups from '../../scene-d/Gene/GeneView/GeneGroups/GeneGroups';
import GenePromotionRequests from '../../scene-d/Gene/GeneView/GenePromotionRequests/GenePromotionRequests';
import NotFound from './NotFound/NotFound';
import GenePromote from '../../scene-d/Gene/GenePromote/GenePromote';
import PhenotypicScreenView from '../../scene-d/Screen/ScreenView/ScreenPhenotypic/PhenotypicScreenView';


const AppDefault = () => {


  return (
    <div className='flex flex-column'>
      <div className="block mb-2">
        <MenuBar />
      </div>
      <div className='flex w-full pl-3 pr-3 fadein animation-duration-1000'>
        <Routes>
          <Route index element={<Home />} />
          {/* Gene Routes */}
          <Route path={"gene/"} element={<GeneSearch />} />
          <Route path={"gene/gene-group"} element={<GeneGroups />} />
          <Route path={"gene/gene-promotion-requests"} element={<GenePromotionRequests />} />
          <Route path={"gene/promote/:ptarget"} element={<GenePromote />} />
          <Route path={"gene/:id/*"} element={<GeneView />} />

          {/*Target Routes*/}
          <Route path="target/" element={<TargetDash />} />
          <Route path="target/:id/*" element={<TargetView />} />

          {/*Screen Routes */}
          <Route path="screen/" element={<ScreenDash />} />
          <Route path="screen/target-based/:id/*" element={<ScreenView />} />
          <Route path="screen/phenotypic/:baseScreenName/*" element={<PhenotypicScreenView />} />

          {/* Hit Assessment Routes */}
          <Route path="ha" element={<HADash />} />
          <Route path="ha/:id/*" element={<HAView />} />

          {/* Portfolio Routes */}
          <Route path="portfolio" element={<PortfolioDash />} />
          <Route path="portfolio/:id/*" element={<PortfolioView />} />

          {/* Post Portfolio Routes */}
          <Route path="post-portfolio" element={<PostPortfolioDash />} />
          <Route path="post-portfolio/:id/*" element={<PostPortfolioView />} />

          <Route path="*" element={<NotFound />} />

        </Routes>

      </div>
    </div>
  )
}

export default observer(AppDefault)