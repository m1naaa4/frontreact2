import React, {useState} from 'react';
import {BrowserRouter, useParams} from 'react-router-dom';
import Routes from './Routes';

import { useDispatch, useSelector } from "react-redux";
import PusherService from "./services/Pusher";


function App() {
    const pusher = new PusherService();
    const [audio] = useState(new Audio('https://dadupadisque.ams3.digitaloceanspaces.com/audio/notification.mp3'));
    let user_id = localStorage.getItem("user_id");
    

    const dispatch = useDispatch ();
    let id = window.location.href.split("/").pop();
    pusher.echo.private("project_comment_"+id).listen(".NewComment", data => {
        
        // console.log("project_comment" );
        // console.log(data);
        dispatch({type:'ADD_TO_COLLECTION_COMMENT_SUCCESS', res : data});
    }).listenForWhisper('typing', (e) => {
        console.log('typing ... ',e)
                                
    });    

    
    return (
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    );
}

export default App;
