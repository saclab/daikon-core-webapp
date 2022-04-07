import React, { useState, useRef, useEffect, useContext } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import PortfolioInformationProirityModify from "./PostPortfolioInformationProirityModify/PostPortfolioInformationProirityModify";

const PostPortfolioInformationPriority = ({ project }) => {
  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
      <div className="p-d-flex" style={{ height: "45px" }}>
        <div
          className="p-mr-2"
          style={{ textAlign: "center", lineHeight: "0.5", width: "50%" }}
        >
          Priority
          <h3>{project.teamPriority}</h3>
        </div>
        <div
          className="p-mr-2"
          style={{ textAlign: "center", lineHeight: "0.5", width: "50%" }}
        >
          Probability
          <h3>{project.teamProbability}</h3>
        </div>
        <Button
          icon="pi pi-arrow-left"
          onClick={() => setVisible(true)}
          className="p-mr-2"
        />
      </div>

      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
      >
        <PortfolioInformationProirityModify closeSidebar={() => setVisible(false)}/>
        <hr />
      </Sidebar>
    </React.Fragment>
  );
};

export default PostPortfolioInformationPriority;
