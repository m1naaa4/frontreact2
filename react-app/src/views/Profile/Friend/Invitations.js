import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AcceptFriendAction, RejectFriendAction } from '../../../store/actions/Friend/FriendsAction';



const  Invitations = ({invitation}) => {
    const infoprofile = useSelector(state => state.infoProfile);
    const user = useSelector(state => state.userProfile.userProfile);
    const [show, setShow] = useState(true);

    const dispatch = useDispatch();
  
    const acceptFriend = (id) =>{
        let data ={
            'request_id' : id,
            'url' : 'friend/friendAccept',
        }
        dispatch(AcceptFriendAction(data)); 
    }
    const rejectFriend = (id) =>{
        let data ={
            'request_id' : id,
            'url' : 'friend/friendReject',
        }
        dispatch(RejectFriendAction(data)); 
    }

    return (
        <>
        {show &&
            <div className="Contact">
                <span className="Profile-Icon"><i className="uil uil-lightbulb-alt"></i></span>
                <div className="Contact-Thumb"><img src={invitation.profile.avatar_link} alt="" /></div>
                <div className="Contact-Infos">
                    <h4>{invitation.name}</h4>
                </div>
                <div className="Add-Contact Invitation-Options">
                    <button type="button" name="button" onClick={() => {acceptFriend(invitation.id); setShow(false)}} className="Invitation-Option_Confirm"><i className="uil uil-check"></i></button>
                    <button type="button" name="button" onClick={() => {rejectFriend(invitation.id); setShow(false)}} className="Invitation-Option_Delete"><i className="uil uil-times"></i></button>
                </div>
            </div>
        }
        </>
    )

}
export default Invitations;