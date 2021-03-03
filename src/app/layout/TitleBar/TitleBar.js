import React, { useRef, useContext } from "react";
import { withRouter } from "react-router-dom";
import { OverlayPanel } from "primereact/overlaypanel";
import cssClass from "./TitleBar.module.css";
import { Button } from "primereact/button";
import history from "../../../history";
import TitleBarAccountPanel from "./TitleBarAccountPanel/TitleBarAccountPanel";
import { RootStoreContext } from "../../stores/rootStore";

const TitleBar = () => {
  const op = useRef(null);
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  return (
    <div className={cssClass.Header}>
      <div className={["p-d-flex"].join(" ")}>
        <Button
          type="Button"
          icon="pi pi-th-large"
          className={["p-mr-2", cssClass.BlackButton].join(" ")}
        />

        <Button
          onClick={() => history.push("/")}
          className={[cssClass.LogoText, cssClass.BlackButton, "p-mr-2"].join(
            " "
          )}
        >
          Target and Project Tracker (TPT)
        </Button>

        <Button
          type="Button"
          icon="pi pi-search"
          className={[cssClass.Push, "p-mr-2", cssClass.BlackButton].join(" ")}
        />

        <Button
          type="Button"
          icon="pi pi-sliders-v"
          className={["p-mr-2", cssClass.BlackButton].join(" ")}
        />
        <Button
          type="Button"
          className={["p-mr-2", cssClass.BlackButton].join(" ")}
          icon="pi pi-user"
          label={user.email}
          onClick={(e) => op.current.toggle(e)}
        />
        <OverlayPanel dismissable ref={op}>
          <TitleBarAccountPanel />
        </OverlayPanel>
      </div>
    </div>
  );
};

export default withRouter(TitleBar);
