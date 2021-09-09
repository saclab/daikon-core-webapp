import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import history from "../../../../history";
import { RootStoreContext } from "../../../stores/rootStore";

const TitleBarSidePanel = ({ toggle, user }) => {
  const rootStore = useContext(RootStoreContext);
  let { setAdminMode } = rootStore.appSettingsStore;

  const adminTools = (
    <div className="p-mb-2">
      <h4>Admin Tools</h4>
      <Divider type="dashed" />
      <div className="card">
        <Button
          type="button"
          label="Authorize"
          icon="pi pi-plus"
          className="p-mr-2 p-mb-2 p-button-text p-button-plain p-button-sm"
          onClick={() => {
            toggle();
            history.push("/admin/user-management/new");
          }}
        />
        <Button
          type="button"
          label="Manage Users"
          icon="pi pi-user-edit"
          className="p-mb-2 p-button-text p-button-plain p-button-sm"
          onClick={() => {
            toggle();
            history.push("/admin/user-management");
          }}
        />
        <br />
      </div>
      <Divider type="dashed" />
      <div className="card">
        <Button
          type="button"
          label="Admin Panel"
          icon="pi arrow-right"
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
      {user.roles.includes("admin") ? adminTools : ""}
      <div className="p-mb-2">
        <h4>Project Management Tools</h4>
        <Divider type="dashed" />
      </div>
      <div>
        <h4>Chemist Tools</h4>
        <Divider type="dashed" />
      </div>
    </div>
  );
};

export default observer(TitleBarSidePanel);
