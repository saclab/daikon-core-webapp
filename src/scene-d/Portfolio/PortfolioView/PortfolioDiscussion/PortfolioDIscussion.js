import { BreadCrumb } from "primereact/breadcrumb";
import React from "react";
import { useNavigate } from "react-router-dom";
import Discussion from "../../../../app/common/Discussion/Discussion";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import { appColors } from "../../../../colors";

const PortfolioDiscussion = ({ project }) => {
  const navigate = useNavigate();

  const breadCrumbItems = [
    {
      label: "Portfolio",
      command: () => {
        navigate("/d/portfolio/");
      },
    },
    {
      label: project.projectName,
      command: () => {
        navigate(`/d/portfolio/${project.id}`);
      },
    },
    { label: "Discussion" },
  ];

  return (
    <div className="flex flex-column w-full">
      <div className="flex w-full pb-2">
        <BreadCrumb model={breadCrumbItems} />
      </div>
      <div className="flex w-full">
        <SectionHeading
          icon="icon icon-common icon-analyse"
          heading={project.projectName + " | " + project?.currentStage}
          strainName={project?.strain?.name}
          targetName={
            project.targetName || project.screenName || project.projectName
          }
          displayHorizon={true}
          color={appColors.sectionHeadingBg.portfolio}
        />
      </div>
      <div className="flex w-full">
        <Discussion
          reference={project.targetName || project.projectName}
          section={project?.currentStage || "Portfolio"}
        />
      </div>
    </div>
  );
};

export default PortfolioDiscussion;
