import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { ProgressBar } from "primereact/progressbar";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { Column } from "primereact/column";
import { Message } from "primereact/message";
import { BreadCrumb } from "primereact/breadcrumb";

import Loading from "../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import history from "../../../../history";
import UserManagerOrgForm from "./UserManagerOrgForm/UserManagerOrgForm";
import UserManagerOrgEditForm from "./UserManagerOrgEditForm/UserManagerOrgEditForm";

const UserManagerOrgs = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);

  const [displayAddDialog, setDisplayAddDialog] = useState(false);
  const [displayEditDialog, setDisplayEditDialog] = useState(false);

  const [selectedOrg, setSelectedOrg] = useState(null);

  const {
    fetchOrgs,
    Orgs,
    OrgNames,
    LoadingOrgs,
    addOrg,
    orgsRegistry,
    updateOrg,
  } = rootStore.adminStore;

  /* Hide if not admin */
  const currentUser = rootStore.userStore.user;
  useEffect(() => {
    if (!currentUser.roles.includes("admin")) {
      history.push("/notfound");
    }

    if (Orgs.length === 0) {
      fetchOrgs();
    }
  }, [fetchOrgs, Orgs]);

  /** Loading Overlay */
  if (!displayEditDialog && LoadingOrgs) {
    return <Loading />;
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="icon icon-common icon-edit-user"
          className="p-button-sm p-mr-2"
          onClick={() => {
            setSelectedOrg(orgsRegistry.get(rowData.id));
            setDisplayEditDialog(true);
          }}
        />
      </React.Fragment>
    );
  };

  return (
    <div>
      {/* <Message
        severity="warn"
        text="Editing an user will affect their ability to login."
      ></Message> */}
      <Button
        type="button"
        icon="icon icon-common icon-plus-circle"
        label="Add a new organization"
        className="p-button-text"
        style={{ height: "30px", marginRight: "5px" }}
        onClick={() => setDisplayAddDialog(true)}
      />

      <div className="card">
        <br />
        <DataTable
          value={Orgs}
          header="Organizations"
          className="p-datatable-sm"
        >
          <Column field="alias" header="Alias" sortable />
          <Column field="name" header="Org Name" sortable />
          <Column field="address" header="Address" />
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
      <Sidebar
        visible={displayAddDialog}
        position="right"
        // style={{ width: "50%", overflowX: "auto" }}
        blockScroll={true}
        onHide={() => setDisplayAddDialog(false)}
        className="p-sidebar-sm"
      >
        <div className="card">
          <h3>
            <i className="icon icon-common icon-plus-circle" /> Add a new
            organization
          </h3>

          <hr />
          <br />
          <UserManagerOrgForm
            addOrg={addOrg}
            LoadingOrgs={LoadingOrgs}
            closeSideBar={() => setDisplayAddDialog(false)}
          />
        </div>
      </Sidebar>

      <Sidebar
        visible={displayEditDialog}
        position="right"
        // style={{ width: "50%", overflowX: "auto" }}
        blockScroll={true}
        onHide={() => setDisplayEditDialog(false)}
        className="p-sidebar-sm"
      >
        <div className="card">
          <h3>
            <i className="icon icon-common icon-plus-circle" /> Edit Org
          </h3>
          <Message
            severity="warn"
            text="Changing an org's name and alias might lead to undesirable results."
          />
          <hr />
          <br />
          {LoadingOrgs ? (
            <ProgressBar
              mode="indeterminate"
              style={{ height: "6px" }}
            ></ProgressBar>
          ) : (
            <UserManagerOrgEditForm
              org={selectedOrg}
              editOrg={updateOrg}
              LoadingOrgs={LoadingOrgs}
              closeSideBar={() => setDisplayEditDialog(false)}
            />
          )}
        </div>
      </Sidebar>
    </div>
  );
};

export default observer(UserManagerOrgs);
