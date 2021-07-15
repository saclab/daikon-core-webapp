import React, { useState, useEffect, useRef, useContext } from "react";
import { Menu } from "primereact/menu";
import { TabView, TabPanel } from "primereact/tabview";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Toast } from "primereact/toast";
import { BreadCrumb } from "primereact/breadcrumb";
import NotFound from "../../../app/layout/NotFound/NotFound";
import Loading from "../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import ScreenTable from "./HitsTable/HitsTable";
import HitsTable from "./HitsTable/HitsTable";

const HitsView = ({ match, history }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    fetchScreens,
    screens,
    displayLoading,
    screenedTarget,
    fetchScreenedTarget,
    displayScreenLoading,
  } = rootStore.screenStore;

  useEffect(() => {
    console.log("EFFECT");
    console.log(match.params.id);
    // if (screenedTargets === null || screenedTargets.id !== match.params.id) {
    //   fetchScreenedTargets(match.params.id);
    // }

    if (screenedTarget === null) {
      fetchScreenedTarget(match.params.id);
    }

    if (screenedTarget && screens.length === 0) {
      console.log("Fetching screens from store");
      fetchScreens(match.params.id);
    }
  }, [
    match.params.id,
    screens,
    fetchScreens,
    fetchScreenedTarget,
    screenedTarget,
  ]);

  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "Status",
          icon: "ri-git-repository-private-fill",
          command: () => {
            setActiveIndex(0);
          },
        },
        {
          label: "Hits",
          icon: "ri-book-open-line",
          command: () => {
            setActiveIndex(1);
          },
        },
      ],
    },
  ];

  /** Loading Overlay */
  if (displayLoading || displayScreenLoading) {
    console.log("Loading.....");
    return <Loading />;
  }
  if (screenedTarget !== null) {
    console.log(screenedTarget);
    const breadCrumbItems = [
      {
        label: "Screened Targets",
        command: () => {
          history.push("/screen/");
        },
      },
      {
        label: "Rv0667",
        command: () => {
          history.push("/screen/1000/");
        },
      },

      {
        label: "Rv0667-1",
      },
    ];

    if (screens !== null) {
      console.log("screens array");
      console.log(screens);
      console.log(screens[match.params.id]);
    }

    return (
      <React.Fragment>
        <Toast ref={toast} />
        <br />
        <div className="p-d-flex">
          <div className="p-mr-2">{/* <Menu model={items} /> */}</div>
          <div className="p-mr-2">
            <div className="p-d-flex p-flex-column">
              <div className="p-mb-2">
                <BreadCrumb model={breadCrumbItems} />
              </div>
              <div className="p-mb-2">
                <h2 className="heading"> Rv0667-1</h2>
              </div>
              <div className="p-mb-2">
                <HitsTable screens={screens} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return <NotFound />;
};

export default observer(HitsView);
