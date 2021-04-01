import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SeenNotificationAction } from '../../store/actions/Notification/LoadNotificationAction';

export default function Notifications() {
    const usernotifications = useSelector(state => state.getnotifications);
    const userProfile = useSelector(state => state.userProfile.userProfile);
    const [mask, setShowMark] = useState(false);
    const [notification_id, setNotification_id] = useState(false);
    const dispatch = useDispatch();
    
    const show = (e) => {
        setShowMark(e);
        setNotification_id(e);
    };

    let data = {
        notification_id : notification_id
    }

    const markAsRead = () => {
        dispatch( SeenNotificationAction(data));    
    };
    const HideNotif = () => {
        ;
    };

    return (
    <>
        <div className="Dadupa-Notifs-Box Notifs-Box-Active">
          <h3>Notifications</h3>
          { usernotifications.notifications.map((notification, index) =>
           (!notification.seen ? (<div className="Notifs-List" style={{backgroundColor:"#edf2fa", paddingLeft:"2px", borderTop:"1px", borderBottom:"1px", borderColor:"gris"}} key={index} >
                <div className="Notif-Item">
                    <Link to={"/profile/"+ notification.notified_from.profile_id} className="Notif-Image"><img src={notification.notified_from_avatar} alt="avatar" /></Link>
                  
                        <div className="Notif-Options show" onClick={ e =>show(notification.id)} >
                            <button onClick={setShowMark} className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                <i className="uil uil-ellipsis-h"></i>
                            </button>
                         {mask == notification.id &&    
                            <div className="dropdown-menu dropdown-menu-right show" x-placement="bottom-end" style={{position: "absolute"}}>
                                <div className="dropdown-item" onClick={markAsRead} >Mark as read</div>
                                <div className="dropdown-item" onClick={HideNotif} >Hide</div>
                            </div>
                         }   
                        </div>                        

                    <div className="Notif-Content">
                            <div className="Notif-Text">{notification.description} </div>
                            <div className="Notif-Time">{notification.created_at.for_humans} </div>
                        </div>
                </div>
            </div>):

            (
                <div className="Notifs-List" key={index} >
                <div className="Notif-Item">
                    <Link to={"/profile/"+ notification.notified_from.profile_id} className="Notif-Image"><img src={notification.notified_from_avatar} alt="avatar" /></Link>
                  
                        <div className="Notif-Options show" onClick={ e =>show(notification.id)} >
                            <button onClick={setShowMark} className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                <i className="uil uil-ellipsis-h"></i>
                            </button>
                         {mask == notification.id &&    
                            <div className="dropdown-menu dropdown-menu-right show" x-placement="bottom-end" style={{position: "absolute"}}>
                                <div className="dropdown-item" onClick={markAsRead} >Mark as read</div>
                                <div className="dropdown-item" onClick={HideNotif} >Hide</div>
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
        </div>
    </>
    )
}