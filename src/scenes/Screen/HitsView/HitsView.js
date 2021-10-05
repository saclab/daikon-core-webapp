import React, { useEffect, useRef, useContext } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Toast } from "primereact/toast";
import { BreadCrumb } from "primereact/breadcrumb";
import NotFound from "../../../app/layout/NotFound/NotFound";
import Loading from "../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import HitsTable from "./HitsTable/HitsTable";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";

const HitsView = ({ match, history }) => {
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    selectedScreen,
    screens,
    displayLoading,
    fetchScreen
  } = rootStore.screenStore;

  useEffect(() => {
    console.log("EFFECT");
    console.log(match.params.screenId);
    if (selectedScreen === null || selectedScreen.id !== match.params.screenId) {
      fetchScreen(match.params.screenId);
    }

  }, [
    match.params.screenId,
    selectedScreen,
    fetchScreen,
  ]);

  /** Loading Overlay */
  if (displayLoading) {
    console.log("Loading.....");
    return <Loading />;
  }
  if (selectedScreen !== null) {
    console.log(selectedScreen);
    const breadCrumbItems = [
      {
        label: "Screened Targets",
        command: () => {
          history.push("/screen/");
        },
      },
      {
        label: selectedScreen.geneName,
        command: () => {
          history.push("/screen/"+selectedScreen.geneName);
        },
      },

      {
        label: "Rv0667-1",
      },
    ];

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
                <SectionHeading
                  icon="icon icon-common icon-fullscreen"
                  heading={"Hits of Rv0667-1"}
                />
              </div>
              <div className="p-mb-2">
                <HitsTable hits={selectedScreen.hits} />
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
