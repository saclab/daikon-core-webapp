import React, { useEffect, useContext } from "react";

import TargetDashChart from "./TargetDashChart/TargetDashChart";
import TargetDashTable from "./TargetDashTable/TargetDashTable";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading/Loading";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
const TargetDash = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { fetchTargetList, displayLoading } = rootStore.targetStore;

  /* Local State Management */

  useEffect(() => {
    console.log("TargetSearch: fetchTargetList()");
    fetchTargetList();
  }, [fetchTargetList]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Loading Overlay */
  if (displayLoading) {
    return <Loading />;
  }

  return (
    <div>
      <SectionHeading
        icon="icon icon-common icon-target"
        heading="H37Rv Targets"
      />

      <div className="p-d-flex">
        <div className="p-mb-2">
          <div className="p-d-flex">
            <div className="p-mr-2">
              <TargetDashChart />
            </div>
            <div className="p-mr-2">
              <TargetDashTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetDash;
