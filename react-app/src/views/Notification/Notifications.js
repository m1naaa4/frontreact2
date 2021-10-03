import React from 'react'
import { useSelector } from 'react-redux';
import NotificationGrid from './NotificationGrid';

function Notifications() {
    const usernotifications = useSelector(state => state.getnotifications);
    return (
        <div className=" Dadupa-Notifications-Item Dadupa-Alert-Popup">
            
            <div className="Favoris-List">
            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                        <div className="col-md-8">
                        {  usernotifications.notifications.map((notification, index) => 
                            <NotificationGrid notification={notification} key={index} />
                        )}
                        </div>
                    </div>
                    <div className="col-md-2"></div>
            </div>
        </div>
        </div>
    )
}

export default Notifications;
