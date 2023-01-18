import { BreadCrumb } from "primereact/breadcrumb";
import React from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import TargetAdminImporter from "./TargetAdminImporter";

const AppImportsTarget = () => {
  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "App Imports",
      command: () => {
        navigate("/admin/app-imports/");
      },
    },
    {
      label: "Target",
      command: () => {
        navigate(`/admin/app-imports/target`);
      },
    },
  ];

  return (
    <React.Fragment>
      {/* First div for general information and dates */}

      <div className="flex flex-column gap-2 w-full">
        <div className="flex w-full pb-2">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-common icon-snowflake"
            heading={"TARGET IMPORTER"}
          />
        </div>

        <div className="flex w-full">
          <TargetAdminImporter />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AppImportsTarget;
