import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { ProgressBar } from "primereact/progressbar";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Column } from "primereact/column";
import { Message } from "primereact/message";

import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from '../../../app/layout/Loading/Loading';
import { BreadCrumb } from 'primereact/breadcrumb';
import SectionHeading from '../../../app/common/SectionHeading/SectionHeading';
import { appColors } from '../../../colors';
import TargetAdminImporter from "./TargetAdminImporter";

const AppImportsTarget = () => {

  const rootStore = useContext(RootStoreContext);
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
      }
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
  )
}

export default AppImportsTarget