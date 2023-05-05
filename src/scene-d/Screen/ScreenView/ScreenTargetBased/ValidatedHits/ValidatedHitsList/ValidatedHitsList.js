import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { TieredMenu } from "primereact/tieredmenu";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import SectionHeading from "../../../../../../app/common/SectionHeading/SectionHeading";
import SmilesViewWithDetails from "../../../../../../app/common/SmilesViewWithDetails/SmilesViewWithDetails";
import Vote from "../../../../../../app/common/Vote/Vote";
import Loading from "../../../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../../../app/stores/rootStore";
import "./ValidatedHitsDataTable.css";
import ValidatedHitsImporter from "./ValidatedHitsImporter/ValidatedHitsImporter";
import ValidatedHitsPromoteToHAEntry from "./ValidatedHitsPromoteToHAEntry/ValidatedHitsPromoteToHAEntry";

const ValidatedHitsList = ({ screenId }) => {
  const dt = useRef(null);
  const tableMenu = useRef(null);
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingFetchScreen, fetchScreen, selectedScreen, fetchScreenSilent } =
    rootStore.screenStore;
  const { user } = rootStore.userStore;
  const { enableVoting, freezeVoting } = rootStore.votingStore;

  const [displayHitsImportSidebar, setDisplayHitsImportSidebar] =
    useState(false);

  const [displayEnableSelection, setDisplayEnableSelection] = useState(false);
  const [selectedCompounds, setSelectedCompounds] = useState(null);
  const [displayPromoteToHAEntry, setDisplayPromoteToHAEntry] = useState(false);

  let tableMenuItems = [];

  useEffect(() => {
    fetchScreen(screenId);
  }, [fetchScreen, screenId]);

  if (loadingFetchScreen || selectedScreen === null) {
    return <Loading />;
  }

  if (!loadingFetchScreen && selectedScreen) {
  }

  /* Local functions */

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  let validatePromoteToHA = () => {
    if (selectedCompounds === null) {
      toast.warning(
        "No rows selected. Please select some rows to promote them."
      );
      return;
    }
    setDisplayPromoteToHAEntry(true);
  };

  let enableVotingCalled = () => {
    if (selectedCompounds === null) {
      toast.warning(
        "No rows selected. Please select some or all rows to enable voting."
      );
      return;
    }
    // create guids
    var voteIds = selectedCompounds.map(
      (selectedCompound) => selectedCompound.voteId
    );

    enableVoting(voteIds).then(() => setDisplayEnableSelection(false));
  };

  let validateFreezeVoting = () => {
    if (selectedCompounds === null) {
      toast.warning(
        "No rows selected. Please select some or all rows to freeze voting."
      );
      return;
    }
    // create guids
    var voteIds = selectedCompounds.map(
      (selectedCompound) => selectedCompound.voteId
    );

    freezeVoting(voteIds).then(() => setDisplayEnableSelection(false));
  };

  /* End Local functions */

  /* Table Body Templates */

  // const SourceBodyTemplate = (rowData) => {
  //   return <React.Fragment>{rowData.source}</React.Fragment>;
  // };

  const LibraryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.library}
        <br />
        {rowData.source}
      </React.Fragment>
    );
  };

  const CompoundIdBodyTemplate = (rowData) => {
    return (
      <React.Fragment>{rowData?.compound?.externalCompoundIds}</React.Fragment>
    );
  };

  const StructureBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div>
          <SmilesViewWithDetails
            compound={rowData?.compound}
            width={"220"}
            height={"220"}
          />
        </div>
      </React.Fragment>
    );
  };

  const EnzymeActivityBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.iC50}</React.Fragment>;
  };

  // const MethodBodyTemplate = (rowData) => {
  //   return <React.Fragment>{rowData.method}</React.Fragment>;
  // };

  const MICBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.mic}</React.Fragment>;
  };

  const ClusterBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.clusterGroup}</React.Fragment>;
  };

  const VoteBodyTemplate = (rowData) => {
    return (
      <div style={{ padding: "10px" }}>
        <Vote
          id={rowData.vote.id}
          voteData={rowData.vote}
          callBack={() => fetchScreenSilent(screenId, true)}
        />
      </div>
    );
  };
  const tableHeader = (
    <div className="flex justify-content-end">
      <div className="flex">
        {displayEnableSelection && (
          <Button
            type="button"
            icon="pi pi-times-circle"
            label="Cancel Selection"
            className="p-button-text"
            style={{ height: "30px", marginRight: "5px" }}
            onClick={() => setDisplayEnableSelection(false)}
          />
        )}
      </div>
      <div className="flex gap-5">
        <Chip label={selectedScreen?.org.name} icon="ri-organization-chart" />
        <Chip
          label={selectedScreen?.method}
          icon="icon icon-common icon-circle-notch"
        />
        <TieredMenu
          model={tableMenuItems}
          popup
          ref={tableMenu}
          id="overlay_tmenu"
        />
        <Button
          icon="pi pi-bars"
          onClick={(event) => {
            tableMenu.current.toggle(event);
          }}
          aria-haspopup
          className="p-button-info ml-auto"
          aria-controls="overlay_tmenu"
        />
      </div>
    </div>
  );
  /* End Table Body Templates */

  /* Construct table menu items */
  if (!loadingFetchScreen && selectedScreen) {
    let itm = {
      label: "Hits Management",
      items: [
        {
          label: "Import Hits",
          icon: "icon icon-common icon-plus-circle",
          command: () => setDisplayHitsImportSidebar(true),
        },
        {
          label: "Export Hits",
          icon: "icon icon-fileformats icon-CSV",
          command: () => exportCSV(false),
        },
      ],
    };
    tableMenuItems.push(itm);

    // Admin section
    if (user.roles.includes("admin")) {
      if (selectedScreen.validatedHits.length !== 0) {
        let selectItem = {
          label: "Enable Selection",
          icon: "pi pi-check-square",
          command: () => {
            setDisplayEnableSelection(true);
            tableMenu.current.toggle();
          },
        };
        tableMenuItems.push(selectItem);

        let votingItem = {
          label: "Voting",
          items: [
            {
              label: "Enable Voting",
              icon: "pi pi-check",
              command: () => enableVotingCalled(),
            },
            {
              label: "Freeze Voting",
              icon: "pi pi-pause",
              command: () => validateFreezeVoting(),
            },
          ],
        };
        tableMenuItems.push(votingItem);

        let promotionItem = {
          label: "Promote To Hit Assessment",
          icon: "pi pi-arrow-right",
          command: () => validatePromoteToHA(),
        };

        tableMenuItems.push(promotionItem);
      }
    }
  }
  /* END Construct table menu items */

  return (
    <div className="flex w-full">
      <div className="datatable-validated-hits">
        <div className="card">
          <DataTable
            ref={dt}
            value={selectedScreen.validatedHits}
            // paginator
            scrollable
            // rows={50}
            header={tableHeader}
            //className="p-datatable-screen-table"
            //globalFilter={globalFilter}
            emptyMessage="No hits found."
            resizableColumns
            columnResizeMode="fit"
            size="large"
            //showGridlines
            responsiveLayout="scroll"
            selection={selectedCompounds}
            onSelectionChange={(e) => setSelectedCompounds(e.value)}
            dataKey="id"
            exportFilename={`Hits-${selectedScreen.screenName}-${selectedScreen.method}.csv`}
          >
            {displayEnableSelection && (
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3em" }}
              ></Column>
            )}
            {/* <Column
              field="Source"
              header="Source"
              body={SourceBodyTemplate}
              style={{ width: "12%" }}
            /> */}
            <Column
              field={(rowData) => rowData?.compound?.smile}
              header="Structure"
              body={StructureBodyTemplate}
              style={{ minWidth: "300px" }}
            />
            <Column
              field={(rowData) => rowData?.library + "|" + rowData.source}
              header="Library|Source"
              body={LibraryBodyTemplate}
              style={{ minWidth: "130px" }}
            />
            <Column
              field={(rowData) => rowData?.compound?.externalCompoundIds}
              header="Compound Id"
              body={CompoundIdBodyTemplate}
              style={{ minWidth: "150px" }}
            />

            <Column
              field="iC50"
              header="IC50 (&micro;M) "
              body={EnzymeActivityBodyTemplate}
              style={{ width: "50px" }}
            />
            {/* <Column
              field="Method"
              header="Method"
              body={MethodBodyTemplate}
              style={{ width: "120px" }}
            /> */}
            <Column
              field="mic"
              header="MIC (&micro;M)"
              body={MICBodyTemplate}
              style={{ width: "50px" }}
            />
            <Column
              field="clusterGroup"
              header="Cluster"
              body={ClusterBodyTemplate}
              style={{ width: "90px" }}
              sortable
            />
            <Column
              field="Vote"
              header="Vote"
              body={VoteBodyTemplate}
              style={{ minWidth: "200px" }}
            />
          </DataTable>
        </div>
      </div>
      <Dialog
        visible={displayHitsImportSidebar}
        style={{ width: "90%" }}
        maximizable={true}
        maximized={true}
        onHide={() => setDisplayHitsImportSidebar(false)}
        className="p-sidebar-lg"
      >
        <div className="card">
          <SectionHeading
            icon="icon icon-conceptual icon-structures-3d"
            heading={"Import Validated Hits"}
            color={"#f4f4f4"}
            textColor={"#000000"}
          />
          <br />
          <ValidatedHitsImporter
            screenId={selectedScreen.id}
            existingHits={selectedScreen.validatedHits}
          />
        </div>
      </Dialog>
      <Dialog
        header="Promote to Hit Assessment"
        visible={displayPromoteToHAEntry}
        //style={{ width: "50vw" }}
        //footer={renderFooter("displayBasic2")}
        onHide={() => setDisplayPromoteToHAEntry(false)}
        style={{ width: "90%" }}
        maximizable={true}
      >
        <ValidatedHitsPromoteToHAEntry
          compounds={selectedCompounds}
          screen={selectedScreen}
          close={() => setDisplayPromoteToHAEntry(false)}
        />
      </Dialog>
      <ConfirmDialog />
    </div>
  );
};

export default observer(ValidatedHitsList);
