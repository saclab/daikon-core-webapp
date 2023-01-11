import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import React, { useContext } from "react";
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
    <div className="flex flex-column pr-7">
      <div className="flex">
        <div className="flex">
          <Avatar
            label={initials}
            className="p-mr-2"
            size="large"
            shape="circle"
          />
        </div>
        <div className="flex-grow-1 pl-3 text-overflow-ellipsis">
          <h3>{user.displayName}</h3>
        </div>
      </div>
      <div className="flex">
        {/* <Button
          label="Settings"
          icon="pi pi-cog"
          className="p-button-text p-button-plain"
        /> */}
        <Button
          label="Logout"
          icon="pi pi-power-off"
          className="p-button-text p-button-plain"
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default TitleBarAccountPanel;
