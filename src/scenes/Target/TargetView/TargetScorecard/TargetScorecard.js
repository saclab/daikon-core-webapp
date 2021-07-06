import React, { useState, useRef, useEffect, useContext } from "react";
import { Toast } from "primereact/toast";
import { Fieldset } from "primereact/fieldset";
import TargetScorecardWaffle from "./TargetScorecardWaffle/TargetScorecardWaffle";
import TargetScorecardPercentDial from "./TargetScorecardPercentDial/TargetScorecardPercentDial";
import TargetScorecardBar from "./TargetScorecardBar/TargetScorecardBar";
import TargetGrid from "./TargetGrid/TargetGrid";

const TargetScorecard = () => {
  const toast = useRef(null);

  return (
    <React.Fragment>
      <Toast ref={toast} />
      <div className="p-d-flex">
        <div className="p-mr-2">
          <div className="p-d-flex p-flex-column">
            <div className="p-mb-2">
              <Fieldset legend="Overview">
                <div className="p-d-flex">
                  <div className="p-mr-2">
                    <TargetScorecardWaffle />
                  </div>
                  <div className="p-mr-2">
                    <TargetScorecardPercentDial />
                  </div>
                  <div className="p-mr-2">
                    <TargetScorecardBar />
                  </div>
                </div>
              </Fieldset>
            </div>
            <div className="p-mb-2">
              <Fieldset legend="Scorecard">
                <TargetGrid />
              </Fieldset>
            </div>
            <div className="p-mb-2">
              <h1>3</h1>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TargetScorecard;
