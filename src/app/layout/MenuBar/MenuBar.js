import React from "react";
import { TabMenu } from "primereact/tabmenu";
import "./MenuBar.css";
import history from "../../../history";
const MenuBar = () => {
  const items = [
    {
      label: "Genome",
      icon: "pi pi-fw pi-eye",
      command: () => history.push("/genomes")
    },
    {
      label: "Target",
      icon: "pi pi-fw pi-plus-circle",
      command: () => history.push("/targets")
    },
    { label: "Screen", icon: "pi pi-fw pi-pencil" },
    { label: "FHA", icon: "pi pi-fw pi-file" },
    { label: "H2L", icon: "pi pi-fw pi-globe" },
    { label: "LO", icon: "pi pi-fw pi-tablet" },
    { label: "SP", icon: "pi pi-fw pi-calendar" },
    { label: "IND", icon: "pi pi-fw pi-circle-off" },
    { label: "Clinical", icon: "pi pi-fw pi-compass" },
  ];

  const setSelectedItem = () => {
    switch (window.location.pathname) {
      case "/genomes":
        return items[0];
      case "/targets":
        return items[1];
      default:
        return "ww";
    }
  };

  return (
    <div className={["p-d-flex", "p-jc-center", "pipeline-menu"].join(" ")}>
      <TabMenu model={items} activeItem={setSelectedItem()} />
    </div>
  );
};

export default MenuBar;
