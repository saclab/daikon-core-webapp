import React, { useState, useRef, useEffect, useContext } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { Menu } from "primereact/menu";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Toast } from "primereact/toast";
import Loading from "../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import ScreenSequences from "./ScreenSequences/ScreenSequences";
import ValidatedHits from "./ValidatedHits/ValidatedHits";
import Discussion from "../../../app/common/Discussion/Discussion";
import { appColors } from '../../../colors';

const ScreenView = ({ match, history }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingFetchScreens, screenRegistry, fetchScreens, selectedScreen } =
    rootStore.screenStore;
  useEffect(() => {
    if (screenRegistry.size === 0) fetchScreens();
  }, [fetchScreens, screenRegistry]);

  console.log("====SCREEN VIEW");

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
              <Route path="discussion/" element={<ValidatedHits TargetName={params.id} />} />
            </Routes>
          </div>
        </div>

      </React.Fragment>
    );
  }

  /** Loading Overlay */

  return <Loading />;
};

export default observer(ScreenView);
