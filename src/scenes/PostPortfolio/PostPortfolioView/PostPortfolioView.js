import React, { useState, useRef, useEffect, useContext } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { BreadCrumb } from "primereact/breadcrumb";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading/Loading";
import NotFound from "../../../app/layout/NotFound/NotFound";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import PostPortfolioInformation from "./PostPortfolioInformation/PostPortfolioInformation";

const PostPortfolioView = ({ match, history }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { postPortfolio, displayLoading, fetchPostPortfolio } =
    rootStore.postPortfolioStore;

  useEffect(() => {
    console.log("EFFECT");
    console.log(match.params.id);
    if (postPortfolio === null) {//|| gene.id !== match.params.id) {
      fetchPostPortfolio(match.params.id);
    }
  }, [match.params.id, postPortfolio, fetchPostPortfolio]);

  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "Post Portfolio Information",
          icon: "icon icon-common icon-classification",
          command: () => {
            setActiveIndex(0);
          },
        },
        {
          label: "Links",
          icon: "icon icon-common icon-external-link-square-alt",
          command: () => {
            setActiveIndex(2);
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
  if (postPortfolio !== null) {
    console.log("post Portfolio ID");
    console.log(postPortfolio.id);
    const breadCrumbItems = [
      {
        label: "Post Portfolio",
        command: () => {
          history.push("/postportfolio/");
        },
      },
      { label: "Project X" },
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
                  icon="icon icon-common icon-classification"
                  heading={"Project X"}
                />
              </div>
              <div className="p-mb-2">
                <TabView
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                >
                  <TabPanel header="Header I" headerClassName="hide">
                    <PostPortfolioInformation postPortfolioData={postPortfolio}/>
                  </TabPanel>
                  <TabPanel header="Header II" headerClassName="hide">
                    tab 2
                  </TabPanel>
                  <TabPanel header="Header III" headerClassName="hide">
                    tab 3
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

export default observer(PostPortfolioView);
