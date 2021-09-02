import React, { useState, useEffect, useRef, useContext } from "react";
import { Menu } from "primereact/menu";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Loading from "../../../../app/layout/Loading/Loading";
import { BreadCrumb } from "primereact/breadcrumb";
import { Toast } from "primereact/toast";
import { TabView, TabPanel } from "primereact/tabview";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import NotFound from "../../../../app/layout/NotFound/NotFound";
import { observer } from "mobx-react-lite";

const TargetAdminEditDetails = ({ match, history }) => {
  const toast = useRef(null);
  const rootStore = useContext(RootStoreContext);
  const { fetchTarget, target, displayLoading } = rootStore.targetStore;

  useEffect(() => {
    console.log("EFFECT");
    console.log(match.params.id);

    if (target === null) {
      fetchTarget(match.params.id);
    }
  }, [match.params.id, target, fetchTarget]);

  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "Edit Target Properties",
          icon: "ri-git-repository-private-fill",
        },
        {
          label: "",
          icon: "",
        },
      ],
    },
  ];

  if (displayLoading) {
    console.log("Loading.....");
    return <Loading />;
  }

  if (target !== null) {
    console.log("Target ID");
    console.log(target.id);
    const breadCrumbItems = [
      {
        label: "Target",
        command: () => {
          history.push("/admin/target/");
        },
      },
      { label: target.accessionNumber },
    ];

    return (
      <React.Fragment>
        <Toast ref={toast} />
        <br />
        <div className="p-d-flex">
          <div className="p-mr-2">
            <Menu model={items} />
          </div>
          <div className="p-mr-2">
            <div className="p-d-flex p-flex-column">
              <div className="p-mb-2">
                <BreadCrumb model={breadCrumbItems} />
              </div>
              <div className="p-mb-2">
                <SectionHeading
                  icon="icon icon-common icon-target"
                  heading={target.accessionNumber}
                  link={"some data"}
                />
              </div>
              <div className="p-mb-2">
                <TabView>
                  <TabPanel></TabPanel>
                  <TabPanel></TabPanel>
                  <TabPanel></TabPanel>
                </TabView>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  return <NotFound />;
};

export default observer(TargetAdminEditDetails);
