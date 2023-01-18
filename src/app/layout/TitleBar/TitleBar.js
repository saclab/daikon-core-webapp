import React, { useContext, useRef, useState } from "react";
// import { withRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Dropdown } from "primereact/dropdown";
import { OverlayPanel } from "primereact/overlaypanel";
import { Sidebar } from "primereact/sidebar";
import { useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { RootStoreContext } from "../../stores/rootStore";
import "./TitleBar.css";
import cssClass from "./TitleBar.module.css";
import TitleBarAccountPanel from "./TitleBarAccountPanel/TitleBarAccountPanel";
import TitleBarSidePanel from "./TitleBarSidePanel/TitleBarSidePanel";

const TitleBar = () => {
  const navigate = useNavigate();

  const op = useRef(null);
  const [visibleLeft, setVisibleLeft] = useState(false);
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const Strains = [{ name: "Mycobacterium tuberculosis H37Rv", code: "H37Rv" }];
  const FeedbackOptions = [
    { label: "Bug Report", value: "bug-report" },
    { label: "Feature Request", value: "feature-request" },
    { label: "Data Discrepancy ", value: "data-discrepancy" },
  ];

  const feedbackOptionTemplate = (option) => {
    const iconClass = (option) => {
      switch (option.value) {
        case "bug-report":
          return "icon icon-common icon-bug";
        case "feature-request":
          return "icon icon-common icon-new";
        case "data-discrepancy":
          return "icon icon-common icon-database";
      }
    };

    return (
      <div className="flex gap-3">
        <i className={iconClass(option)} />
        <div>{option.label}</div>
      </div>
    );
  };

  let onFeedback = (e) => {
    navigate("/developer/" + e.value);
  };

  return (
    <div className={cssClass.Header}>
      <Sidebar
        visible={visibleLeft}
        baseZIndex={1000000}
        onHide={() => setVisibleLeft(false)}
      >
        <TitleBarSidePanel toggle={() => setVisibleLeft(false)} user={user} />
      </Sidebar>
      <div className={["inline-flex", cssClass.Feedback].join(" ")}>
        <Button
          type="Button"
          icon="icon icon-common icon-th"
          className={["p-mr-2", cssClass.BlackButton, cssClass.Feedback].join(
            " "
          )}
          onClick={() => setVisibleLeft(true)}
        />

        <Button
          onClick={() => navigate("/d/")}
          className={[cssClass.LogoText, cssClass.BlackButton, "p-mr-2"].join(
            " "
          )}
        >
          D A I K O N
        </Button>

        {/* <Button
          type="Button"
          icon="pi pi-sliders-v"
          label="View"
          className={["p-mr-2", cssClass.BlackButton].join(" ")}
        /> */}

        <div className="absolute right-0">
          <Dropdown
            options={FeedbackOptions}
            onChange={(e) => onFeedback(e)}
            optionLabel="label"
            placeholder="Feedback"
            className={[cssClass.BlackButton, "Feedback"].join(" ")}
            itemTemplate={feedbackOptionTemplate}
          />
          <Button
            type="Button"
            icon="ri-refresh-fill"
            label="Sync"
            className={[cssClass.Push, cssClass.BlackButton].join(" ")}
            onClick={() => window.location.reload()}
          />
          <Dropdown
            value={"Mycobacterium tuberculosis H37Rv"}
            options={Strains}
            // onChange={onCityChange}
            optionLabel="name"
            placeholder="H37Rv"
            className={[cssClass.BlackButton].join(" ")}
          />
          <Button
            type="Button"
            className={[cssClass.BlackButton].join(" ")}
            icon="pi pi-user"
            label={user.email}
            onClick={(e) => op.current.toggle(e)}
          />
          <OverlayPanel dismissable ref={op}>
            <TitleBarAccountPanel />
          </OverlayPanel>
        </div>
      </div>
    </div>
  );
};

//export default withRouter(observer(TitleBar));
export default observer(TitleBar);
