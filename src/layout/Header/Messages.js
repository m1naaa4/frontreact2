import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
// import { SeenNotificationAction } from '../../store/actions/Notification/LoadNotificationAction';
import {Text} from "../../containers/Language";
import $ from "jquery";

export default function Messages() {
    // const usernotifications = useSelector(state => state.getnotifications);
    // const usernotification = useSelector(state => state.addednotification);
    const userProfile = useSelector(state => state.userProfile.userProfile);
    // const [mask, setShowMark] = useState(false);
    // const [notification_id, setNotification_id] = useState(false);
    // const [notifed_user_id, setNotifed_user_id] = useState();
    // const [from_user_id, setFrom_user_id] = useState();
    const dispatch = useDispatch();
    const params = useParams();
    
    useEffect(() => {
        $('.Dadupa-Notifs-Box').removeClass('Notifs-Box-Active');
        $('.Dadupa-Mini-Profile').removeClass('Mini-Profile-Active');
    });


/*     useEffect(() => {
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
    }; */

    /* let data = {
        notification_id : notification_id
    }

    const markAsRead = () => {
        dispatch( SeenNotificationAction(data));    
    };
    const HideNotif = () => {
        ;
    }; */

    return (
    <>
        <div className="Dadupa-Msgs-Box Msgs-Box-Active">
            <h3><Text tid="messages"/></h3>
            <span className="User-Connected"></span>
            <div className="Msgs-List">
            <div  id="sidebar-user-box" className="101 Msgs-Item New-Msg">
                <div className="Msgs-Image"><img src="assets/images/abbass-iya.jpg" /></div>
                <div className="Msgs-Content">
                    <div className="Msgs-User">Youness EL BEZZAZI</div>
                    <div className="Msgs-Text">Message text goes here...</div>
                    <div className="Friend-Active">
                    </div>
                </div>
            </div>
            <div id="sidebar-user-box" className="102 Msgs-Item">
                <div className="Msgs-Image"><img src="assets/images/abbass-iya.jpg" /></div>
                <div className="Msgs-Content">
                    <div className="Msgs-User">Youness EL BEZZAZI</div>
                    <div className="Msgs-Text">Message text goes here...</div>
                    <div className="Friend-Active">
                    </div>
                </div>

            </div>
            <div className="Msgs-Item">
                <div className="Msgs-Image"><img src="assets/images/abbass-iya.jpg" /></div>
                <div className="Msgs-Content">
                <div className="Msgs-User">Youness EL BEZZAZI</div>
                <div className="Msgs-Text">Message text goes here...</div>
                <div className="Friend-Active">
                </div>
                </div>
            </div>
            <div className="Msgs-Item">
                <div className="Msgs-Image"><img src="assets/images/abbass-iya.jpg" /></div>
                <div className="Msgs-Content">
                <div className="Msgs-User">Youness EL BEZZAZI</div>
                <div className="Msgs-Text">Message text goes here...</div>
                <div className="Friend-Active">
                </div>
                </div>
            </div>
            <div className="Msgs-Item">
                <div className="Msgs-Image"><img src="assets/images/abbass-iya.jpg" /></div>
                <div className="Msgs-Content">
                <div className="Msgs-User">Youness EL BEZZAZI</div>
                <div className="Msgs-Text">Message text goes here...</div>
                <div className="Friend-Not-Active">
                </div>
                </div>
            </div>
            <div className="Msgs-Item">
                <div className="Msgs-Image"><img src="assets/images/abbass-iya.jpg" /></div>
                <div className="Msgs-Content">
                <div className="Msgs-User">Youness EL BEZZAZI</div>
                <div className="Msgs-Text">Message text goes here...</div>
                <div className="Friend-Not-Active">
                </div>
                </div>
            </div>
            <div className="Msgs-Item">
                <div className="Msgs-Image"><img src="assets/images/abbass-iya.jpg" /></div>
                <div className="Msgs-Content">
                <div className="Msgs-User">Youness EL BEZZAZI</div>
                <div className="Msgs-Text">Message text goes here...</div>
                <div className="Friend-Active">
                </div>
                </div>
            </div>
            <div className="Msgs-Item">
                <div className="Msgs-Image"><img src="assets/images/abbass-iya.jpg" /></div>
                <div className="Msgs-Content">
                <div className="Msgs-User">Youness EL BEZZAZI</div>
                <div className="Msgs-Text">Message text goes here...</div>
                <div className="Friend-Active">
                </div>
                </div>
            </div>
            <div className="Msgs-Item">
                <div className="Msgs-Image"><img src="assets/images/abbass-iya.jpg" /></div>
                <div className="Msgs-Content">
                <div className="Msgs-User">Youness EL BEZZAZI</div>
                <div className="Msgs-Text">Message text goes here...</div>
                <div className="Friend-Active">
                </div>
                </div>
            </div>
            </div>
            <div className="All-Messages-Row">
                <Link to={`/messages/${userProfile.id}`} className="all-messages-button">See All Messages</Link>
            </div>
        </div>
                                            
    </>
    )
}