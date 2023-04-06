import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// import "./MenuBarAdmin.css";
import { TabMenu } from "primereact/tabmenu";
const MenuBarAdmin = () => {
  const navigate = useNavigate();
  let location = useLocation();

  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    if (location.pathname.includes("/admin/user-manager/")) setActiveIndex(1);
    else if (location.pathname.includes("/admin/app-imports"))
      setActiveIndex(3);
    else if (location.pathname.includes("/admin/settings")) setActiveIndex(4);
    else if (location.pathname.includes("/admin/organisms")) setActiveIndex(2);
    else if (location.pathname.includes("/admin")) setActiveIndex(0);
  }, [location, setActiveIndex]);

  const items = [
    {
      label: "Home",
      icon: "icon icon-common icon-arrow-left",
      command: () => navigate("/d/"),
    },
    {
      label: "User Manager",
      icon: "ri-user-settings-fill",
      command: () => navigate("/admin/user-manager/"),
    },
    {
      label: "App Organisms",
      icon: "icon icon-species icon-plasmodium",
      command: () => navigate("/admin/organisms"),
    },
    {
      label: "App Imports",
      icon: "icon icon-common icon-gavel",
      command: () => navigate("/admin/app-imports"),
    },
    {
      label: "App Settings",
      icon: "icon icon-common icon-cogs",
      command: () => navigate("/admin/settings"),
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

export default MenuBarAdmin;
