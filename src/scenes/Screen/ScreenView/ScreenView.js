import React, { useState, useEffect, useRef, useContext } from "react";
import { Menu } from "primereact/menu";
import { TabView, TabPanel } from "primereact/tabview";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Toast } from "primereact/toast";
import { BreadCrumb } from "primereact/breadcrumb";
import NotFound from "../../../app/layout/NotFound/NotFound";
import Loading from "../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import ScreenStatus from "./ScreenStatus/ScreenStatus";
import ScreenHits from "./ScreenHits/ScreenHits";

const ScreenView = ({ match, history }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    fetchScreenedTargets,
    screenedTargets,
    displayLoading,
    
  } = rootStore.screenStore;

  useEffect(() => {
    console.log("EFFECT");
    console.log(match.params.id);
    // if (screenedTargets === null || screenedTargets.id !== match.params.id) {
    //   fetchScreenedTargets(match.params.id);
    // }
    if (screenedTargets === null) {
      fetchScreenedTargets(match.params.id);
      console.log(screenedTargets);
    }
  }, [match.params.id, screenedTargets, fetchScreenedTargets]);

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
  if (displayLoading) {
    console.log("Loading.....");
    return <Loading />;
  }
  if (screenedTargets !== null) {
    console.log("Screen ID");
    console.log(screenedTargets.id);
    const breadCrumbItems = [
      {
        label: "Screen",
        command: () => {
          history.push("/screenedTargets/");
        },
      },
      { label: screenedTargets.accessionNumber },
    ];

    return (
      <React.Fragment>
        <Toast ref={toast} />
        <br />
        <div className="p-d-flex">
          <div className="p-mr-2">
            <Menu model={items} />
          </div>
          <div className="p-mr-2">
            <div className="p-d-flex p-flex-column">
              <div className="p-mb-2">
                <BreadCrumb model={breadCrumbItems} />
              </div>
              <div className="p-mb-2">
                <h2 className="heading">{screenedTargets.accessionNumber}</h2>
              </div>
              <div className="p-mb-2">
                <TabView
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                >
                  <TabPanel header="Header I" headerClassName="hide">
                    <ScreenStatus />
                  </TabPanel>
                  <TabPanel header="Header II" headerClassName="hide">
                    <ScreenHits />
                  </TabPanel>
                </TabView>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return <NotFound />;
};

export default observer(ScreenView);
