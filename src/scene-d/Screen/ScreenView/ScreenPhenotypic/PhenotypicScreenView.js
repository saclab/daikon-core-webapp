import { observer } from "mobx-react-lite";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useRef } from "react";
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
import PhenotypicScreenDiscussion from "./PhenotypicScreenDiscussion/PhenotypicScreenDiscussion";
import PhenotypicScreenSequences from "./PhenotypicScreenSequences/PhenotypicScreenSequences";
import PhenotypicValidatedHits from "./PhenotypicValidatedHits/PhenotypicValidatedHits";

const PhenotypicScreenView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    loadingFetchScreensPhenotypic,
    screenPhenotypicRegistry,
    fetchScreensPhenotypic,
    selectedPhenotypicScreenFilter,
    filterPhenotypicScreensByBaseScreenName,
    loadingFilterPhenotypicScreensByBaseScreenName,
    filteredPhenotypicScreens,
  } = rootStore.screenStore;

  useEffect(() => {
    if (
      screenPhenotypicRegistry.size === 0 ||
      selectedPhenotypicScreenFilter !== params.baseScreenName
    ) {
      fetchScreensPhenotypic().then(() => {
        filterPhenotypicScreensByBaseScreenName(params.baseScreenName);
      });
    }
  }, [
    fetchScreensPhenotypic,
    screenPhenotypicRegistry,
    filterPhenotypicScreensByBaseScreenName,
    selectedPhenotypicScreenFilter,
    params.baseScreenName,
  ]);

  if (
    loadingFetchScreensPhenotypic ||
    loadingFilterPhenotypicScreensByBaseScreenName
  ) {
    return <Loading />;
  }

  if (
    (!loadingFetchScreensPhenotypic ||
      !loadingFilterPhenotypicScreensByBaseScreenName) &&
    filteredPhenotypicScreens.length === 0
  ) {
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
  } else {
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
              <Route
                index
                element={<Navigate replace to="screen-sequence/" />}
              />
              <Route
                path="screen-sequence/"
                element={
                  <PhenotypicScreenSequences
                    baseScreenName={params.baseScreenName}
                  />
                }
              />
              <Route
                path="validates-hit/"
                element={
                  <PhenotypicValidatedHits
                    baseScreenName={params.baseScreenName}
                  />
                }
              />
              <Route
                path="discussion/"
                element={
                  <PhenotypicScreenDiscussion
                    baseScreenName={params.baseScreenName}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default observer(PhenotypicScreenView);
