import React, { useState, useEffect, useRef, useContext } from "react";
import { Menu } from "primereact/menu";
import { TabView, TabPanel } from "primereact/tabview";
import TargetPromotionForm from "./TargetPromotionForm/TargetPromotionForm";
import TargetScorecard from "./TargetScorecard/TargetScorecard";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Toast } from "primereact/toast";
import { BreadCrumb } from "primereact/breadcrumb";
import NotFound from "../../../app/layout/NotFound/NotFound";
import Loading from "../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";

const TargetView = ({ match, history }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    fetchTarget,
    target,
    displayLoading,
    editTarget,
    cancelEditTarget,
    fetchTargetHistory,
    historyDisplayLoading,
    targetHistory,
  } = rootStore.targetStore;

  useEffect(() => {
    console.log("EFFECT");
    console.log(match.params.id);
    // if (target === null || target.id !== match.params.id) {
    //   fetchTarget(match.params.id);
    // }
    if (target === null) {
      fetchTarget(match.params.id);
    }
  }, [match.params.id, target, fetchTarget]);

  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "Target Scorecard",
          icon: "ri-git-repository-private-fill",
          command: () => {
            setActiveIndex(0);
          },
        },
        {
          label: "Target Promotion Form",
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
                <SectionHeading
                  icon="icon icon-common icon-target"
                  heading={target.accessionNumber}
                  link = {'some data'}
                />
              </div>
              <div className="p-mb-2">
                <TabView
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                >
                  <TabPanel header="Header II" headerClassName="hide">
                    <TargetScorecard />
                  </TabPanel>
                  <TabPanel header="Header I" headerClassName="hide">
                    <TargetPromotionForm
                      id={match.params.id}
                      target={target}
                      edit={() => editTarget()}
                      cancelEdit={() => cancelEditTarget()}
                      fetchHistory={() => fetchTargetHistory()}
                      historyDisplayLoading={historyDisplayLoading}
                      history={targetHistory}
                    />
                  </TabPanel>
                  <TabPanel
                    header="Header III"
                    headerClassName="hide"
                  ></TabPanel>
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
