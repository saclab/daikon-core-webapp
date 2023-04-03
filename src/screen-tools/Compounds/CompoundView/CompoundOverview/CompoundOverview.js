import _ from "lodash";
import { BreadCrumb } from "primereact/breadcrumb";
import { Fieldset } from "primereact/fieldset";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import SmilesView from "../../../../app/common/SmilesView/SmilesView";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { appColors } from "../../../../colors";
import CompoundOverviewEditExternalId from "./LocalComponents/CompoundOverviewEditExternalId";
import CompoundOverviewEditProperties from "./LocalComponents/CompoundOverviewEditProperties";
import CompoundOverviewGeneralInformation from "./LocalComponents/CompoundOverviewGeneralInformation";

const CompoundOverview = ({ selectedCompound }) => {
  const navigate = useNavigate();

  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

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
          <div className="flex flex-row gap-2">{project.projectName}</div>
        </li>
      );
    });

  let asProjectsWithBaseHits = selectedCompound.projectsWithBaseHits.map(
    (project) => {
      return (
        <li key={project.id + "base"}>
          <div className="flex flex-row gap-2">{project.projectName}</div>
        </li>
      );
    }
  );

  let inCEofProjects = selectedCompound.projectsWithCompoundEvolution.map(
    (project) => {
      return (
        <li key={project.id + "pri"}>
          <div className="flex flex-row gap-2">{project.projectName}</div>
        </li>
      );
    }
  );

  let asHitsInScreen = selectedCompound.screen.map((screen) => {
    return (
      <li key={screen.id + "pri"}>
        <div className="flex flex-row gap-2">
          {screen.screenName} [{_.startCase(screen.screenType)}]
        </div>
      </li>
    );
  });

  /* S E C T IO N S */
  const basicInformation = (
    <React.Fragment>
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
          <Fieldset legend="In compound evolution of projects">
            <ul>{inCEofProjects}</ul>
          </Fieldset>
        </div>

        <div className="flex">
          <Fieldset legend="As hits in screens">
            <ul>{asHitsInScreen}</ul>
          </Fieldset>
        </div>
      </div>
    </React.Fragment>
  );
  const editProperties = (
    <React.Fragment>
      <div className="flex">
        <Fieldset legend="Edit">
          <CompoundOverviewEditProperties selectedCompound={selectedCompound} />
        </Fieldset>
      </div>
    </React.Fragment>
  );

  const editExternalIdDisplay = (
    <React.Fragment>
      <div className="flex">
        <Fieldset legend="Edit External Id">
          <CompoundOverviewEditExternalId selectedCompound={selectedCompound} />
        </Fieldset>
      </div>
    </React.Fragment>
  );

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
            color={appColors.sectionHeadingBg.compounds}
          />
        </div>
        {basicInformation}
        <div className="flex w-full">
          {editProperties}
          {user.roles.includes("projectManager") ? editExternalIdDisplay : ""}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CompoundOverview;
