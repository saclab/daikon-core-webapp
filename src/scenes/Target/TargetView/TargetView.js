import React, { useState, useEffect, useRef, useContext } from "react";
import { Menu } from "primereact/menu";
import { TabView, TabPanel } from "primereact/tabview";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import TargetPromotionForm from "./TargetPromotionForm/TargetPromotionForm";
import TargetScorecard from "./TargetScorecard/TargetScorecard";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Toast } from "primereact/toast";
import { BreadCrumb } from "primereact/breadcrumb";
import NotFound from "../../../app/layout/NotFound/NotFound";
import Loading from "../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import TargetScreenPromotionQuestionaire from "./TargetScreenPromotionQuestionaire/TargetScreenPromotionQuestionaire";
import Discussion from "../../../app/common/Discussion/Discussion";

const TargetView = ({ match, history }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { fetchTarget, target, displayLoading } = rootStore.targetStore;

  useEffect(() => {
    console.log("EFFECT");
    console.log(match.params.id);
    if (target === null || target.id !== match.params.id) {
      fetchTarget(match.params.id);
    }
    // if (target === null) {
    //   fetchTarget(match.params.id);
    // }
  }, [match.params.id, target, fetchTarget]);

  const [displayPromotionDialog, setDisplayPromotionDialog] = useState(false);

  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "Target Scorecard",
          icon: "icon icon-common icon-flag-checkered",
          command: () => {
            setActiveIndex(0);
          },
        },
        {
          label: "Target Promotion Form",
          icon: "pi pi-table",
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
    {
      label: "Actions",
      items: [
        {
          label: "Add a Screen",
          icon: "icon icon-common icon-database-submit",
          command: (event) => {
            setDisplayPromotionDialog(true);
          },
        },
        {
          label: "View Screens",
          icon: "pi pi-external-link",
          command: (event) => {
            history.push("/screen/" + target.geneName);
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
  if (target !== null) {
    console.log("Target ID");
    console.log(target.id);
    const breadCrumbItems = [
      {
        label: "Target",
        command: () => {
          history.push("/target/");
        },
      },
      { label: target.accessionNumber },
    ];

    return (
      <React.Fragment>
        <Toast ref={toast} />
        <Sidebar
          visible={displayPromotionDialog}
          position="right"
          style={{ width: "30em", overflowX: "auto" }}
          blockScroll={true}
          onHide={() => setDisplayPromotionDialog(false)}
        >
          <h3>{target.geneName}</h3>
          <i className="icon icon-common icon-plus-circle"></i> &nbsp; Add a{" "}
          <b>New</b> Screen
          <hr />
          <br />
          <TargetScreenPromotionQuestionaire />
        </Sidebar>
        <br />
        <div className="p-d-flex">
          <div className="p-mr-2">
            <Menu model={items} />
          </div>
          <div className="p-mr-2" style={{ width: "100vw" }}>
            <div className="p-d-flex p-flex-column">
              <div className="p-mb-2">
                <BreadCrumb model={breadCrumbItems} />
              </div>
              <div className="p-mb-2">
                <SectionHeading
                  icon="icon icon-common icon-target"
                  heading={target.accessionNumber}
                  link={"some data"}
                />
              </div>
              <div className="p-mb-2">
                <TabView
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                >
                  <TabPanel header="Target Scorecard" headerClassName="hide">
                    <TargetScorecard
                      data={target.targetScorecard.targetScoreCardValues}
                    />
                  </TabPanel>

                  <TabPanel header="Target Form" headerClassName="hide">
                    <TargetPromotionForm
                      data={target.targetScorecard.targetScoreCardValues}
                    />
                  </TabPanel>

                  <TabPanel header="Discussion" headerClassName="hide">
                    <Discussion
                      reference={target.accessionNumber}
                      section={"Target"}
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

  return <NotFound />;
};

export default observer(TargetView);
