import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { RootStoreContext } from '../../../../../app/stores/rootStore';



const ProjectSettingsTerminate = ({ project }) => {

  const rootStore = useContext(RootStoreContext);
  const {
    terminatingProject,
    terminateProject,
  } = rootStore.projectStore;

  const [visibleTerminationDialog, setVisibleTerminationDialog] = useState(false);
  const [termTextValue, setTermTextValue] = useState('');
  const [activateTerminateButton, setActivateTerminateButton] = useState(false);



  if (project.status === "Terminated") {
    return (
      <div style={{
        borderRadius: '5px',
        borderColor: '#B7950B',
        borderStyle: 'solid',
        padding: '20px',
        borderWidth: '1px'
      }}>
        The project is terminated
      </div>
    )
  }

  if (project.status === "Complete") {
    return (
      <div style={{
        borderRadius: '5px',
        borderColor: '#B7950B',
        borderStyle: 'solid',
        padding: '20px',
        borderWidth: '1px'
      }}>
        The project is complete and has reached it's end of life cycle.
      </div>
    )
  }

  var checkTermText = (val) => {
    setTermTextValue(val);
    if (val === project.projectName) {
      setActivateTerminateButton(true);
    }
    else {
      setActivateTerminateButton(false)
    }

  }


  return (
    <div><div style={{
      borderRadius: '5px',
      borderColor: '#B7950B',
      borderStyle: 'solid',
      padding: '20px',
      borderWidth: '1px'
    }}>
      <b>Terminate Project</b>
      <p>Terminating this project will end it's lifecycle
        and the project will be archived. <br />
        This is irreversible.</p>
      <Button label="Terminate" className="p-button-outlined p-button-danger" onClick={() => { setTermTextValue(''); setVisibleTerminationDialog(true) }} />
    </div>
      <Dialog visible={visibleTerminationDialog} style={{ width: '700px' }} onHide={() => setVisibleTerminationDialog(false)}
        header="Terminate Project Confirmation" icon="pi pi-exclamation-triangle" >
        Type '<b>{project.projectName}</b>' in the text box and click 'Terminate' to terminate the project.
        <br />
        <br />
        <div className="p-formgroup-inline">
          <div className="p-field">
            <InputText value={termTextValue} onChange={(e) => checkTermText(e.target.value)} />
          </div>
          <div className="p-field">
            <Button label="Terminate"
              className="p-button-outlined p-button-danger"
              disabled={!activateTerminateButton}
              loading={terminatingProject}
              onClick={() => terminateProject(project)} />
          </div>
        </div>


      </Dialog>
    </div>
  )
}

export default observer(ProjectSettingsTerminate)