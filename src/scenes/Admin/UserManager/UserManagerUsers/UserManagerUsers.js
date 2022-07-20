import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { ProgressBar } from "primereact/progressbar";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Column } from "primereact/column";
import { Message } from "primereact/message";

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
    LoadingOrgs,
    fetchRoles,
    Roles,
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

  let orgBodyTemplate = (rowData) => {
    return <p>{rowData?.org?.name} </p>;
  };

  let orgLockTemplate = (rowData) => {
    return <InputSwitch checked={rowData.lock} readOnly />;
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
          sortMode="single"
          sortField="name"
          sortOrder={1}
        >
          <Column field="displayName" header="Full Name" sortable />
          <Column field="email" header="Email" />
          <Column
            field="org"
            header="Organization"
            body={orgBodyTemplate}
            sortable
          />
          <Column
            field="lock"
            header="Account Locked?"
            body={orgLockTemplate}
          />
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
      <Sidebar
        visible={displayAddDialog}
        position="right"
        // style={{ width: "50%", overflowX: "auto" }}
        blockScroll={true}
        onHide={() => setDisplayAddDialog(false)}
        className="p-sidebar-md"
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
        className="p-sidebar-md"
      >
        <div className="card">
          <h3>
            <i className="icon icon-common icon-plus-circle" /> Edit User
          </h3>

          <hr />
          <br />
          {loadingAccount ? (
            <ProgressBar
              mode="indeterminate"
              style={{ height: "6px" }}
            ></ProgressBar>
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
