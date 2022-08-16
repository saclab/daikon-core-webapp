import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { appColors } from "../../../colors";
import TargetDashChart from "./TargetDashChart/TargetDashChart";
import TargetDashTable from "./TargetDashTable/TargetDashTable";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading/Loading";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
const TargetDash = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { fetchTargetList, displayLoading, targets } = rootStore.targetStore;

  /* Local State Management */

  useEffect(() => {
    console.log("TargetSearch: fetchTargetList()");
    if (targets.length === 0) fetchTargetList();
  }, [fetchTargetList, targets]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Loading Overlay */
  if (displayLoading) {
    return <Loading />;
  }

  //console.log(targets);

  return (
    <div className="flex flex-column w-full fadein animation-duration-500">
      <div className="flex w-full">
        <SectionHeading
          icon="icon icon-common icon-target"
          heading="Targets"
          color={appColors.sectionHeadingBg.target}
        />
      </div>
      <div className="flex w-full">
        <div className="flex">
          <TargetDashChart targets={targets} />
        </div>
        <div className="flex">
          <TargetDashTable targets={targets} />
        </div>
      </div>
    </div>
  );
};

export default observer(TargetDash);
