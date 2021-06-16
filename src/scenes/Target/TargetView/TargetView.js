import React, { useState, useEffect, useRef, useContext } from "react";
import { Menu } from "primereact/menu";
import { TabView, TabPanel } from "primereact/tabview";
import TargetPromotionForm from "./TargetPromotionForm/TargetPromotionForm";
import TargetScorecard from "./TargetScorecard/TargetScorecard";


const TargetView = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    
    
    const items = [
        {
          label: "Sections",
          items: [
            {
              label: "Target Promotion Form",
              icon: "ri-book-open-line",
              command: () => {
                setActiveIndex(0);
              },
              
            },
    
            
            {
              label: "Target Scorecard",
              icon: "ri-git-repository-private-fill",
              command: () => {
                setActiveIndex(1);
              },
             
            },
          ],
        },
        
      ];
      return (
        <React.Fragment>
          
          <div className="p-d-flex">
            <div className="p-mr-2">
              <Menu model={items} />
            </div>
                         
               
                <div className="p-mb-2">
                <TabView
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                >
                    <TabPanel header="Header I" headerClassName="hide">
                      <TargetPromotionForm />                                              
                    </TabPanel>
                    
                    <TabPanel header="Header II" headerClassName="hide">
                      <TargetScorecard />
                    </TabPanel>


                  </TabView>
                </div>
              
            </div>
         
        </React.Fragment>
      );
      
    };
    
    


export default TargetView;
