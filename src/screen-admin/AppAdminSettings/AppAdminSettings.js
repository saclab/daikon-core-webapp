import { observer } from "mobx-react-lite";
import React from "react";
import SectionHeading from '../../app/common/SectionHeading/SectionHeading';


const AppAdminSettings = () => {

  return (
    <div className="flex flex-column w-full fadein animation-duration-500">
      <div className="flex w-full">
        <SectionHeading
          icon="icon icon-common icon-cogs"
          heading="App Settings"
        // color={appColors.sectionHeadingBg.project}
        />
      </div>
    </div>
  );
};

export default observer(AppAdminSettings);
