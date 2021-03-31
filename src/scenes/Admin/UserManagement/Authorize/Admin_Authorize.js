import React, { useContext, useState, useEffect } from "react";
import { Steps } from "primereact/steps";
import { BreadCrumb } from "primereact/breadcrumb";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import history from "../../../../history";
const Admin_Authorize = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { addUser } = rootStore.adminStore;

  const currentUser = rootStore.userStore.user;
  useEffect(() => {
    if (!currentUser.roles.includes("admin")) {
      history.push("/notfound");
    }
  });

  const [stage, setStage] = useState(1);

  let emptyUser = {
    displayName: "",
    email: "",
    roles: [],
  };
  const [user, setUser] = useState(emptyUser);

  let roleTypes = [
    { name: "Admin", value: "admin" },
    { name: "App User", value: "user" },
  ];

  const items = [
    { label: "Administrator" },
    { label: "User Management" },
    { label: "New" },
  ];
  const home = {
    icon: "pi pi-home",
  };

  const steps = [
    { label: "BMGF Active Directory" },
    { label: "Give APP Access" },
  ];

  const addNewUser = () => {
    addUser(user).catch((e) => {
      console.log(e);
    });
  };

  const step1 = (
    <Panel header="Add to BMGF Active Directory" style={{ maxWidth: "800px" }}>
      <p>
        The first step involves in adding the user to the BMGF's active
        directory. This is the first step of authentication for the user. Once
        allowed by the BMGF's active directory, the authorization is passed to
        the TPT app.
        <br />
        If you have already added the user to BMGF's active directory, click
        continue.
        <br />
        Else please contact BMGF's IT to add the user first.
        <br />
      </p>
      <div className="p-d-flex p-jc-end">
        <Button
          label="Acknowledge and continue"
          className="p-button-primary"
          onClick={() => {
            setStage(2);
          }}
        />
      </div>
    </Panel>
  );

  const step2 = (
    <Panel header="Give App Access" style={{ width: "800px" }}>
      <div className="p-field p-grid">
        <label
          htmlFor="fullname"
          className="p-col-fixed"
          style={{ width: "100px" }}
        >
          Full Name
        </label>
        <div className="p-col">
          <InputText
            id="fullname"
            type="text"
            style={{ width: "500px" }}
            value={user.displayName}
            onChange={(e) => {
              var usr = { ...user };
              usr.displayName = e.target.value;
              setUser(usr);
            }}
          />
        </div>
      </div>

      <div className="p-field p-grid">
        <label
          htmlFor="email"
          className="p-col-fixed"
          style={{ width: "100px" }}
        >
          Email
        </label>
        <div className="p-col">
          <InputText
            id="email"
            type="text"
            style={{ width: "500px" }}
            value={user.email}
            onChange={(e) => {
              var usr = { ...user };
              usr.email = e.target.value;
              setUser(usr);
            }}
          />
        </div>
      </div>

      <div className="p-formgroup-inline">
        <label
          htmlFor="roles"
          className="p-col-fixed"
          style={{ width: "100px" }}
        >
          Roles
        </label>
        <SelectButton
          optionLabel="name"
          value={user.roles}
          options={roleTypes}
          onChange={(e) => {
            var usr = { ...user };
            usr.roles = [...e.target.value];
            setUser(usr);
          }}
          multiple
        />
      </div>
      <div className="p-d-flex p-jc-end">
        <Button
          label="Authorize"
          className="p-button-primary"
          icon="pi pi-check"
          iconPos="right"
          onClick={() => {
            addNewUser();
          }}
        />
      </div>
    </Panel>
  );

  return (
    <div>
      <BreadCrumb model={items} home={home} />
      <h2 className="heading">Authorize New</h2>

      <Steps model={steps} activeIndex={stage - 1} />
      <br />
      <div className="p-d-flex p-jc-center">{stage === 1 ? step1 : step2}</div>
    </div>
  );
};

export default Admin_Authorize;
