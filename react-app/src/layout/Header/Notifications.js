import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { DeleteNotificationAction, SeenNotificationAction } from '../../store/actions/Notification/LoadNotificationAction';
import {Text} from "../../containers/Language";

export default function Notifications({notification}) {
    const dispatch = useDispatch();
    const ref = useRef();

    const [notification_id, setNotification_id] = useState();
    const [seen, setSeen] = useState(false);
    const [display, setDisplay] = useState(false);
    const [stylo, setStylo] = useState();
    
    useEffect(() => {
        setSeen(notification.seen);
    });

    useEffect(() => {
        !seen ?  setStylo( {
            backgroundColor:"#f2fff8",
            
            borderColor:"gris"})
            : setStylo()
    },[seen]);

    console.log(notification.id)
    
    const show = (e) => {
        setDisplay(true); 
        setNotification_id(e);
    };

    const markAsRead = (id, nofifid) => {
        let data = {
            notification_id : nofifid,
            user_id_notifier : id
        }
        dispatch( SeenNotificationAction(data)); 
        setDisplay(false);   
    };

    const DeleteNotif = (id, nofifid) => {
        let data = {
            notification_id : nofifid,
            user_id_notifier : id
        }
        dispatch( DeleteNotificationAction(data)); 
    };

    return (
        <>
          
           {/* notification.notified_from.id !== user_id && // to delete remember that  */}
                <div className="Notifs-List" style={stylo} >
                    <div className="Notif-Item">
                        <Link to={notification.link} className="Notif-Image">
                            <img src={notification.notified_from_avatar} alt="avatar" /></Link>

                            <div className="Notif-Options show">
                                <button onClick={e => show(notification.id)} className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <i className="uil uil-ellipsis-h"></i>
                                </button>
                                {notification_id ===  notification.id && display && 
                                    <div className="dropdown-menu dropdown-menu-right show" ref={ref} x-placement="bottom-end" style={{position: "absolute"}}>
                                        <div className="dropdown-item" onClick={ e => markAsRead(notification.notified_from.id, notification.id)} >Mark as read</div>
                                        <div className="dropdown-item" onClick={ e => DeleteNotif(notification.notified_from.id, notification.id)} >Delete</div>
                                    </div> 
                                }   
                            </div>                        
                        <Link to={notification.link} className="Notif-Content">
                            <div className="Notif-Text">{notification.description} </div>
                            <div className="Notif-Time">{notification.created_at.for_humans} </div>
                        </Link>
                    </div>
                </div>
                <div className="All-Messages-Row">
                    <Link to={`/notifications`} className="all-messages-button">See All Notifications</Link>
                </div>
        </>
        
    )
}