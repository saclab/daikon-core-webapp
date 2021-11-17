import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { TabView, TabPanel } from "primereact/tabview";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import ValidatedHitsList from "./ValidatedHitsList/ValidatedHitsList";


const ValidatedHits = ({accessionNumber}) => {
  


  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { filterScreensByAccession, validatedHitsIndex, setValidatedHitsIndex } = rootStore.screenStore;

  console.log("==== VALIDATED HITS");
  let filteredScreensByAccession = filterScreensByAccession(accessionNumber);
  let tabs = [];

  console.log(filteredScreensByAccession.length);

  if (tabs.length===0 && filteredScreensByAccession.length > 0) {
    filteredScreensByAccession.forEach((screen) => {
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
