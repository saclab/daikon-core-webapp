import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Divider } from "primereact/divider";
import history from "../../../../history";
import { RootStoreContext } from "../../../stores/rootStore";
import cssClass from "../TitleBar.module.css";
import { appVersion } from "../../../../config";

const TitleBarSidePanel = ({ toggle, user }) => {
  const rootStore = useContext(RootStoreContext);
  let { setAdminMode } = rootStore.appSettingsStore;

  const adminTools = (
    <div className="p-mb-2">
      <h4>+ Admin Tools</h4>
      <Divider type="dashed" />
      <div className="card">
        <Button
          type="button"
          label="Admin Panel"
          icon="icon icon-common icon-asterisk"
          className="p-mr-2 p-mb-2 p-button-text p-button-plain p-button-sm"
          onClick={() => {
            toggle();
            setAdminMode(true);
            history.push("/admin");
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="p-d-flex p-flex-column">
      <div style={{ lineHeight: "0.1", padding: "20px" }}>
        <h2 className={cssClass.Colorized}>D A I K O N</h2>
        <p style={{ textAlign: "center" }}>Version {appVersion.release} {appVersion.channel}</p>
      </div>
      <div className="card p-fluid">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search" />
        </span>
      </div>
      {user.roles.includes("admin") ? adminTools : ""}
      <div className="p-mb-2">
        <h4>+ Project Management Tools</h4>



        <Divider type="dashed" />
      </div>
      <div>
        <h4>+ Chemist Tools</h4>
        <Divider type="dashed" />
      </div>
    </div>
  );
};

export default observer(TitleBarSidePanel);
