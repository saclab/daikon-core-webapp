import React, { useContext, useEffect, useRef, useState } from "react";
// import { withRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Dropdown } from "primereact/dropdown";
import { OverlayPanel } from "primereact/overlaypanel";
import { Sidebar } from "primereact/sidebar";
import { useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { RootStoreContext } from "../../stores/rootStore";
import Loading from "../Loading/Loading";
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
  const { fetchingAppVars, appVars, fetchAppVars } = rootStore.generalStore;
  const { activeStrainFilter, setActiveStrainFilter } =
    rootStore.appSettingsStore;

  const getCurrentStrainFilter = () => {
    const strainFilter = localStorage.getItem("strainFilter");
    console.log(strainFilter);
    if (strainFilter !== null) {
      return Strains.find((s) => s.id === strainFilter)["id"];
    } else {
      //return Strains.find((s) => s.canonicalName === "global")["id"];
      console.log("No default Strain Filter : Trying to activate global");
      activateStrainFilter({ value: "global" });
    }
  };

  useEffect(() => {
    if (appVars === null) {
      fetchAppVars();
    }
    setActiveStrainFilter(
      getCurrentStrainFilter(),
      Strains.find((s) => s.id === getCurrentStrainFilter())
    );
  }, [appVars, fetchAppVars, setActiveStrainFilter]);

  if (fetchingAppVars) {
    return <Loading />;
  }

  const Strains = [{ name: "Global", canonicalName: "global", id: "global" }];
  appVars.strains.forEach((s) => {
    Strains.push(s);
  });

  const FeedbackOptions = [
    { label: "Bug Report", value: "bug-report" },
    { label: "Feature Request", value: "feature-request" },
    { label: "Data Discrepancy ", value: "data-discrepancy" },
  ];

  const activateStrainFilter = (e) => {
    localStorage.setItem("strainFilter", e.value);
    let strain = Strains.find((s) => s.id === e.value);
    setActiveStrainFilter(e.value, strain);
    toast.success("Strain Filter Activated : " + strain.name);

    //window.location.reload();
  };

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

  const strainOptionTemplate = (option) => {
    const iconClass = (option) => {
      switch (option?.canonicalName) {
        case "global":
          return "icon icon-common icon-globe";
        default:
          return "icon icon-species icon-plasmodium";
      }
    };
    return (
      <div className="flex gap-3">
        <i className={iconClass(option)} />
        <div>{option?.name}</div>
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
          className={["mr-2", cssClass.BlackButton, cssClass.Feedback].join(
            " "
          )}
          onClick={() => setVisibleLeft(true)}
        />
        <div className="LogoButton m-1">
          <Button
            onClick={() => navigate("/d/")}
            className={[
              "pr-2 pl-2",
              "p-button-text p-button-plain",
              cssClass.LogoText,
              cssClass.BlackButton,
            ].join(" ")}
          >
            <b>D A I K O N</b>
          </Button>
        </div>

        {/* <Button
          type="Button"
          icon="pi pi-sliders-v"
          label="View"
          className={["p-mr-2", cssClass.BlackButton].join(" ")}
        /> */}

        <div className="absolute right-0">
          <Dropdown
            value={activeStrainFilter}
            options={Strains}
            onChange={(e) => activateStrainFilter(e)}
            optionLabel="name"
            optionValue="id"
            placeholder="Global"
            className={[cssClass.BlackButton, "Strain"].join(" ")}
            style={{ color: "white" }}
            itemTemplate={strainOptionTemplate}
            valueTemplate={strainOptionTemplate}
          />
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
