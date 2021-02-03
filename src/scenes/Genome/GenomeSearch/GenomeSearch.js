import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";

import "./DataTableGenomes.css";
import agent from "../../../app/api/agent";
import Loading from "../../../app/layout/Loading/Loading";
const GenomeSearch = () => {
  const [genomes, setGenomes] = useState(null);
  const [selectedFunctionalCategory, setFunctionalCategory] = useState(null);
  //const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);

  const FunctionalCategoryValues = [
    "information pathways",
    "lipid metabolism",
    "intermediary metabolism and respiration",
  ];

  useEffect(() => {
    agent.Genomes.list().then((response) => {
      // console.log("From Backend");
      // console.log(response);
      setGenomes(response);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFunctionalCategoryChange = (e) => {
    dt.current.filter(e.value, "functionalCategory", "equals");
    setFunctionalCategory(e.value);
  };

  const AccessionNumberBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Accession Number</span>
        <NavLink to={"/genomes/" + rowData.id}>
          {rowData.accessionNumber}
        </NavLink>
      </React.Fragment>
    );
  };

  const GeneNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Gene Name</span>
        {rowData.geneName}
      </React.Fragment>
    );
  };

  const FunctionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Function</span>
        {rowData.function}
      </React.Fragment>
    );
  };

  const ProductBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Product</span>
        {rowData.product}
      </React.Fragment>
    );
  };

  const FunctionalCategoryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Functional Category</span>
        <span>{rowData.functionalCategory}</span>
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

  if (genomes === null) {
    return <Loading />;
  }

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
          //globalFilter={globalFilter}
          emptyMessage="No genomes found."
        >
          <Column
            field="accessionNumber"
            header="Accession Number"
            body={AccessionNumberBodyTemplate}
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by Accession Number"
          />

          <Column
            field="geneName"
            header="Gene Name"
            body={GeneNameBodyTemplate}
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by Gene Name"
          />

          <Column
            field="function"
            header="Function"
            body={FunctionBodyTemplate}
          />

          <Column field="product" header="Product" body={ProductBodyTemplate} />

          <Column
            field="functionalCategory"
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
