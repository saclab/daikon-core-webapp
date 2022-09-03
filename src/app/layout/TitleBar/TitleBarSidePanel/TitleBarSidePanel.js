import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { RootStoreContext } from "../../../stores/rootStore";
import cssClass from "../TitleBar.module.css";
import { appVersion } from "../../../../appVersion";


const TitleBarSidePanel = ({ toggle, user }) => {
  const navigate = useNavigate();

  const rootStore = useContext(RootStoreContext);
  let { setAppView } = rootStore.appSettingsStore;

  const adminTools = (
    <div className="flex flex-column">

      <div className="flex">
        <div className="flex"> <h4>+ Admin Tools</h4></div>
        <div className="flex"> <Divider type="dashed" /></div>
      </div>

      <div className="flex">
        <div className="card">
          <Button
            type="button"
            label="Admin Dashboard"
            icon="icon icon-common icon-asterisk"
            className="p-mr-2 p-mb-2 p-button-text p-button-plain p-button-sm"
            onClick={() => {
              toggle();
              setAppView("AdminDashboard");
              navigate("/admin");
            }}
          />
        </div>
      </div>

    </div>
  );

  const pmTools = (
    <div className="flex flex-column">

      <div className="flex">
        <div className="flex"> <h4>+ Project Management</h4></div>
        <div className="flex"> <Divider type="dashed" /></div>
      </div>

      <div className="flex">
        <div className="card">
          <Button
            type="button"
            label="Project Management Dashboard"
            icon="icon icon-common icon-asterisk"
            className="p-mr-2 p-mb-2 p-button-text p-button-plain p-button-sm"
            onClick={() => {
              toggle();
              setAppView("ProjectManagement");
              navigate("/pm");
            }}
          />
        </div>
      </div>

    </div>
  );

  return (
    <div className="flex flex-column">

      <div className="flex align-items-center justify-content-center">
        <div style={{ lineHeight: "0.1", padding: "20px" }}>
          <h2 className={cssClass.Colorized}>D A I K O N</h2>
          <p style={{ textAlign: "center" }}>{appVersion.stream} {appVersion.release} {appVersion.channel}</p>
        </div>
      </div>

      <div className="flex align-items-center justify-content-center">
        {/* <div className="card p-fluid">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText placeholder="Search" />
          </span>
        </div> */}
      </div>

      <div className="flex">
        {user.roles.includes("admin") ? adminTools : ""}
      </div>

      <div className="flex">
        {user.roles.includes("projectManager") ? pmTools : ""}
      </div>

    </div>
  );
};

export default observer(TitleBarSidePanel);
