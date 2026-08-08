import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HeaderProfileSkeleton from '../../skeleton/profile/HeaderProfileSkeleton';
import {  InvitationsAction, MyFriendsAction, SendRequestFriendAction, SuggestionsAction } from '../../store/actions/Friend/FriendsAction';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DialogContentText } from '@material-ui/core';
import Button from '@mui/material/Button';
import { UploadLogoAction } from '../../store/actions/Media/MediaAction';
import { useTranslation } from 'react-i18next';


export default function HeaderProfileView({ formData, setForm, props }) {

    const infoprofile = useSelector(state => state.infoProfile);
    const infouser = useSelector(state => state.userProfile);
    const userProfile = useSelector(state => state.userProfile.userProfile);
    const myfriends = useSelector(state => state.userProfile.myfriends);
    const suggestions = useSelector(state => state.userProfile.suggestions);
    const invitations = useSelector(state => state.userProfile.invitations);
    
    const newavatar = useSelector(state => state.updateavatar);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState();
    const { t } = useTranslation();

    const hiddenFileInput = useRef(null);
    const hiddenCoverInput = useRef(null);
    const [fileAvatar, setFileAvatar] = useState();
    const [fileCover, setFileCover] = useState();
    const [user_id, setUserId] = useState()
    const params = useParams();

    const location = useLocation();
    const currentLocation = location.pathname.split('/')[location.pathname.split('/').length - 1]
    const [currentPage, setCurrentPage] = useState('historique');

    const selectFile = (e) => {
        dispatch(UploadLogoAction(user_id, e.target.files[0], 'user', 'avatar', '/upload'));
    };

    const selectFileCover = (e) => {
        dispatch(UploadLogoAction(user_id, e.target.files[0], 'user', 'cover', '/upload'));
    };

    useEffect(() => {
        if (suggestions == undefined) {
            dispatch(SuggestionsAction({'url': 'friend/getSuggestions'}));
        }
        if (myfriends == undefined) {
            dispatch(MyFriendsAction({'url': 'friend/getmyfriends'}));
        }
        if (invitations == undefined) {
            dispatch(InvitationsAction({'url': 'friend/getInvitations'}));
        }
    }, [])

    useEffect(() => {
        setFileCover(infoprofile.infoprofile.cover);
        setFileAvatar(infoprofile.infoprofile.avatar);

        if (infoprofile.infoprofile.type == 'PP') {
            setType('uil uil-lightbulb-alt');
        } else if(infoprofile.infoprofile.type == 'BF') {
            setType('uil uil-moneybag');
        } else if(infoprofile.infoprofile.type == 'ACMPT') {
            setType('uil uil-users-alt');
        } else {
            setType('');
        }
    }, [infoprofile.infoprofile.avatar])

    useEffect(() => {

        if (currentLocation === 'cvtheque') {
            setCurrentPage('bio');
        } else if (currentLocation === 'meoffre') {
            setCurrentPage('offres');
        } else if (currentLocation === 'dashboard') {
            setCurrentPage('dashboard');
        } else if (currentLocation === 'friends') {
            setCurrentPage('friends');
        } else {
            setCurrentPage('historique');
        }
    });

    useEffect(() => {
        if (infouser.userProfile && infouser.userProfile !== 'loading') {
            setUserId(infouser.userProfile.profile_id);
        };
        if(myfriends){
            let find = myfriends.some( (data) => {return (data.profile_id === infoprofile.infoprofile.id) });
            if(find){
                setShow(false);
            }else{
                setShow(true);
            }
        }
    }, [infoprofile.infoprofile]);
    
    useEffect(() => {
        setFileAvatar(newavatar.avatar.avatar_link);
        setFileCover(newavatar.avatar.cover_link);
    }, [newavatar]);

    const SendRequest = async ()=>{
        setOpen(true);
        const profile = infoprofile?.infoprofile || {};
        const friendName = (profile.firstname && profile.lastname)
            ? `${profile.firstname} ${profile.lastname}`
            : (profile.username || profile.name || '');
        try {
            const res = await dispatch(SendRequestFriendAction({
                friend_id: profile.user_id,
                friend_name: friendName,
                friend_username: profile.username || friendName,
                friend_avatar: profile.avatar || profile.avatar_link,
                friend_profile_id: profile.id || profile.profile_id,
                friend_firstname: profile.firstname,
                friend_lastname: profile.lastname,
                name: localStorage.getItem('user_name') || undefined,
                url: 'friend/sendRequest',
            }));
            if (res?.success === false) {
                console.error('Friend request failed:', res?.message || res);
                return;
            }
            setShow(false);
        } catch (error) {
            console.error('Friend request failed:', error);
        }
    }

    useEffect(()=>{
        let data = {
          'url' : 'friend/getmyfriends',
          }
        dispatch(MyFriendsAction(data));
      },[]);

    const HandleClose = ()=>{
        setOpen(false);
    }

    return (
        <>
            {
                infoprofile.infoprofile !== "" && infoprofile.infoprofile !== 'loading' ?
                    <div className="Profile-Cover" >
                        <ToastContainer
                            position="bottom-left"
                            hideProgressBar={false}
                        />
                        
                            <div className="Profile-Wrap" id="photoCover" style={{ backgroundImage: `url(${fileCover})` }}>
                                <div className="container">
                                    <div className="Profile-Infos">
                                        {/* <br/><br/> */}
                                        {
                                            localStorage.getItem('profile_id') === params.id && < > < input type = "file"
                                            id = "imageUpload"
                                            name = "avatar"
                                            accept = ".png, .jpg, .jpeg"
                                            ref = {
                                                hiddenFileInput
                                            }
                                            onChange = {
                                                selectFile
                                            }
                                            />
                                            <label htmlFor="imageUpload">
                                                <i className="uil uil-camera" />
                                            </label></>
                                        }
                                        {fileAvatar ? <div className="Profile-Picture" id="imageProfile" style={{ backgroundImage: `url(${fileAvatar})` }} /> :
                                            <div className="Profile-Picture" id="imageProfile" style={{ backgroundImage: `url('/assets/images/avatar.png')` }} />
                                        }

                                        <div className="Profile-Name">
                                            <span>{(infoprofile.infoprofile.firstname && infoprofile.infoprofile.lastname)? (infoprofile.infoprofile.firstname+" "+infoprofile.infoprofile.lastname): infoprofile.infoprofile.username}</span>
                                            <span className="Profile-Icon"><i className={`${type}`}></i></span>
                                        </div>
                                    </div>
                                    {
                                        localStorage.getItem('profile_id') === params.id && < >
                                        <input type="file" id="coverUpload" accept=".png, .jpg, .jpeg" ref={hiddenCoverInput} onChange={selectFileCover} />
                                        <label htmlFor="coverUpload" className="coverUpload"><i className="uil uil-camera" /> <span>{t('coverEdit')}</span> </label>
                                    </>
                                    }
                                </div>
                            </div>

                            <div className="container">
                            <div className="Profile-Navigation">
                                <ul className="Profie-Menu">
                                    { (infoprofile?.infoprofile.user_id!==userProfile.id && show)  && (<li><div className="form-submit" style={{backgroundColor:"white",borderRadius:"32px"}} ><button onClick={SendRequest} style={{border:"0px",height:"40px",width:"50px"}}><i className="uil uil-user-plus" style={{fontSize:"20px",paddingLeft:"3px"}}></i></button></div></li>)}
                                    <Dialog
                                        open={open}
                                        onClose={HandleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        >
                                            <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                <span style={{fontWeight:"bold",top:"50px"}}> {t('request_sent_accept')}</span>
                                            </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                            <Button onClick={HandleClose} autoFocus>
                                                Ok
                                            </Button>
                                            </DialogActions>
                                    </Dialog>
                                    <li><NavLink className={currentPage === 'bio' ? 'active-profile-link': ''} to={`/profile/${params.id}/cvtheque`}><i className="uil uil-user-square"></i>{t('bio')}</NavLink></li>
                                    <li><NavLink className={currentPage === 'offres' ? 'active-profile-link' : ''} to={`/profile/${params.id}/meoffre`}><i className="uil uil-layer-group"></i>{t('offerings')}</NavLink></li>
                                    <li><NavLink className={currentPage === 'dashboard' ? 'active-profile-link' : ''} to={`/profile/${params.id}/dashboard`}><i className="uil uil-chart"></i>{t('dashboard') || 'Dashboard'}</NavLink></li>
                                    <li><NavLink className={currentPage === 'historique' ? 'active-profile-link' : ''} to={`/profile/${params.id}`}><i className="uil uil-apps"></i> {t('history')}</NavLink></li>
                                    <li><NavLink className={currentPage === 'friends' ? 'active-profile-link' : ''} to={`/profile/${params.id}/friends/friends`}><i className="uil uil-share-alt" />{t('réseaux')} </NavLink></li>
                                    {/*<li><Link to={`/messages/${params.id}`}><i className="uil uil-comment-alt-lines" /> Discuter</Link></li> */}
                                </ul>
                            </div>
                            </div>
                            
                    </div>
                    :
                    infoprofile.success === false ?
                        infoprofile.message : <HeaderProfileSkeleton />
            }
        </>



    )
}
