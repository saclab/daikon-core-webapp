import _ from "lodash";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { ContextMenu } from "primereact/contextmenu";
import { Dialog } from "primereact/dialog";
import { SelectButton } from "primereact/selectbutton";
import { Tooltip } from "primereact/tooltip";
import React, { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { RootStoreContext } from "../../stores/rootStore";
import EmbededHelp from "../EmbededHelp/EmbededHelp";

const OrgChart = ({ projectId, activeOrgs, primary, allowEdit }) => {
  const rootStore = useContext(RootStoreContext);
  const { appVars } = rootStore.generalStore;
  const { editSupportingOrgs, editingSupportingOrg } = rootStore.projectStore;
  const cm = useRef(null);
  const [displayEditContainer, setDisplayEditContainer] = useState(false);

  let flattenActiveOrgs = [
    ...activeOrgs.map((activeOrg) => activeOrg.appOrg.alias),
  ];

  let formattedActiveOrgs = [
    ...activeOrgs.map((activeOrg) => activeOrg.appOrg),
  ];
  const [edittedOrgs, setEdittedOrgs] = useState(formattedActiveOrgs);

  const contextMenuItems = [
    {
      label: "Edit Membership",
      icon: "pi pi-tablet",
      command: () => setDisplayEditContainer(true),
    },
  ];

  let editOrgs = () => {
    let editedOrgsIds = [...edittedOrgs.map((e) => e.id)].sort();
    let initialOrgIds = [...formattedActiveOrgs.map((e) => e.id)].sort();
    if (_.isEqual(editedOrgsIds, initialOrgIds)) {
      toast.warn("No changes to save");
      return;
    }
    let dto = {
      projectId: projectId,
      modifiedSupportingOrgs: editedOrgsIds,
    };
    editSupportingOrgs(dto);
  };

  let headerEditDialog = () => (
    <React.Fragment>
      <i className="icon icon-common icon-database"></i> &nbsp; Editing
      Participating Organization
    </React.Fragment>
  );

  let footerEditDialog = () => (
    <div>
      <h3>Save changes to database?</h3>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => {
          setEdittedOrgs(formattedActiveOrgs);
          setDisplayEditContainer(false);
        }}
        className="p-button-text"
        autoFocus
      />
      <Button
        label="Save"
        icon="icon icon-common icon-database-submit"
        onClick={() => {
          editOrgs();
          setDisplayEditContainer(false);
        }}
        loading={editingSupportingOrg}
      />
    </div>
  );

  let generateApporgsDivs = appVars.appOrgs.map((appOrg) => {
    if (appOrg.alias === primary) {
      return (
        <div
          key={appOrg.alias}
          className="flex align-items-center justify-content-center w-7rem h-2rem bg-green-500 text-white border-round m-2 p-1 gap-2 tooltipdiv"
          data-pr-tooltip={appOrg.name}
        >
          <i className="icon icon-common icon-star" />
          <p>{appOrg.alias}</p>
        </div>
      );
    }
    if (flattenActiveOrgs.includes(appOrg.alias)) {
      return (
        <div
          key={appOrg.alias}
          className="flex align-items-center justify-content-center w-7rem h-2rem bg-green-500 text-white border-round m-2 p-1 tooltipdiv"
          data-pr-tooltip={appOrg.name}
        >
          {appOrg.alias}
        </div>
      );
    }
    return (
      <div
        key={appOrg.alias}
        className="tooltipdiv flex align-items-center justify-content-center w-7rem h-2rem surface-500 text-white border-round m-2 p-1"
        data-pr-tooltip={appOrg.name}
      >
        {appOrg.alias}
      </div>
    );
  });

  return (
    <div>
      <div className="card">
        <ContextMenu model={contextMenuItems} ref={cm}></ContextMenu>

        <div
          className="flex flex-row flex-wrap card-container"
          onContextMenu={(e) => allowEdit && cm.current.show(e)}
        >
          <Tooltip target=".tooltipdiv"></Tooltip>
          {generateApporgsDivs}
        </div>
      </div>

      <Dialog
        header={headerEditDialog}
        visible={displayEditContainer}
        closable={false}
        draggable={true}
        style={{ width: "50vw" }}
        onHide={() => setDisplayEditContainer(false)}
        footer={footerEditDialog}
      >
        <EmbededHelp>
          Project's primary organization ({primary}) can add or remove any
          memberships. Other organizations can add or remove themselves from the
          project.
        </EmbededHelp>
        <br />
        <div className="flex flex-wrap card-container">
          <SelectButton
            value={edittedOrgs}
            options={appVars.appOrgs}
            onChange={(e) => setEdittedOrgs(e.value)}
            optionLabel="alias"
            multiple
            disabled={editingSupportingOrg}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default observer(OrgChart);
