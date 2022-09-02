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

const PhenotypicScreenView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const toast = useRef(null);

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
            {/* <Route path="screen-sequence/" element={<ScreenSequences TargetName={params.id} />} />
            <Route path="validates-hit/" element={<ValidatedHits TargetName={params.id} />} />
            <Route path="discussion/" element={<ScreenDiscussion TargetName={params.id} />} /> */}
          </Routes>
        </div>
      </div>

    </React.Fragment>
  )
}

export default PhenotypicScreenView