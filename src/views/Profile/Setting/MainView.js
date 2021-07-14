import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux';
import { useParams } from 'react-router';

import $ from "jquery";
import SideLeftSettingView from './SideRightSettingView';
import SideRightSettingView from './SideLeftSettingView';



export default function MainView(props) { 
    const dispatch = useDispatch();
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
