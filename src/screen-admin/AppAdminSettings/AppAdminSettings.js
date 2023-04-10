import { observer } from "mobx-react-lite";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import AppConfigurations from "./AppConfigurations/AppConfigurations";

const AppAdminSettings = () => {
  const params = useParams();
  const navigate = useNavigate();

  const toast = useRef(null);
  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "Configurations",
          icon: "ri-folder-settings-fill",
          command: () => {
            navigate(`configurations/`);
          },
        },

        {
          label: "Key Value Pairs",
          icon: "ri-list-settings-line",
          command: () => {
            navigate(`key-value-pairs/`);
          },
        },
      ],
    },
  ];

  // if (displayLoading) {
  //   return <Loading />;
  // }

  return (
    <React.Fragment>
      <Toast ref={toast} />
      <div className="flex gap-2 w-full">
        <div className="flex">
          <Menu model={items} />
        </div>

        <div className="flex w-full">
          <Routes>
            <Route index element={<Navigate replace to="configurations/" />} />
            <Route path="configurations/" element={<AppConfigurations />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(AppAdminSettings);
