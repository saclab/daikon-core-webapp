import React, { useState, useRef, useEffect, useContext } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import { Menu } from "primereact/menu";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { Toast } from "primereact/toast";
import Loading from "../../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import ScreenSequences from "./ScreenSequences/ScreenSequences";
import ValidatedHits from "./ValidatedHits/ValidatedHits";
import { appColors } from '../../../../colors';
import ScreenDiscussion from './ScreenDiscussion/ScreenDiscussion';
import NotFound from '../../../../app/layout/NotFound/NotFound';
import EmbededHelp from '../../../../app/common/EmbededHelp/EmbededHelp';
import { Dialog } from 'primereact/dialog';
import ScreenMerge from "./ScreenMerge/ScreenMerge";

const ScreenView = () => {
  const params = useParams();
  const navigate = useNavigate();

  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingFetchScreens, screenRegistry,
    fetchScreens, selectedScreenTargetFilter, filterScreensByTarget, filteredScreens } =
    rootStore.screenStore;
  const { user } = rootStore.userStore;

  useEffect(() => {
    if (screenRegistry.size === 0 || selectedScreenTargetFilter !== params.id) {
      fetchScreens().then(() => {
        console.log("should run after screens are fetched");
        filterScreensByTarget(params.id);
      });
      ;
    }

  }, [fetchScreens, screenRegistry]);

  const [displayMergeScreenDialog, setDisplayMergeScreenDialog] =
    useState(false);

  console.log("====SCREEN VIEW");

  if (!loadingFetchScreens && filteredScreens.length === 0) {
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

  if (user.roles.includes("admin")) {

    const adminActions = {
      label: "Admin Section",
      items: [
        {
          label: "Merge Screens",
          icon: "icon icon-common icon-compress",
          command: () => {
            setDisplayMergeScreenDialog(true)
          },
        },
      ],
    }
    SideMenuItems.push(adminActions);
  }

  if (!loadingFetchScreens && screenRegistry.size >= 0) {
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
              <Route path="screen-sequence/" element={<ScreenSequences TargetName={params.id} />} />
              <Route path="validates-hit/" element={<ValidatedHits TargetName={params.id} />} />
              <Route path="discussion/" element={<ScreenDiscussion TargetName={params.id} />} />
            </Routes>
          </div>
        </div>

        <Dialog
          visible={displayMergeScreenDialog}
          header="Admin : Merge Screens"
          style={{ width: "90%" }}

          onHide={() => setDisplayMergeScreenDialog(false)}
          className="p-sidebar-lg"
        >
          <div className="card">

            <ScreenMerge
              screens={filteredScreens}
              close={() => setDisplayMergeScreenDialog(false)} />

          </div>
        </Dialog>

      </React.Fragment>
    );
  }

  /** Loading Overlay */

  return <Loading />;
};

export default observer(ScreenView);
