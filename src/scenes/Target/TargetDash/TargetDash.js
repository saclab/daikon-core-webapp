import React from "react";
import { Fieldset } from "primereact/fieldset";
import TargetDashChart from "./TargetDashChart/TargetDashChart";

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
        <div className="p-mb-2">
          <Fieldset legend="Target List">
            <p>Todo</p>
          </Fieldset>
        </div>
      </div>
    </div>
  );
};

export default TargetDash;
