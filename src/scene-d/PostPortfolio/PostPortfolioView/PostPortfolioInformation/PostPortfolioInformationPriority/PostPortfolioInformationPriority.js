import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import React, { useState } from "react";
import PostPortfolioInformationProirityModify from "./PostPortfolioInformationProirityModify/PostPortfolioInformationProirityModify";

const PostPortfolioInformationPriority = ({ project }) => {
  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
      <div className="flex">
        <div
          className="flex flex-column m-3 p-3"
          style={{ textAlign: "center", lineHeight: "0.5" }}
        >
          Priority
          <h3>{project.teamPriority}</h3>
        </div>
        <div
          className="flex flex-column m-3 p-3"
          style={{ textAlign: "center", lineHeight: "0.5" }}
        >
          Probability
          <h3>{project.teamProbability}</h3>
        </div>
        <div
          className="flex flex-column m-3 p-3"
          style={{ textAlign: "center", lineHeight: "0.5" }}
        >
          <Button
            icon="pi pi-arrow-left"
            onClick={() => setVisible(true)}
            className="flex m-2 p-button-secondary"
          />
        </div>
      </div>

      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
      >
        <PostPortfolioInformationProirityModify
          closeSidebar={() => setVisible(false)}
        />
        <hr />
      </Sidebar>
    </React.Fragment>
  );
};

export default PostPortfolioInformationPriority;
