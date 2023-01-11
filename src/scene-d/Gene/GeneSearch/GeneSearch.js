import { observer } from "mobx-react-lite";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import React, { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import Loading from "../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { appColors } from "../../../colors";
import "./GeneDataTable.css";

const GeneSearch = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { fetchGeneList, displayLoading, genes, geneFunctionalCategories } =
    rootStore.geneStore;

  /* Local State Management */

  // const [globalFilter, setGlobalFilter] = useState(null);

  useEffect(() => {
    fetchGeneList();
  }, [fetchGeneList]); // eslint-disable-line react-hooks/exhaustive-deps

  /* local variables */

  // if (!displayLoading && genes.length >= 0) {
  //   let fcfilter = [...new Set(genes.map((g) => g.functionalCategory))];
  //   setFunctionalCategoryValues(fcfilter);
  // }

  const dt = useRef(null);
  // const FunctionalCategoryValues = [
  //   "information pathways",
  //   "lipid metabolism",
  //   "intermediary metabolism and respiration",
  // ];

  /* Table Body Templates */

  const AccessionNumberBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Accession Number</span>
        <NavLink to={"/d/gene/" + rowData.id}>
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

  const FunctionalCategoryFilter = (options) => (
    <Dropdown
      value={options.value}
      options={geneFunctionalCategories}
      onChange={(e) => options.filterApplyCallback(e.value)}
      //onChange={onFunctionalCategoryChange}
      itemTemplate={FunctionalCategoryItemTemplate}
      placeholder="Select a Category"
      className="p-column-filter"
      showClear
    />
  );

  /* Table Header  */
  // const header = (
  //   <div className="table-header">
  //     <span className="heading">
  //       (<i className="icon icon-conceptual icon-dna"></i>) H37Rv Genes
  //     </span>
  //     {/* <span className="p-input-icon-left">
  //       <i className="pi pi-search" />
  //       <InputText
  //         type="search"
  //         onInput={(e) => setGlobalFilter(e.target.value)}
  //         placeholder="Search"
  //       />
  //     </span> */}
  //   </div>
  // );

  /** Loading Overlay */
  if (displayLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-column min-w-full fadein animation-duration-500">
      <div className="flex w-full">
        <SectionHeading
          icon="icon icon-conceptual icon-dna"
          heading="H37Rv Genes"
          color={appColors.sectionHeadingBg.gene}
        />
      </div>
      <div className="flex w-full">
        <div className="card datatable-genes w-full">
          <DataTable
            ref={dt}
            value={genes}
            paginator
            rows={10}
            // header={header}
            className="min-w-fullp-datatable-genes"
            //globalFilter={globalFilter}
            emptyMessage="No genes found."
            filterDisplay="row"
          >
            <Column
              field="accessionNumber"
              header="Accession Number"
              body={AccessionNumberBodyTemplate}
              filter
              filterMatchMode="contains"
              filterPlaceholder="Search"
              className="narrow-column"
              sortable
            />

            <Column
              field="geneName"
              header="Gene Name"
              body={GeneNameBodyTemplate}
              filter
              filterMatchMode="contains"
              filterPlaceholder="Search"
              className="narrow-column"
              sortable
            />

            <Column
              field="function"
              header="Function"
              body={FunctionBodyTemplate}
              filter
              filterMatchMode="contains"
              filterPlaceholder="Search"
            />

            <Column
              field="product"
              header="Product"
              body={ProductBodyTemplate}
            />

            <Column
              field="functionalCategory"
              header="Functional Category"
              body={FunctionalCategoryBodyTemplate}
              filter
              filterElement={FunctionalCategoryFilter}
              showFilterMenu={false}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default observer(GeneSearch);
