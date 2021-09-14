import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { ProfileAction } from '../../store/actions/Profile/UserActions'
import FriendsList from '../../views/Profile/Friend/FriendsList'
import ProfileHeaderForm from '../../views/Profile/ProfileFormData'
import SideLeftProfileView from '../../views/Profile/SideLeftProfileView'
import SideRightProfileView from '../../views/Profile/SideRightProfileView'
import $ from "jquery";

export default function FriendPage(props) {

    const dispatch = useDispatch();
    const params = useParams();
    $(window).on('load', function(){
        dispatch( ProfileAction(params.id));
    });
    return (           
            <div className="Page-Wrapper Profile">
            <ProfileHeaderForm {...props}/>
            <div className="Profile-Wrapper">
                <div className="container">
                    <div className="row">
                        <SideLeftProfileView />
                        <FriendsList {...props}/>
                        <SideRightProfileView/>
                    </div>
                </div>
            </div>
        </div>
    )
}


