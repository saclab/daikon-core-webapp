import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { TabView, TabPanel } from "primereact/tabview";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import Loading from "../../../../../app/layout/Loading/Loading";
import SectionHeading from '../../../../../app/common/SectionHeading/SectionHeading';
import { BreadCrumb } from 'primereact/breadcrumb';
import { appColors } from '../../../../../colors';
import ScreenSequence from "../../ScreenTargetBased/ScreenSequences/ScreenSequence/ScreenSequence";

const PhenotypicScreenSequences = ({ baseScreenName }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    filterPhenotypicScreensByBaseScreenName,
    filteredPhenotypicScreens,
    loadingFetchScreensPhenotypic,
    screenSequenceIndex,
    setScreenSequenceIndex,
    selectedPhenotypicScreenFilter,
    loadingFilterPhenotypicScreensByBaseScreenName
  } = rootStore.screenStore;

  const navigate = useNavigate();

  console.log("++++++++++++ RENDER Phenotypic Screen Sequence")
  console.log("baseScreenName=" + baseScreenName)
  console.log("filteredPhenotypicScreens.length=" + filteredPhenotypicScreens.length)
  console.log("selectedPhenotypicScreenFilter=" + selectedPhenotypicScreenFilter)


  useEffect(() => {
    if (
      filteredPhenotypicScreens === null ||
      filteredPhenotypicScreens.length === 0 ||
      selectedPhenotypicScreenFilter !== baseScreenName
    )
      filterPhenotypicScreensByBaseScreenName(baseScreenName);
  }, [filteredPhenotypicScreens, filterPhenotypicScreensByBaseScreenName, baseScreenName, selectedPhenotypicScreenFilter]);

  if (loadingFetchScreensPhenotypic || loadingFilterPhenotypicScreensByBaseScreenName) {
    return <Loading />;
  }

  if (!loadingFetchScreensPhenotypic && !loadingFilterPhenotypicScreensByBaseScreenName && filteredPhenotypicScreens.length === 0) {

    return <h2>No screens found</h2>
  }

  if (!loadingFetchScreensPhenotypic && !loadingFilterPhenotypicScreensByBaseScreenName && filteredPhenotypicScreens.length >= 0) {
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
          // navigate(`/d/gene/${gene.id}`);
        }
      },
      ,
    ];

    let tabs = [];

    console.log(filteredPhenotypicScreens)
    console.log(filteredPhenotypicScreens.length);

    if (tabs.length === 0 && filteredPhenotypicScreens.length > 0) {
      console.log("====SCREEN SEQUENCES--TABS");
      filteredPhenotypicScreens.forEach((screen) => {
        console.log(screen);
        tabs.push(
          <TabPanel header={screen.screenName} key={screen.id}>
            <ScreenSequence screenId={screen.id} />
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
            targetName={baseScreenName}
            displayHorizon={true}
            color={appColors.sectionHeadingBg.screen} />
        </div>
        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-common icon-circle-notch"
            heading={" Phenotypic Screens"}
            color={"#f4f4f4"}
            textColor={"#000000"}
          />
        </div>
        <div className='flex w-full'>
          <TabView
            //activeIndex={screenSequenceIndex}
            //onTabChange={(e) => setScreenSequenceIndex(e.index)}
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

export default observer(PhenotypicScreenSequences);
