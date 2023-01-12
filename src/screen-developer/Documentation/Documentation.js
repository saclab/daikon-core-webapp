import React from "react";

const Documentation = () => {
  return (
    <div className="flex w-full pl-6">
      <div
        className="surface-0 p-4 shadow-2 border-round"
        style={{ width: "100%" }}
      >
        <div className="text-3xl font-medium text-900 mb-3">Documentation</div>
        <div className="font-medium text-500 mb-3">
          Daikon is an Open Source Project
        </div>
        <div className="border-2 border-dashed border-300 mb-2 p-2">
          The app documentation is maintained at :{" "}
          <a href="https://saclab.github.io/daikon/" target="_blank">
            https://saclab.github.io/daikon/
          </a>
        </div>
        <div className="border-2 border-dashed border-300 mb-2 p-2">
          Frontend Gitub Repo :{" "}
          <a
            href="https://github.com/saclab/daikon-core-webapp"
            target="_blank"
          >
            https://github.com/saclab/daikon-core-webapp
          </a>
        </div>
        <div className="border-2 border-dashed border-300 mb-2 p-2">
          Backend Gitub Repo :{" "}
          <a
            href="https://github.com/saclab/daikon-core-server"
            target="_blank"
          >
            https://github.com/saclab/daikon-core-server
          </a>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
