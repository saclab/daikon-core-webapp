import { observer } from "mobx-react-lite";
import { Dialog } from "primereact/dialog";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import EmbeddedHelp from "../../../../app/common/EmbeddedHelp/EmbeddedHelp";
import Loading from "../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import ScreenDiscussion from "./ScreenDiscussion/ScreenDiscussion";
import ScreenEdit from "./ScreenEdit/ScreenEdit";
import ScreenMerge from "./ScreenMerge/ScreenMerge";
import ScreenSequences from "./ScreenSequences/ScreenSequences";
import ValidatedHits from "./ValidatedHits/ValidatedHits";

const ScreenView = () => {
  const params = useParams();
  const navigate = useNavigate();

  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    loadingFetchScreens,
    screenRegistry,
    fetchScreens,
    selectedScreenTargetFilter,
    filterScreensByTarget,
    filteredScreens,
  } = rootStore.screenStore;
  const { user } = rootStore.userStore;

  useEffect(() => {
    if (screenRegistry.size === 0 || selectedScreenTargetFilter !== params.id) {
      fetchScreens().then(() => {
        filterScreensByTarget(params.id);
      });
    }
  }, [
    fetchScreens,
    screenRegistry,
    filterScreensByTarget,
    params.id,
    selectedScreenTargetFilter,
  ]);

  const [displayMergeScreenDialog, setDisplayMergeScreenDialog] =
    useState(false);
  const [displayEditScreenDialog, setDisplayEditScreenDialog] = useState(false);

  if (!loadingFetchScreens && filteredScreens.length === 0) {
    return (
      <div className="flex justify-content-center w-full">
        <div className="flex flex-column">
          <div className="flex align-items-center">
            <h2>No Screens found</h2>
          </div>
          <div className="flex align-items-center">
            <EmbeddedHelp>
              To create a screen visit the targets page{" "}
            </EmbeddedHelp>
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
          label: "Edit Screen",
          icon: "icon icon-common icon-edit",
          command: () => {
            setDisplayEditScreenDialog(true);
          },
        },
        {
          label: "Merge Screens",
          icon: "icon icon-common icon-compress",
          command: () => {
            setDisplayMergeScreenDialog(true);
          },
        },
      ],
    };
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
              <Route
                index
                element={<Navigate replace to="screen-sequence/" />}
              />
              <Route
                path="screen-sequence/"
                element={<ScreenSequences TargetName={params.id} />}
              />
              <Route
                path="validates-hit/"
                element={<ValidatedHits TargetName={params.id} />}
              />
              <Route
                path="discussion/"
                element={
                  <ScreenDiscussion
                    TargetName={params.id}
                    strainName={filteredScreens[0]?.strain?.name}
                  />
                }
              />
            </Routes>
          </div>
        </div>

        <Dialog
          visible={displayEditScreenDialog}
          header="Admin : Edit Screen"
          style={{ width: "90%" }}
          onHide={() => setDisplayEditScreenDialog(false)}
          className="p-sidebar-lg"
        >
          <div className="card">
            <ScreenEdit
              selectedScreenTargetFilter={selectedScreenTargetFilter}
              close={() => setDisplayEditScreenDialog(false)}
            />
          </div>
        </Dialog>

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
              close={() => setDisplayMergeScreenDialog(false)}
            />
          </div>
        </Dialog>
      </React.Fragment>
    );
  }

  /** Loading Overlay */

  return <Loading />;
};

export default observer(ScreenView);
