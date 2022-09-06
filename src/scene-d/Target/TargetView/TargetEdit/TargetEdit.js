import React, { useEffect, useRef, useContext } from "react";
import { Menu } from "primereact/menu";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Loading from "../../../../app/layout/Loading/Loading";
import { BreadCrumb } from "primereact/breadcrumb";
import { Toast } from "primereact/toast";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import NotFound from "../../../../app/layout/NotFound/NotFound";
import { InputText } from "primereact/inputtext";
import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { appColors } from "../../../../colors";
import { classNames } from "primereact/utils";
import { Formik } from "formik";
import Unauthorized from "../../../../app/common/Unauthorized/Unauthorized";

const TargetEdit = ({ id }) => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const rootStore = useContext(RootStoreContext);
  const { fetchTargetAdmin, selectedTarget, editTargetAdmin, displayLoading, editingTarget } =
    rootStore.targetStoreAdmin;

  useEffect(() => {
    console.log("EFFECT");

    if (selectedTarget === null || selectedTarget.id !== id) {
      fetchTargetAdmin(id);
    }
  }, [id, selectedTarget, fetchTargetAdmin]);



  const formikValidate = (data) => {
    let errors = {};

    if (!data.bucket) {
      errors.bucket = "Bucket  is required.";
    }
    return errors;
  };

  if (displayLoading || editingTarget) {
    console.log("Loading.....");
    return <Loading />;
  }

  const onFormikSubmit = (data) => {
    console.log(data);
    data.id = selectedTarget.id;
    editTargetAdmin(data).then(fetchTargetAdmin(id));
    //   add(data).then((res) => {
    //     if (res !== null) {
    //       closeSidebar();
    //       formik.resetForm();
    //     }
    //   });
  };

  // const isFormfield w-3Valid = (element) =>
  //   !!(formik.touched[element] && formik.errors[element]);
  // const getFormErrorMessage = (element) => {
  //   return (
  //     isFormfield w-3Valid(element) && (
  //       <small className="p-error">{formik.errors[element]}</small>
  //     )
  //   );
  // };

  const { user } = rootStore.userStore;
  if (!user.roles.includes("admin")) {
    return <Unauthorized />;
  }



  if (selectedTarget !== null) {
    const breadCrumbItems = [
      {
        label: "Targets",
        command: () => {
          navigate("/d/target/");
        },
      },
      {
        label: selectedTarget.name,
        command: () => {
          navigate(`/d/target/${selectedTarget.id}`);
        },
      },
      { label: "Edit" },
    ];

    console.log(selectedTarget);

    return (
      <React.Fragment>
        <Toast ref={toast} />

        <div className="flex flex-column w-full">
          <div className="flex w-full pb-2">
            <BreadCrumb model={breadCrumbItems} />
          </div>

          <div className="flex w-full pb-2">
            <SectionHeading
              icon="icon icon-common icon-target"
              heading={selectedTarget.name}
              targetName={selectedTarget.name}
              displayHorizon={true}
              color={appColors.sectionHeadingBg.target}
            />
          </div>

          <div className="flex w-full pb-2">
            <div className="card w-full">

              <Formik
                initialValues={{
                  bucket: selectedTarget.bucket || "",
                  likeScore: selectedTarget.likeScore,
                  likeComplete: selectedTarget.likeComplete,
                  impactScore: selectedTarget.impactScore,
                  impactComplete: selectedTarget.impactComplete,
                  screeningComplete: selectedTarget.screeningComplete,
                  screeningScore: selectedTarget.screeningScore,
                  htsFeasibility: selectedTarget.htsFeasibility,
                  sbdFeasibility: selectedTarget.sbdFeasibility,
                  progressibility: selectedTarget.progressibility,
                  safety: selectedTarget.safety,
                  structureComplete: selectedTarget.structureComplete,
                  structureScore: selectedTarget.structureScore,
                  vulnerabilityRank: selectedTarget.vulnerabilityRank,
                  vulnerabilityRatio: selectedTarget.vulnerabilityRatio,
                }}
                validate={formikValidate}
                onSubmit={onFormikSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="flex gap-3">
                      <div className="flex flex-column w-full">
                        <div className="field">
                          <label htmlFor="bucket">Bucket*</label>
                          <InputText
                            id="bucket"
                            value={values.bucket}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoFocus
                          />
                          {errors.bucket && touched.bucket && errors.bucket}
                        </div>

                        <div className="field">
                          <label htmlFor="likeScore">Like Score</label>
                          <InputText
                            id="likeScore"
                            step={0.25}
                            value={values.likeScore}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.likeScore &&
                            touched.likeScore &&
                            errors.likeScore}
                        </div>

                        <div className="field">
                          <label htmlFor="likeComplete">Like Complete</label>
                          <InputText
                            id="likeComplete"
                            step={0.25}
                            value={values.likeComplete}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.likeComplete &&
                            touched.likeComplete &&
                            errors.likeComplete}
                        </div>

                        <div className="field">
                          <label htmlFor="impactScore">Impact Score</label>
                          <InputText
                            id="impactScore"
                            step={0.25}
                            value={values.impactScore}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.impactScore &&
                            touched.impactScore &&
                            errors.impactScore}
                        </div>

                        <div className="field">
                          <label htmlFor="impactComplete">Impact Complete</label>
                          <InputText
                            id="impactComplete"
                            step={0.25}
                            value={values.impactComplete}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.impactComplete &&
                            touched.impactComplete &&
                            errors.impactComplete}
                        </div>

                        <div className="field">
                          <label htmlFor="screeningComplete">
                            Screening Complete
                          </label>
                          <InputText
                            id="screeningComplete"
                            step={0.25}
                            value={values.screeningComplete}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.screeningComplete &&
                            touched.screeningComplete &&
                            errors.screeningComplete}
                        </div>

                        <div className="field">
                          <label htmlFor="screeningScore">Screening Score</label>
                          <InputText
                            id="screeningScore"
                            step={0.25}
                            value={values.screeningScore}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.screeningScore &&
                            touched.screeningScore &&
                            errors.screeningScore}
                        </div>

                        <div className="field">
                          <label htmlFor="htsFeasibility">HTS Feasibility</label>
                          <InputText
                            id="htsFeasibility"
                            step={0.25}
                            value={values.htsFeasibility}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.htsFeasibility &&
                            touched.htsFeasibility &&
                            errors.htsFeasibility}
                        </div>
                      </div>

                      <div className="flex flex-column w-full">


                        <div className="field">
                          <label htmlFor="sbdFeasibility">SBD Feasibility</label>
                          <InputText
                            id="sbdFeasibility"
                            step={0.25}
                            value={values.sbdFeasibility}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.sbdFeasibility &&
                            touched.sbdFeasibility &&
                            errors.sbdFeasibility}
                        </div>

                        <div className="field">
                          <label htmlFor="progressibility">Progressibility</label>
                          <InputText
                            id="progressibility"
                            step={0.25}
                            value={values.progressibility}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.progressibility &&
                            touched.progressibility &&
                            errors.progressibility}
                        </div>

                        <div className="field">
                          <label htmlFor="safety">Safety</label>
                          <InputText
                            id="safety"
                            step={0.25}
                            value={values.safety}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.safety && touched.safety && errors.safety}
                        </div>

                        <div className="field">
                          <label htmlFor="structureComplete">
                            Structure Complete
                          </label>
                          <InputText
                            id="structureComplete"
                            step={0.25}
                            value={values.structureComplete}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.structureComplete &&
                            touched.structureComplete &&
                            errors.structureComplete}
                        </div>

                        <div className="field">
                          <label htmlFor="structureScore">Structure Score</label>
                          <InputText
                            id="structureScore"
                            step={0.25}
                            value={values.structureScore}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.structureScore &&
                            touched.structureScore &&
                            errors.structureScore}
                        </div>

                        <div className="field">
                          <label htmlFor="vulnerabilityRank">
                            Vulnerability Rank
                          </label>
                          <InputText
                            id="vulnerabilityRank"
                            step={0.25}
                            value={values.vulnerabilityRank}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.vulnerabilityRank &&
                            touched.vulnerabilityRank &&
                            errors.vulnerabilityRank}
                        </div>

                        <div className="field">
                          <label htmlFor="vulnerabilityRatio">
                            Vulnerability Ratio
                          </label>
                          <InputText
                            id="vulnerabilityRatio"
                            step={0.25}
                            value={values.vulnerabilityRatio}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.vulnerabilityRatio &&
                            touched.vulnerabilityRatio &&
                            errors.vulnerabilityRatio}
                        </div>

                        <div className="field">

                          <Button
                            icon="icon icon-common icon-database-submit"
                            type="submit"
                            label="Save Changes"
                            className="p-button-secondary"
                            loading={editingTarget}
                          />

                        </div>

                      </div>
                    </div>




                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  return <NotFound />;
};

export default observer(TargetEdit);
