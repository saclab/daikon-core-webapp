import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { appColors } from "../../../colors";

const GeneSyncHistory = () => {
  const rootStore = useContext(RootStoreContext);
  const { fetchingAppBackgroundTasks, fetchAppBackgroundTasks } =
    rootStore.appSettingsStore;
  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "App Settings",
      command: () => {
        navigate("/admin/settings/");
      },
    },

    { label: "Configurations" },
  ];

  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(fetchAppBackgroundTasks());
  }, [fetchAppBackgroundTasks]);

  return (
    <React.Fragment>
      <div className="flex flex-column gap-2 w-full">
        <div className="flex w-full">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="ri-folder-settings-fill"
            heading={"Gene Sync History"}
            displayHorizon={false}
            color={appColors.blocks.blue}
          />
        </div>

        <div className="flex w-full">
          <DataTable
            value={tasks}
            className="p-datatable w-full"
            resizableColumns
            columnResizeMode="expand"
            loading={fetchingAppBackgroundTasks}
          >
            <Column field="taskName" header="Task Name" />
            <Column field="taskStatus" header="Task Status" />
            <Column field="taskStartTime" header="Start Time" />
            <Column field="taskEndTime" header="End Time" />
            <Column field="taskCreatedBy" header="Created By" />
          </DataTable>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(GeneSyncHistory);
