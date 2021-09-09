import React, { useState, useRef, useEffect, useContext } from "react";
import { Toast } from "primereact/toast";
import { Fieldset } from "primereact/fieldset";
import TargetScorecardWaffle from "./TargetScorecardWaffle/TargetScorecardWaffle";
import TargetScorecardPercentDial from "./TargetScorecardPercentDial/TargetScorecardPercentDial";
import { observer } from "mobx-react-lite";
import TargetGrid from "./TargetGrid/TargetGrid";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Loading from "../../../../app/layout/Loading/Loading";

const TargetScorecard = () => {
  const toast = useRef(null);

  const rootStore = useContext(RootStoreContext);
  const {
    selectedTarget,
    questionsLoading,
    questionsRegistry,
    fetchQuestions
  } = rootStore.targetStore;

  // const [state, setstate] = useState(initialState);
  useEffect(() => {
    fetchQuestions();
    
  }, [fetchQuestions])

  if(questionsLoading) {
    return <Loading />;
  }


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
                  
                </div>
              </Fieldset>
            </div>
            <div className="p-mb-2">
              <Fieldset legend="Scorecard">
                <TargetGrid questions={questionsRegistry} target={selectedTarget}/>
              </Fieldset>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(TargetScorecard);
