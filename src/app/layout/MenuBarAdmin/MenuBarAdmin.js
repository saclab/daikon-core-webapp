import React from "react";
import { Button } from "primereact/button";
import { Menubar } from 'primereact/menubar';

// import "./MenuBarAdmin.css";
import history from "../../../history";
const MenuBarAdmin = () => {
  const items = [
    {
      label: "App Settings",
      icon: "icon icon-common icon-cogs",
      command: () => history.push("/gene/"),
    },
    {
      label: "Genes",
      icon: "icon icon-conceptual icon-dna",
      command: () => history.push("/admin/gene/"),
    },
    {
      label: "Target",
      icon: "icon icon-common icon-target",
      command: () => history.push("/admin/target/"),
    },
    {
      label: "Screen",
      icon: "icon icon-conceptual icon-chemical",
      command: () => history.push("/screen/"),
    },
    { label: "FHA", icon: "icon icon-conceptual icon-structures-3d" },
    {
      label: "Portfolio",
      icon: "icon icon-common icon-classification",
      command: () => history.push("/portfolio/"),
    },

    { label: "IND", icon: "icon icon-conceptual icon-proteins" },
    { label: "Clinical", icon: "icon icon-common icon-biotech" },
  ];

  const start = <><h2><i class="icon icon-common icon-asterisk"></i> Admin Panel | </h2></>
  const end = <Button
  type="Button"
  icon="icon icon-common icon-close"
  label="Exit"
  className={["p-mr-2", "p-button-danger"].join(" ")}
  onClick={() => window.location.replace("/")}
/>

  return (
      <div className={["card"].join(" ")}>
        <Menubar model={items} start={start} end={end}/>
      </div>
      
  );
};

export default MenuBarAdmin;
