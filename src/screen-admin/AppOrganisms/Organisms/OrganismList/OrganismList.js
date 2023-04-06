import { observer } from "mobx-react-lite";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { appColors } from "../../../../colors";

const OrganismList = () => {
  const navigate = useNavigate();

  const rootStore = useContext(RootStoreContext);
  const {
    displayLoading,
    fetchOrganisms,
    organisms,
    cacheValid,
    editOrganism,
  } = rootStore.organismStore;

  useEffect(() => {
    if (!cacheValid) {
      console.log("fetchOrganisms");
      fetchOrganisms();
    }
  }, [fetchOrganisms, cacheValid]);

  /* Row edit functions */
  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const handleEdit = (e) => {
    let { newData } = e;

    let editedOrg = {
      id: newData.id,
      name: newData.name,
      canonicalName: newData.canonicalName,
      description: newData.description,
    };

    editOrganism(editedOrg).then((res) => {
      if (res) {
        toast.success("Organism updated successfully");
      }
    });
  };

  return (
    <React.Fragment>
      <div className="flex flex-column w-full">
        <div className="flex w-full">
          <SectionHeading
            heading={"Organisms"}
            color={appColors.blocks.gray}
            textColor={appColors.blocks.black}
            customButtons={[
              {
                label: "New Organism",
                icon: "pi pi-plus",
                action: () => navigate("edit/"),
              },
            ]}
          />
        </div>

        <div className="flex w-full">
          <DataTable
            value={organisms}
            loading={displayLoading}
            editMode="row"
            dataKey="id"
            onRowEditComplete={(e) => handleEdit(e)}
          >
            <Column field="id" header="GUID" />
            <Column
              field="name"
              header="Name"
              editor={(options) => textEditor(options)}
            />

            <Column
              field="canonicalName"
              header="Canonical Name"
              editor={(options) => textEditor(options)}
            />
            <Column field="description" header="Description" />
            <Column field="createdAt" header="Created At" />
            <Column field="createdBy" header="Created By" />
            <Column
              rowEditor
              headerStyle={{ width: "10%", minWidth: "8rem" }}
              bodyStyle={{ textAlign: "center" }}
            />
          </DataTable>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(OrganismList);
