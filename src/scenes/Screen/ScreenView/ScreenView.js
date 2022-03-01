import React, { useState, useRef, useEffect, useContext } from "react";
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

const ScreenView = ({ match, history }) => {
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
            setActiveIndex(0);
          },
        },
        {
          label: "Validated Hits",
          icon: "icon icon-conceptual icon-structures-3d",
          command: () => {
            setActiveIndex(1);
          },
        },
        {
          label: "Discussion",
          icon: "ri-discuss-line",
          command: () => {
            setActiveIndex(2);
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
        <div className="p-d-flex">
          <div className="p-mr-2">
            <Menu model={SideMenuItems} />
          </div>
          <div className="p-mr-2" style={{ width: "100vw" }}>
            <div className="p-d-flex p-flex-column">
              <div className="p-mb-2">
                {/* <BreadCrumb model={breadCrumbItems} /> */}
              </div>
              <div className="p-mb-2">
                <SectionHeading
                  icon="icon icon-common icon-search"
                  heading={"Screens of " + match.params.id}
                  targetName={match.params.id}
                  displayHorizon={true}
                />
              </div>
              <div className="p-mb-2">
                <TabView
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                >
                  <TabPanel header="Screens" headerClassName="hide">
                    <SectionHeading
                      icon="icon icon-common icon-circle-notch"
                      heading={" Screens"}
                      color={"#f4f4f4"}
                      textColor={"#000000"}
                    />
                    <ScreenSequences TargetName={match.params.id} />
                  </TabPanel>
                  <TabPanel header="Validated Hits" headerClassName="hide">
                    <SectionHeading
                      icon="icon icon-conceptual icon-structures-3d"
                      heading={"Validated Hits"}
                      color={"#f4f4f4"}
                      textColor={"#000000"}
                    />
                    <ValidatedHits TargetName={match.params.id} />
                  </TabPanel>
                  <TabPanel header="Discussion" headerClassName="hide">
                    <Discussion
                      reference={selectedScreen?.targetName}
                      section={"Screen"}
                    />
                  </TabPanel>
                </TabView>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  /** Loading Overlay */

  return <Loading />;
};

export default observer(ScreenView);
