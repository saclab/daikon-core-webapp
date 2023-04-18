import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Message } from "primereact/message";
import { ProgressBar } from "primereact/progressbar";
import { Sidebar } from "primereact/sidebar";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import Loading from "../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import UserManagerOrgEditForm from "./UserManagerOrgEditForm/UserManagerOrgEditForm";
import UserManagerOrgForm from "./UserManagerOrgForm/UserManagerOrgForm";

const UserManagerOrgs = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const navigate = useNavigate();

  const [displayAddDialog, setDisplayAddDialog] = useState(false);
  const [displayEditDialog, setDisplayEditDialog] = useState(false);

  const [selectedOrg, setSelectedOrg] = useState(null);

  const { fetchOrgs, Orgs, LoadingOrgs, addOrg, orgsRegistry, updateOrg } =
    rootStore.adminStore;

  /* Hide if not admin */
  const currentUser = rootStore.userStore.user;
  useEffect(() => {
    if (!currentUser.roles.includes("admin")) {
      navigate("/notfound");
    }

    if (Orgs.length === 0) {
      fetchOrgs();
    }
  }, [fetchOrgs, Orgs, currentUser.roles, navigate]);

  /** Loading Overlay */
  if (!displayEditDialog && LoadingOrgs) {
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
      label: "Orgs",
      command: () => {
        navigate(`/admin/user-manager/orgs`);
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
            setSelectedOrg(orgsRegistry.get(rowData.id));
            setDisplayEditDialog(true);
          }}
        />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className="flex flex-column gap-2 w-full">
        <div className="flex w-full pb-2">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="ri-user-settings-fill"
            heading={"Org Manager"}
          />
        </div>
        <div className="flex w-full">
          <Button
            type="button"
            icon="icon icon-common icon-plus-circle"
            label="Add a new organization"
            className="p-button-text"
            style={{ height: "30px", marginRight: "5px" }}
            onClick={() => setDisplayAddDialog(true)}
          />
        </div>
        <div className="flex w-full">
          <DataTable
            value={Orgs}
            header="Organizations"
            className="p-datatable-sm w-full"
          >
            <Column field="alias" header="Alias" sortable />
            <Column field="name" header="Org Name" sortable />
            <Column field="address" header="Address" />
            <Column body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
      </div>

      <div>
        {/* <Message
        severity="warn"
        text="Editing an user will affect their ability to login."
      ></Message> */}

        <Sidebar
          visible={displayAddDialog}
          position="right"
          style={{ width: "30em", overflowX: "auto" }}
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
          style={{ width: "30em", overflowX: "auto" }}
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
    </React.Fragment>
  );
};

export default observer(UserManagerOrgs);
