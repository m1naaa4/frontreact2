import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux';
import { useParams } from 'react-router';

import $ from "jquery";



export default function SideLeftSettingView(props) { 
    const dispatch = useDispatch();
    const params = useParams();
    

    return (
        <>  

            <div className="col-md-4 col-lg-4 d-md-none d-lg-block">
              <div className="page-header">
                <h3>Paramètres Généraux</h3>
                <p>Enter details about the project <br/>to preceed further</p>
                <img src="/assets/images/offer-thumbnail.svg" alt=""/>
              </div>
            </div>

        </>
    
           
        
    )
}