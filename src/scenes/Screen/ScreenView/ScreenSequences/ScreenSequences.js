import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TabView, TabPanel } from "primereact/tabview";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import ScreenSequence from "./ScreenSequence/ScreenSequence";
import Loading from "../../../../app/layout/Loading/Loading";

const ScreenSequences = ({ accessionNumber }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    filterScreensByAccession,
    filteredScreens,
    displayLoading,
    screenSequenceIndex,
    setScreenSequenceIndex,
  } = rootStore.screenStore;

  console.log("====SCREEN SEQUENCES");

  useEffect(() => {
    if (
      filteredScreens === null ||
      filteredScreens.length === 0 ||
      filteredScreens[0].accessionNumber !== accessionNumber
    )
      filterScreensByAccession(accessionNumber);
  }, [filteredScreens, filterScreensByAccession, accessionNumber]);

  if (displayLoading) {
    return <Loading />;
  }

  let tabs = [];

  console.log(filteredScreens.length);

  if (tabs.length === 0 && filteredScreens.length > 0) {
    console.log("====SCREEN SEQUENCES--TABS");
    filteredScreens.forEach((screen) => {
      console.log(screen);
      tabs.push(
        <TabPanel header={screen.screenName} key={screen.id}>
          <ScreenSequence screenId={screen.id} />
        </TabPanel>
      );
    });
  }

  return (
    <div>
      <TabView
        activeIndex={screenSequenceIndex}
        onTabChange={(e) => setScreenSequenceIndex(e.index)}
      >
        {tabs}
      </TabView>
    </div>
  );
};

export default observer(ScreenSequences);
