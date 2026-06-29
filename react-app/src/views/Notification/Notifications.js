import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import NotificationGrid from './NotificationGrid';
import SideRightProfileView from '../Profile/SideRightProfileView'
import NoContent from '../../utils/NoContent';

function Notifications() {
    const usernotifications = useSelector(state => state.getnotifications);
    const [filter, setFilter] = useState('all');
    const filteredNotifications =
    
  filter === 'all'
    ? usernotifications.notifications
    : usernotifications.notifications.filter(notification => notification.seen === false);

    return (
        <div className=" Dadupa-Notifications-Item Dadupa-Alert-Popup">
            
            <div className="Favoris-List">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="Notification-Filters">
      <button onClick={() => setFilter('all')}>Toutes</button>
      <button onClick={() => setFilter('unread')}>Non lues</button>
    </div>

    {filteredNotifications.length ?  
      filteredNotifications.map((notification, index) => 
         <NotificationGrid notification={notification} key={index} />
            ): <NoContent/>}

                         {/* </div> */}
                    </div>
                    <SideRightProfileView></SideRightProfileView>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Notifications;
