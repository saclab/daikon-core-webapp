import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import cssClass from "./TitleBar.module.css";
import { Button } from "primereact/button";
import history from "../../../history";

const TitleBar = () => {
  return (
    <div className={cssClass.Header}>
      <div className={["p-d-flex"].join(" ")}>
        <Button
          type="Button"
          icon="pi pi-th-large"
          className={["p-mr-2", cssClass.BlackButton].join(" ")}
        />

        <Button
          onClick={() => history.push("/home")}
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
        />
      </div>
    </div>
  );
};

export default withRouter(TitleBar);
