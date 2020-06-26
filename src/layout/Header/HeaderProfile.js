import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {loadUserAction} from "../../store/actions/User/ProfileActions";
import {Text} from "../../containers/Language";
import {UserLogOutAction} from "../../store/actions/User/Auth/AuthActions";
import {Dropdown} from "react-bootstrap";

function HeaderProfile(props) {

    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.userProfile.userProfile);
    const authResponse = useSelector(state => state.userAuth.authResponse);
    useEffect(() => {
        dispatch(loadUserAction());
    }, [dispatch])

    const logOut = ()=>{
        dispatch(UserLogOutAction());
    }


    useEffect(() => {
        if(authResponse!=="" && authResponse.success===true)
        {
            alert(authResponse.message);
            localStorage.removeItem('user-token');
            console.log(props)
            props.props.history.push('/login');
        }else if(authResponse.success===false)
        {
            alert(authResponse.message);
        }
    }, [authResponse])

    return (
        <div>
            {
                userProfile!=="" && userProfile.success===true?

            <header className="Dadupa-Header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2 col-md-2">
                            <div className="left-nav">
                                <img src="/assets/images/dadupa-brand-text.svg" alt="Dadupa Connect"
                                     className="Logo-Desktop"/>
                                    <img src="/assets/images/dadupa-responsive.svg" alt="Dadupa Connect"
                                         className="Logo-Responsive"/>
                            </div>
                        </div>
                        <div className="col-md-5 d-none d-lg-block">
                            <div className="center-nav">
                                <ul className="Dadupa-Nav">
                                    <li className="Nav-Item Active-Nav"><a href="#!" className="Nav-Link"><i
                                        className="uil uil-lightbulb-alt"></i> <Text tid="projectHolder" /></a></li>
                                    <li className="Nav-Item"><a href="#!" className="Nav-Link"><i
                                        className="uil uil-moneybag"></i> <Text tid="donor" /></a></li>
                                    <li className="Nav-Item"><a href="#!" className="Nav-Link"><i
                                        className="uil uil-users-alt"></i> <Text tid="accompanyingPerson" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-10 col-md-10 col-lg-5">
                            <div className="right-nav">
                                <div className="New-Post">
                                    {/*<button className="Add-New"><i className="uil uil-plus"></i></button>*/}
                                    <a href="new-offer.html" className="Add-New" data-toggle="tooltip"
                                       data-placement="bottom" title="Add new"><i className="uil uil-plus"></i></a>
                                </div>
                                <div className="Dadupa-Notifications">
                                    <ul className="Dadupa-Notifications-Items">
                                        <div className="Dadupa-Notifications-Item Dadupa-Search">
                                            <form className="search" action="#" method="post">
                                                <input type="search" name="search" placeholder="Search Dadupa" />
                                                <button type="submit" name="submit"><i
                                                    className="uil uil-search"></i>
                                                </button>
                                            </form>
                                        </div>

                                        <div className="Dadupa-Notifications-Item Dadupa-Alert-Popup"><a href="#!"
                                                                                                         className="Dadupa-Alert"
                                                                                                         data-toggle="tooltip"
                                                                                                         data-placement="bottom"
                                                                                                         title="Notifications"><span
                                            className="new-notif"></span><i className="uil uil-bell"></i></a>
                                            <div className="Dadupa-Notifs-Box">
                                                <h3>Notifications</h3>
                                                <div className="Notifs-List">
                                                    <div className="Notif-Item">
                                                        <div className="Notif-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Notif-Options btn-group">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle"
                                                                    type="button" data-toggle="dropdown"
                                                                    aria-haspopup="true" aria-expanded="false"><i
                                                                className="uil uil-ellipsis-h"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <div className="dropdown-item">Mark as read</div>
                                                                <div className="dropdown-item">Hide</div>
                                                            </div>
                                                        </div>
                                                        <div className="Notif-Content">
                                                            <div className="Notif-Text">Abbass IYA has ivited you to the
                                                                project
                                                            </div>
                                                            <div className="Notif-Time">About a minute ago</div>
                                                        </div>
                                                    </div>
                                                    <div className="Notif-Item">
                                                        <div className="Notif-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Notif-Options btn-group">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle"
                                                                    type="button" data-toggle="dropdown"
                                                                    aria-haspopup="true" aria-expanded="false"><i
                                                                className="uil uil-ellipsis-h"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <div className="dropdown-item">Mark as read</div>
                                                                <div className="dropdown-item">Hide</div>
                                                            </div>
                                                        </div>
                                                        <div className="Notif-Content">
                                                            <div className="Notif-Text">Abbass IYA has ivited you to the
                                                                project
                                                            </div>
                                                            <div className="Notif-Time">About a minute ago</div>
                                                        </div>
                                                    </div>
                                                    <div className="Notif-Item">
                                                        <div className="Notif-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Notif-Options btn-group">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle"
                                                                    type="button" data-toggle="dropdown"
                                                                    aria-haspopup="true" aria-expanded="false"><i
                                                                className="uil uil-ellipsis-h"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <div className="dropdown-item">Mark as read</div>
                                                                <div className="dropdown-item">Hide</div>
                                                            </div>
                                                        </div>
                                                        <div className="Notif-Content">
                                                            <div className="Notif-Text">Abbass IYA has ivited you to the
                                                                project
                                                            </div>
                                                            <div className="Notif-Time">About a minute ago</div>
                                                        </div>
                                                    </div>
                                                    <div className="Notif-Item">
                                                        <div className="Notif-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Notif-Options btn-group">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle"
                                                                    type="button" data-toggle="dropdown"
                                                                    aria-haspopup="true" aria-expanded="false"><i
                                                                className="uil uil-ellipsis-h"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <div className="dropdown-item">Mark as read</div>
                                                                <div className="dropdown-item">Hide</div>
                                                            </div>
                                                        </div>
                                                        <div className="Notif-Content">
                                                            <div className="Notif-Text">Abbass IYA has ivited you to the
                                                                project
                                                            </div>
                                                            <div className="Notif-Time">About a minute ago</div>
                                                        </div>
                                                    </div>
                                                    <div className="Notif-Item">
                                                        <div className="Notif-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Notif-Options btn-group">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle"
                                                                    type="button" data-toggle="dropdown"
                                                                    aria-haspopup="true" aria-expanded="false"><i
                                                                className="uil uil-ellipsis-h"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <div className="dropdown-item">Mark as read</div>
                                                                <div className="dropdown-item">Hide</div>
                                                            </div>
                                                        </div>
                                                        <div className="Notif-Content">
                                                            <div className="Notif-Text">Abbass IYA has ivited you to the
                                                                project
                                                            </div>
                                                            <div className="Notif-Time">About a minute ago</div>
                                                        </div>
                                                    </div>
                                                    <div className="Notif-Item">
                                                        <div className="Notif-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Notif-Options btn-group">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle"
                                                                    type="button" data-toggle="dropdown"
                                                                    aria-haspopup="true" aria-expanded="false"><i
                                                                className="uil uil-ellipsis-h"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <div className="dropdown-item">Mark as read</div>
                                                                <div className="dropdown-item">Hide</div>
                                                            </div>
                                                        </div>
                                                        <div className="Notif-Content">
                                                            <div className="Notif-Text">Abbass IYA has ivited you to the
                                                                project
                                                            </div>
                                                            <div className="Notif-Time">About a minute ago</div>
                                                        </div>
                                                    </div>
                                                    <div className="Notif-Item">
                                                        <div className="Notif-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Notif-Options btn-group">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle"
                                                                    type="button" data-toggle="dropdown"
                                                                    aria-haspopup="true" aria-expanded="false"><i
                                                                className="uil uil-ellipsis-h"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <div className="dropdown-item">Mark as read</div>
                                                                <div className="dropdown-item">Hide</div>
                                                            </div>
                                                        </div>
                                                        <div className="Notif-Content">
                                                            <div className="Notif-Text">Abbass IYA has ivited you to the
                                                                project
                                                            </div>
                                                            <div className="Notif-Time">About a minute ago</div>
                                                        </div>
                                                    </div>
                                                    <div className="Notif-Item">
                                                        <div className="Notif-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Notif-Options btn-group">
                                                            <button className="btn btn-secondary btn-sm dropdown-toggle"
                                                                    type="button" data-toggle="dropdown"
                                                                    aria-haspopup="true" aria-expanded="false"><i
                                                                className="uil uil-ellipsis-h"></i></button>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <div className="dropdown-item">Mark as read</div>
                                                                <div className="dropdown-item">Hide</div>
                                                            </div>
                                                        </div>
                                                        <div className="Notif-Content">
                                                            <div className="Notif-Text">Abbass IYA has ivited you to the
                                                                project
                                                            </div>
                                                            <div className="Notif-Time">About a minute ago</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="Dadupa-Notifications-Item Dadupa-Message-Popup"><a href="#!"
                                                                                                           className="Dadupa-Message"
                                                                                                           data-toggle="tooltip"
                                                                                                           data-placement="bottom"
                                                                                                           title="Messages"><span
                                            className="new-message"></span><i className="uil uil-envelope"></i></a>
                                            <div className="Dadupa-Msgs-Box">
                                                <h3>Messages</h3>
                                                <div className="Msgs-List">
                                                    <div className="Msgs-Item New-Msg">
                                                        <div className="Msgs-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Msgs-Content">
                                                            <div className="Msgs-User">Youness EL BEZZAZI</div>
                                                            <div className="Msgs-Text">Message text goes here...</div>
                                                            <div className="Friend-Active">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Msgs-Item">
                                                        <div className="Msgs-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Msgs-Content">
                                                            <div className="Msgs-User">Youness EL BEZZAZI</div>
                                                            <div className="Msgs-Text">Message text goes here...</div>
                                                            <div className="Friend-Active">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Msgs-Item">
                                                        <div className="Msgs-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Msgs-Content">
                                                            <div className="Msgs-User">Youness EL BEZZAZI</div>
                                                            <div className="Msgs-Text">Message text goes here...</div>
                                                            <div className="Friend-Active">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Msgs-Item">
                                                        <div className="Msgs-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Msgs-Content">
                                                            <div className="Msgs-User">Youness EL BEZZAZI</div>
                                                            <div className="Msgs-Text">Message text goes here...</div>
                                                            <div className="Friend-Active">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Msgs-Item">
                                                        <div className="Msgs-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Msgs-Content">
                                                            <div className="Msgs-User">Youness EL BEZZAZI</div>
                                                            <div className="Msgs-Text">Message text goes here...</div>
                                                            <div className="Friend-Not-Active">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Msgs-Item">
                                                        <div className="Msgs-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Msgs-Content">
                                                            <div className="Msgs-User">Youness EL BEZZAZI</div>
                                                            <div className="Msgs-Text">Message text goes here...</div>
                                                            <div className="Friend-Not-Active">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Msgs-Item">
                                                        <div className="Msgs-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Msgs-Content">
                                                            <div className="Msgs-User">Youness EL BEZZAZI</div>
                                                            <div className="Msgs-Text">Message text goes here...</div>
                                                            <div className="Friend-Active">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Msgs-Item">
                                                        <div className="Msgs-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Msgs-Content">
                                                            <div className="Msgs-User">Youness EL BEZZAZI</div>
                                                            <div className="Msgs-Text">Message text goes here...</div>
                                                            <div className="Friend-Active">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Msgs-Item">
                                                        <div className="Msgs-Image"><img
                                                            src="assets/images/abbass-iya.jpg"/></div>
                                                        <div className="Msgs-Content">
                                                            <div className="Msgs-User">Youness EL BEZZAZI</div>
                                                            <div className="Msgs-Text">Message text goes here...</div>
                                                            <div className="Friend-Active">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="All-Messages-Row">
                                                    <button type="button" name="button"
                                                            className="all-messages-button">See All Messages
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>

                                <div className="Dadupa-User">
                                    <ul className="Dadupa-User-Infos">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="default" id="dropdown-basic">
                                                <img src="/assets/images/abbass-iya.jpg"/>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="Mini-Profile-Items">
                                                <label className="Mini-Profile-Name">{userProfile.user.name}</label>
                                                <a className="Mini-Profile-Link" href="#!">Voir mon profil</a>
                                                <Dropdown.Item className="Mini-Profile-Item" href="#/action-1"><i
                                                    className="uil uil-layer-group"></i>Action</Dropdown.Item>
                                                <Dropdown.Item className="Mini-Profile-Item" href="#/action-2"><i
                                                    className="uil uil-setting"></i><Text tid="setting"/></Dropdown.Item>
                                                <Dropdown.Item className="Mini-Profile-Item" onClick={logOut}><i
                                                    className="uil uil-exit"></i><Text tid="logout"/></Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
                :
                userProfile.success===false ?
                userProfile.message
                :
                <span />
            }
        </div>
    )
}

export default HeaderProfile;
