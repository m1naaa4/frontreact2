import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SendRequestFriendAction } from '../../../store/actions/Friend/FriendsAction';
import { useEffect } from 'react';




const  SuggestionList = ({suggestion}) => {

    const [show, setShow] = useState(true);
    const [type, setType] = useState();
    const dispatch = useDispatch();
  
    const addFriend = (id) =>{
        let data ={
            'friend_id' : id,
            'url' : 'friend/sendRequest',
        }
        dispatch(SendRequestFriendAction(data)); 
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
                <span className="Profile-Icon"><i className={`${type}`}></i></span>
                <div className="Contact-Thumb"> <Link to={`/profile/${suggestion.profile.id}`}><img src={suggestion.profile.avatar_link}  alt=""/></Link></div>
                <div className="Contact-Infos">
                    <Link to={`/profile/${suggestion.profile.id}`}><h4>{suggestion.profile.username}</h4></Link>
                </div>
                <div className="Add-Contact">
                    <button type="button" name="button" onClick={() => {addFriend(suggestion.id); setShow(false)}}><i className="uil uil-user-plus"></i></button>
                </div>
            </div>}
        </>
    )

}
export default SuggestionList;