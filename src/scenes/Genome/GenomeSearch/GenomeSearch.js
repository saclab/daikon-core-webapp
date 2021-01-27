import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { GenomeDataService } from "./Data/GenomeDataService";
import { Dropdown } from "primereact/dropdown";

import "./DataTableGenomes.css";
const GenomeSearch = () => {
  const [genomes, setGenomes] = useState(null);
  const [selectedFunctionalCategory, setFunctionalCategory] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);

  const FunctionalCategoryValues = [
    "information pathways",
    "lipid metabolism",
    "intermediary metabolism and respiration",
  ];

  const genomeDataService = new GenomeDataService();

  useEffect(() => {
    genomeDataService.getGenomes().then((data) => setGenomes(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFunctionalCategoryChange = (e) => {
    dt.current.filter(e.value, "FunctionalCategory", "equals");
    setFunctionalCategory(e.value);
  };

  const AccessionNumberBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Accession Number</span>
        <NavLink to={"/genomes/" + rowData.id}>
          {rowData.AccessionNumber}
        </NavLink>
      </React.Fragment>
    );
  };



  const GeneNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Gene Name</span>
          {rowData.GeneName}
      </React.Fragment>
    );
  };

  const FunctionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Function</span>
        {rowData.Function}
      </React.Fragment>
    );
  };

  const ProductBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Product</span>
        {rowData.Product}
      </React.Fragment>
    );
  };

  const FunctionalCategoryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Functional Category</span>
        <span>{rowData.FunctionalCategory}</span>
      </React.Fragment>
    );
  };

  const FunctionalCategoryItemTemplate = (option) => {
    return <span>{option}</span>;
  };

  const header = (
    <div className="table-header">
      <span className="heading">TB Genomes</span>
      {/* <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search"
        />
      </span> */}
    </div>
  );

  const FunctionalCategoryFilter = (
    <Dropdown
      value={selectedFunctionalCategory}
      options={FunctionalCategoryValues}
      onChange={onFunctionalCategoryChange}
      itemTemplate={FunctionalCategoryItemTemplate}
      placeholder="Select a Category"
      className="p-column-filter"
      showClear
    />
  );

  return (
    <div className="datatable-genomes">
      <div className="card">
        <DataTable
          ref={dt}
          value={genomes}
          paginator
          rows={10}
          header={header}
          className="p-datatable-genomes"
          globalFilter={globalFilter}
          emptyMessage="No genomes found."
          
        >
          <Column
            field="AccessionNumber"
            header="Accession Number"
            body={AccessionNumberBodyTemplate}
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by Accession Number"
          />

          <Column
            field="GeneName"
            header="Gene Name"
            body={GeneNameBodyTemplate}
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by Gene Name"
          />

          <Column
            field="Function"
            header="Function"
            body={FunctionBodyTemplate}
            
          />

          <Column
            field="Product"
            header="Product"
            body={ProductBodyTemplate}
           
          />

          <Column
            field="FunctionalCategory"
            header="Functional Category"
            body={FunctionalCategoryBodyTemplate}
            filter
            filterElement={FunctionalCategoryFilter}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default GenomeSearch;
