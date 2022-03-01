import React, { useState, useRef, useEffect, useContext } from "react";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { TieredMenu } from "primereact/tieredmenu";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import Loading from "../../../../../app/layout/Loading/Loading";
import Vote from "../../../../../app/common/Vote/Vote";
import SmilesView from "../../../../../app/common/SmilesView/SmilesView";
import ValidatedHitsImporter from "./ValidatedHitsImporter/ValidatedHitsImporter";
import ValidatedHitsPromoteToFHAEntry from "./ValidatedHitsPromoteToFHAEntry/ValidatedHitsPromoteToFHAEntry";
import { toast } from "react-toastify";

const ValidatedHitsList = ({ screenId }) => {
  const dt = useRef(null);
  const tableMenu = useRef(null);
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingFetchScreen, fetchScreen, selectedScreen } =
    rootStore.screenStore;
  const { user } = rootStore.userStore;
  const { enableVoting, enablingVoting, freezeVoting, freezingVoting } =
    rootStore.votingStore;

  const [displayHitsImportSidebar, setDisplayHitsImportSidebar] =
    useState(false);

  const [displayEnableSelection, setDisplayEnableSelection] = useState(false);
  const [selectedCompounds, setSelectedCompounds] = useState(null);
  const [displayPromoteToFHAEntry, setDisplayPromoteToFHAEntry] =
    useState(false);

  let tableMenuItems = [];

  console.log("==== VALIDATED HIT LIST");
  useEffect(() => {
    fetchScreen(screenId);
  }, [fetchScreen, screenId]);

  if (loadingFetchScreen || selectedScreen === null) {
    return <Loading />;
  }

  if (!loadingFetchScreen && selectedScreen) {
    console.log(selectedScreen);
  }

  /* Local functions */

  let validatePromoteToFHA = () => {
    if (selectedCompounds === null) {
      toast.warning(
        "No compounds selected. Please select some compouns to promote them."
      );
      return;
    }
    setDisplayPromoteToFHAEntry(true);
  };

  let enableVotingCalled = () => {
    if (selectedCompounds === null) {
      toast.warning(
        "No rows selected. Please select some or all compouns to enable voting."
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
        "No rows selected. Please select some or all compouns to enable voting."
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

  const SourceBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.source}</React.Fragment>;
  };

  const LibraryBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.library}</React.Fragment>;
  };

  const CompoundIdBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData?.compound?.saccId}</React.Fragment>;
  };

  const StructureBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div style={{ minWidth: "350px", marginRight: "50px" }}>
          <SmilesView smiles={rowData?.compound?.smile} />
        </div>
      </React.Fragment>
    );
  };

  const EnzymeActivityBodyTemplate = (rowData) => {
    return <React.Fragment>{_.round(rowData.iC50, 2)}</React.Fragment>;
  };

  const MethodBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.method}</React.Fragment>;
  };

  const MICBodyTemplate = (rowData) => {
    return <React.Fragment>{_.round(rowData.mic, 2)}</React.Fragment>;
  };

  const ClusterBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData.clusterGroup}</React.Fragment>;
  };

  const VoteBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Vote
          id={rowData.vote.id}
          voteData={rowData.vote}
          callBack={() => fetchScreen(screenId, true)}
        />
      </React.Fragment>
    );
  };
  const tableHeader = (
    <div className="p-d-flex p-jc-end">
      <div>
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
      <div>
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
    if (selectedScreen.validatedHits.length === 0) {
      let itm = {
        label: "Hits Management",
        items: [
          {
            label: "Import Hits",
            icon: "icon icon-common icon-plus-circle",
            command: () => setDisplayHitsImportSidebar(true),
          },
        ],
      };
      tableMenuItems.push(itm);
    }

    if (selectedScreen.validatedHits.length !== 0) {
      let itm = {
        label: "Hits Management",
        items: [
          // {
          //   label: "Import Hits",
          //   icon: "icon icon-common icon-plus-circle",
          // },
          {
            label: "Export Hits",
            icon: "icon icon-fileformats icon-CSV",
          },
        ],
      };
      tableMenuItems.push(itm);
    }

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
          label: "Promotion",
          items: [
            {
              label: "Promote To FHA",
              icon: "pi pi-arrow-right",
              command: () => validatePromoteToFHA(),
            },
          ],
        };

        tableMenuItems.push(promotionItem);
      }
    }
  }
  /* END Construct table menu items */

  return (
    <div>
      <div className="datatable-screen-table">
        <div className="card">
          <DataTable
            ref={dt}
            value={selectedScreen.validatedHits}
            // paginator
            scrollable
            // rows={50}
            header={tableHeader}
            className="p-datatable-screen-table"
            //globalFilter={globalFilter}
            emptyMessage="No hits found."
            resizableColumns
            columnResizeMode="fit"
            showGridlines
            responsiveLayout="scroll"
            selection={selectedCompounds}
            onSelectionChange={(e) => setSelectedCompounds(e.value)}
            dataKey="id"
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
              field="Library"
              header="Library"
              body={LibraryBodyTemplate}
              style={{ width: "12%" }}
            />
            <Column
              field="CompoundId"
              header="Compound Id"
              body={CompoundIdBodyTemplate}
              style={{ width: "100px" }}
            />

            <Column
              field="EnzymeActivity"
              header="Enzyme Activity (IC50)"
              body={EnzymeActivityBodyTemplate}
              style={{ width: "100px" }}
            />
            {/* <Column
              field="Method"
              header="Method"
              body={MethodBodyTemplate}
              style={{ width: "120px" }}
            /> */}
            <Column
              field="MIC"
              header="MIC"
              body={MICBodyTemplate}
              style={{ width: "100px" }}
            />
            <Column
              field="clusterGroup"
              header="Cluster Group No"
              body={ClusterBodyTemplate}
              style={{ width: "90px" }}
              sortable
            />
            <Column
              field="Structure"
              header="Structure"
              body={StructureBodyTemplate}
              style={{ minWidth: "250px" }}
            />
            <Column
              field="Vote"
              header="Vote"
              body={VoteBodyTemplate}
              style={{ minWidth: "250px" }}
            />
          </DataTable>
        </div>
      </div>
      <Sidebar
        visible={displayHitsImportSidebar}
        position="right"
        // style={{ width: "50%", overflowX: "auto" }}
        blockScroll={true}
        onHide={() => setDisplayHitsImportSidebar(false)}
        className="p-sidebar-lg"
      >
        <div className="card">
          <h3>
            <i className="icon icon-common icon-plus-circle" /> Import Validated
            Hits
          </h3>

          <hr />
          <br />
          <ValidatedHitsImporter screenId={selectedScreen.id} />
        </div>
      </Sidebar>
      <Dialog
        header="Promote to FHA"
        visible={displayPromoteToFHAEntry}
        style={{ width: "50vw" }}
        //footer={renderFooter("displayBasic2")}
        onHide={() => setDisplayPromoteToFHAEntry(false)}
        style={{ width: "90%" }}
        blockScroll={true}
        maximizable={true}
      >
        <ValidatedHitsPromoteToFHAEntry
          compounds={selectedCompounds}
          screen={selectedScreen}
          close={() => setDisplayPromoteToFHAEntry(false)}
        />
      </Dialog>
    </div>
  );
};

export default observer(ValidatedHitsList);
