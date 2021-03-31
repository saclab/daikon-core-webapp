import React, { useContext } from "react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { RootStoreContext } from "../../../stores/rootStore";

const TitleBarAccountPanel = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

  let initials = [...user.displayName.matchAll(rgx)] || [];

  initials = (
    (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
  ).toUpperCase();


  return (
    <div>
      <div className="p-d-flex p-jc-center">
        <div className="p-mr-2">
          <Avatar
            label={initials}
            className="p-mr-2"
            size="large"
            shape="circle"
          />
        </div>
        <div className="p-mr-2">
          <h3>{user.displayName}</h3>
          <Button
            label="Settings"
            icon="pi pi-cog"
            className="p-button-text p-button-plain"
          />
          <Button
            label="Logout"
            icon="pi pi-power-off"
            className="p-button-text p-button-plain"
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
};

export default TitleBarAccountPanel;
