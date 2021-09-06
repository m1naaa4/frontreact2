import React from 'react'
import { useParams } from 'react-router';

import SideLeftSettingView from './SideRightSettingView';
import SideRightSettingView from './SideLeftSettingView';



export default function MainView(props) { 
    const params = useParams();
    

    return (
        <>  
            <div class="Page-Wrapper">
             <div class="container">
                <div class="offer-wizard-wrapper">
                    <div class="row">
                        <SideLeftSettingView />
                        <SideRightSettingView/>
                    </div>
                </div>
             </div>
            </div>
        </>
    
           
        
    )
}
