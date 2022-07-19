import React, { useEffect, useContext } from "react";
import _ from "lodash";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Loading from "../../../../app/layout/Loading/Loading";
import { MultiSelect } from "primereact/multiselect";

const GeneGroupAdd = () => {
  const rootStore = useContext(RootStoreContext);
  const { fetchGeneList, displayLoading, genes } = rootStore.geneStore;
  const { creatingGeneGroup, createGeneGroup } = rootStore.geneStoreAdmin;

  useEffect(() => {
    console.log("GeneGroup: fetchGeneList()");
    fetchGeneList();
  }, [fetchGeneList]); // eslint-disable-line react-hooks/exhaustive-deps

  const types = [{ name: "protein-complex" }];

  const formik = useFormik({
    initialValues: {
      name: "",
      type: null,
      genes: [],
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "A group name is required.";
      }
      if (!data.type) {
        errors.type = "A group type is required.";
      }
      if (data.genes.length < 2) {
        errors.genes = "More than one genes are required to form a group";
      }

      return errors;
    },
    onSubmit: (data) => {
      // data["targetID"] = selectedTarget.id;
      // data["orgId"] = data.org.id;
      // console.log(data);
      // promoteTargetToScreen(data).then((res) => {
      //   if (res !== null) {
      //     closeSidebar();
      //   }
      // });
      //setShowMessage(true);
      //history.push()
      //formik.resetForm();

      var formattedGenes = data.genes.map((gene) => {
        return { GeneId: gene.id };
      });

      var formattedData = {
        Name: data.name,
        Type: data.type.name,
        Genes: formattedGenes,
      };

      console.log(formattedData);
      createGeneGroup(formattedData).then((res) => {
        if (res !== null) {
          formik.resetForm();
        }
      });
    },
  });

  const isFormFieldValid = (field) =>
    !!(formik.touched[field] && formik.errors[field]);
  const getFormErrorMessage = (field) => {
    return (
      isFormFieldValid(field) && (
        <small className="p-error">{formik.errors[field]}</small>
      )
    );
  };

  /** Loading Overlay */
  if (displayLoading || creatingGeneGroup) {
    return <Loading />;
  }

  var geneList = [];

  if (!displayLoading && genes.length !== 0) {
    genes.forEach((gene) => {
      geneList.push(_.pick(gene, ["accessionNumber", "id"]));
    });
  }

  return (
    <div>
      <div className="card">
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="p-field p-col-6 p-md-6">
            <label
              htmlFor="name"
              className={classNames({
                "p-error": isFormFieldValid("name"),
              })}
            >
              <i class="icon icon-common icon-object-group" /> Gene Group Name
            </label>
            <InputText
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              autoFocus
              className={classNames({
                "p-invalid": isFormFieldValid("name"),
              })}
            />
            {getFormErrorMessage("name")}
          </div>

          <div className="p-field p-col-6 p-md-6">
            <label
              htmlFor="type"
              className={classNames({
                "p-error": isFormFieldValid("type"),
              })}
            >
              Type
            </label>
            <Dropdown
              id="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              options={types}
              optionLabel="name"
              className={classNames({
                "p-invalid": isFormFieldValid("type"),
              })}
            />
            {getFormErrorMessage("type")}
          </div>

          <div className="p-field p-col-6 p-md-6">
            <label
              htmlFor="genes"
              className={classNames({
                "p-error": isFormFieldValid("genes"),
              })}
            >
              Genes
            </label>
            <MultiSelect
              id="genes"
              value={formik.values.genes}
              onChange={formik.handleChange}
              options={geneList}
              optionLabel="accessionNumber"
              filter
              showSelectAll={false}
              className={classNames({
                "p-invalid": isFormFieldValid("genes"),
              })}
            />
            {getFormErrorMessage("genes")}
          </div>

          <div className="p-field p-col-6 p-md-6">
            <Button
              icon="icon icon-common icon-database-submit"
              type="submit"
              label="Create Gene Group"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default observer(GeneGroupAdd);
