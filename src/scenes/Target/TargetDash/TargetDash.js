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
    if(targets.length === 0) fetchTargetList();
  }, [fetchTargetList, targets]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Loading Overlay */
  if (displayLoading) {
    return <Loading />;
  }

  console.log(targets);

  return (
    <div>
      <SectionHeading
        icon="icon icon-common icon-target"
        heading="H37Rv Targets"
        color={appColors.sectionHeadingBg.target}
      />

      <div className="p-d-flex">
        <div className="p-mb-2">
          <div className="p-d-flex">
            <div className="p-mr-2">
              <TargetDashChart targets={targets}/>
            </div>
            <div className="p-mr-2">
              <TargetDashTable targets={targets}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(TargetDash);
