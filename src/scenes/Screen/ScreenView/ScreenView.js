import React, { useState, useRef, useEffect, useContext } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Menu } from "primereact/menu";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Toast } from "primereact/toast";
import { BreadCrumb } from "primereact/breadcrumb";
import NotFound from "../../../app/layout/NotFound/NotFound";
import Loading from "../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { Column } from "primereact/column";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import ScreenSequences from "./ScreenSequences/ScreenSequences";
import ValidatedHits from "./ValidatedHits/ValidatedHits";

const ScreenView = ({ match, history }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { displayLoading, screenRegistry, fetchScreens, filterScreensByGene } =
    rootStore.screenStore;
  useEffect(() => {
    fetchScreens();
  }, [fetchScreens]);

  const SideMenuItems = [
    {
      label: "Sections",
      items: [
        {
          label: "Validated Hits",
          icon: "icon icon-conceptual icon-structures-3d",
          command: () => {
            setActiveIndex(0);
          },
        },
        {
          label: "Ongoing",
          icon: "icon icon-common icon-circle-notch",
          command: () => {
            setActiveIndex(1);
          },
        },
      ],
    },
  ];

  if (!displayLoading) {
    return (
      <React.Fragment>
        <Toast ref={toast} />
        <br />
        <div className="p-d-flex">
          <div className="p-mr-2">
            <Menu model={SideMenuItems} />
          </div>
          <div className="p-mr-2">
            <div className="p-d-flex p-flex-column">
              <div className="p-mb-2">
                {/* <BreadCrumb model={breadCrumbItems} /> */}
              </div>
              <div className="p-mb-2">
                <SectionHeading
                  icon="icon icon-conceptual icon-chemical"
                  heading={"Screens of " + match.params.id}
                />
              </div>
              <div className="p-mb-2">
                <TabView
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                >
                  <TabPanel header="Validated Hits" headerClassName="hide">
                    <SectionHeading
                      icon="icon icon-conceptual icon-structures-3d"
                      heading={"Validated Hits"}
                      color={"#f4f4f4"}
                      textColor={"#000000"}
                    />
                    <ValidatedHits geneName={match.params.id} />
                  </TabPanel>
                  <TabPanel header="Ongoing" headerClassName="hide">
                  <SectionHeading
                      icon="icon icon-common icon-circle-notch"
                      heading={" Ongoing"}
                      color={"#f4f4f4"}
                      textColor={"#000000"}
                    />
                    <ScreenSequences geneName={match.params.id} />
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
