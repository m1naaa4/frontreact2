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
        
        var width = $(window).width();

      if((width >= 992)){
        var fixRight = $('.Right-Side').offset().top + $('.Right-Side').outerHeight() - window.innerHeight;       // get initial position of the element
        $(window).scroll(function() {                  // assign scroll event listener
            var currentScrolll = $(window).scrollTop(); // get current position
            if (currentScrolll >= fixRight) {           // apply position: fixed if you
                $('.Right-Side').css({                      // scroll to that element or below it
                    position: 'fixed',
                    bottom: '15px',
                    width: '255',
                });
            } else {                                   // apply position: static
                $('.Right-Side').css({                      // if you scroll above it
                    position: 'static'
                });
            }
        });
    }
    });

    return (
               
        <PostView  {...props}/>
           
    )
}
