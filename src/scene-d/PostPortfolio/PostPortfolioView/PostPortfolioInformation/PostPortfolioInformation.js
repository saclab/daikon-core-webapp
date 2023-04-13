import { BreadCrumb } from "primereact/breadcrumb";
import { Fieldset } from "primereact/fieldset";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CompoundEvolutionTimeline from "../../../../app/common/CompoundEvolutionTimeline/CompoundEvolutionTimeline";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { appColors } from "../../../../colors";
import PostPortfolioInformationDates from "./LocalComponents/PostPortfolioInformationDates";
import PostPortfolioInformationGeneralInformation from "./LocalComponents/PostPortfolioInformationGeneralInformation";
import PostPortfolioInformationOrgs from "./LocalComponents/PostPortfolioInformationOrgs";
import PostPortfolioInformationPriority from "./PostPortfolioInformationPriority/PostPortfolioInformationPriority";
import "./ScrollPanel.css";

const PostPortfolioInformation = ({ id, project }) => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "Post Portfolio",
      command: () => {
        navigate("/d/portfolio/");
      },
    },
    {
      label: project.projectName,
      command: () => {
        navigate(`/d/post-portfolio/${project.id}`);
      },
    },
    { label: "Information" },
  ];

  return (
    <React.Fragment>
      {/* First div for general information and dates */}

      <div className="flex flex-column gap-2 w-full">
        <div className="flex w-full pb-2">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-common icon-drug"
            heading={project.projectName + " | " + project?.currentStage}
            strainName={project?.strain?.name}
            targetName={
              project.targetName || project.screenName || project.projectName
            }
            displayHorizon={true}
            color={appColors.sectionHeadingBg.postPortfolio}
          />
        </div>
        <div className="flex w-full">
          <div className="flex">
            <Fieldset legend="Project Information">
              <PostPortfolioInformationGeneralInformation project={project} />
            </Fieldset>
          </div>
          <div className="flex-column w-full">
            <div className="flex w-full pb-2">
              <Fieldset className="w-full" legend="Project Dates">
                <PostPortfolioInformationDates project={project} />
              </Fieldset>
            </div>
            <div className="flex w-full">
              <Fieldset legend="Project Team P/P">
                <PostPortfolioInformationPriority project={project} />
              </Fieldset>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <Fieldset legend="Participating Organizations">
            <PostPortfolioInformationOrgs project={project} />
          </Fieldset>
        </div>

        <div className="flex w-full">
          <Fieldset legend="Compound Evolution">
            <CompoundEvolutionTimeline
              project={project}
              disableAdd={
                ["IND", "P1"].includes(project.currentStage) ? false : true
              }
              enableEdit={user.roles.includes("admin")}
            />
          </Fieldset>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostPortfolioInformation;
