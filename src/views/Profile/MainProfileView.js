import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux';
import { ProfileAction } from '../../store/actions/Profile/UserActions';
import PostView from './PostView';
import ProfileHeaderForm from './ProfileFormData';
import SideLeftProfileView from './SideLeftProfileView';



export default function MainProfileView(props) { 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch( ProfileAction(props.match.params.id));    
    });


    return (
        <>  
            <ProfileHeaderForm {...props}/>     
            <div className="Profile-Wrapper">
                <div className="container">
                    <div className="row">
                        <SideLeftProfileView />
                        <PostView  {...props}/>
                    </div>
                </div>
            </div>
        </>
    
           
        
    )
}
