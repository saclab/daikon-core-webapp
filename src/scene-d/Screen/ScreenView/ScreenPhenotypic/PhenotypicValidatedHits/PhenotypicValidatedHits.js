import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../../../../app/common/SectionHeading/SectionHeading";
import Loading from "../../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { appColors } from "../../../../../colors";
import ValidatedHitsList from "../../ScreenTargetBased/ValidatedHits/ValidatedHitsList/ValidatedHitsList";

const PhenotypicValidatedHits = ({ baseScreenName }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    filterPhenotypicScreensByBaseScreenName,
    filteredPhenotypicScreens,
    loadingFetchScreensPhenotypic,
    selectedPhenotypicScreenFilter,
    loadingFilterPhenotypicScreensByBaseScreenName,
  } = rootStore.screenStore;

  const navigate = useNavigate();

  useEffect(() => {
    if (
      filteredPhenotypicScreens === null ||
      filteredPhenotypicScreens.length === 0 ||
      selectedPhenotypicScreenFilter !== baseScreenName
    )
      filterPhenotypicScreensByBaseScreenName(baseScreenName);
  }, [
    filteredPhenotypicScreens,
    filterPhenotypicScreensByBaseScreenName,
    baseScreenName,
    selectedPhenotypicScreenFilter,
  ]);

  if (
    loadingFetchScreensPhenotypic ||
    loadingFilterPhenotypicScreensByBaseScreenName
  ) {
    return <Loading />;
  }

  if (
    !loadingFetchScreensPhenotypic &&
    !loadingFilterPhenotypicScreensByBaseScreenName &&
    filteredPhenotypicScreens.length === 0
  ) {
    return <h2>No screens found</h2>;
  }

  if (
    !loadingFetchScreensPhenotypic &&
    !loadingFilterPhenotypicScreensByBaseScreenName &&
    filteredPhenotypicScreens.length >= 0
  ) {
    const breadCrumbItems = [
      {
        label: "Screens",
        command: () => {
          navigate("/d/screen/");
        },
      },
      {
        label: baseScreenName,
        command: () => {
          navigate(`/d/screen/${baseScreenName}`);
        },
      },
      {
        label: "Validated Hits",
      },
    ];

    console.log("==== VALIDATED HITS");
    // let filteredScreensByTarget = filterScreensByTarget(baseScreenName);
    let tabs = [];

    if (tabs.length === 0 && filteredPhenotypicScreens.length > 0) {
      filteredPhenotypicScreens.forEach((screen) => {
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
            heading={"Screens of " + baseScreenName}
            baseScreenName={baseScreenName}
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
            // activeIndex={validatedHitsIndex}
            // onTabChange={(e) => setValidatedHitsIndex(e.index)}
            scrollable
            className="w-full max-w-screen"
          >
            {tabs}
          </TabView>
        </div>
      </div>
    );
  }
};

export default observer(PhenotypicValidatedHits);
