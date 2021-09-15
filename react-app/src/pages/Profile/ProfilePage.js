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


