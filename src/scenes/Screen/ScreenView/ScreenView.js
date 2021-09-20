import React, { useEffect, useRef, useContext } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Toast } from "primereact/toast";
import { BreadCrumb } from "primereact/breadcrumb";
import NotFound from "../../../app/layout/NotFound/NotFound";
import Loading from "../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { Column } from "primereact/column";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";

const ScreenView = ({ match, history }) => {
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { displayLoading, screenRegistry, fetchScreens, filterScreensByGene } =
    rootStore.screenStore;
  useEffect(() => {
    fetchScreens();
  }, [fetchScreens]);

  const dt = useRef(null);

  if (!displayLoading) {
    /* Table Body Templates */

    const ScreenNameBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Screen Name</span>
          {rowData.screenName}
        </React.Fragment>
      );
    };

    const LibraryBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Library</span>
          {rowData.library}
        </React.Fragment>
      );
    };

    const ScientistNameBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Scientist</span>
          {rowData.scientist}
        </React.Fragment>
      );
    };

    const StartDateBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Start Date</span>
          {new Date(rowData.startDate).toLocaleDateString()}
        </React.Fragment>
      );
    };

    const EndDateBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">End Date</span>
          {new Date(rowData.endDate).toLocaleDateString()}
        </React.Fragment>
      );
    };

    const MethodBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Method</span>
          {rowData.method}
        </React.Fragment>
      );
    };

    const ProtocolBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Protocol</span>
          {rowData.protocol}
        </React.Fragment>
      );
    };

    const HitsBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Hits</span>
          <NavLink to={"/screen/" + rowData.TargetId + "/hits/" + rowData.id}>
            20
            {/* {rowData.hits} */}
          </NavLink>
        </React.Fragment>
      );
    };

    const StatusBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Status</span>
          {rowData.status}
        </React.Fragment>
      );
    };

    const CommentsBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Comments</span>
          {rowData.comment}
        </React.Fragment>
      );
    };

    const hitsHeader = (
      <React.Fragment>
        <i className="icon icon-common icon-fullscreen"></i> &nbsp; Hits
      </React.Fragment>
    );

    /* Table Header  */
    // const header = (
    //   <div className="table-header">
    //     <span className="heading">List of Targets being Screened</span>
    //     {/* <span className="p-input-icon-left">
    //       <i className="pi pi-search" />
    //       <InputText
    //         type="search"
    //         onInput={(e) => setGlobalFilter(e.target.value)}
    //         placeholder="Search"
    //       />
    //     </span> */}
    //   </div>
    // );
    return (
      <div className="datatable-screens">
        <SectionHeading
          icon="icon icon-conceptual icon-chemical"
          heading={"Screens of " + match.params.id}
        />

        <div className="card">
          <DataTable
            ref={dt}
            value={filterScreensByGene(match.params.id)}
            paginator
            rows={10}
            className="p-datatable-screens"
            //globalFilter={globalFilter}
            emptyMessage="No Screens found."
          >
            <Column
              field="ScreenName"
              header="Screen Name"
              body={ScreenNameBodyTemplate}
            />

            <Column field="Status" header="Status" body={StatusBodyTemplate} />
            <Column
              field="Library"
              header="Library"
              body={LibraryBodyTemplate}
            />
            <Column
              field="ScientistName"
              header="Scientist"
              body={ScientistNameBodyTemplate}
            />
            <Column
              field="StartDate"
              header="Start Date"
              body={StartDateBodyTemplate}
            />
            <Column
              field="EndDate"
              header="End Date"
              body={EndDateBodyTemplate}
            />
            <Column field="Method" header="Method" body={MethodBodyTemplate} />
            <Column
              field="Protocol"
              header="Protocol"
              body={ProtocolBodyTemplate}
            />
            <Column field="Hits" header={hitsHeader} body={HitsBodyTemplate} />
            <Column
              field="Comments"
              header="Comments"
              body={CommentsBodyTemplate}
            />
          </DataTable>
        </div>
      </div>
    );
  }

  /** Loading Overlay */

  return <Loading />;
};

export default observer(ScreenView);
