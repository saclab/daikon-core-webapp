import React from 'react'

const ProjectStatus = ({ status }) => {
  console.log(status)
  if (status === "Terminated") {
    return (
      <div>
        <div
          className="flex gap-5 bg-black-alpha-70 text-white mb-3 flex align-items-center justify-content-center"
          style={{ minWidth: "200px", minHeight: "30px" }}>
          <h3><i class="icon icon-common icon-close"></i></h3>
          <h3> Project Terminated</h3></div>
      </div>
    )
  }

  return <React.Fragment></React.Fragment>
  
}

export default ProjectStatus