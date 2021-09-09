import React from "react";
import { TabMenu } from "primereact/tabmenu";
import "./MenuBar.css";
import history from "../../../history";
const MenuBar = () => {
  const items = [
    {
      label: "Genes",
      icon: "icon icon-conceptual icon-dna",
      command: () => history.push("/gene/"),
    },
    {
      label: "Targets",
      icon: "icon icon-common icon-target",
      command: () => history.push("/target/"),
    },
    {
      label: "Screen",
      icon: "icon icon-conceptual icon-chemical",
      command: () => history.push("/screen/"),
    },
    {
      label: "FHA",
      icon: "icon icon-conceptual icon-structures-3d",
      command: () => history.push("/fha/"),
    },
    {
      label: "Portfolio",
      icon: "icon icon-common icon-classification",
      command: () => history.push("/portfolio/"),
    },

    {
      label: "Post-Portfolio",
      icon: "icon icon-common icon-biotech",
      command: () => history.push("/postportfolio/"),
    },

    // { label: "Clinical", icon: "icon icon-conceptual icon-proteins" },
  ];

  const setSelectedItem = () => {
    switch (window.location.pathname) {
      case "/gene/":
        return items[0];
      case "/target/":
        return items[1];
      case "/screen/":
        return items[2];
      case "/portfolio/":
        return items[4];
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
