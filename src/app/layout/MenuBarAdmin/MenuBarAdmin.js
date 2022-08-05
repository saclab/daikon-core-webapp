import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Menubar } from 'primereact/menubar';

// import "./MenuBarAdmin.css";
import history from "../../../history";
import { TabMenu } from 'primereact/tabmenu';
const MenuBarAdmin = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);

  const items = [
    {
      label: "Home",
      icon: "icon icon-common icon-arrow-left",
      command: () => navigate("/d/"),
    },
    {
      label: "App Settings",
      icon: "icon icon-common icon-cogs",
      command: () => navigate("/gene/"),
    },
    {
      label: "User Manager",
      icon: "ri-user-settings-fill",
      command: () => navigate("/admin/user-manager/"),
    },
    {
      label: "Genes",
      icon: "icon icon-conceptual icon-dna",
      command: () => navigate("/admin/gene/"),
    },
    {
      label: "Targets",
      icon: "icon icon-common icon-target",
      command: () => navigate("/admin/target/"),
    },
    {
      label: "Screens",
      icon: "icon icon-common icon-search",
      command: () => navigate("/screen/"),
    },
    {
      label: "Projects",
      icon: "icon icon-common icon-classification",
      command: () => navigate("/admin/project/"),
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
