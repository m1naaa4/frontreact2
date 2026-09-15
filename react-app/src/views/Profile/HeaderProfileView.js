import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HeaderProfileSkeleton from '../../skeleton/profile/HeaderProfileSkeleton';
import { AcceptFriendAction, InvitationsAction, MyFriendsAction, RejectFriendAction, SendRequestFriendAction, SuggestionsAction } from '../../store/actions/Friend/FriendsAction';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { DialogContentText } from '@material-ui/core';
import Button from '@mui/material/Button';
import { UploadLogoAction } from '../../store/actions/Media/MediaAction';
import { useTranslation } from 'react-i18next';

export default function HeaderProfileView() {
    const infoprofile = useSelector(state => state.infoProfile);
    const infouser = useSelector(state => state.userProfile);
    const userProfile = useSelector(state => state.userProfile.userProfile);
    const myfriends = useSelector(state => state.userProfile.myfriends);
    const suggestions = useSelector(state => state.userProfile.suggestions);
    const invitations = useSelector(state => state.userProfile.invitations);
    const newavatar = useSelector(state => state.updateavatar);
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');
    const [fileAvatar, setFileAvatar] = useState();
    const [fileCover, setFileCover] = useState();
    const [user_id, setUserId] = useState();
    const [currentPage, setCurrentPage] = useState('historique');
    const [friendState, setFriendState] = useState('none');
    const hiddenFileInput = useRef(null);
    const hiddenCoverInput = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const location = useLocation();
    const { t } = useTranslation();
    const currentLocation = location.pathname.split('/').pop();

    const selectFile = (e) => dispatch(UploadLogoAction(user_id, e.target.files[0], 'user', 'avatar', '/upload'));
    const selectFileCover = (e) => dispatch(UploadLogoAction(user_id, e.target.files[0], 'user', 'cover', '/upload'));

    useEffect(() => {
        if (suggestions == undefined) dispatch(SuggestionsAction({ url: 'friend/getSuggestions' }));
        if (myfriends == undefined) dispatch(MyFriendsAction({ url: 'friend/getmyfriends' }));
        if (invitations == undefined) dispatch(InvitationsAction({ url: 'friend/getInvitations' }));
    }, []);

    useEffect(() => {
        setFileCover(infoprofile.infoprofile.cover);
        setFileAvatar(infoprofile.infoprofile.avatar);
        if (infoprofile.infoprofile.type == 'PP') setType('uil uil-lightbulb-alt');
        else if (infoprofile.infoprofile.type == 'BF') setType('uil uil-moneybag');
        else if (infoprofile.infoprofile.type == 'ACMPT') setType('uil uil-users-alt');
        else setType('');
    }, [infoprofile.infoprofile.avatar]);

    useEffect(() => {
        if (currentLocation === 'cvtheque') setCurrentPage('bio');
        else if (currentLocation === 'meoffre') setCurrentPage('offres');
        else if (currentLocation === 'dashboard') setCurrentPage('dashboard');
        else if (currentLocation === 'friends') setCurrentPage('friends');
        else setCurrentPage('historique');
    });

    useEffect(() => {
        if (infouser.userProfile && infouser.userProfile !== 'loading') setUserId(infouser.userProfile.profile_id);
        if (myfriends && Array.isArray(myfriends)) {
            const viewedUserId = Number(infoprofile?.infoprofile?.user_id);
            const viewedProfileId = Number(infoprofile?.infoprofile?.id || infoprofile?.infoprofile?.profile_id);
            const isFriend = myfriends.some((friend) =>
                Number(friend.user_id || friend.id) === viewedUserId
                || Number(friend.profile_id || friend.profile?.id) === viewedProfileId
            );
            const incoming = Array.isArray(invitations) && invitations.some((invitation) =>
                Number(invitation.user_id || invitation.profile?.user_id) === viewedUserId
            );
            setShow(!isFriend && !incoming);
            setFriendState(isFriend ? 'friends' : (incoming ? 'pending_received' : 'none'));
        }
    }, [infoprofile.infoprofile, myfriends, invitations]);

    useEffect(() => {
        setFileAvatar(newavatar?.avatar?.avatar_link);
        setFileCover(newavatar?.avatar?.cover_link);
    }, [newavatar]);

    const SendRequest = async () => {
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
            if (res?.success !== false) {
                setShow(false);
                setFriendState(res?.status || 'pending_sent');
            }
        } catch (error) {
            console.error('Friend request failed:', error);
        }
    };

    const openMessenger = () => {
        const recipientId = Number(infoprofile?.infoprofile?.user_id);
        if (recipientId) {
            history.push(`/messages/${recipientId}`);
        }
    };

    const respondToInvitation = async (accept) => {
        const invitation = Array.isArray(invitations)
            ? invitations.find((item) => Number(item.user_id || item.profile?.user_id) === viewedUserId)
            : null;
        if (!invitation) return;

        const action = accept ? AcceptFriendAction : RejectFriendAction;
        const res = await dispatch(action({
            request_id: invitation.request_id || invitation.id,
            friend_id: invitation.user_id,
            url: accept ? 'friend/friendAccept' : 'friend/friendReject',
        }));
        if (res?.success) {
            setFriendState(accept ? 'friends' : 'none');
            setShow(!accept);
        }
    };

    useEffect(() => {
        dispatch(MyFriendsAction({ url: 'friend/getmyfriends' }));
    }, []);

    const HandleClose = () => setOpen(false);
    const displayName = (infoprofile.infoprofile.firstname && infoprofile.infoprofile.lastname)
        ? `${infoprofile.infoprofile.firstname} ${infoprofile.infoprofile.lastname}`
        : infoprofile.infoprofile.username;
    const viewedUserId = Number(infoprofile?.infoprofile?.user_id);
    const currentUserId = Number(localStorage.getItem('user_id'));
    const isKnownOtherProfile = Boolean(viewedUserId && currentUserId && viewedUserId !== currentUserId);
    // Profile ids are what the profile routes use.  Do not rely only on the
    // asynchronously loaded user id, otherwise the DADUPERS tab disappears
    // for the current profile during loading (or with older API responses).
    const isOwnProfile = String(localStorage.getItem('profile_id')) === String(params.id);

    return (
        <>
            {infoprofile.infoprofile !== "" && infoprofile.infoprofile !== 'loading' ?
                <div className="Profile-Cover">
                    <ToastContainer position="bottom-left" hideProgressBar={false} />
                    <div className="Profile-Wrap" id="photoCover" style={{ backgroundImage: `url(${fileCover})` }}>
                        <div className="container">
                            <div className="Profile-Hero">
                                <div className="Profile-Hero-Bar">
                                    <div className="Profile-Hero-Left">
                                        <div className="Profile-Hero-AvatarBlock">
                                            {localStorage.getItem('profile_id') === params.id && <>
                                                <input type="file" id="imageUpload" name="avatar" accept=".png, .jpg, .jpeg" ref={hiddenFileInput} onChange={selectFile} />
                                                <label htmlFor="imageUpload"><i className="uil uil-camera" /></label>
                                            </>}
                                            <div className="Profile-Picture Profile-Picture-Large" style={{ backgroundImage: `url(${fileAvatar || '/assets/images/avatar.png'})` }} />
                                        </div>
                                        <div className="Profile-Hero-Identity">
                                            <div className="Profile-Name">
                                                <span>{displayName}</span>
                                                <span className="Profile-Icon"><i className={type}></i></span>
                                            </div>
                                            <div className="Profile-Hero-Details">
                                                <span>{infoprofile.infoprofile.job}</span>
                                                <span>{infoprofile.infoprofile.country || infoprofile.infoprofile.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Profile-Hero-Right">
                                        <div className="Profile-Socials">
                                            {infoprofile.infoprofile.networks?.facebook && <a href={infoprofile.infoprofile.networks.facebook} target="_blank" rel="noreferrer"><i className="uil uil-facebook-f"></i></a>}
                                            {infoprofile.infoprofile.networks?.twitter && <a href={infoprofile.infoprofile.networks.twitter} target="_blank" rel="noreferrer"><i className="uil uil-twitter-alt"></i></a>}
                                            {infoprofile.infoprofile.networks?.linkedin && <a href={infoprofile.infoprofile.networks.linkedin} target="_blank" rel="noreferrer"><i className="uil uil-linkedin-alt"></i></a>}
                                            {infoprofile.infoprofile.networks?.instagram && <a href={infoprofile.infoprofile.networks.instagram} target="_blank" rel="noreferrer"><i className="uil uil-instagram-alt"></i></a>}
                                        </div>
                                        <div className="Profile-Hero-Actions">
                                            {localStorage.getItem('profile_id') === params.id && <>
                                                <input type="file" id="coverUpload" accept=".png, .jpg, .jpeg" ref={hiddenCoverInput} onChange={selectFileCover} />
                                                <label htmlFor="coverUpload" className="coverUpload"><i className="uil uil-camera" /> <span>{t('coverEdit')}</span></label>
                                            </>}
                                            {isKnownOtherProfile && (
                                                <button type="button" onClick={openMessenger} className="Profile-Action-Button">
                                                    <i className="uil uil-message"></i>
                                                    <span>Envoyer un message</span>
                                                </button>
                                            )}
                                            {isKnownOtherProfile && friendState === 'friends' && (
                                                <button type="button" className="Profile-Action-Button" disabled><i className="uil uil-check"></i><span>Amis</span></button>
                                            )}
                                            {isKnownOtherProfile && friendState === 'pending_sent' && (
                                                <button type="button" className="Profile-Action-Button" disabled><i className="uil uil-clock"></i><span>Invitation envoyée</span></button>
                                            )}
                                            {isKnownOtherProfile && friendState === 'pending_received' && (
                                                <><button type="button" onClick={() => respondToInvitation(true)} className="Profile-Action-Button">Accepter</button><button type="button" onClick={() => respondToInvitation(false)} className="Profile-Action-Button">Refuser</button></>
                                            )}
                                            {isKnownOtherProfile && friendState === 'none' && show && (
                                                <button onClick={SendRequest} className="Profile-Action-Button">
                                                    <i className="uil uil-user-plus"></i>
                                                    <span>{t('request') || 'Demander'}</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="Profile-Navigation">
                                    <ul className="Profie-Menu">
                                        <Dialog open={open} onClose={HandleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    <span style={{ fontWeight: "bold", top: "50px" }}>{t('request_sent_accept')}</span>
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={HandleClose} autoFocus>Ok</Button>
                                            </DialogActions>
                                        </Dialog>
                                        <li><NavLink className={currentPage === 'historique' ? 'active-profile-link' : ''} to={`/profile/${params.id}`}><i className="uil uil-apps"></i> {t('history')}</NavLink></li>
                                        <li><NavLink className={currentPage === 'bio' ? 'active-profile-link' : ''} to={`/profile/${params.id}/cvtheque`}><i className="uil uil-user-square"></i>{t('bio')}</NavLink></li>
                                        <li><NavLink className={currentPage === 'offres' ? 'active-profile-link' : ''} to={`/profile/${params.id}/meoffre`}><i className="uil uil-layer-group"></i>{t('offerings')}</NavLink></li>
                                        {isOwnProfile && <li><NavLink className={currentPage === 'dashboard' ? 'active-profile-link' : ''} to={`/profile/${params.id}/dashboard`}><i className="uil uil-chart"></i>{t('dashboard') || 'Dashboard'}</NavLink></li>}
                                        <li><NavLink className={currentPage === 'friends' ? 'active-profile-link' : ''} to={`/profile/${params.id}/friends/friends`}><i className="uil uil-share-alt" />{t('réseaux')}</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : infoprofile.success === false ? infoprofile.message : <HeaderProfileSkeleton />}
        </>
    );
}
