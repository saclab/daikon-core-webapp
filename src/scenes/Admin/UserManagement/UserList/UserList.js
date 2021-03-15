import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Badge } from "primereact/badge";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { Column } from "primereact/column";
import { Message } from "primereact/message";
import { BreadCrumb } from "primereact/breadcrumb";
import Loading from "../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../app/stores/rootStore";
const UserList = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { fetchUsersList, displayLoading, Users } = rootStore.adminStore;

  const items = [{ label: "Administrator" }, { label: "User Management" }];
  const home = {
    icon: "pi pi-home",
  };

  let emptyUser = {
    id: null,
    displayName: "",
    email: null,
    roles: [],
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
}

  const saveUser = () => {
    //setSubmitted(false);
    setUserDialog(false);
}

  const userDialogFooter = (
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideUserDialog} />
        <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveUser} />
    </React.Fragment>
);

  const userTypeBodyTemplate = (rowData) => {
    const dispRoles = rowData.roles.map((role, index) => (
      <Badge key={index} value={role} />
    ));
    return <React.Fragment>{dispRoles}</React.Fragment>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-sm p-button-rounded p-button-success p-mr-2"
          onClick={() => editUser(rowData)}
        />
      </React.Fragment>
    );
  };

  return (
    <div>
      <BreadCrumb model={items} home={home} />
      <h2>User List</h2>
      <Message
        severity="warn"
        text="Editing an user will affect their ability to login."
      ></Message>
      <div className="card">
        <DataTable
          value={Users}
          header="Authorized Users"
          className="p-datatable-sm"
        >
          <Column field="displayName" header="Full Name" sortable />
          <Column field="email" header="Email" />
          <Column field="email" header="Organization" />
          <Column header="User Type" body={userTypeBodyTemplate} />
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>

      <Dialog
        visible={userDialog}
        style={{ width: "450px" }}
        header={"Edit user : " + user.displayName}
        modal
        className="p-fluid"
        footer={userDialogFooter} 
        onHide={hideUserDialog}
      ></Dialog>
    </div>
  );
};

export default observer(UserList);
