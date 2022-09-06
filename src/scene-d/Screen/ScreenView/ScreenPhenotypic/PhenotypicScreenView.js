import React, { useState, useRef, useEffect, useContext } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import { Menu } from "primereact/menu";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { Toast } from "primereact/toast";
import Loading from "../../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";

import { appColors } from '../../../../colors';

import NotFound from '../../../../app/layout/NotFound/NotFound';
import EmbededHelp from '../../../../app/common/EmbededHelp/EmbededHelp';
import FailedLoading from "../../../../app/common/FailedLoading/FailedLoading";
import PhenotypicScreenSequences from "./PhenotypicScreenSequences/PhenotypicScreenSequences";
import PhenotypicValidatedHits from "./PhenotypicValidatedHits/PhenotypicValidatedHits";
import PhenotypicScreenDiscussion from './PhenotypicScreenDiscussion/PhenotypicScreenDiscussion';

const PhenotypicScreenView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingFetchScreensPhenotypic,
    screenPhenotypicRegistry,
    fetchScreensPhenotypic,
    selectedPhenotypicScreenFilter,
    filterPhenotypicScreensByBaseScreenName,
    loadingFilterPhenotypicScreensByBaseScreenName,
    filteredPhenotypicScreens } =
    rootStore.screenStore;

  useEffect(() => {
    if (screenPhenotypicRegistry.size === 0 || selectedPhenotypicScreenFilter !== params.baseScreenName) {
      fetchScreensPhenotypic().then(() => {
        console.log("should run after screens are fetched");
        filterPhenotypicScreensByBaseScreenName(params.baseScreenName);
      });
      ;
    }

  }, [fetchScreensPhenotypic, screenPhenotypicRegistry, filterPhenotypicScreensByBaseScreenName, selectedPhenotypicScreenFilter]);



  console.log("====SCREEN VIEW");

  if (loadingFetchScreensPhenotypic || loadingFilterPhenotypicScreensByBaseScreenName) {
    return <Loading />
  }

  if ((!loadingFetchScreensPhenotypic || !loadingFilterPhenotypicScreensByBaseScreenName) && filteredPhenotypicScreens.length === 0) {
    return (
      <div className="flex justify-content-center w-full">
        <div className="flex flex-column">
          <div className="flex align-items-center">
            <h2>No Screens found</h2>
          </div>
          <div className="flex align-items-center">
            <EmbededHelp>To create a screen visit the targets page </EmbededHelp>
          </div>
        </div>
      </div>

    );
  }
  else {
    const SideMenuItems = [
      {
        label: "Sections",
        items: [
          {
            label: "Screens",
            icon: "icon icon-common icon-circle-notch",
            command: () => {
              navigate("screen-sequence/");
            },
          },
          {
            label: "Validated Hits",
            icon: "icon icon-conceptual icon-structures-3d",
            command: () => {
              navigate("validates-hit/");
            },
          },
          {
            label: "Discussion",
            icon: "ri-discuss-line",
            command: () => {
              navigate("discussion/");
            },
          },
        ],
      },
    ];


    return (
      <React.Fragment>
        <Toast ref={toast} />
        <br />
        <div className="flex gap-2 w-full">
          <div className="flex">
            <Menu model={SideMenuItems} />
          </div>

          <div className="flex w-full">
            <Routes>
              <Route index element={<Navigate replace to="screen-sequence/" />} />
              <Route path="screen-sequence/" element={<PhenotypicScreenSequences baseScreenName={params.baseScreenName} />} />
              <Route path="validates-hit/" element={<PhenotypicValidatedHits baseScreenName={params.baseScreenName} />} />
              <Route path="discussion/" element={<PhenotypicScreenDiscussion baseScreenName={params.baseScreenName} />} />
            </Routes>
          </div>
        </div>

      </React.Fragment>
    )
  }
  return <FailedLoading />
}


export default observer(PhenotypicScreenView)