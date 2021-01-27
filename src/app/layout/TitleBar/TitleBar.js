import React from "react";
import {  NavLink } from "react-router-dom";
import cssClass from "./TitleBar.module.css";
import { Button } from "primereact/button";

const TitleBar = () => {
  return (
    <div className={cssClass.Header}>
      <div className={["p-d-flex"].join(" ")}>
        <Button
          type="Button"
          icon="pi pi-th-large"
          className={["p-mr-2", cssClass.BlackButton].join(" ")}
        />
        <div className="p-d-inline">
          <NavLink to='/createActivity' className={cssClass.LogoText}> TB Drug Accelerator</NavLink>
        </div>

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

export default TitleBar;