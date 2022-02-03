import React from "react";
import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import history from "../../../../history";
import { Card } from 'primereact/card';
import { RadioButton } from 'primereact/radiobutton';

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

        <Card subTitle={"Create a Gene Group"}>
          <div className="field-radiobutton">
            <table>
              <tr>
                <td>
                  
                </td>
                <td>
                  Simple Proteins are large biomolecules and macromolecules that
                  comprise one or more long chains of amino acid residues.
                </td>
              </tr>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GeneGroups;
