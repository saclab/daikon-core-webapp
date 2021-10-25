import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Badge } from "primereact/badge";
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

const UserManagerUsers = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);

  /* Hide if not admin */
  const currentUser = rootStore.userStore.user;
  useEffect(() => {
    if (!currentUser.roles.includes("admin")) {
      history.push("/notfound");
    }
  });

  const { fetchUsersList, displayLoading, Users, updateUser } =
    rootStore.adminStore;

  const items = [{ label: "Administrator" }, { label: "User Management" }];
  const home = {
    icon: "pi pi-home",
  };

  let emptyUser = {
    id: null,
    displayName: "",
    email: null,
    roles: [],
    org: null,
  };
  const [user, setUser] = useState(emptyUser);
  const [userDialog, setUserDialog] = useState(false);

  useEffect(() => {
    //console.log("UserList: -> Fetching userlist via store");
    fetchUsersList();
  }, [fetchUsersList]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Loading Overlay */
  if (displayLoading) {
    return <Loading />;
  }

  const editUser = (user) => {
    setUser({ ...user });
    setUserDialog(true);
  };

  const hideUserDialog = () => {
    //setSubmitted(false);
    setUserDialog(false);
  };

  const saveUser = () => {
    //setSubmitted(false);
    updateUser(user);
    setUserDialog(false);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="icon icon-common icon-edit-user"
          className="p-button-sm p-mr-2"
          onClick={() => editUser(rowData)}
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
        onClick={() => {}}
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
    </div>
  );
};

export default UserManagerUsers;
