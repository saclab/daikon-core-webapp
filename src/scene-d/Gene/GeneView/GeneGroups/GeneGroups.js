import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Fieldset } from "primereact/fieldset";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import EmbeddedHelp from "../../../../app/common/EmbeddedHelp/EmbeddedHelp";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import Unauthorized from "../../../../app/common/Unauthorized/Unauthorized";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import GeneGroupAdd from "./GeneGroupAdd";
import GeneGroupList from "./GeneGroupList";

const GeneGroups = () => {
  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  if (!user.roles.includes("admin")) {
    return <Unauthorized />;
  }

  const breadCrumbItems = [
    {
      label: "Genes",
      command: () => {
        navigate("/d/gene/");
      },
    },
    {
      label: "Admin Section",
    },
    { label: "Gene Groups" },
  ];

  return (
    <React.Fragment>
      <div className="flex flex-column w-full">
        <div className="flex w-full pb-2">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-common icon-object-group"
            color="#1ABC9C"
            heading={"Gene Groups"}
          />
        </div>
        <div className="flex w-full">
          <Card className="w-full">
            <div className="flex flex-column gap-2">
              <div className="flex">
                <EmbeddedHelp>
                  A gene group is a collection of genes that forms a Protein
                  Complex.
                  <br />
                  This Protein Complex can be promoted to a target.
                </EmbeddedHelp>
              </div>

              <div className="flex w-full">
                <Fieldset
                  legend={"Create a Gene Group"}
                  toggleable
                  collapsed={true}
                  className="w-full"
                >
                  <div className="flex mb-2">
                    <EmbeddedHelp>
                      CAUTION :{" "}
                      <b>
                        A group can not be altered or deleted after creation.
                      </b>
                    </EmbeddedHelp>
                  </div>
                  <div className="flex">
                    <GeneGroupAdd />
                  </div>
                </Fieldset>
              </div>

              <div className="flex w-full">
                <Fieldset
                  legend={"View Gene Groups"}
                  toggleable
                  collapsed={false}
                  className="w-full"
                >
                  <GeneGroupList />
                </Fieldset>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GeneGroups;
