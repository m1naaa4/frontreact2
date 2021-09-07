import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { DeleteNotificationAction, SeenNotificationAction } from '../../store/actions/Notification/LoadNotificationAction';
import {Text} from "../../containers/Language";
import $ from "jquery";

export default function Notifications() {
    const usernotifications = useSelector(state => state.getnotifications);
    const [mask, setShowMark] = useState(false);
    const [notification_id, setNotification_id] = useState();
    const dispatch = useDispatch();
    const [showNotifications, setShowNotifications] = useState(false);
    const ref = useRef();

    const [classe, setClasse] = useState();

    useEffect(() => {
        let nottif = localStorage.getItem('notification');
        nottif ? setClasse('new-notif') : setClasse('')
        $('.Dadupa-Msgs-Box').removeClass('Msgs-Box-Active');
        $('.Dadupa-Mini-Profile').removeClass('Mini-Profile-Active');
    });

    // console.log(usernotifications)
    
    const show = () => {
        console.log(mask)
        setShowMark(!mask);
        // setNotification_id(e);
    };

    const markAsRead = (id, nofifid) => {
        let data = {
            notification_id : nofifid,
            user_id_notifier : id
        }
        dispatch( SeenNotificationAction(data));    
    };

    const HideNotif = (id, nofifid) => {
        let data = {
            notification_id : nofifid,
            user_id_notifier : id
        }
        dispatch( DeleteNotificationAction(data)); 
    };

    let user_id = localStorage.getItem('user_id')
    const openNotifications = () => {
        setShowNotifications(!showNotifications )

        localStorage.setItem('notification', false);
        setClasse('')
        console.log('ttttttttttttt', classe)
        console.log('tttttttttttgggggggggggtt', localStorage.getItem('notification'))
    };

    return (
    <>
        <button onClick={openNotifications} className="Dadupa-Alert" data-toggle="tooltip" data-placement="bottom" title="Notifications">
            <span className={classe}></span><i className="uil uil-bell"></i>
        </button>
        {showNotifications && 
        <div className="Dadupa-Notifs-Box Notifs-Box-Active">
            <h3><Text tid="notifications"/></h3>
          {  usernotifications.notifications.map((notification, index) => 
           notification.notified_from.id !== user_id &&
                (!notification.seen  ? (<div className="Notifs-List" style={{backgroundColor:"#f2fff8", paddingLeft:"2px", borderTop:"1px", borderBottom:"1px", borderColor:"gris"}} key={index} >
                        <div className="Notif-Item">
                            <Link to={"/profile/"+ notification.notified_from.profile_id} className="Notif-Image"><img src={notification.notified_from_avatar} alt="avatar" /></Link>

                                <div className="Notif-Options show" onClick={ show} >
                                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        <i className="uil uil-ellipsis-h"></i>
                                    </button>
                                {mask && 
                                    <div className="dropdown-menu dropdown-menu-right show" ref={ref} x-placement="bottom-end" style={{position: "absolute"}}>
                                        <div className="dropdown-item" onClick={ e => markAsRead(notification.notified_from.id, notification.id)} >Mark as read</div>
                                        <div className="dropdown-item" onClick={ e => HideNotif(notification.notified_from.id, notification.id)} >Delete</div>
                                    </div> 
                                }   
                                </div>                        
                            <Link to={"/profile/"+ notification.notified_from.profile_id} className="Notif-Content">
                                    <div className="Notif-Text">{notification.description} </div>
                                    <div className="Notif-Time">{notification.created_at.for_humans} </div>
                                </Link>
                        </div>
                    </div>):
                    (
                        <div className="Notifs-List" key={index} >
                        <div className="Notif-Item">
                            <Link to={"/profile/"+ notification.notified_from.profile_id} className="Notif-Image"><img src={notification.notified_from_avatar} alt="avatar" /></Link>
                        
                                <div className="Notif-Options show" onClick={ show} >
                                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        <i className="uil uil-ellipsis-h"></i>
                                    </button>
                                {mask  &&    
                                    <div className="dropdown-menu dropdown-menu-right show" x-placement="bottom-end" style={{position: "absolute"}}>
                                        <div className="dropdown-item" onClick={e => markAsRead(notification.notified_from.id, notification.id)} >Mark as read</div>
                                        <div className="dropdown-item" onClick={e => HideNotif(notification.notified_from.id, notification.id)} >Delete</div>
                                    </div>
                                }   
                                </div>                        
                            <div className="Notif-Content">
                                    <div className="Notif-Text">{notification.description} </div>
                                    <div className="Notif-Time">{notification.created_at.for_humans} </div>
                                </div>
                        </div>
                    </div>
                    )
                    )
            )
          }
        </div>}
    </>
    )
}