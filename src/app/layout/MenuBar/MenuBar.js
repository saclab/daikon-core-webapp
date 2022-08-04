import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import "./MenuBar.css";
import history from "../../../history";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const MenuBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  let location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/gene/")) setActiveIndex(0);
    else if (location.pathname.includes("/target/")) setActiveIndex(1);
    else if (location.pathname.includes("/screen/")) setActiveIndex(2);
    else if (location.pathname.includes("/fha/")) setActiveIndex(3);
    else if (location.pathname.includes("/portfolio/")) setActiveIndex(4);
    else if (location.pathname.includes("/postportfolio/")) setActiveIndex(5);
  }, [location, setActiveIndex]);

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
      label: "Screens",
      icon: "icon icon-common icon-search",
      command: () => history.push("/screen/"),
    },
    {
      label: "Hit Assessment",
      icon: "icon icon-conceptual icon-chemical",
      command: () => history.push("/fha/"),
    },
    {
      label: "Portfolio",
      icon: "icon icon-common icon-analyse",
      command: () => history.push("/portfolio/"),
    },

    {
      label: "Post-Portfolio",
      icon: "icon icon-common icon-drug",
      command: () => history.push("/postportfolio/"),
    },

    // { label: "Clinical", icon: "icon icon-conceptual icon-proteins" },
  ];
  return (
    <div className="flex justify-content-center flex-wrap">
      <div className="flex pipeline-menu">
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        />
      </div>
    </div>

  );
};

export default MenuBar;
