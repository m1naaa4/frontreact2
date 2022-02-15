import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { ProfileAction } from '../../store/actions/Profile/UserActions';
import PostView from './PostView';
import $ from "jquery";



export default function HomeProfileView(props) { 
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    console.log('yyyyyyy', history)
    $(window).on('load', function(){
        dispatch( ProfileAction(params.id));
    });

    useEffect(() => {
        console.log('params.id', params.id)
        // dispatch( ProfileAction(params.id));
    },params.id)

    useEffect(() => {
        // dispatch( ProfileAction(params.id)); 
    });

    return (
               
        <PostView  {...props}/>
           
    )
}
