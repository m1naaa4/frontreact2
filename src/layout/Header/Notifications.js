import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { SeenNotificationAction } from '../../store/actions/Notification/LoadNotificationAction';

export default function Notifications() {
    const usernotifications = useSelector(state => state.getnotifications);
    const usernotification = useSelector(state => state.addednotification);
    const userProfile = useSelector(state => state.userProfile.userProfile);
    const [mask, setShowMark] = useState(false);
    const [notification_id, setNotification_id] = useState(false);
    const [notifed_user_id, setNotifed_user_id] = useState();
    const [from_user_id, setFrom_user_id] = useState();
    const dispatch = useDispatch();
    const params = useParams();

    console.log("frommmmmmmm account", usernotification.user_id)
    console.log("my account", userProfile.id)
    

    useEffect(() => {
        if(userProfile){           
            if(usernotification){
                setNotifed_user_id(userProfile.id)
                setFrom_user_id(usernotification.user_id)
            }           
        }
    },[dispatch]);
    
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
          {from_user_id && from_user_id !== notifed_user_id &&  console.log('salam   i m here')
          }
        </div>
    </>
    )
}