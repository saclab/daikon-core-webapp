import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import React from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import { appColors } from "../../../colors";
import OrganismList from "./OrganismList/OrganismList";

const Organisms = () => {
  const navigate = useNavigate();
  const breadCrumbItems = [
    {
      label: "App Organisms",
      command: () => {
        navigate("/admin/organisms/");
      },
    },

    { label: "Organisms & Strains" },
  ];

  return (
    <React.Fragment>
      <div className="flex flex-column gap-2 w-full">
        <div className="flex w-full">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-species icon-plasmodium"
            heading={"Organisms & Strains"}
            displayHorizon={false}
            color={appColors.blocks.darkGreen}
          />
        </div>

        <div className="flex w-full">
          <OrganismList />
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(Organisms);
