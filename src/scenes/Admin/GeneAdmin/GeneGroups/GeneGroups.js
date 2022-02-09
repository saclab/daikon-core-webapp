import React from "react";
import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import history from "../../../../history";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import GeneGroupAdd from "./GeneGroupAdd";
import { Message } from "primereact/message";
import { Fieldset } from "primereact/fieldset";
import GeneGroupList from './GeneGroupList';

const GeneGroups = () => {
  const breadCrumbItems = [
    {
      label: "Genes Admin",
      command: () => {
        history.push("/admin/gene/");
      },
    },
    { label: "Gene Groups" },
  ];

  return (
    <div>
      <div className="p-mb-2" style={{ minWidth: "1000px" }}>
        <BreadCrumb model={breadCrumbItems} />
      </div>
      <div className="p-mb-2">
        <SectionHeading
          icon="icon icon-common icon-object-group"
          color="#1ABC9C"
          heading={"Gene Groups"}
        />

        <Card>
          <div>
            A gene group is a collection of genes that can result in creation of
            complex structures.
            <br />
            <hr />
            <Fieldset
              legend={"Create a Gene Group"}
              toggleable
              collapsed={true}
            >
              <Message
                severity="warn"
                text="A group can not be altered or deleted after creation."
              />
              <GeneGroupAdd />
            </Fieldset>
            <br />
            <Fieldset
              legend={"View Gene Groups"}
              toggleable
              collapsed={true}
            >
              <GeneGroupList />
            </Fieldset>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GeneGroups;
