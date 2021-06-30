import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {loadUserAction} from "../../store/actions/Profile/UserActions";
import {Text} from "../../containers/Language";
import {UserLogOutAction} from "../../store/actions/User/Auth/AuthActions";
import {  useHistory, useParams  } from 'react-router-dom';
import { LoadNotificationAction } from '../../store/actions/Notification/LoadNotificationAction';
import Notifications from './Notifications';
import $ from "jquery";
import Messages from './Messages';
import PusherService from '../../services/Pusher';

function HeaderProfile() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.userProfile.userProfile);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const params = useParams();
    const pusher = new PusherService();
        
    useEffect(() => {
        $(document).on("click", function(event){
            if(!$(event.target).closest(".Dadupa-Popup-DropDown").length){
                //$('.Dadupa-Popup-DropDown').removeClass('Dadupa-Popup-DropDown_Active');
            }
            if(!$(event.target).closest(".Dadupa-User").length){
                $('.Dadupa-Mini-Profile').removeClass('Mini-Profile-Active');
            }
            if(!$(event.target).closest(".Dadupa-Message-Popup").length){
                // $('.Dadupa-Msgs-Box').removeClass('Msgs-Box-Active');
            }
            if(!$(event.target).closest(".Dadupa-Alert-Popup").length){
                // $('.Dadupa-Notifs-Box').removeClass('Notifs-Box-Active');
            }
            if(!$(event.target).closest(".Messenger-PreferencesBTN").length){
                $('.Preferences-List').removeClass('Preferences-ListShow');
            }
            if(!$(event.target).closest(".Conversation-BTN").length){
                $('.ConversationOptions-List').removeClass('ConversationOptions-ListShow');
            }
        });
    });
    useEffect(() => {
        if(userProfile == ""){
            dispatch(loadUserAction());

        // dispatch( LoadNotificationAction());    
        }

    }, [dispatch])

    const userMenu = () => {
        $('.Dadupa-Mini-Profile').toggleClass('Mini-Profile-Active');
        $('.Dadupa-Msgs-Box').removeClass('Msgs-Box-Active');
        $('.Dadupa-Notifs-Box').removeClass('Notifs-Box-Active');
    }

    $(window).bind('scroll', function () {
        if ( $(window).scrollTop() > 70 ) {
            $('.Dadupa-Header').addClass('Dadupa-Header-Fixed');
        } else {
            $('.Dadupa-Header').removeClass('Dadupa-Header-Fixed');
        }
      });

    const addMenu = () => {
        $('.Dadupa-Popup-DropDown').toggleClass('Dadupa-Popup-DropDown_Active');
        $('.Dadupa-Msgs-Box').removeClass('Msgs-Box-Active');
        $('.Dadupa-Notifs-Box').removeClass('Notifs-Box-Active');
    }

    const handlelogOut = () => {
        dispatch(UserLogOutAction(history));
    }

    const goToAddproject = () => {
        history.push("/project/create");
    };

    const goToListproject = () => {
        history.push("/project/lists");
    };

    
    const gotToProfile = () => {
        history.push('/profile/'+ userProfile.profile_id);
    };

    const openNotifications = () => {
        setShowNotifications(!showNotifications );
    };
    
    const openMessages = () => {
        setShowMessages(!showMessages );
    };



    return (
        <div>
            <div className="Dadupa-Overlay">
                <button className="Dadupa-Close">
                    <i className="uil uil-multiply"></i>
                </button>
            </div>

            {
                userProfile !== '' && userProfile != 'loading'  ?

                <header className="Dadupa-Header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2 col-md-2">
                                <div className="left-nav">
                                    <img src="/assets/images/dadupa-brand-text.svg" alt="Dadupa Connect" className="Logo-Desktop" />
                                    <img src="/assets/images/dadupa-responsive.svg" alt="Dadupa Connect" className="Logo-Responsive" />
                                </div>
                            </div>
                            <div className="col-md-5 d-none d-lg-block">
                                <div className="center-nav">
                                    <ul className="Dadupa-Nav">
                                    <li className="Nav-Item Active-Nav"><a href="#"className="Nav-Link" onClick={goToListproject}><i className="uil uil-lightbulb-alt"></i> <Text tid="projectHolder"/></a></li>
                                    <li className="Nav-Item"><a href="bailleur-de-fonds"className="Nav-Link"><i className="uil uil-moneybag"></i> <Text tid="donor"/></a></li>
                                    <li className="Nav-Item"><a href="accompagnateur"className="Nav-Link"><i className="uil uil-users-alt"></i> <Text tid="accompanyingPerson"/></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-10 col-md-10 col-lg-5">
                                <div className="right-nav">
                                    <div className="New-Post" onClick={addMenu}>
                                        <button className="Add-New" data-toggle="tooltip" data-placement="bottom" title="Add new"><i className="uil uil-plus"></i></button>
                                        <div className="Dadupa-Popup-DropDown">
                                            <ul className="Mini-Profile-Items">
                                            <li className="Mini-Profile-Item"><a href="#" onClick={goToAddproject}><i className="uil uil-rocket"></i>  <Text tid="header.menu.project"/></a></li>
                                            <li className="Mini-Profile-Item"><a href="new-bailleur-offer"><i className="uil uil-briefcase-alt"></i> <Text tid="header.menu.finance"/></a></li>
                                            <li className="Mini-Profile-Item"><a href="new-accompagnateur-offer"><i className="uil uil-comment-alt-notes"></i> <Text tid="header.menu.mentoring"/></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="Dadupa-Notifications">
                                        <div className="Dadupa-Notifications-Items">
                                            <div className="Dadupa-Notifications-Item Dadupa-Search">
                                                <form className="search">
                                                    <input type="search" name="search" placeholder="Search Dadupa" />
                                                    <button type="submit" name="submit"><i className="uil uil-search"></i></button>
                                                </form>
                                            </div>
                                            <div className="Dadupa-Notifications-Item Dadupa-Alert-Popup">
                                                <button onClick={openNotifications} className="Dadupa-Alert" data-toggle="tooltip" data-placement="bottom" title="Notifications">
                                                    <span className="new-notif"></span><i className="uil uil-bell"></i>
                                                </button>
                                                {showNotifications && <Notifications/>}
                                            </div>
                                            <div className="Dadupa-Notifications-Item Dadupa-Message-Popup">
                                                <button onClick={openMessages} className="Dadupa-Message" data-toggle="tooltip" data-placement="bottom" title="Messages"><span className="new-message"></span><i className="uil uil-envelope"></i></button>
                                                {showMessages && <Messages/>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Dadupa-User" onClick={userMenu}>
                                        <ul className="Dadupa-User-Infos">
                                            <li className="profile-image">
                                            <img src={userProfile.profile.avatar_link} alt="avatar" />
                                            </li>
                                            <li className="profile-name">
                                            <span className="">{userProfile.name}</span>
                                            </li>
                                            <li className="profile-arrow"><i className="uil uil-angle-down"></i></li>
                                        </ul>
                                        <div className="Dadupa-Mini-Profile">
                                            <label className="Mini-Profile-Name">{userProfile.name}</label>
                                            <a className="Mini-Profile-Link" href="#" onClick={gotToProfile}><Text tid='see_profile' /></a>
                                            <ul className="Mini-Profile-Items">
                                            <li className="Mini-Profile-Item"><a href="#"><i className="uil uil-layer-group"></i> <Text tid="my_offre"/> </a></li>
                                            <li className="Mini-Profile-Item"><a href="#"><i className="uil uil-favorite"></i> <Text tid="my_favorite"/>  </a></li>
                                            <li className="Mini-Profile-Item"><a href="#"><i className="uil uil-setting"></i> <Text tid="setting"/></a></li>
                                            <li className="Mini-Profile-Item"><a href="#" onClick={handlelogOut}><i className="uil uil-exit"></i> <Text tid='logout' /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                
                    :
                    userProfile.success === false ?
                        userProfile.message
                        :
                        <span/>
            }
        </div>
    )
}

export default HeaderProfile;
