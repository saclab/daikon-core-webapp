import { ContextMenu } from "primereact/contextmenu";
import React, { useContext, useRef, useState } from "react";
import { RootStoreContext } from "../../stores/rootStore";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { SelectButton } from "primereact/selectbutton";

const OrgChart = ({ activeOrgs, primary }) => {
  console.log(activeOrgs);
  const rootStore = useContext(RootStoreContext);
  const { fetchingAppVars, appVars, fetchAppVars } = rootStore.generalStore;
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
    console.log(edittedOrgs);
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
      />
    </div>
  );

  let generateApporgsDivs = appVars.appOrgs.map((appOrg) => {
    if (appOrg.alias === primary) {
      return (
        <div class="flex align-items-center justify-content-center w-7rem h-2rem bg-green-500 text-white border-round m-2 p-1">
          <p tooltip="Enter your username">
            <i class="icon icon-common icon-star" /> {appOrg.alias}
          </p>
        </div>
      );
    }
    if (flattenActiveOrgs.includes(appOrg.alias)) {
      return (
        <div class="flex align-items-center justify-content-center w-7rem h-2rem bg-green-500 text-white border-round m-2 p-1">
          <p tooltip="Enter your username">{appOrg.alias}</p>
        </div>
      );
    }
    return (
      <div class="flex align-items-center justify-content-center w-7rem h-2rem surface-500 text-white border-round m-2 p-1">
        <p tooltip="Enter your username">{appOrg.alias}</p>
      </div>
    );
  });

  return (
    <div>
      <div class="card">
        <ContextMenu model={contextMenuItems} ref={cm}></ContextMenu>
        <div
          class="flex flex-row flex-wrap card-container"
          onContextMenu={(e) => cm.current.show(e)}
        >
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
        <div className="flex flex-wrap card-container">
          <SelectButton
            value={edittedOrgs}
            options={appVars.appOrgs}
            onChange={(e) => setEdittedOrgs(e.value)}
            optionLabel="alias"
            multiple
          />
        </div>
      </Dialog>
    </div>
  );
};

export default OrgChart;
