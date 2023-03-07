import { BreadCrumb } from "primereact/breadcrumb";
import { Fieldset } from "primereact/fieldset";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import SmilesView from "../../../../app/common/SmilesView/SmilesView";
import CompoundOverviewGeneralInformation from "./LocalComponents/CompoundOverviewGeneralInformation";

const CompoundOverview = ({ selectedCompound }) => {
  const navigate = useNavigate();

  const breadCrumbItems = [
    { label: "Tools" },
    {
      label: "Compounds",
      command: () => {
        navigate("/tools/compounds/");
      },
    },
    {
      label: selectedCompound.externalCompoundIds,
      command: () => {
        navigate(`/tools/compounds/${selectedCompound.id}`);
      },
    },
    { label: "Overview" },
  ];

  let asPrimaryStructureOfProjects =
    selectedCompound.projectsWithPrimaryStructure.map((project) => {
      return (
        <li key={project.id + "pri"}>
          <NavLink to={"/d/portfolio/" + project.id}>
            {project.projectName}
          </NavLink>
        </li>
      );
    });

  let asProjectsWithBaseHits = selectedCompound.projectsWithBaseHits.map(
    (project) => {
      return <li key={project.id + "base"}>{project.projectName}</li>;
    }
  );

  let asHitsInScreen = selectedCompound.screen.map((screen) => {
    return (
      <li key={screen.id + "screen"}>
        {screen.screenName}, {screen.screenType}
      </li>
    );
  });

  return (
    <React.Fragment>
      <div className="flex flex-column gap-2 w-full">
        <div className="flex w-full pb-2">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-common icon-math"
            heading={selectedCompound.externalCompoundIds}
            displayHorizon={false}
            // color={appColors.sectionHeadingBg.portfolio}
          />
        </div>
        <div className="flex w-full">
          <div className="flex">
            <Fieldset legend="Details">
              <CompoundOverviewGeneralInformation
                selectedCompound={selectedCompound}
              />
            </Fieldset>
            <div className="flex">
              <Fieldset legend="Structure">
                <SmilesView
                  smiles={selectedCompound.smiles}
                  width="600"
                  height="350"
                />
              </Fieldset>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex">
            <Fieldset legend="As primary structure of projects">
              <ul>{asPrimaryStructureOfProjects}</ul>
            </Fieldset>
          </div>

          <div className="flex">
            <Fieldset legend="As base hits of projects">
              <ul>{asProjectsWithBaseHits}</ul>
            </Fieldset>
          </div>

          <div className="flex">
            <Fieldset legend="As hits in screens">
              <ul>{asHitsInScreen}</ul>
            </Fieldset>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CompoundOverview;
