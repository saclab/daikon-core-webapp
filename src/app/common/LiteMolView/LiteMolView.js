import LiteMol from "litemol";
import React, { useEffect } from "react";
import "./LiteMol.css";

const LiteMolView = ({ id, url, format }) => {
  let target = null;
  useEffect(() => {
    const plugin = LiteMol.Plugin.create({
      target: target,
      viewportBackground: "#fff",
      layoutState: {
        hideControls: true,
        isExpanded: false,
      },
    });

    plugin.loadMolecule({
      id: id,
      url: url,
      format: format, // default
    });

    console.log("loaded molview");

    
  }, [format, id, target, url]);

  return (
    <div
      id="litemol"
      style={{
        width: "600px",
        height: "600px",
        marginTop: "0px",
        position: "relative",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
      ref={(ref) => (target = ref)}
    ></div>
  );
};

export default LiteMolView;
