import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteNotificationAction, SeenNotificationAction } from '../../store/actions/Notification/LoadNotificationAction';
import useOutsideClick from '../../helpers/useOutsideClick';
import $ from 'jquery'
import { useTranslation } from 'react-i18next';

function NotificationGrid({notification}) {
    
    const [seen, setSeen] = useState(false);
    const [stylo, setStylo] = useState();
    const [notification_id, setNotification_id] = useState();
    const dispatch = useDispatch();
    const [showNotifications, setShowNotifications] = useState(false);
    const [display, setDisplay] = useState(false);
    const ref = useRef();

    const { t } = useTranslation();

    const [classe, setClasse] = useState();

    const [profileId, setProfileId] = useState();
    const [idFrom, setIdFrom] = useState();
    const [username, setUsername] = useState();
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        let notified_from = $.parseJSON(notification.notified_from);
        setAvatar(notified_from.avatar);
        setUsername(notified_from.name);
        setProfileId(notified_from.profile_id);
        setIdFrom(notified_from.id);
    }, [notification]);



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
        dispatch(SeenNotificationAction(data, '/see'));
        setDisplay(false);   
    };

    const DeleteNotif = (id, nofifid) => {
        let data = {
            notification_id : nofifid,
            user_id_notifier : id
        }
        dispatch( DeleteNotificationAction(data, '/delete')); 
    };

    
    return (
        
            <div className="grid">
                <div className="list-group" style={stylo}>
                    <div className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            {notification && <div className="Notifs-List" >
                                <div className="Notif-Item">
                                    <Link to={notification.link} className="Notif-Image"  >
                                       {avatar ?
                                            <img src={avatar} alt="avatar" style={{width:'50px', height:'50px'}}/>
                                            : <img src="/assets/images/avatar.png" alt="avatar" style={{width:'50px', height:'50px'}}/>}
                                       </Link>
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
                                                <div className="dropdown-item" onClick={ e => markAsRead(idFrom, notification.id)} ><i className="uis uis-check"></i>{t('mark-as-read')}</div>
                                                <div className="dropdown-item" onClick={ e => DeleteNotif(idFrom, notification.id)} ><i className="uil uil-trash-alt"></i> {t('delete')}</div>
                                            </div> 
                                        }   
                                        </div>                        
                                    
                                    </div>
                                </div>
                            }
                        </div>
                    </div>    
                </div>
                <div className="grid-sizer col-1"></div>
            </div>                   
    )
}

export default NotificationGrid;
