import React from 'react'

import SideLeftSettingView from './SideRightSettingView';
import SideRightSettingView from './SideLeftSettingView';



export default function MainView(props) { 
    

    return (
        <>  
            <div className="Page-Wrapper">
             <div className="container">
                <div className="offer-wizard-wrapper">
                    <div className="row">
                        <SideLeftSettingView />
                        <SideRightSettingView/>
                    </div>
                </div>
             </div>
            </div>
        </>
    
           
        
    )
}
