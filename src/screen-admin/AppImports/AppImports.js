import React, { useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import { TabView, TabPanel } from "primereact/tabview";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import SectionHeading from "../../app/common/SectionHeading/SectionHeading";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import AppImportsTarget from "./AppImportsTarget/AppImportsTarget";
import AppImportGene from "./AppImportsGene/AppImportGene";

const AppImports = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  const params = useParams();
  const navigate = useNavigate();

  const SideMenuItems = [
    {
      label: "Sections",
      items: [
        {
          label: "Genes",
          icon: "icon icon-common icon-snowflake",
          command: () => {
            navigate("genes/");
          },
        },
        {
          label: "Targets",
          icon: "icon icon-common icon-snowflake",
          command: () => {
            navigate("targets/");
          },
        },
      ],
    },
  ];
  return (
    <React.Fragment>
      <Toast ref={toast} />
      <div className="flex gap-2 w-full">
        <div className="flex">
          <Menu model={SideMenuItems} />
        </div>
        <div className="flex w-full">
          <Routes>
            <Route index element={<Navigate replace to="genes/" />} />
            <Route path="targets/" element={<AppImportsTarget />} />
            <Route path="genes/" element={<AppImportGene />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(AppImports);
