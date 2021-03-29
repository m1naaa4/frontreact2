import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import FileUploadService from '../../helpers/FileUploadService';
import { ProfileAction } from '../../store/actions/Profile/UserActions';
import PostView from './PostView';
import ProfileHeaderForm from './ProfileFormData';
import SideLeftProfileView from './SideLeftProfileView';



export default function MainProfileView(props) { 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch( ProfileAction(props.match.params.id));    
    }, [dispatch]);


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
