import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useContext, useState } from "react";
import EmbeddedHelp from "../../../../../app/common/EmbeddedHelp/EmbeddedHelp";
import StageTag from "../../../../../app/common/StageTag/StageTag";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

const ProjectSettingsStageOverride = ({ project }) => {
  const stages = ["HA", "H2L", "LO", "SP", "IND", "P1"];
  const [stageOverride, setStageOverride] = useState("");
  const [confirm, setConfirm] = useState("");

  const rootStore = useContext(RootStoreContext);
  const { overrideStage, overridingStage } = rootStore.projectStore;

  const stageItemTemplate = (option) => {
    return <StageTag stage={option} />;
  };

  let dataOnSubmitValidate = () => {
    overrideStage({
      projectId: project.id,
      stageString: stageOverride,
    }).then((res) => {
      if (res !== null) {
      }
    });
  };

  return (
    <div>
      <div
        style={{
          borderRadius: "5px",
          borderColor: "#B7950B",
          borderStyle: "solid",
          padding: "20px",
          borderWidth: "1px",
        }}
      >
        <EmbeddedHelp>
          Overriding stages might have undesirable effect. Proceed with caution.
        </EmbeddedHelp>
        <div className="flex gap-2 pt-2 align-content-center align-items-center">
          Current Stage :<StageTag stage={project.currentStage} />
          <Dropdown
            value={stageOverride}
            options={stages.filter((s) => s !== project.currentStage)}
            onChange={(e) => setStageOverride(e.value)}
            itemTemplate={stageItemTemplate}
            placeholder="Select a Stage"
          />
        </div>
        <div className="flex pt-2 align-content-center align-items-center">
          Type 'OVERRIDE' to Confirm
          <InputText
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-max"
          />
        </div>
        <div className="flex pt-2 align-content-right align-items-right">
          <Button
            label="Override Stage"
            className="p-button-warning"
            disabled={confirm !== "OVERRIDE" || stageOverride === ""}
            loading={overridingStage}
            onClick={() => dataOnSubmitValidate()}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(ProjectSettingsStageOverride);
