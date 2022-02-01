import React, { useRef, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { OverlayPanel } from "primereact/overlaypanel";
import { Sidebar } from "primereact/sidebar";
import { Dropdown } from "primereact/dropdown";

import cssClass from "./TitleBar.module.css";
import { Button } from "primereact/button";
import history from "../../../history";
import TitleBarAccountPanel from "./TitleBarAccountPanel/TitleBarAccountPanel";
import { RootStoreContext } from "../../stores/rootStore";
import TitleBarSidePanel from "./TitleBarSidePanel/TitleBarSidePanel";

const TitleBar = () => {
  const op = useRef(null);
  const [visibleLeft, setVisibleLeft] = useState(false);
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const Strains = [
    { name: "Mycobacterium tuberculosis H37Rv", code: "H37Rv" },
    { name: "Mycobacterium tuberculosis 18b", code: "18b" },
    { name: "Mycobacterium smegmatis MC2-155", code: "MC2-155" },
  ];

  return (
    <div className={cssClass.Header}>
      <Sidebar
        visible={visibleLeft}
        baseZIndex={1000000}
        onHide={() => setVisibleLeft(false)}
      >
        <TitleBarSidePanel toggle={() => setVisibleLeft(false)} user={user} />
      </Sidebar>
      <div className={["p-d-flex"].join(" ")}>
        <Button
          type="Button"
          icon="icon icon-common icon-th"
          className={["p-mr-2", cssClass.BlackButton].join(" ")}
          onClick={() => setVisibleLeft(true)}
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
          icon="ri-refresh-fill"
          label="Sync"
          className={[cssClass.Push, "p-mr-2", cssClass.BlackButton].join(" ")}
          onClick={() => window.location.reload()}
        />

        <Button
          type="Button"
          icon="pi pi-sliders-v"
          label="View"
          className={["p-mr-2", cssClass.BlackButton].join(" ")}
        />

        <Dropdown
          value={"Mycobacterium tuberculosis H37Rv"}
          options={Strains}
          // onChange={onCityChange}
          optionLabel="name"
          placeholder="H37Rv"
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

export default withRouter(observer(TitleBar));
