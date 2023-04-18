import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputSwitch } from "primereact/inputswitch";
import { Message } from "primereact/message";
import { ProgressBar } from "primereact/progressbar";
import { Sidebar } from "primereact/sidebar";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import Loading from "../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import UserManagerUserEditForm from "./UserManagerUserEditForm/UserManagerUserEditForm";
import UserManagerUserForm from "./UserManagerUserForm/UserManagerUserForm";

const UserManagerUsers = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const navigate = useNavigate();

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
      navigate("/notfound");
    }

    if (Users.length === 0) {
      fetchUsersList();
      fetchOrgs();
      fetchRoles();
    }
  }, [currentUser, Users, fetchUsersList, fetchOrgs, fetchRoles, navigate]);

  /** Loading Overlay */
  if (displayLoading || loadingRoles || LoadingOrgs) {
    return <Loading />;
  }

  const breadCrumbItems = [
    {
      label: "User Management",
      command: () => {
        navigate("/admin/user-manager/");
      },
    },
    {
      label: "Users",
      command: () => {
        navigate(`/admin/user-manager/users/`);
      },
    },
  ];

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
    <React.Fragment>
      {/* First div for general information and dates */}

      <div className="flex flex-column gap-2 w-full">
        <div className="flex w-full pb-2">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="ri-user-settings-fill"
            heading={"User Manager"}
          />
        </div>
        <div className="flex w-full">
          <Button
            type="button"
            icon="icon icon-common icon-plus-circle"
            label="Add a new user"
            className="p-button-text"
            style={{ height: "30px", marginRight: "5px" }}
            onClick={() => setDisplayAddDialog(true)}
          />
        </div>
        <div className="flex w-full">
          <DataTable
            value={Users}
            header="Authorized Users"
            className="p-datatable-sm w-full"
            sortMode="single"
            sortField="displayName"
            sortOrder={1}
            filterDisplay="row"
            // rowGroupMode="rowspan"
            // groupRowsBy="org.alias"
          >
            <Column
              field="org"
              header="Organization"
              body={orgBodyTemplate}
              sortable
            />
            <Column
              field="displayName"
              header="Full Name"
              sortable
              filter
              filterMatchMode="contains"
              filterPlaceholder="Search"
            />
            <Column
              field="email"
              header="Email"
              filter
              filterMatchMode="contains"
              filterPlaceholder="Search"
            />

            <Column
              field="lock"
              header="Account Locked?"
              body={orgLockTemplate}
            />
            <Column body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
      </div>

      <Sidebar
        visible={displayAddDialog}
        position="right"
        // style={{ width: "50%", overflowX: "auto" }}
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
    </React.Fragment>
  );
};

export default observer(UserManagerUsers);
