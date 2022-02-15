import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import { ProfileAction } from '../../store/actions/Profile/UserActions';
import $ from 'jquery'
import PostView from '../../views/Profile/PostView';

export default function ProfilePage(props) {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.id;
    
    $(window).on('load', function(){
        dispatch( ProfileAction(params.id));
    });

    useEffect(() => {
        // const previous = document.referrer;
        // const current = window.location.href;
        // console.log('yyyyyyy', previous)
        // console.log('yyyyyyy', current)
        // if (previous !== current) {
            dispatch( ProfileAction(params.id));
        // }
        console.log('params.id', id)
    },[id])

    useEffect(() => {
        // dispatch( ProfileAction(params.id)); 
    });

    return (         
        <PostView  {...props}/>
    )
}


