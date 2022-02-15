import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux';
import { useParams } from 'react-router';
import $ from "jquery";
import CvView from './CvView';
import { ProfileAction } from '../../../store/actions/Profile/UserActions';
import ProfileHeaderForm from '../ProfileFormData';
import SideLeftProfileView from '../SideLeftProfileView';
import SideRightProfileView from '../SideRightProfileView';



export default function MainCvthequeView(props) { 
    const dispatch = useDispatch();
    const params = useParams();
    $(window).on('load', function(){
        dispatch( ProfileAction(params.id));
    });
    useEffect(() => {
        //dispatch( ProfileAction(params.id)); 
        
        var width = $(window).width(); 
    });

    return (
            
        <CvView  {...props}/>
                       
    )
}
