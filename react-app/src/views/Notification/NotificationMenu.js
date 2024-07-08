import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { DeleteNotificationAction, SeenNotificationAction } from '../../store/actions/Notification/LoadNotificationAction';
import useOutsideClick from '../../helpers/useOutsideClick';
import { useTranslation } from 'react-i18next';

export default function NotificationMenu({notification}) {
    const dispatch = useDispatch();
    const ref = useRef();
    const { t } = useTranslation();

    const [notification_id, setNotification_id] = useState();
    const [seen, setSeen] = useState(false);
    const [display, setDisplay] = useState(false);
    const [stylo, setStylo] = useState();
    const [avatar, setAvatar] = useState();
    const [idFrom, setIdFrom] = useState();

    
    useEffect(() => {
        let notified_from = JSON.parse(notification.notified_from);
        setAvatar(notified_from.avatar);
        setIdFrom(notified_from.id);
    }, [notification]);
    
    useEffect(() => {
        setSeen(notification.seen);
    });

    // useEffect(() => {
    //     !seen ?  setStylo( {
    //         backgroundColor:"rgb(238 238 238 / 55%)"})
    //         : setStylo()
    // },[seen]);
    
    const show = (e) => {
        setDisplay(true); 
        setNotification_id(e);
    };

    const markAsRead = (id, nofifid) => {
        let data = {
            notification_id : nofifid,
            user_id_notifier : id
        }
        dispatch( SeenNotificationAction(data, '/see')); 
        setDisplay(false);   
    };

    const DeleteNotif = (id, nofifid) => {
        let data = {
            notification_id : nofifid,
            user_id_notifier : id
        }
        dispatch( DeleteNotificationAction(data)); 
    };

    useOutsideClick(ref, () => {
        setDisplay(false)
    });

    return (
          
                <div className="Notifs-List notification-list-menu" style={stylo} >
                    <div className="Notif-Item">
                        <Link to={notification.link} className="Notif-Image">
                            <div className='Notif-Item-Inner'>
                                <div className='Notif-Thumb'>
                                    <img src={avatar ? avatar : '/assets/images/avatar.png'} alt="avatar" />
                                </div>
                                <div className="Notif-Content">
                                    <div className="Notif-Text">{notification.description} </div>
                                    <div className="Notif-Time">{notification.created_at.for_humans} </div>
                                </div> 
                            </div>
                            
                            <div className="Notif-Options show">
                                <button onClick={e => show(notification.id)} className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <i className="uil uil-ellipsis-h"></i>
                                </button>
                                {notification_id ===  notification.id && display && 
                                    <div className="dropdown-menu dropdown-menu-right show" ref={ref} x-placement="bottom-end" style={{position: "absolute"}}>
                                        <div className="dropdown-item" onClick={ e => markAsRead(idFrom, notification.id)} ><i className="uis uis-check"></i> {t('mark-as-read')}</div>
                                        <div className="dropdown-item" onClick={ e => DeleteNotif(idFrom, notification.id)} ><i className="uil uil-trash-alt"></i> {t('delete')}</div>
                                    </div> 
                                }   
                            </div>   
                        </Link>  
                    </div>
                </div>
        
    )
}