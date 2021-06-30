import React, { useState, useEffect, useRef, useContext } from "react";
import { Fieldset } from "primereact/fieldset";
import TargetDashChart from "./TargetDashChart/TargetDashChart";
import TargetDashTable from "./TargetDashTable/TargetDashTable";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading/Loading";
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
      <h1 className="heading">Target Dashboard</h1>

      <div className="p-d-flex">
        <div className="p-mb-2">
          <Fieldset legend="Target Map">
            <TargetDashChart style={{ width: "1000px" }} />
          </Fieldset>
        </div>
      </div>
      <div className="p-d-flex">
        <div className="p-mb-2">
          <Fieldset legend="Target List">
            <TargetDashTable />
          </Fieldset>
        </div>
      </div>
    </div>
  );
};

export default TargetDash;
