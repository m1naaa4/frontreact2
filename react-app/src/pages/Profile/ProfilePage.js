import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
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
            dispatch( ProfileAction(params.id));
        console.log('params.id', id)
    },[id]);

    return (         
        <PostView  {...props}/>
    )
}


