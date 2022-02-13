import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteNotificationAction, MarkSeenAction, SeenNotificationAction } from '../../store/actions/Notification/LoadNotificationAction';
import useOutsideClick from '../../helpers/useOutsideClick';

function NotificationGrid({notification}) {
    
    const [seen, setSeen] = useState(false);
    const [stylo, setStylo] = useState();
    const [notification_id, setNotification_id] = useState();
    const dispatch = useDispatch();
    const [showNotifications, setShowNotifications] = useState(false);
    const [display, setDisplay] = useState(false);
    const ref = useRef();

    const [classe, setClasse] = useState();

    useEffect(() => {
        let nottif = localStorage.getItem('notification');
        if (nottif === "1") {
            setClasse('new-notif');
        }else{
            setClasse('');
        }
        setSeen(notification.seen);
    });

    useEffect(() => {
        
        !seen ?  setStylo( {
            backgroundColor:"rgb(238 238 238 / 55%)"})
            : setStylo()
    },[seen]);

    

    console.log(notification.seen)

    useOutsideClick(ref, () => {
        setDisplay(false)
    });
    
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

    const openNotifications = () => {
        setShowNotifications(!showNotifications )

        let data = {
            user_id : localStorage.getItem('user_id'),
        }
        dispatch( MarkSeenAction(data));

        localStorage.setItem('notification', 0);
        setClasse('')
    };
    return (
        
            <div className="grid">
                <div className="list-group" style={stylo}>
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                            {notification && <div className="Notifs-List" >
                                <div className="Notif-Item">
                                    <Link to={notification.link} className="Notif-Image"  >
                                        <img src={notification.notified_from_avatar} alt="avatar" style={{width:'50px', height:'50px'}}/></Link>
                                        <div className="Notif-Text">{notification.description} </div>
                                    
                                        <div className="Notif-Options show">
                                        <small>
                                        <Link to={notification.link} className="Notif-Content">
                                                <div className="Notif-Time">{notification.created_at.for_humans} </div>
                                            </Link>
                                        </small>
                                            <button onClick={e => show(notification.id)} className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                <i className="uil uil-ellipsis-h"></i>
                                            </button>
                                        {notification_id ===  notification.id && display && 
                                            <div className="dropdown-menu dropdown-menu-right show" ref={ref} x-placement="bottom-end" style={{position: "absolute"}}>
                                                <div className="dropdown-item" onClick={ e => markAsRead(notification.notified_from.id, notification.id)} ><i class="uis uis-check"></i>Mark as read</div>
                                                <div className="dropdown-item" onClick={ e => DeleteNotif(notification.notified_from.id, notification.id)} ><i class="uil uil-trash-alt"></i> Delete</div>
                                            </div> 
                                        }   
                                        </div>                        
                                    
                                    </div>
                                </div>
                            }
                        </div>
                    </a>    
                </div>
                <div className="grid-sizer col-1"></div>
            </div>                   
    )
}

export default NotificationGrid;
