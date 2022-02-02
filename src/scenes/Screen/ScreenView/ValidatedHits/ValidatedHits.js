import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { TabView, TabPanel } from "primereact/tabview";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import ValidatedHitsList from "./ValidatedHitsList/ValidatedHitsList";

const ValidatedHits = ({ TargetName }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    filterScreensByTarget,
    validatedHitsIndex,
    setValidatedHitsIndex,
  } = rootStore.screenStore;

  console.log("==== VALIDATED HITS");
  let filteredScreensByTarget = filterScreensByTarget(TargetName);
  let tabs = [];

  console.log(filteredScreensByTarget.length);

  if (tabs.length === 0 && filteredScreensByTarget.length > 0) {
    filteredScreensByTarget.forEach((screen) => {
      console.log(screen);
      tabs.push(
        <TabPanel header={screen.screenName} key={screen.id}>
          <ValidatedHitsList screenId={screen.id} />
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
