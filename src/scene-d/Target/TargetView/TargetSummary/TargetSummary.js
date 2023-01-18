import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { ScrollPanel } from "primereact/scrollpanel";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import KeyValList from "../../../../app/common/KeyValList/KeyValList";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { appColors } from "../../../../colors";
import cssClass from "./TargetSummary.module.css";

const TargetSummary = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    target,
    selectedTarget,
    fetchTargetHistory,
    historyDisplayLoading,
    targetHistory,
    editTargetSummary,
    cancelEditTargetSummary,
  } = rootStore.targetStore;
  const { user } = rootStore.userStore;

  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "Targets",
      command: () => {
        navigate("/d/target/");
      },
    },
    {
      label: selectedTarget.name,
      command: () => {
        navigate(`/d/target/${selectedTarget.id}`);
      },
    },
    { label: "Summary" },
  ];

  return (
    <div className="flex flex-column w-full">
      <div className="flex w-full pb-2">
        <BreadCrumb model={breadCrumbItems} />
      </div>

      <div className="flex w-full">
        <SectionHeading
          icon="icon icon-common icon-target"
          heading={selectedTarget.name}
          targetName={selectedTarget.name}
          displayHorizon={true}
          color={appColors.sectionHeadingBg.target}
        />
      </div>
      <div className="flex w-full">
        <div className={[cssClass.QuadMain].join(" ")}>
          <div className={[cssClass.QuadRow].join(" ")}>
            <div
              className={[cssClass.QuadColumn].join(" ")}
              style={{
                backgroundColor: "#D4F1F4",
                borderRight: "3px solid #FFF",
              }}
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
                    user.roles.includes("user")
                      ? () => editTargetSummary()
                      : undefined
                  }
                  cancelEdit={
                    user.roles.includes("user")
                      ? () => cancelEditTargetSummary()
                      : undefined
                  }
                />
              </ScrollPanel>
            </div>
            <div
              className={[cssClass.QuadColumn].join(" ")}
              style={{
                backgroundColor: "#DDFFE7",
                borderLeft: "3px solid #FFF",
              }}
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
      </div>
    </div>
  );
};

export default observer(TargetSummary);
