import React from "react";
import cssClass from "./TargetSummary.module.css";
import { useContext } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import KeyValList from "../../../../app/common/KeyValList/KeyValList";

const TargetSummary = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    target,
    fetchTargetHistory,
    historyDisplayLoading,
    targetHistory,
    editTargetSummary,
    cancelEditTargetSummary,
  } = rootStore.targetStore;
  const { user } = rootStore.userStore;

  return (
    <div className={[cssClass.QuadMain].join(" ")}>
      <div className={[cssClass.QuadRow].join(" ")}>
        <div
          className={[cssClass.QuadColumn].join(" ")}
          style={{ backgroundColor: "#D4F1F4", borderRight: "3px solid #FFF" }}
        >
          <center>
            <h2>Background</h2>
          </center>
          <ScrollPanel style={{ width: "100%", height: "200px" }}>
            <KeyValList
              data={target}
              filter={["background"]}
              hideKey={true}
              fetchHistory={() => fetchTargetHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={targetHistory}
              editFunc={
                user.roles.includes("admin")
                  ? () => editTargetSummary()
                  : undefined
              }
              cancelEdit={
                user.roles.includes("admin")
                  ? () => cancelEditTargetSummary()
                  : undefined
              }
            />
          </ScrollPanel>
        </div>
        <div
          className={[cssClass.QuadColumn].join(" ")}
          style={{ backgroundColor: "#DDFFE7", borderLeft: "3px solid #FFF" }}
        >
          <center>
            <h2>Enablement</h2>
          </center>
          <ScrollPanel style={{ width: "100%", height: "200px" }}>
            <KeyValList
              data={target}
              filter={["enablement"]}
              hideKey={true}
              fetchHistory={() => fetchTargetHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={targetHistory}
              editFunc={
                user.roles.includes("admin")
                  ? () => editTargetSummary()
                  : undefined
              }
              cancelEdit={
                user.roles.includes("admin")
                  ? () => cancelEditTargetSummary()
                  : undefined
              }
            />
          </ScrollPanel>
        </div>
      </div>
      <div className={[cssClass.QuadRow].join(" ")}>
        <div
          className={[cssClass.QuadColumn].join(" ")}
          style={{
            backgroundColor: "#EAE6F0",
            borderTop: "6px solid #FFF",
            borderRight: "3px solid #FFF",
          }}
        >
          <center>
            <h2>Strategy</h2>
          </center>
          <ScrollPanel style={{ width: "100%", height: "200px" }}>
            <KeyValList
              data={target}
              filter={["strategy"]}
              hideKey={true}
              fetchHistory={() => fetchTargetHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={targetHistory}
              editFunc={
                user.roles.includes("admin")
                  ? () => editTargetSummary()
                  : undefined
              }
              cancelEdit={
                user.roles.includes("admin")
                  ? () => cancelEditTargetSummary()
                  : undefined
              }
            />
          </ScrollPanel>
        </div>
        <div
          className={[cssClass.QuadColumn].join(" ")}
          style={{
            backgroundColor: "#FBE5C8",
            borderTop: "6px solid #FFF",
            borderLeft: "3px solid #FFF",
          }}
        >
          <center>
            <h2>Challenges</h2>
          </center>
          <ScrollPanel style={{ width: "100%", height: "200px" }}>
            <KeyValList
              data={target}
              filter={["challenges"]}
              hideKey={true}
              fetchHistory={() => fetchTargetHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={targetHistory}
              editFunc={
                user.roles.includes("admin")
                  ? () => editTargetSummary()
                  : undefined
              }
              cancelEdit={
                user.roles.includes("admin")
                  ? () => cancelEditTargetSummary()
                  : undefined
              }
            />
          </ScrollPanel>
        </div>
      </div>
    </div>
  );
};

export default observer(TargetSummary);
