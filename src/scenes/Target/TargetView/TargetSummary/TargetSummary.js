import React from 'react'
import cssClass from './TargetSummary.module.css'
import { useContext } from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';
import { observer } from "mobx-react-lite";
import { RootStoreContext } from '../../../../app/stores/rootStore';
import KeyValList from '../../../../app/common/KeyValList/KeyValList';

const TargetSummary = () => {


  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { target, fetchTargetHistory, historyDisplayLoading, targetHistory, editTargetSummary, cancelEditTargetSummary } = rootStore.targetStore;
  const { user } = rootStore.userStore;


  return (
    <div className={[cssClass.QuadMain].join(" ")}>
      <div className={[cssClass.QuadRow].join(" ")}>
        <div className={[cssClass.QuadColumn].join(" ")} style={{ backgroundColor: "#C0C0C0" }}>
          <h2>Background</h2>
          <ScrollPanel style={{ width: '100%', height: '200px' }}>
            <KeyValList
              data={target}
              filter={[
                "background",
              ]}
              hideKey={true}
              fetchHistory={() => fetchTargetHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={targetHistory}
              editFunc={user.roles.includes("admin") ? (() => editTargetSummary()) : undefined}
              cancelEdit={user.roles.includes("admin") ? (() => cancelEditTargetSummary()) : undefined}
            />
          </ScrollPanel>
        </div>
        <div className={[cssClass.QuadColumn].join(" ")} style={{ backgroundColor: "#D3D3D3" }}>
          <h2>Enablement</h2>
          <ScrollPanel style={{ width: '100%', height: '200px' }}>
            <KeyValList
              data={target}
              filter={[
                "enablement",
              ]}
              hideKey={true}
              fetchHistory={() => fetchTargetHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={targetHistory}
              editFunc={user.roles.includes("admin") ? (() => editTargetSummary()) : undefined}
              cancelEdit={user.roles.includes("admin") ? (() => cancelEditTargetSummary()) : undefined}
            />
          </ScrollPanel>
        </div>
      </div>
      <div className={[cssClass.QuadRow].join(" ")}>
        <div className={[cssClass.QuadColumn].join(" ")} style={{ backgroundColor: "#DCDCDC" }}>
          <h2>Strategy</h2>
          <ScrollPanel style={{ width: '100%', height: '200px' }}>
            <KeyValList
              data={target}
              filter={[
                "strategy",
              ]}
              hideKey={true}
              fetchHistory={() => fetchTargetHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={targetHistory}
              editFunc={user.roles.includes("admin") ? (() => editTargetSummary()) : undefined}
              cancelEdit={user.roles.includes("admin") ? (() => cancelEditTargetSummary()) : undefined}
            />
          </ScrollPanel>
        </div>
        <div className={[cssClass.QuadColumn].join(" ")} style={{ backgroundColor: "#F5F5F5" }}>
          <h2>Challenges</h2>
          <ScrollPanel style={{ width: '100%', height: '200px' }}>
            <KeyValList
              data={target}
              filter={[
                "challenges",
              ]}
              hideKey={true}
              fetchHistory={() => fetchTargetHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={targetHistory}
              editFunc={user.roles.includes("admin") ? (() => editTargetSummary()) : undefined}
              cancelEdit={user.roles.includes("admin") ? (() => cancelEditTargetSummary()) : undefined}
            />
          </ScrollPanel>
        </div>
      </div>
    </div>
  )
}

export default observer(TargetSummary)