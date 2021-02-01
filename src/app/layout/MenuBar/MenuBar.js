import React from "react";
import { TabMenu } from "primereact/tabmenu";
import "./MenuBar.css";
const MenuBar = () => {
  const items = [
    {
      label: "Genome",
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location = "/genomes";
      },
    },
    { label: "Target", icon: "pi pi-fw pi-calendar" },
    { label: "Screen", icon: "pi pi-fw pi-pencil" },
    { label: "FHA", icon: "pi pi-fw pi-file" },
    { label: "H2L", icon: "pi pi-fw pi-cog" },
    { label: "LO", icon: "pi pi-fw pi-tablet" },
    { label: "SP", icon: "pi pi-fw pi-tags" },
    { label: "POST", icon: "pi pi-fw pi-shield" },
  ];

  return (
    <div className={["p-d-flex", "p-jc-center", "pipeline-menu"].join(" ")}>
      <TabMenu model={items} />
    </div>
  );
};

export default MenuBar;
