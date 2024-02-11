import React from 'react'
import { useSelector } from 'react-redux';
import NotificationGrid from './NotificationGrid';
import SideRightProfileView from '../Profile/SideRightProfileView'
import NoContent from '../../utils/NoContent';

function Notifications() {
    const usernotifications = useSelector(state => state.getnotifications);
    return (
        <div className=" Dadupa-Notifications-Item Dadupa-Alert-Popup">
            
            <div className="Favoris-List">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className='dadupa-box'>
                            {usernotifications.notifications.length ?  
                            usernotifications.notifications.map((notification, index) => 
                                <NotificationGrid notification={notification} key={index} />
                             ): <NoContent/>}
                         </div>
                    </div>
                    <SideRightProfileView></SideRightProfileView>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Notifications;
