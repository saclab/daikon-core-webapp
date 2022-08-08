import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { TabView, TabPanel } from "primereact/tabview";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import ScreenSequence from "./ScreenSequence/ScreenSequence";
import Loading from "../../../../app/layout/Loading/Loading";
import SectionHeading from '../../../../app/common/SectionHeading/SectionHeading';
import { BreadCrumb } from 'primereact/breadcrumb';
import { appColors } from '../../../../colors';

const ScreenSequences = ({ TargetName }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    filterScreensByTarget,
    filteredScreens,
    displayLoading,
    screenSequenceIndex,
    setScreenSequenceIndex,
    selectedScreenTargetFilter
  } = rootStore.screenStore;

  const navigate = useNavigate();

  useEffect(() => {
    if (
      filteredScreens === null ||
      filteredScreens.length === 0 ||
      selectedScreenTargetFilter !== TargetName
    )
      filterScreensByTarget(TargetName);
  }, [filteredScreens, filterScreensByTarget, TargetName]);

  if (displayLoading) {
    return <Loading />;
  }

  if (!displayLoading && filteredScreens.length === 0) {
    console.log()
    return <h2>No screens found</h2>
  }
  if (!displayLoading && filteredScreens.length >= 0) {
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
          // navigate(`/d/gene/${gene.id}`);
        }
      },
      ,
    ];

    let tabs = [];

    console.log(filteredScreens.length);

    if (tabs.length === 0 && filteredScreens.length > 0) {
      console.log("====SCREEN SEQUENCES--TABS");
      filteredScreens.forEach((screen) => {
        console.log(screen);
        tabs.push(
          <TabPanel header={screen.screenName + " (" + screen.method + ")"} key={screen.id}>
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
            heading={"Screens of " + TargetName}
            targetName={TargetName}
            displayHorizon={true}
            color={appColors.sectionHeadingBg.screen} />
        </div>
        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-common icon-circle-notch"
            heading={" Screens"}
            color={"#f4f4f4"}
            textColor={"#000000"}
          />
        </div>
        <div className='flex w-full'>
          <TabView
            activeIndex={screenSequenceIndex}
            onTabChange={(e) => setScreenSequenceIndex(e.index)}
            scrollable
            className="max-w-screen"
          >
            {tabs}
          </TabView>
        </div>
      </div>
    );
  }





};

export default observer(ScreenSequences);
