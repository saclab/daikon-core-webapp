import { TabMenu } from "primereact/tabmenu";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MenuBarDeveloper.css";

const MenuBarDeveloper = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  let location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/bug-report")) setActiveIndex(0);
    else if (location.pathname.includes("/feature-request")) setActiveIndex(1);
    else if (location.pathname.includes("/data-discrepancy")) setActiveIndex(2);
    else if (location.pathname.includes("/documentation")) setActiveIndex(3);
  }, [location, setActiveIndex]);

  const items = [
    {
      label: "Bug Report",
      icon: "icon icon-common icon-bug",
      command: () => navigate("bug-report/"),
    },
    {
      label: "Feature Request",
      icon: "icon icon-common icon-new",
      command: () => navigate("feature-request/"),
    },
    {
      label: "Data Discrepancy",
      icon: "icon icon-common icon-database",
      command: () => navigate("data-discrepancy/"),
    },
    {
      label: "Documentation",
      icon: "pi pi-fw pi-file",
      command: () => navigate("documentation/"),
    },
  ];

  return (
    <div className="flex flex-column">
      <div className="MenuBarDeveloper">
        <h1>Daikon Developer</h1>
      </div>
      <div className="flex justify-content-center flex-wrap">
        <div className="flex pipeline-menu scalein animation-duration-500">
          <TabMenu
            model={items}
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuBarDeveloper;
