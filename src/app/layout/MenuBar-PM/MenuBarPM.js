import { TabMenu } from "primereact/tabmenu";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuBarPM.css";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const MenuBarPM = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  let location = useLocation();

  useEffect(() => {

    if (location.pathname.includes("/pm/project/")) setActiveIndex(2);
    else if (location.pathname.includes("/pm/")) setActiveIndex(1);
  }, [location, setActiveIndex]);

  const items = [
    {
      label: "Home",
      icon: "icon icon-common icon-arrow-left",
      command: () => navigate("/d/"),
    },
    {
      label: "Project Managemnt Dashboard",
      icon: "icon icon-common icon-columns",
      command: () => navigate("/pm/"),
    },
    {
      label: "Projects",
      icon: "icon icon-common icon-briefcase",
      command: () => navigate("project/"),
    },
  ];
  return (
    <div className="flex justify-content-center flex-wrap">
      <div className="flex pipeline-menu scalein animation-duration-500">
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        />
      </div>
    </div>

  );
};

export default MenuBarPM;
