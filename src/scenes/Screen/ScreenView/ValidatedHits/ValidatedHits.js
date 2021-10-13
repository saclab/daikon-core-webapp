import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { TabView, TabPanel } from "primereact/tabview";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import ValidatedHitsList from "./ValidatedHitsList/ValidatedHitsList";


const ValidatedHits = ({geneName}) => {
  


  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { filterScreensByGene, validatedHitsIndex, setValidatedHitsIndex } = rootStore.screenStore;


  let filteredScreensbyGene = filterScreensByGene(geneName);
  let tabs = [];

  console.log(filteredScreensbyGene.length);

  if (tabs.length===0 && filteredScreensbyGene.length > 0) {
    filteredScreensbyGene.forEach((screen) => {
      console.log(screen);
      tabs.push(
        <TabPanel header={screen.screenName} key={screen.id}>
          <ValidatedHitsList screenId={screen.id}/>
        </TabPanel>
      );
    });
  }

  return (
    <div>
      <TabView
        activeIndex={validatedHitsIndex}
        onTabChange={(e) => setValidatedHitsIndex(e.index)}
      >
        {tabs}
      </TabView>
    </div>
  );
};


export default observer(ValidatedHits);
