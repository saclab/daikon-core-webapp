import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { ProgressBar } from 'primereact/progressbar';
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
import UserManagerUserForm from "./UserManagerUserForm/UserManagerUserForm";
import UserManagerUserEditForm from "./UserManagerUserEditForm/UserManagerUserEditForm";

const UserManagerUsers = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);

  const [displayAddDialog, setDisplayAddDialog] = useState(false);
  const [displayEditDialog, setDisplayEditDialog] = useState(false);

  const {
    fetchUsersList,
    displayLoading,
    Users,
    addUser,
    loadingAccount,
    updateUser,
    fetchAccount,
    selectedAccount,
    fetchOrgs,
    Orgs,
    OrgNames,
    LoadingOrgs,
    fetchRoles,
    Roles,
    RoleNames,
    loadingRoles,
  } = rootStore.adminStore;

  /* Hide if not admin */
  const currentUser = rootStore.userStore.user;
  useEffect(() => {
    if (!currentUser.roles.includes("admin")) {
      history.push("/notfound");
    }

    if (Users.length === 0) {
      fetchUsersList();
      fetchOrgs();
      fetchRoles();
    }
  }, [currentUser, Users, fetchUsersList, fetchOrgs, fetchRoles]);

  /** Loading Overlay */
  if (displayLoading || loadingRoles || LoadingOrgs) {
    return <Loading />;
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="icon icon-common icon-edit-user"
          className="p-button-sm p-mr-2"
          onClick={() => {
            fetchAccount(rowData.email);
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
        label="Add a new user"
        className="p-button-text"
        style={{ height: "30px", marginRight: "5px" }}
        onClick={() => setDisplayAddDialog(true)}
      />

      <div className="card">
        <br />
        <DataTable
          value={Users}
          header="Authorized Users"
          className="p-datatable-sm"
        >
          <Column field="displayName" header="Full Name" sortable />
          <Column field="email" header="Email" />
          <Column field="email" header="Organization" />
          <Column header="Status" />
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
            <i className="icon icon-common icon-plus-circle" /> Authorize a New
            User
          </h3>
          <Message
            severity="info"
            text="Before proceeding please make sure that the user is already added in the AD and is allowed to use this app."
          />
          <hr />
          <br />
          <UserManagerUserForm
            org={Orgs}
            roles={Roles}
            addAccount={addUser}
            loadingAddAccount={loadingAccount}
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
            <i className="icon icon-common icon-plus-circle" /> Edit User
          </h3>

          <hr />
          <br />
          {loadingAccount ? (
            <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
          ) : (
            <UserManagerUserEditForm
              org={Orgs}
              roles={Roles}
              editAccount={updateUser}
              loadingAddAccount={loadingAccount}
              user={selectedAccount}
              closeSideBar={() => setDisplayEditDialog(false)}
            />
          )}
        </div>
      </Sidebar>
    </div>
  );
};

export default observer(UserManagerUsers);
