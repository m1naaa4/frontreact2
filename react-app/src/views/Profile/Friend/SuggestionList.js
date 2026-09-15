import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SendRequestFriendAction } from '../../../store/actions/Friend/FriendsAction';
import { useEffect } from 'react';




const  SuggestionList = ({suggestion}) => {

    const [show, setShow] = useState(true);
    const [type, setType] = useState();
    const dispatch = useDispatch();
  
    const addFriend = async () =>{
        const data ={
            'friend_id' : suggestion.user_id || suggestion.id,
            'friend_name': suggestion.name || suggestion.profile?.username,
            'friend_username': suggestion.profile?.username,
            'friend_avatar': suggestion.profile?.avatar_link,
            'friend_profile_id': suggestion.profile?.id,
            'url' : 'friend/sendRequest',
        }
        const result = await dispatch(SendRequestFriendAction(data));
        if (result?.success) setShow(false);
    }

    useEffect(() => {
        if (suggestion.type == 'PP') {
        setType('uil uil-lightbulb-alt');
        } else if(suggestion.type == 'BF') {
            setType('uil uil-moneybag');
        } else if(suggestion.type == 'ACMPT') {
            setType('uil uil-users-alt');
        } else {
            setType('');
        }
    }, [suggestion])

    return (
        <>
            {show && <div className="Contact">
                {/* <span className="Profile-Icon"><i className={`${type}`}></i></span> */}
                <div className="Contact-Thumb"> <Link to={`/profile/${suggestion.profile.id}`}><img src={suggestion.profile.avatar_link}  alt=""/></Link></div>
                <div className="Contact-Infos">
                    <div className='Contact-Infos-Row'>
                        <Link to={`/profile/${suggestion.profile.id}`}><h4>{suggestion.profile.username}</h4></Link>
                        <p><i className={`${type}`}></i> {suggestion.type}</p>
                    </div>
                    <div className="Add-Contact">
                        <button type="button" name="button" onClick={addFriend}><i className="uil uil-user-plus"></i></button>
                    </div>
                </div>
                
            </div>}
        </>
    )

}
export default SuggestionList;
