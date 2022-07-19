import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Dropdown } from 'primereact/dropdown';
import SimpleTargetAdminImporter from "./SimpleTargetAdminImporter";
import ComplexTargetAdminImporter from "./ComplexTargetAdminImporter";


const TargetAdminImporter = () => {

  const [selectedItem, setSelectedItem] = useState(null);

  const targetTypes = [
    { name: 'Simple Protein', code: 'PSim' },
    { name: 'Protein Complex', code: 'PCplx' },
  ];

  const onCityChange = (e) => {
    setSelectedItem(e.value);
    console.log(e.value)
  }

  var importer = () => {
    if (selectedItem?.code === 'PSim') return <SimpleTargetAdminImporter />
    else if (selectedItem?.code === 'PCplx') return <ComplexTargetAdminImporter />
  }

  return (
    <React.Fragment>
      <h2>Select Target Type:</h2>
      <Dropdown value={selectedItem} options={targetTypes} onChange={onCityChange} optionLabel="name" placeholder="Select a Target Type" />
      {importer()}
    </React.Fragment>
  );

};

export default observer(TargetAdminImporter);
