import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../../../../app/common/SectionHeading/SectionHeading";
import Loading from "../../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { appColors } from "../../../../../colors";
import ValidatedHitsList from "./ValidatedHitsList/ValidatedHitsList";

const ValidatedHits = ({ TargetName }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    displayLoading,
    filterScreensByTarget,
    filteredScreens,
    validatedHitsIndex,
    setValidatedHitsIndex,
    selectedScreenTargetFilter,
    screenRegistryCacheValid,
  } = rootStore.screenStore;

  const navigate = useNavigate();

  useEffect(() => {
    if (
      filteredScreens === null ||
      filteredScreens.length === 0 ||
      selectedScreenTargetFilter !== TargetName ||
      !screenRegistryCacheValid
    )
      filterScreensByTarget(TargetName);
  }, [
    filteredScreens,
    filterScreensByTarget,
    TargetName,
    screenRegistryCacheValid,
    selectedScreenTargetFilter,
  ]);

  if (displayLoading) {
    return <Loading />;
  }

  const breadCrumbItems = [
    {
      label: "Screens",
      command: () => {
        navigate("/d/screen/");
      },
    },
    {
      label: TargetName,
      command: () => {
        navigate(`/d/screen/${TargetName}`);
      },
    },
    {
      label: "Validated Hits",
    },
  ];

  console.log("==== VALIDATED HITS");
  // let filteredScreensByTarget = filterScreensByTarget(TargetName);
  let tabs = [];

  console.log(filteredScreens.length);

  if (tabs.length === 0 && filteredScreens.length > 0) {
    filteredScreens.forEach((screen) => {
      console.log(screen);
      tabs.push(
        <TabPanel header={screen.screenName} key={screen.id}>
          <ValidatedHitsList screenId={screen.id} />
        </TabPanel>
      );
    });
  }

  return (
    <div className="flex flex-column w-full">
      <div className="flex w-full pb-2">
        <BreadCrumb model={breadCrumbItems} />
      </div>
      <div className="flex w-full">
        <SectionHeading
          icon="icon icon-common icon-search"
          heading={"Screens of " + TargetName}
          targetName={TargetName}
          displayHorizon={true}
          color={appColors.sectionHeadingBg.screen}
        />
      </div>
      <div className="flex w-full">
        <SectionHeading
          icon="icon icon-conceptual icon-structures-3d"
          heading={"Validated Hits"}
          color={"#f4f4f4"}
          textColor={"#000000"}
        />
      </div>
      <div className="flex w-full">
        <TabView
          activeIndex={validatedHitsIndex}
          onTabChange={(e) => setValidatedHitsIndex(e.index)}
          scrollable
          className="w-full max-w-screen"
        >
          {tabs}
        </TabView>
      </div>
    </div>
  );
};

export default observer(ValidatedHits);
