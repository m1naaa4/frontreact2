import React, {useState} from 'react';
import {BrowserRouter, useParams} from 'react-router-dom';
import Routes from './Routes';

import { useDispatch, useSelector } from "react-redux";
import PusherService from "./services/Pusher";
import { ErrorBoundary } from './Errors/ErrorBoundary';


function App() {
    const pusher = new PusherService();
    const [audio] = useState(new Audio('https://dadupadisque.ams3.digitaloceanspaces.com/audio/notification.mp3'));
    let user_id = localStorage.getItem("user_id");
    

    const dispatch = useDispatch ();
    pusher.echo.private("project_comment").listen(".NewComment", data => {
        
        if (data.type === "project") {
            dispatch({type:'ADD_TO_COLLECTION_COMMENT_SUCCESS', res : data});
        }
        if (data.type === "post") {
            dispatch({type:'ADD_TO_COLLECTION_COMMENT_POST_SUCCESS', res : data});
        }
        dispatch({type:'COMMENTED_SUCCESS', res : data});
    }).listenForWhisper('typing', (e) => {
        console.log('typing ... ',e)
                                
    }); 

    //counter like notifications
    pusher.echo.private("newNotification").listen(".notification", data => {
        
        dispatch({type:'LIKED_SUCCESS', res : data});
        dispatch({type:'ADD_Like_TO_POST_SUCCESS', res : data});
    })

    //data notifications navbar
    pusher.echo.private("App.Models.User."+ user_id)
    .notification((notification) => {
        localStorage.setItem('notification', 1);
        dispatch({type:'ADD_TO_COLLECTION_NOTIFICATION_SUCCESS', res : notification});
    });

    pusher.echo.private("new_post").listen(".newpost", data => {
        
        dispatch({type:'ADD_TO_COLLECTION_POST_SUCCESS', res : data});
    })

//     pusher.echo.private("Message.User." + user_id).listen(".NewMessage", data => {
//         audio.play();
//         dispatch({type:'SEND_MESSAGE_SUCCESS_PUSHER', res : data});
//     }).listenForWhisper('typing', (e) => {
//         console.log(e)
//         if(e.user.id===user_id){

//             this.typingFriend=e.user;

//           if(this.typingClock) clearTimeout();

//             this.typingClock=setTimeout(()=>{
//                                   this.typingFriend={};
//                               },9000);
//         }

//   });    

    
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </ErrorBoundary>
        
    );
}

export default App;
