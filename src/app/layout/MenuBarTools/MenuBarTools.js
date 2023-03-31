import { TabMenu } from "primereact/tabmenu";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MenuBarTools.css";

const MenuBarTools = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  let location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/compounds")) setActiveIndex(1);
  }, [location, setActiveIndex]);

  const items = [
    {
      label: "Home",
      icon: "icon icon-common icon-arrow-left",
      command: () => navigate("/d/"),
    },
    {
      label: "Compounds",
      icon: "icon icon-common icon-math",
      command: () => navigate("compounds/"),
    },
  ];

  return (
    <div className="flex flex-column">
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

export default MenuBarTools;
