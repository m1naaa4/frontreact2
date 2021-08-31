import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux';
import { useParams } from 'react-router';
import { ProfileAction } from '../../store/actions/Profile/UserActions';
import PostView from './PostView';
import ProfileHeaderForm from './ProfileFormData';
import SideLeftProfileView from './SideLeftProfileView';
import SideRightProfileView from './SideRightProfileView';
import $ from "jquery";



export default function MainProfileView(props) { 
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        dispatch( ProfileAction(params.id)); 
        
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
