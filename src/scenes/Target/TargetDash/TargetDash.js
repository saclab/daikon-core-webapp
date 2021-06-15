import React from "react";
import { Fieldset } from "primereact/fieldset";
import TargetDashChart from "./TargetDashChart/TargetDashChart";
import TargetDashTable from "./TargetDashTable/TargetDashTable";

const TargetDash = () => {
  return (
    <div>
      <h1 className="heading">Target Dashboard</h1>

      <div className="p-d-flex">
        <div className="p-mb-2">
          <Fieldset legend="Target Map">
            <TargetDashChart style={{ width: "500px" }} />
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
