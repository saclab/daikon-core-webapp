import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { TabView, TabPanel } from "primereact/tabview";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import ScreenSequence from "./ScreenSequence/ScreenSequence";

const ScreenSequences = ({ geneName }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { filterScreensByGene, screenSequenceIndex, setScreenSequenceIndex } = rootStore.screenStore;


  let filteredScreensbyGene = filterScreensByGene(geneName);
  let tabs = [];

  console.log(filteredScreensbyGene.length);

  if (filteredScreensbyGene.length > 0) {
    filteredScreensbyGene.forEach((screen) => {
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
