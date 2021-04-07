import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux';
import { useParams } from 'react-router';
import { ProfileAction } from '../../store/actions/Profile/UserActions';
import PostView from './PostView';
import ProfileHeaderForm from './ProfileFormData';
import SideLeftProfileView from './SideLeftProfileView';
import SideRightProfileView from './SideRightProfileView';



export default function MainProfileView(props) { 
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        dispatch( ProfileAction(params.id));    
    });


    return (
        <>  
            <ProfileHeaderForm {...props}/>     
            <div className="Profile-Wrapper">
                <div className="container">
                    <div className="row">
                        <SideLeftProfileView />
                        <PostView  {...props}/>
                        <SideRightProfileView/>
                    </div>
                </div>
            </div>
        </>
    
           
        
    )
}
