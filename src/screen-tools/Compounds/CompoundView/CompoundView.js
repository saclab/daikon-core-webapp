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
import Loading from "../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import CompoundOverview from "./CompoundOverview/CompoundOverview";

const CompoundView = () => {
  const params = useParams();
  const navigate = useNavigate();

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  const { loadingFetchCompound, selectedCompound, fetchCompound } =
    rootStore.compoundStore;

  useEffect(() => {
    if (selectedCompound === null || selectedCompound.id !== params.id) {
      fetchCompound(params.id);
    }
  }, [params.id, selectedCompound, fetchCompound]);
  const toast = useRef(null);

  /** Loading Overlay */
  if (loadingFetchCompound) {
    return <Loading />;
  }

  if (
    !loadingFetchCompound &&
    selectedCompound !== null &&
    selectedCompound.id === params.id
  ) {
    console.log(selectedCompound);
    const sideMenuItems = [
      {
        label: "Sections",
        items: [
          {
            label: "Compound Overview",
            icon: "icon icon-common icon-math",
            command: () => {
              navigate("overview/");
            },
          },
        ],
      },
    ];

    var actions = {
      label: "Actions",
      items: [],
    };

    return (
      <React.Fragment>
        <Toast ref={toast} />
        <div className="flex gap-2 w-full">
          <div className="flex">
            <Menu model={sideMenuItems} />
          </div>

          <div className="flex w-full">
            <Routes>
              <Route index element={<Navigate replace to="overview/" />} />
              <Route
                path="overview/"
                element={
                  <CompoundOverview
                    id={params.id}
                    selectedCompound={selectedCompound}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return <div>CompoundView</div>;
};
export default observer(CompoundView);
