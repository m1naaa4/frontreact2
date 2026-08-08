import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AcceptFriendAction, RejectFriendAction } from '../../../store/actions/Friend/FriendsAction';

const Invitations = ({ invitation }) => {
    const [show, setShow] = useState(true);
    const [type, setType] = useState();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const requestId = invitation.request_id || invitation.id;
    const friendId = invitation.user_id || invitation.profile?.user_id || null;

    const acceptFriend = async () => {
        if (busy) return;
        setBusy(true);
        setError('');
        try {
            const res = await dispatch(AcceptFriendAction({
                request_id: requestId,
                friend_id: friendId,
                url: 'friend/friendAccept',
            }));
            if (res?.success === false) {
                setError(res?.message || 'Impossible d\'accepter cette demande.');
                return;
            }
            setShow(false);
        } catch (e) {
            setError('Impossible d\'accepter cette demande.');
        } finally {
            setBusy(false);
        }
    };

    const rejectFriend = async () => {
        if (busy) return;
        setBusy(true);
        setError('');
        try {
            const res = await dispatch(RejectFriendAction({
                request_id: requestId,
                friend_id: friendId,
                url: 'friend/friendReject',
            }));
            if (res?.success === false) {
                setError(res?.message || 'Impossible de refuser cette demande.');
                return;
            }
            setShow(false);
        } catch (e) {
            setError('Impossible de refuser cette demande.');
        } finally {
            setBusy(false);
        }
    };

    useEffect(() => {
        if (invitation.type == 'PP') {
            setType('uil uil-lightbulb-alt');
        } else if (invitation.type == 'BF') {
            setType('uil uil-moneybag');
        } else if (invitation.type == 'ACMPT') {
            setType('uil uil-users-alt');
        } else {
            setType('');
        }
    }, [invitation]);

    return (
        <>
            {show &&
                <div className="Contact">
                    <div className="Contact-Thumb">
                        <Link to={`/profile/${invitation.profile.id}`}>
                            <img src={invitation.profile.avatar_link} alt="" />
                        </Link>
                    </div>
                    <div className="Contact-Infos">
                        <div className='Contact-Infos-Row'>
                            <Link to={`/profile/${invitation.profile.id}`}>
                                <h4>{invitation.profile.username}</h4>
                            </Link>
                            <p><i className={`${type}`}></i> {invitation.type}</p>
                        </div>
                        <div className="Add-Contact ">
                            <div className='Invitation-Options'>
                                <button
                                    type="button"
                                    disabled={busy}
                                    onClick={acceptFriend}
                                    className="Invitation-Option_Confirm"
                                >
                                    <i className="uil uil-check"></i>
                                </button>
                                <button
                                    type="button"
                                    disabled={busy}
                                    onClick={rejectFriend}
                                    className="Invitation-Option_Delete"
                                >
                                    <i className="uil uil-times"></i>
                                </button>
                            </div>
                            {error && <div className="text-danger" style={{ fontSize: 12 }}>{error}</div>}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Invitations;
