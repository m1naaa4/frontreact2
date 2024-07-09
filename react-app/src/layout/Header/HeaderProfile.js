import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {loadUserAction} from "../../store/actions/Profile/UserActions";
import {UserLogOutAction} from "../../store/actions/User/Auth/AuthActions";
import {  Link, NavLink, useHistory  } from 'react-router-dom';
import { LoadNotificationAction, MarkSeenAction } from '../../store/actions/Notification/LoadNotificationAction';
import $ from "jquery";
// import Messages from './Messages';
import { ClearProjectsAction } from '../../store/actions/User/Project/ProjectAction';
import useOutsideClick from '../../helpers/useOutsideClick';
import NotificationMenu from '../../views/Notification/NotificationMenu';

import { useTranslation } from 'react-i18next';

function HeaderProfile() {
    const history = useHistory();
    const dispatch = useDispatch();

    const usernotifications = useSelector(state => state.getnotifications);
    const newavatar = useSelector(state => state.updateavatar);
    const userProfile = useSelector(state => state.userProfile.userProfile);

    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [display, setDisplay] = useState(false);
    const [avatar, setAvatar] = useState(false);
    const ref = useRef();

    const { t } = useTranslation();
    
    const [classe, setClasse] = useState();
    // const counter = useSelector(state => state.addednotification); 
    
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
        let nottif = localStorage.getItem('notification');
        if (nottif === "1") {
            setClasse('new-notif');
        }else{
            setClasse('');
        }
    });

    useEffect(() => {
        if(userProfile === ""){
            let data = {
                'url'     :   'user',
            }
            dispatch(loadUserAction(data, history));
            dispatch( LoadNotificationAction('/get')); 
        }
        userProfile?.new_notification ? setClasse('new-notif') : setClasse('')
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
        setDisplay(!display); 
        $('.Dadupa-Popup-DropDown').toggleClass('Dadupa-Popup-DropDown_Active');
        $('.Dadupa-Msgs-Box').removeClass('Msgs-Box-Active');
        $('.Dadupa-Notifs-Box').removeClass('Notifs-Box-Active');
    }

    const handlelogOut = () => {
        dispatch(UserLogOutAction(history));
    }

    const openNotifications = () => {
        $('.Dadupa-Notifs-Box').toggleClass('Notifs-Box-Active');

        // setShowNotifications(!showNotifications )

        let data = {
            user_id : localStorage.getItem('user_id'),
        }
        dispatch( MarkSeenAction(data, '/markseen'));

        localStorage.setItem('notification', 0);
        setClasse('')
    };
    
    const openMessages = () => {
        setShowMessages(!showMessages );
    };

    useOutsideClick(ref, () => {
        setDisplay(false)
        setShowNotifications(false)
    });

    const clearProject = () => {
        dispatch(ClearProjectsAction());
    };

    useEffect(() => {
        setAvatar(newavatar.avatar.avatar_link);
    }, [newavatar])

    return (
        <div>
            <div className="Dadupa-Overlay">
                <button className="Dadupa-Close">
                    <i className="uil uil-multiply"></i>
                </button>
            </div>

            <header className="Dadupa-Header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2 col-md-2">
                            <div className="left-nav">
                                <a href={`${process.env.REACT_APP_FRONT_URL}`}>
                                    <img src="/assets/images/dadupa-brand-text.svg" alt="Dadupa Connect" className="Logo-Desktop" />
                                    <img src="/assets/images/dadupa-responsive.svg" alt="Dadupa Connect" className="Logo-Responsive" />
                                </a>
                            </div>
                        </div>
                        <div className="dadupa-navigation col-md-5 d-lg-block">
                            <div className="center-nav">
                                <ul className="Dadupa-Nav">
                                <li className="Nav-Item"><NavLink activeClassName="Active-Nav" to={`/project`} className="Nav-Link"><i className="uil uil-lightbulb-alt"></i><span>{t('projectHolder')}</span></NavLink></li>
                                <li className="Nav-Item"><NavLink activeClassName="Active-Nav" to={`/funder`} className="Nav-Link"><i className="uil uil-moneybag"></i><span>{t('donor')}</span> </NavLink></li>
                                <li className="Nav-Item"><NavLink activeClassName="Active-Nav" to={`/mentor`} className="Nav-Link"><i className="uil uil-users-alt"></i><span>{t('accompanyingPerson')}</span> </NavLink></li>
                                <li className="Nav-Item"><NavLink activeClassName="Active-Nav" to={`/articles`} className="Nav-Link"><i className="uil uil-books"></i><span>{t('articles')}</span></NavLink></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-10 col-md-5 col-lg-5">
                            <div className="right-nav">
                                <div className="New-Post" onClick={addMenu}>
                                    <button className="Add-New" data-toggle="tooltip" data-placement="bottom" title="Add new"><i className="uil uil-plus"></i></button>
                                    {display && <div className="Dadupa-Popup-DropDown Dadupa-Popup-DropDown_Active" ref={ref}>
                                        <ul className="Mini-Profile-Items">
                                        <li className="Mini-Profile-Item"><Link to={`/project/create`} onClick={clearProject}><i className="uil uil-rocket"></i> {t('projectHolder')}</Link></li>
                                        <li className="Mini-Profile-Item"><Link to={`/funder/create`} onClick={clearProject}><i className="uil uil-briefcase-alt"></i> {t('donor')}</Link></li>
                                        <li className="Mini-Profile-Item"><Link to={`/mentor/create`} onClick={clearProject}><i className="uil uil-comment-alt-notes"></i> {t('accompanyingPerson')}</Link></li>
                                        </ul>
                                    </div>}
                                </div>
                                <div className="Dadupa-Notifications">
                                    <div className="Dadupa-Notifications-Items">
                                        {/* <div className="Dadupa-Notifications-Item Dadupa-Search">
                                            <form className="search">
                                                <input type="search" name="search" placeholder="Search Dadupa" />
                                                <button type="submit" name="submit"><i className="uil uil-search"></i></button>
                                            </form>
                                        </div> */}
                                        <div className=" Dadupa-Notifications-Item Dadupa-Alert-Popup">
                                            <button onClick={openNotifications} className="Dadupa-Alert" data-toggle="tooltip" data-placement="bottom" title="Notifications">
                                                <span className={classe}></span><i className="uil uil-bell"></i>
                                                {usernotifications.notifications && usernotifications.notifications.some(e => e.seen === false) && <span className="notifications-badge"></span>}
                                            </button>
                                            {/* {showNotifications &&  */}
                                                <div className="Dadupa-Notifs-Box Dadupa-Msgs-Box Msgs-Box-Active" ref={ref}>
                                                    <div className='Dadupa-Notifs-Box-Header'>
                                                    <h3>{t('notifications')}</h3>
                                                    </div>
                                                    <div className={' Msgs-List'} >
                                                        { usernotifications.notifications.map((notification, index) =>
                                                            <NotificationMenu notification={notification} key={index} />
                                                        )}
                                                        <div className="All-Messages-Row">
                                                            <Link to={`/notifications`} className="all-messages-button"> {t('seeAll')} {t('notifications')} </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            {/* } */}
                                        </div>
                                        {/* <div className="Dadupa-Notifications-Item Dadupa-Message-Popup">
                                            <button onClick={openMessages} className="Dadupa-Message" data-toggle="tooltip" data-placement="bottom" title="Messages"><span className="new-message"></span><i className="uil uil-envelope"></i></button>
                                            {showMessages && <Messages/>}
                                        </div> */}
                                    </div>
                                </div>
                                <div className="Dadupa-User" onClick={userMenu}>

                                {
                                        userProfile !== '' && userProfile !== 'loading'  ?
                                <>
                                    <ul className="Dadupa-User-Infos">
                                        <li className="profile-image">
                                            {userProfile.profile?.avatar_link ? 
                                                <img src={userProfile.profile?.avatar_link} alt="avatar" />    
                                            : <img src="/assets/images/avatar.png" alt="avatar" />}
                                        
                                        </li>
                                        {/* <li className="profile-name">
                                        <span className="">{userProfile.name}</span>
                                        </li> */}
                                        <li className="profile-arrow"><i className="uil uil-angle-down"></i></li>
                                    </ul> 
                                    <div className="Dadupa-Mini-Profile">
                                        <div className='Dadupa-Mini-Profile-Meta'>
                                            <div className='Dadupa-Mini-Profile-Thumb'>
                                                {userProfile.profile?.avatar_link ? 
                                                    <img src={userProfile.profile?.avatar_link} alt="avatar" />    
                                                : <img src="/assets/images/avatar.png" alt="avatar" />}
                                            </div>
                                            <div className='Dadupa-Mini-Profile-Infos'>
                                                <p className="Mini-Profile-Name">{userProfile.name}</p>
                                                <span>{userProfile.email}</span>
                                            </div>

                                        </div>
                                        <ul className='Mini-Profile-Items'>
                                            <li className='Mini-Profile-Item'><Link to={`/profile/`+userProfile.profile_id}><i className="uil uil-user"></i> {t('see_profile')}</Link></li>
                                            <li className="Mini-Profile-Item"><Link to={`/user/`+userProfile.profile_id+`/settings`}><i className="uil uil-setting"></i>{t('setting')}</Link></li>
                                        </ul>
                                        {/* <Link to={`/profile/`+userProfile.profile_id} className="Mini-Profile-Link profil-link">{t('see_profile')}</Link> */}
                                        <ul className="Mini-Profile-Items">
                                            <li className="Mini-Profile-Item"><Link to={`/profile/`+userProfile.profile_id+`/meoffre`}><i className="uil uil-layer-group"></i>{t('my_offre')} </Link></li>
                                            <li className="Mini-Profile-Item"><Link to={`/favorite`}><i className="uil uil-favorite"></i> {t('my_favorite')}  </Link></li>
                                        </ul>
                                        <ul className='Mini-Profile-Items'>
                                            <li className="Mini-Profile-Item"><a href="#" className="logoout-link" onClick={handlelogOut}><i className="uil uil-exit"></i>{t('logout')}</a></li>
                                        </ul>
                                    </div>
                                </>
:
                                    userProfile.success === false ?
                                        userProfile.message
                                        :
                                        <span/>
                                }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>    
        </div>
    )
}

export default HeaderProfile;
