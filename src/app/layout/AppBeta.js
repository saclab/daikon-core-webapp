import React, { useEffect, useContext } from 'react'
import ReactECharts from 'echarts-for-react';
import { observer } from "mobx-react-lite";
import { RootStoreContext } from '../stores/rootStore';
import Loading from './Loading/Loading';


const AppBeta = () => {

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingTargetDash, targetDash, loadTargetDash } = rootStore.dataViewStore;

  useEffect(() => {
    console.log("AppBeta: fetchTargetList()");
    if (targetDash === null) loadTargetDash();
  }, [targetDash, loadTargetDash]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Loading Overlay */
  if (loadingTargetDash) {
    return <Loading />;
  }

  console.log(targetDash);





  



  return (
    <React.Fragment>
      {/* <ReactECharts
        option={option}
        onEvents={onEvents}
        style={{ height: '50rem', width: '50rem' }}
      /> */}
      Test
    </React.Fragment>

  )
}

export default observer(AppBeta)