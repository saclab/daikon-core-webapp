import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FDate from "../../../app/common/FDate/FDate";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { appColors } from "../../../colors";

const GeneSyncHistory = () => {
  const rootStore = useContext(RootStoreContext);
  const { fetchingAppBackgroundTasks, fetchAppBackgroundTasks, tasks } =
    rootStore.appSettingsStore;
  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "App Settings",
      command: () => {
        navigate("/admin/settings/");
      },
    },

    { label: "App Organism" },
    { label: "Sync History" },
  ];

  useEffect(() => {
    fetchAppBackgroundTasks();
  }, [fetchAppBackgroundTasks]);

  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <p
          style={{
            breakText: "break-all",
            wordBreak: "break-all",
            whiteSpace: "normal",
          }}
        >
          {rowData.taskName}
        </p>
      </React.Fragment>
    );
  };
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
            <Column
              field="taskName"
              header="Task Name"
              body={nameBodyTemplate}
            />
            <Column field="taskSubModule" header="Adapter" />
            <Column field="taskStatus" header="Task Status" />
            <Column
              field="taskStartTime"
              header="Start Time"
              body={(rowData) => {
                return (
                  <React.Fragment>
                    <FDate timestamp={rowData.taskStartTime} hideTime={false} />
                  </React.Fragment>
                );
              }}
            />
            <Column
              field="taskEndTime"
              header="End Time"
              body={(rowData) => {
                return (
                  <React.Fragment>
                    <FDate timestamp={rowData.taskEndTime} hideTime={false} />
                  </React.Fragment>
                );
              }}
            />
            <Column field="taskCreatedBy" header="Created By" />
          </DataTable>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(GeneSyncHistory);
