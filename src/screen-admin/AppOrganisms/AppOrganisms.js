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
import Organisms from "./Organisms/Organisms";

const AppOrganisms = () => {
  const params = useParams();
  const navigate = useNavigate();

  const toast = useRef(null);
  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "Organisms & Strains",
          icon: "icon icon-species icon-plasmodium",
          command: () => {
            navigate(`public/`);
          },
        },

        {
          label: "Gene Pool Providers",
          icon: "icon icon-conceptual icon-systems",
          command: () => {
            navigate(`protected/`);
          },
        },

        {
          label: "Sync History",
          icon: "icon icon-common icon-unassigned-job",
          command: () => {
            navigate(`discussion/`);
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
            <Route index element={<Navigate replace to="organisms-view/" />} />
            <Route path="organisms-view/" element={<Organisms />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(AppOrganisms);
